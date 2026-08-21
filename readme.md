# 📱 Phonix.AI — Smartphone Price Prediction

**Phonix.AI** is an end-to-end Machine Learning web application that predicts the expected price of a smartphone based on its specifications and market-related features.

The project combines **Machine Learning, FastAPI, and a modern web frontend** to provide users with an interactive platform where they can enter smartphone specifications and receive an estimated price instantly.

> 🚀 **Phonix.AI — Predict. Analyze. Understand Smartphone Prices.**

---

## ✨ Features

* 📱 **Smartphone Price Prediction**

  * Predicts smartphone prices based on device specifications.
* 🤖 **Machine Learning Model**

  * Trained using real-world smartphone specification and pricing data.
  * Uses **XGBoost Regression** for prediction.
* ⚡ **FastAPI Backend**

  * Provides a REST API for serving the trained ML model.
  * Handles prediction requests efficiently.
* 🌐 **Interactive Web Interface**

  * User-friendly frontend built using HTML, CSS, and JavaScript.
  * Allows users to enter smartphone specifications without interacting directly with the ML model.
* 📊 **Data Visualization**

  * Displays useful visual insights and prediction-related information.
* 🔄 **End-to-End ML Pipeline**

  * Data preprocessing
  * Feature engineering
  * Model training
  * Hyperparameter tuning
  * Model serialization
  * API integration
  * Frontend integration
* 🧩 **Modular Architecture**

  * Separates the frontend, backend, model, and training components for easier maintenance.

---

# 🧠 How Phonix.AI Works

The application follows a simple machine-learning prediction pipeline:

```text
                ┌──────────────────────┐
                │       User           │
                │ Smartphone Specs     │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │     Web Frontend     │
                │ HTML + CSS + JS      │
                └──────────┬───────────┘
                           │
                           │ HTTP POST
                           ▼
                ┌──────────────────────┐
                │    FastAPI Backend   │
                │      /predict        │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Preprocessing      │
                │ Encoding + Features  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   XGBoost Model      │
                │   phone_price_model   │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Predicted Price      │
                │      ₹ XX,XXX        │
                └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* XGBoost
* Joblib
* Matplotlib
* Seaborn
* SHAP

## Backend

* FastAPI
* Uvicorn
* Pydantic
* Python

## Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js

## Development & Deployment

* Git
* GitHub
* VS Code
* REST API
* Render
* Vercel

---

# 📂 Project Structure

```text
Phonix.AI/
│
├── backend/
│   ├── model/
│   │   ├── preprocessor.pkl
│   │   └── xgb_model.json
│   │
│   ├── __init__.py
│   ├── main.py
│   └── requirements.txt
│
├── data/
│   └── Mobiles Dataset (2025).csv
│
├── frontend/
│   ├── chart.umd.js
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── notebooks/
│   └── phone.ipynb
│
├── .gitignore
├── README.md
└── venv312/          # Local virtual environment (not pushed to GitHub)
```
---

# 📊 Dataset

The model is trained using a smartphone dataset containing information about different mobile devices and their specifications.

Typical features include:

* Company / Brand
* Model Name
* Processor
* RAM
* Internal Storage
* Screen Size
* Camera Specifications
* Battery Capacity
* 5G Support
* Operating System
* Launch Information
* Launch Price

The target variable used for prediction is:

```text
Launched Price (India)
```

The dataset undergoes preprocessing before being provided to the machine-learning model.

---

# ⚙️ Machine Learning Pipeline

The machine-learning workflow consists of several stages.

### 1. Data Collection

A smartphone dataset containing device specifications and corresponding prices is collected.

### 2. Data Cleaning

The dataset is inspected for:

* Missing values
* Duplicate records
* Incorrect data types
* Inconsistent categorical values
* Unnecessary columns

### 3. Feature Engineering

Relevant smartphone specifications are transformed into a format suitable for machine learning.

Categorical variables such as:

```text
Company Name
Model Name
Processor
```

are encoded using appropriate preprocessing techniques.

### 4. Train-Test Split

The dataset is divided into training and testing subsets.

```text
Training Data → Model Learning
Testing Data  → Model Evaluation
```

### 5. Model Training

Several regression algorithms can be evaluated during experimentation.

The final implementation uses:

**XGBoost Regressor**

because it provides strong performance on structured/tabular datasets.

### 6. Hyperparameter Tuning

The XGBoost model is tuned to improve predictive performance by experimenting with parameters such as:

* Number of estimators
* Maximum tree depth
* Learning rate
* Subsample ratio
* Column sampling
* Minimum child weight

### 7. Model Evaluation

The model can be evaluated using regression metrics such as:

* R² Score
* Mean Absolute Error (MAE)
* Mean Squared Error (MSE)
* Root Mean Squared Error (RMSE)

### 8. Model Serialization

After training, the final preprocessing pipeline and model are saved using Joblib.

```text
phone_price_model.pkl
```

The saved model is then loaded by the FastAPI backend.

---

# 🤖 Why XGBoost?

XGBoost was selected because smartphone price prediction is primarily a **tabular regression problem** involving both numerical and categorical features.

XGBoost provides:

* Excellent performance on structured data
* Ability to model nonlinear relationships
* Strong generalization capabilities
* Support for feature importance analysis
* Efficient training
* Extensive hyperparameter optimization options

---

# 🔍 Model Explainability

Phonix.AI can also be analyzed using **SHAP (SHapley Additive exPlanations)**.

SHAP helps understand how individual features influence the model's predictions.

For example, features such as:

```text
RAM
Storage
Processor
Camera
Battery
Brand
```

may contribute differently to the predicted smartphone price.

This makes the model more interpretable rather than treating it as a complete black box.

---

# 🚀 Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Phonix.AI.git
```

