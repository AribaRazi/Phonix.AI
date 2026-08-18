from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import xgboost as xgb
import pandas as pd
import os

# NEW: used only by the /explain endpoint (Feature 3 — SHAP explanations).
# Install with: pip install shap
import shap


# ============================================================
# APP INITIALIZATION
# ============================================================

app = FastAPI(
    title="PhonePrice AI",
    description="Smartphone Indian Launch Price Prediction API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# LOAD MODEL (version-proof split format)
#
# preprocessor.pkl   -> sklearn ColumnTransformer (StandardScaler +
#                        OneHotEncoder), loaded via joblib
# xgb_model.json     -> native XGBoost Booster, loaded via xgboost's
#                        own save_model/load_model (NOT pickle), so
#                        it is stable across xgboost versions and
#                        will not throw "input stream corrupted"
# ============================================================

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
PREPROCESSOR_PATH = os.path.join(MODEL_DIR, "preprocessor.pkl")
XGB_MODEL_PATH = os.path.join(MODEL_DIR, "xgb_model.json")

for path in (PREPROCESSOR_PATH, XGB_MODEL_PATH):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Required model file not found: {path}")

try:
    preprocessor = joblib.load(PREPROCESSOR_PATH)
except Exception as e:
    raise RuntimeError(
        f"Failed to load preprocessor at {PREPROCESSOR_PATH}. "
        f"This is usually a scikit-learn version mismatch "
        f"(pip install scikit-learn==1.6.1 usually fixes it). "
        f"Original error: {e}"
    )

try:
    booster = xgb.Booster()
    booster.load_model(XGB_MODEL_PATH)
except Exception as e:
    raise RuntimeError(
        f"Failed to load XGBoost model at {XGB_MODEL_PATH}. "
        f"Original error: {e}"
    )

print("====================================")
print("PhonePrice AI Model Loaded")
print("====================================")
print(f"Preprocessor path: {PREPROCESSOR_PATH}")
print(f"XGBoost model path: {XGB_MODEL_PATH}")


# ============================================================
# NEW: REAL PHONE DATASET (Features 4 & 5 — historical trends
# and actual-vs-predicted validation)
#
# This is loaded ONLY for these two read-only endpoints. It never touches
# the model, the preprocessor, or /predict in any way.
# ============================================================
import re

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(PROJECT_DIR, "data", "Mobiles Dataset (2025).csv")


def _first_number(value):
    """Pulls the first number out of strings like '8GB', '3,600mAh',
    '6.1 inches', or 'INR 79,999'. For multi-value fields like
    '50MP + 12MP' or '8GB / 12GB', this takes the first (primary) value —
    a simplification, not a data-quality issue in the source file."""
    if value is None:
        return None
    cleaned = str(value).replace(",", "")
    match = re.search(r"\d+\.?\d*", cleaned)
    return float(match.group()) if match else None


_phones_df = None
try:
    if os.path.exists(DATASET_PATH):
        _raw = pd.read_csv(DATASET_PATH, encoding="latin-1")
        _raw["ram_gb"] = _raw["RAM"].apply(_first_number)
        _raw["weight_g"] = _raw["Mobile Weight"].apply(_first_number)
        _raw["battery_mah"] = _raw["Battery Capacity"].apply(_first_number)
        _raw["screen_in"] = _raw["Screen Size"].apply(_first_number)
        _raw["front_mp"] = _raw["Front Camera"].apply(_first_number)
        _raw["back_mp"] = _raw["Back Camera"].apply(_first_number)
        _raw["price_inr"] = _raw["Launched Price (India)"].apply(_first_number)
        _numeric_cols = ["ram_gb", "weight_g", "battery_mah", "screen_in", "front_mp", "back_mp", "price_inr"]
        _raw = _raw.dropna(subset=_numeric_cols).reset_index(drop=True)
        _phones_df = _raw
        print(f"Loaded real phone dataset: {len(_phones_df)} rows (for /price-trends and /phones only)")
    else:
        print(f"No dataset found at {DATASET_PATH} — /price-trends and /phones will return 503.")
except Exception as e:
    _phones_df = None
    print(f"Could not load phone dataset ({e}) — /price-trends and /phones will return 503.")


# ============================================================
# NEW: SHAP EXPLAINER (Feature 3 — "Why this prediction?")
#
# TreeExplainer works directly against the native XGBoost Booster and
# does NOT require retraining or a background dataset. This only reads
# the already-loaded model — nothing about /predict changes.
# ============================================================
try:
    shap_explainer = shap.TreeExplainer(booster)
    print("SHAP TreeExplainer ready")
except Exception as e:
    shap_explainer = None
    print(f"SHAP explainer could not be initialized ({e}); /explain will be unavailable.")

# The original 9 input columns, exactly as built in the /predict route.
ORIGINAL_FEATURE_COLUMNS = [
    "Company Name", "Mobile Weight", "RAM", "Front Camera", "Back Camera",
    "Processor", "Battery Capacity", "Screen Size", "Launched Year",
]

# Try to recover human-readable names for the *transformed* columns the
# preprocessor produces (e.g. one-hot columns like "cat__Company Name_Apple").
# NOTE: exact prefixes depend on how your ColumnTransformer's sub-transformers
# are named — get_feature_names_out() is the standard sklearn API and should
# work as-is for most setups. If your grouped labels below look wrong, check
# what preprocessor.get_feature_names_out() actually returns for your pipeline.
try:
    _transformed_names = list(preprocessor.get_feature_names_out())
except Exception:
    _transformed_names = None


def _map_to_original_feature(transformed_name: str) -> str:
    """Collapse a transformed/one-hot column name back to one of the
    original 9 input fields, e.g. 'cat__Company Name_Apple' -> 'Company Name'."""
    cleaned = transformed_name.split("__", 1)[-1]
    for col in sorted(ORIGINAL_FEATURE_COLUMNS, key=len, reverse=True):
        if cleaned == col or cleaned.startswith(col + "_"):
            return col
    return cleaned


# ============================================================
# REQUEST SCHEMA
# ============================================================

class PhoneInput(BaseModel):

    company_name: str = Field(
        ...,
        description="Smartphone company/brand"
    )

    mobile_weight: float = Field(
        ...,
        gt=0,
        description="Mobile weight in grams"
    )

    ram: float = Field(
        ...,
        gt=0,
        description="RAM in GB"
    )

    front_camera: float = Field(
        ...,
        ge=0,
        description="Front camera in megapixels"
    )

    back_camera: float = Field(
        ...,
        ge=0,
        description="Back camera in megapixels"
    )

    processor: str = Field(
        ...,
        description="Processor name"
    )

    battery_capacity: float = Field(
        ...,
        gt=0,
        description="Battery capacity in mAh"
    )

    screen_size: float = Field(
        ...,
        gt=0,
        description="Screen size in inches"
    )

    launched_year: int = Field(
        ...,
        ge=2000,
        le=2100,
        description="Launch year"
    )


def _normalise_text(value):
    """Compare categorical fields without treating case or extra spaces as a mismatch."""
    return " ".join(str(value).split()).casefold()


def _find_matching_phones(phone: PhoneInput):
    """Find dataset rows whose model inputs describe the submitted phone."""
    if _phones_df is None:
        return []

    numeric_fields = {
        "weight_g": (phone.mobile_weight, 1.0),
        "ram_gb": (phone.ram, 0.1),
        "front_mp": (phone.front_camera, 0.1),
        "back_mp": (phone.back_camera, 0.1),
        "battery_mah": (phone.battery_capacity, 25.0),
        "screen_in": (phone.screen_size, 0.05),
    }
    mask = (
        _phones_df["Company Name"].map(_normalise_text).eq(_normalise_text(phone.company_name))
        & _phones_df["Processor"].map(_normalise_text).eq(_normalise_text(phone.processor))
        & _phones_df["Launched Year"].eq(phone.launched_year)
    )
    for column, (submitted_value, tolerance) in numeric_fields.items():
        mask &= (_phones_df[column] - submitted_value).abs().le(tolerance)

    return _phones_df.loc[mask]


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def root():

    return {
        "message": "Phonix AI API is running",
        "version": "1.0.0"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": preprocessor is not None and booster is not None
    }


# ============================================================
# PHONE CONFIGURATION MATCH
# ============================================================

@app.post("/phone-match")
def phone_match(phone: PhoneInput):
    """Report whether all submitted model inputs map to a launched dataset row."""
    if _phones_df is None:
        raise HTTPException(
            status_code=503,
            detail="Phone dataset isn't loaded on the server. Restart the API after restoring the dataset."
        )

    matches = _find_matching_phones(phone)
    return {
        "success": True,
        "is_known_phone": not matches.empty,
        "match_count": int(len(matches)),
        "matches": [
            {
                "label": f'{row["Company Name"]} {row["Model Name"]} ({int(row["Launched Year"])})',
                "actual_price_inr": round(float(row["price_inr"]), 2),
            }
            for _, row in matches.head(3).iterrows()
        ],
    }


# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict_price(phone: PhoneInput):

    try:

        # ----------------------------------------------------
        # Create DataFrame using EXACT training feature names
        # ----------------------------------------------------

        input_data = pd.DataFrame([{
            "Company Name": phone.company_name,
            "Mobile Weight": phone.mobile_weight,
            "RAM": phone.ram,
            "Front Camera": phone.front_camera,
            "Back Camera": phone.back_camera,
            "Processor": phone.processor,
            "Battery Capacity": phone.battery_capacity,
            "Screen Size": phone.screen_size,
            "Launched Year": phone.launched_year
        }])

        print("\nIncoming prediction request:")
        print(input_data)

        # ----------------------------------------------------
        # Transform with sklearn preprocessor, then predict
        # with the native XGBoost booster
        # ----------------------------------------------------

        X_transformed = preprocessor.transform(input_data)
        dmatrix = xgb.DMatrix(X_transformed)
        prediction = booster.predict(dmatrix)[0]

        prediction = float(prediction)

        return {
            "success": True,
            "predicted_price": round(prediction, 2),
            "currency": "INR",
            "target": "Launched Price (India)",
            "message": "Estimated Indian launch price"
        }

    except Exception as e:

        print("Prediction error:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


# ============================================================
# NEW: WHY THIS PREDICTION? (Feature 3 — SHAP explanation)
#
# Separate endpoint, additive only. Does not change /predict, does not
# retrain or alter the model. If SHAP isn't available for any reason,
# this endpoint reports that clearly instead of crashing.
# ============================================================

@app.post("/explain")
def explain_prediction(phone: PhoneInput):

    if shap_explainer is None:
        raise HTTPException(
            status_code=503,
            detail="SHAP explainer is not available on this server. "
                   "Install with `pip install shap` and restart the API."
        )

    try:
        input_data = pd.DataFrame([{
            "Company Name": phone.company_name,
            "Mobile Weight": phone.mobile_weight,
            "RAM": phone.ram,
            "Front Camera": phone.front_camera,
            "Back Camera": phone.back_camera,
            "Processor": phone.processor,
            "Battery Capacity": phone.battery_capacity,
            "Screen Size": phone.screen_size,
            "Launched Year": phone.launched_year
        }])

        X_transformed = preprocessor.transform(input_data)
        X_dense = X_transformed.toarray() if hasattr(X_transformed, "toarray") else X_transformed

        shap_values = shap_explainer.shap_values(X_dense)
        row = shap_values[0] if hasattr(shap_values, "ndim") and shap_values.ndim == 2 else shap_values[0]

        # Build column names to aggregate one-hot contributions back to the
        # 9 original spec fields. Falls back to generic f0, f1... names if
        # get_feature_names_out() isn't available for this preprocessor.
        if _transformed_names and len(_transformed_names) == len(row):
            column_names = _transformed_names
        else:
            column_names = [f"f{i}" for i in range(len(row))]

        contributions = {}
        for value, name in zip(row, column_names):
            original = _map_to_original_feature(name)
            contributions[original] = contributions.get(original, 0.0) + float(value)

        expected_value = shap_explainer.expected_value
        if hasattr(expected_value, "__len__"):
            expected_value = expected_value[0]

        sorted_contributions = sorted(
            contributions.items(), key=lambda kv: abs(kv[1]), reverse=True
        )

        return {
            "success": True,
            "base_value": round(float(expected_value), 2),
            "contributions": [
                {"feature": feature, "impact": round(impact, 2)}
                for feature, impact in sorted_contributions
            ]
        }

    except Exception as e:
        print("Explanation error:", str(e))
        raise HTTPException(
            status_code=500,
            detail=f"Explanation failed: {str(e)}"
        )


# ============================================================
# NEW: HISTORICAL PRICE TRENDS (Feature 4)
#
# Read-only aggregation over the real dataset — average Indian launch
# price per year, plus how many phones that average is based on (small
# early years should be read with caution, which is why count is included).
# ============================================================

@app.get("/price-trends")
def price_trends():
    if _phones_df is None:
        raise HTTPException(
            status_code=503,
            detail="Phone dataset isn't loaded on the server. Place the CSV at "
                    f"{DATASET_PATH} and restart the API."
        )

    grouped = (
        _phones_df.groupby("Launched Year")["price_inr"]
        .agg(["mean", "count"])
        .reset_index()
        .sort_values("Launched Year")
    )

    return {
        "success": True,
        "currency": "INR",
        "trend": [
            {
                "year": int(row["Launched Year"]),
                "avg_price": round(float(row["mean"]), 2),
                "count": int(row["count"]),
            }
            for _, row in grouped.iterrows()
        ],
    }


# ============================================================
# NEW: REAL PHONE LIST (Feature 5)
#
# Returns real phones with their exact specs (matching the /predict
# schema exactly) and their real Indian launch price, so the frontend can
# call the EXISTING /predict endpoint with real specs and compare the
# result to the real price — no separate prediction logic duplicated here.
# ============================================================

@app.get("/phones")
def list_phones():
    if _phones_df is None:
        raise HTTPException(
            status_code=503,
            detail="Phone dataset isn't loaded on the server. Place the CSV at "
                    f"{DATASET_PATH} and restart the API."
        )

    phones = []
    for idx, row in _phones_df.iterrows():
        phones.append({
            "id": int(idx),
            "label": f'{row["Company Name"]} {row["Model Name"]} ({int(row["Launched Year"])})',
            "company_name": row["Company Name"],
            "processor": row["Processor"],
            "mobile_weight": row["weight_g"],
            "ram": row["ram_gb"],
            "front_camera": row["front_mp"],
            "back_camera": row["back_mp"],
            "battery_capacity": row["battery_mah"],
            "screen_size": row["screen_in"],
            "launched_year": int(row["Launched Year"]),
            "actual_price_inr": row["price_inr"],
        })

    return {"success": True, "count": len(phones), "phones": phones}


# ============================================================
# MODEL INFORMATION
# ============================================================

@app.get("/model-info")
def model_info():

    return {
        "model": "Tuned XGBoost Regressor",
        "task": "Regression",
        "target": "Launched Price (India)",
        "features": [
            "Company Name",
            "Mobile Weight",
            "RAM",
            "Front Camera",
            "Back Camera",
            "Processor",
            "Battery Capacity",
            "Screen Size",
            "Launched Year"
        ],
        "metrics": {
            "MAE": 6852.60,
            "RMSE": 11031.63,
            "R2": 0.9208
        },
        "currency": "INR"
    }