Move into the project directory:

```bash
cd Phonix.AI
```

---

# 🐍 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

---

## 📦 Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` is not available, install the required packages manually:

```bash
pip install fastapi uvicorn pandas numpy scikit-learn xgboost joblib pydantic
```

---

# ▶️ Start the FastAPI Server

From the backend directory:

```bash
uvicorn main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI also provides automatic API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

This opens the interactive **Swagger UI** where you can test the prediction API.

---

# 🔌 API Endpoint

## `POST /predict`

The `/predict` endpoint accepts smartphone specifications and returns the predicted price.

### Example Request

```json
{
  "company_name": "Apple",
  "model_name": "iPhone 15",
  "processor": "Apple A16 Bionic",
  "ram": 8,
  "storage": 128,
  "screen_size": 6.1,
  "battery": 3349,
  "camera": 48
}
```

> The exact fields must match the `PhoneInput` schema implemented in `main.py`.

### Example Response

```json
{
  "predicted_price": 81000
}
```

---

# 🌐 Frontend Setup

The frontend is built using standard web technologies:

```text
HTML
CSS
JavaScript
```

If the frontend is served using a local development server, configure the API URL in `script.js`:

```javascript
const API_URL = "http://127.0.0.1:8000";
```

Then open the frontend using a local development server such as VS Code Live Server.

The frontend sends the smartphone information to:

```text
POST /predict
```

and displays the returned prediction to the user.

---

# 📈 Example Workflow

A typical prediction process looks like this:

```text
User selects smartphone specifications
                ↓
Frontend validates input
                ↓
Frontend sends JSON request
                ↓
FastAPI receives request
                ↓
Input is converted into model-compatible features
                ↓
Saved XGBoost model generates prediction
                ↓
FastAPI returns predicted price
                ↓
Frontend displays estimated price
```

---

# 🧪 Model Evaluation

During experimentation, multiple regression algorithms can be compared before selecting the final model.

Example models include:

```text
Linear Regression
Random Forest
Gradient Boosting
XGBoost
```

The final model is selected based on its performance on unseen test data.

Recommended evaluation metrics:

| Metric | Purpose                             |
| ------ | ----------------------------------- |
| MAE    | Average absolute prediction error   |
| MSE    | Penalizes larger errors             |
| RMSE   | Error measure in the target's units |
| R²     | Measures explained variance         |

---

# 📌 Important Considerations

Phonix.AI provides an **estimated price**, not an official market price.

Actual smartphone prices can vary because of:

* Discounts
* Offers
* Regional pricing
* Taxes
* Stock availability
* New smartphone releases
* Market demand
* Seasonal sales
* Exchange-rate fluctuations

Therefore, predictions should be treated as an ML-based estimate rather than a guaranteed selling price.

---

# 🔮 Future Improvements

Several improvements can be added to make Phonix.AI more advanced.

### 📊 Real-Time Market Data

Integrate smartphone price APIs or regularly updated datasets to account for current market prices.

### 📅 Price Trend Prediction

Instead of predicting only the launch price, the system could estimate how a smartphone's price changes over time.

```text
Launch
   ↓
6 Months
   ↓
1 Year
   ↓
2 Years
```

### 🌦️ External Market Features

Additional factors could be incorporated, such as:

* Inflation
* Exchange rates
* Seasonal discounts
* Market demand
* Brand popularity
* Release cycles

### 🤖 Model Improvements

Experiment with:

* CatBoost
* LightGBM
* Ensemble models
* Neural networks

### 📱 Smartphone Recommendation System

The application could recommend the best smartphone based on:

```text
Budget
Performance
Camera
Battery
Gaming
Storage
```

### 🔍 Advanced Explainability

Add an interactive SHAP dashboard showing exactly why the model predicted a particular price.

### ☁️ Cloud Deployment

Deploy the complete application using:

```text
Frontend → Vercel
Backend  → Render
```

---

# 🔐 Security & Production Considerations

Before using the application in production, additional measures can be implemented:

* Input validation
* Rate limiting
* API authentication
* HTTPS
* Environment variables
* CORS restrictions
* Request logging
* Error handling
* Model versioning

---

# 🎯 Learning Outcomes

Building Phonix.AI provides practical experience with:

* Machine Learning
* Regression problems
* Data preprocessing
* Feature engineering
* Model selection
* Hyperparameter tuning
* XGBoost
* Model evaluation
* SHAP explainability
* Model serialization
* FastAPI
* REST APIs
* Frontend-backend integration
* Git/GitHub
* ML deployment

The project demonstrates how a machine-learning model can be transformed from a **Jupyter Notebook experiment into a complete web application**.

---

# 🏗️ Project Architecture

```text
                    PHONIX.AI
                        │
          ┌─────────────┴─────────────┐
          │                           │
      Frontend                    Backend
          │                           │
   HTML/CSS/JS                    FastAPI
          │                           │
          │                       Pydantic
          │                           │
          └────────── API ─────────────┘
                                      │
                                      ▼
                              Preprocessing
                                      │
                                      ▼
                              XGBoost Model
                                      │
                                      ▼
                              Price Prediction
```

---

# 💡 Project Highlights

### End-to-End Machine Learning

Phonix.AI goes beyond simply training an ML model. It demonstrates the complete workflow:

```text
Data → Preprocessing → Training → Evaluation
       → Model Saving → API → Frontend → Prediction
```

### Production-Oriented Backend

The trained model is exposed through a REST API using FastAPI, allowing the ML model to be consumed by a separate frontend application.

### Interactive User Experience

Users do not need any knowledge of Python or machine learning. They simply provide smartphone specifications and receive a prediction through the web interface.

---

# 👨‍💻 Author

**Ariba Razi**

B.Tech Computer Science & Engineering

Interested in:

* Machine Learning & AI
* Backend Development
* Data Science
* Cloud & Deployment
* Problem Solving
* Open Source

---

# ⭐ Support

If you found this project interesting or useful, consider giving the repository a ⭐ on GitHub!

---

## 📄 License

This project is intended primarily for educational and portfolio purposes.

You may modify and extend the project for learning and experimentation.
