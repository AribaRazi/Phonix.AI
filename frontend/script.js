// ============================================================
// CONFIG
// ============================================================
// Single source of truth for the FastAPI backend location.
// Update this if your backend runs somewhere other than localhost.
const API_BASE_URL = "http://127.0.0.1:8000";

// ============================================================
// TRAINED CATEGORIES
// ============================================================
// Exact values the model's OneHotEncoder was fit on. Anything typed that
// doesn't match one of these exactly gets encoded as "unknown" (all
// zeros) by the backend preprocessor — so these power both the
// autocomplete dropdowns and the live validation warning.
const COMPANY_OPTIONS = [
  "Apple", "Samsung", "OnePlus", "Vivo", "iQOO", "Oppo", "Realme",
  "Xiaomi", "Lenovo", "Motorola", "Huawei", "Nokia", "Sony",
  "Google", "Tecno", "Infinix", "Honor", "POCO", "Poco",
];

const PROCESSOR_OPTIONS = [
  "A17 Bionic", "A17 Pro", "A16 Bionic", "A15 Bionic", "A14 Bionic",
  "A13 Bionic", "A11 Bionic", "A12 Bionic", "A12Z Bionic",
  "Exynos 2400", "Snapdragon 8 Gen 2", "Exynos 2200",
  "Snapdragon 8 Gen 1", "Exynos 1380", "MediaTek Dimensity 1080",
  "MediaTek Helio G99", "Exynos 850", "Exynos 1280",
  "MediaTek Helio P35", "Exynos 990", "Exynos 9825",
  "Snapdragon 450", "Exynos 7870", "Snapdragon 425", "Exynos 7570",
  "Snapdragon 653", "Snapdragon 625", "Snapdragon 617",
  "Snapdragon 888", "Snapdragon 695", "Unisoc T618",
  "MediaTek Helio P22T", "Snapdragon 778G", "Exynos 9810",
  "Spreadtrum SC8830", "Qualcomm MSM8916", "Snapdragon 8 Gen 3",
  "MediaTek Dimensity 9000", "Snapdragon 782G",
  "MediaTek Dimensity 6020", "Snapdragon 8+ Gen 1",
  "MediaTek Dimensity 1300", "MediaTek Dimensity 1200-AI",
  "Snapdragon 480", "Qualcomm Snapdragon 460", "Snapdragon 865",
  "Snapdragon 870", "MediaTek Dimensity 900",
  "MediaTek Dimensity 1200", "Snapdragon 765G", "Snapdragon 750G",
  "Qualcomm Snapdragon 690", "Snapdragon 855", "Snapdragon 845",
  "Snapdragon 835", "MediaTek Dimensity 8100", "Dimensity 9400",
  "Dimensity 1200", "Dimensity 900", "Dimensity 1100",
  "Snapdragon 710", "Snapdragon 626", "MediaTek Helio P22",
  "Snapdragon 615", "Snapdragon 439", "Snapdragon 652",
  "MediaTek MT6592", "Snapdragon 430", "Qualcomm Snapdragon 712",
  "Qualcomm Snapdragon 675", "MediaTek Helio P65",
  "Qualcomm Snapdragon 439", "MediaTek Helio P70",
  "Qualcomm Snapdragon 710", "Qualcomm Snapdragon 660",
  "MediaTek Helio G96", "MediaTek Helio G80",
  "Qualcomm Snapdragon 870", "Qualcomm Snapdragon 765G",
  "MediaTek Dimensity 700", "Qualcomm Snapdragon 695",
  "Qualcomm Snapdragon 855", "MediaTek Dimensity 8200",
  "MediaTek Dimensity 9200", "MediaTek Dimensity 920",
  "MediaTek Helio G100", "MediaTek Dimensity 8350", "Snapdragon 685",
  "MediaTek Dimensity 7050", "Dimensity 7300", "Dimensity 6300",
  "Snapdragon 6s 4G Gen 1", "Snapdragon 680 4G",
  "Snapdragon 7 Gen 3", "Dimensity 7050", "Dimensity 8350",
  "Dimensity 9300", "Dimensity 9200", "Dimensity 9000+",
  "Dimensity 8100", "Dimensity 1300", "Dimensity 1000+",
  "Dimensity 1000L", "MediaTek Dimensity 810",
  "Qualcomm Snapdragon 480", "MediaTek Dimensity 720",
  "Qualcomm Snapdragon 6s Gen 1", "MediaTek Dimensity 8000-Max",
  "Qualcomm Snapdragon 768G", "Qualcomm Snapdragon 782G",
  "Qualcomm Snapdragon 8 Elite", "Qualcomm Snapdragon 8s Gen 3",
  "Qualcomm Snapdragon 7 Plus Gen 3", "Qualcomm Snapdragon 7s Gen 3",
  "MediaTek Dimensity 7300 Energy", "Qualcomm Snapdragon 7s Gen 2",
  "MediaTek Dimensity 7200", "MediaTek Dimensity 6100+",
  "Qualcomm Snapdragon 7+ Gen 2", "Qualcomm Snapdragon 7+ Gen 3",
  "Qualcomm Snapdragon 7s Gen 1", "MediaTek Helio G88",
  "MediaTek Helio G85", "Unisoc T612", "Qualcomm Snapdragon 680",
  "Qualcomm Snapdragon 8 Gen 2", "Unisoc T616", "Snapdragon 8 Elite",
  "Dimensity 9300+", "Dimensity 8300-Ultra", "Snapdragon 7s Gen 3",
  "MediaTek Dimensity 7300-Ultra", "Qualcomm Snapdragon 732G",
  "MediaTek Dimensity 7025-Ultra", "Unisoc T700", "Snapdragon 662",
  "Unisoc SC9863A", "Snapdragon 460", "Snapdragon 632", "Helio P22",
  "Snapdragon 7 Gen 1", "Exynos 9609", "MediaTek Helio G25",
  "Snapdragon 6 Gen 3", "MediaTek Dimensity 7300",
  "MediaTek Dimensity 7025", "Unisoc T760", "Snapdragon 6s Gen 3",
  "Snapdragon 7s Gen 2", "Unisoc T606", "Snapdragon 6 Gen 1",
  "Snapdragon 888+ 5G", "Snapdragon 695 5G", "Snapdragon 480+ 5G",
  "MediaTek Helio G37", "Snapdragon 888 4G", "Kirin 990E 5G",
  "Kirin 9000 5G", "Snapdragon 778G 4G", "Snapdragon 8+ Gen 1 4G",
  "Kirin 9000S", "Kirin 9010", "Snapdragon 480+", "MediaTek G35",
  "Snapdragon 670", "Snapdragon 730G", "Google Tensor",
  "Google Tensor G2", "Google Tensor G3", "Google Tensor G4",
  "MediaTek Helio A22", "MediaTek G99", "Unisoc SC9832E",
  "MediaTek Dimensity 9200+", "MediaTek Dimensity 8050",
  "Qualcomm Snapdragon 778G", "MediaTek Dimensity 8020",
  "Unisoc T610", "MediaTek Helio G70", "MediaTek Helio A25",
  "MediaTek Helio G35", "MediaTek Helio A20", "MediaTek Helio G90T",
  "Kirin 710F", "Kirin 985 5G", "Kirin 990 5G", "Kirin 820 5G",
  "MediaTek Dimensity 800", "Kirin 710A", "MediaTek Dimensity 1000+",
  "MediaTek Dimensity 800U", "Qualcomm Snapdragon 888",
  "Qualcomm Snapdragon 888+", "Qualcomm Snapdragon 778G+",
  "MediaTek MT6762G Helio G25", "Qualcomm Snapdragon 8 Gen 1",
  "MediaTek Dimensity 8000", "Qualcomm Snapdragon 8+ Gen 1",
  "Qualcomm Snapdragon 6 Gen 1", "MediaTek Helio G36",
  "Qualcomm Snapdragon 8 Gen 3", "Qualcomm Snapdragon 7 Gen 1",
  "Qualcomm Snapdragon 662", "MediaTek MT8768T",
  "MediaTek Dimensity 1300T", "MediaTek MT8786",
  "Qualcomm Snapdragon 685", "Snapdragon 720G", "Snapdragon 732G",
  "Snapdragon 860", "MediaTek Dimensity 1100", "MediaTek Helio G95",
  "Snapdragon 7+ Gen 2", "Snapdragon 4 Gen 1",
  "MediaTek Dimensity 8300", "Snapdragon 8+ Gen 2",
  "MediaTek Dimensity 8400",
];

// ============================================================
// SHARED STATE
// ============================================================
let errorBarChartInstance = null;
let r2ChartInstance = null;
let specRadarChartInstance = null;
let priceHistoryChartInstance = null;
let priceTrendChartInstance = null;
let latestMetrics = null;
let phoneMatchRequestId = 0;
let validationPhones = [];
let validationChartInstance = null;

// Predictions made this session — real /predict responses only, used to
// plot "your prediction history". Never seeded with invented data.
let predictionHistory = [];

// Reasonable display ranges used ONLY to scale the "your spec profile"
// radar chart axes (0-100), and to show a real unit in tooltips. These
// are chart bounds, not model or market data.
const SPEC_RANGES = {
  ram: { min: 1, max: 16, label: "RAM", unit: "GB" },
  mobile_weight: { min: 120, max: 260, label: "Weight", unit: "g", invert: true },
  front_camera: { min: 0, max: 50, label: "Front Cam", unit: "MP" },
  back_camera: { min: 0, max: 200, label: "Back Cam", unit: "MP" },
  battery_capacity: { min: 1500, max: 7000, label: "Battery", unit: "mAh" },
  screen_size: { min: 4.5, max: 7.5, label: "Screen", unit: "in" },
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initSpecDropdowns();
  loadModelInfo();
  loadPriceTrends();
  loadValidationPhones();

  document.getElementById("predictForm").addEventListener("submit", handlePredict);
  document.getElementById("retryBtn").addEventListener("click", () => showResultState("idle"));
  document.getElementById("clearHistoryBtn").addEventListener("click", clearPredictionHistory);
  document.getElementById("validateBtn").addEventListener("click", compareSelectedPhone);

  renderPriceHistoryChart();
});

// ============================================================
// SEARCHABLE DROPDOWNS — Company / Processor
// ============================================================
function initSpecDropdowns() {
  populateDatalist("companyOptions", COMPANY_OPTIONS);
  populateDatalist("processorOptions", PROCESSOR_OPTIONS);

  wireCategoryValidation("company_name", "companyWarning", COMPANY_OPTIONS);
  wireCategoryValidation("processor", "processorWarning", PROCESSOR_OPTIONS);
}

function populateDatalist(datalistId, options) {
  const datalist = document.getElementById(datalistId);
  if (!datalist) return;
  const fragment = document.createDocumentFragment();
  options.forEach((value) => {
    const opt = document.createElement("option");
    opt.value = value;
    fragment.appendChild(opt);
  });
  datalist.appendChild(fragment);
}

function wireCategoryValidation(inputId, warningId, options) {
  const input = document.getElementById(inputId);
  const warning = document.getElementById(warningId);
  if (!input || !warning) return;

  const knownValues = new Set(options);

  const check = () => {
    const value = input.value.trim();
    const isEmpty = value.length === 0;
    const isKnown = knownValues.has(value);
    warning.classList.toggle("hidden", isEmpty || isKnown);
  };

  input.addEventListener("input", check);
  input.addEventListener("blur", check);
}

// ============================================================
// THEME (dark / light)
// ============================================================
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const iconMoon = document.getElementById("iconMoon");
  const iconSun = document.getElementById("iconSun");

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = safeGetStoredTheme();
  const initial = stored || (prefersDark ? "dark" : "light");

  applyTheme(initial);

  toggle.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    safeSetStoredTheme(next);
    // Chart.js bakes colors in at draw time, so re-render with fresh theme colors.
    if (latestMetrics) renderModelInfo(latestMetrics);
    if (specRadarChartInstance) redrawRadarFromLastPayload();
    renderPriceHistoryChart();
  });

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    iconMoon.classList.toggle("hidden", theme === "dark");
    iconSun.classList.toggle("hidden", theme !== "dark");
  }
}

function safeGetStoredTheme() {
  try {
    return localStorage.getItem("phoneprice-theme");
  } catch (e) {
    return null;
  }
}

function safeSetStoredTheme(theme) {
  try {
    localStorage.setItem("phoneprice-theme", theme);
  } catch (e) {
    // Storage unavailable (private browsing, etc.) — theme just won't persist.
  }
}

function cssVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

// ============================================================
// NAV — active pill on scroll
// ============================================================
function initNav() {
  const links = Array.from(document.querySelectorAll(".pill-link"));
  const sections = links
    .map((link) => document.getElementById(link.dataset.target))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = links.find((l) => l.dataset.target === entry.target.id);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

// ============================================================
// MODEL INFO
// ============================================================
async function loadModelInfo() {
  // Fallback values match the metrics reported by main.py's /model-info
  // route, used only if the live backend can't be reached.
  const fallback = { MAE: 6852.60, RMSE: 11031.63, R2: 0.9208 };

  let metrics = fallback;

  try {
    const res = await fetch(`${API_BASE_URL}/model-info`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.metrics) metrics = data.metrics;
    }
  } catch (err) {
    // Keep fallback silently — the UI still renders fully.
  }

  latestMetrics = metrics;
  renderModelInfo(metrics);
}

function renderModelInfo(metrics) {
  const fmtINR = (n) => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

  document.getElementById("statAccuracy").textContent = (metrics.R2 * 100).toFixed(1) + "%";
  document.getElementById("statMAE").textContent = fmtINR(metrics.MAE);
  document.getElementById("r2GaugeValue").textContent = metrics.R2.toFixed(3);
  document.getElementById("maeInline").textContent = fmtINR(metrics.MAE);
  document.getElementById("r2Inline").textContent = "An R² of " + metrics.R2.toFixed(2);

  renderErrorBarChart(metrics);
  renderR2Gauge(metrics.R2);
}

function isChartAvailable() {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js failed to load — charts will be skipped this session.");
    return false;
  }
  return true;
}

function renderErrorBarChart(metrics) {
  const canvas = document.getElementById("errorBarChart");
  if (!isChartAvailable()) return showChartFallback(canvas);
  if (errorBarChartInstance) errorBarChartInstance.destroy();

  const textDim = cssVar("--text-dim") || "#9195A8";
  const gridLine = cssVar("--grid-line") || "rgba(150,150,180,0.12)";

  errorBarChartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Mean Absolute Error", "Root Mean Squared Error"],
      datasets: [{
        data: [metrics.MAE, metrics.RMSE],
        backgroundColor: [cssVar("--accent-2") || "#22D3EE", cssVar("--accent-1") || "#7C5CFC"],
        borderRadius: 8,
        barThickness: 54,
      }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => "₹" + Number(ctx.raw).toLocaleString("en-IN") + " average deviation",
          },
        },
      },
      scales: {
        x: {
          ticks: { color: textDim, callback: (v) => "₹" + v.toLocaleString("en-IN") },
          grid: { color: gridLine },
        },
        y: {
          ticks: { color: cssVar("--text") || "#1a1a1a", font: { family: "JetBrains Mono", size: 12 } },
          grid: { display: false },
        },
      },
    },
  });
}

function renderR2Gauge(r2) {
  const canvas = document.getElementById("r2Chart");
  if (!isChartAvailable()) return showChartFallback(canvas);
  if (r2ChartInstance) r2ChartInstance.destroy();

  const value = Math.max(0, Math.min(1, r2));

  r2ChartInstance = new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [value, 1 - value],
        backgroundColor: [cssVar("--accent-1") || "#7C5CFC", cssVar("--grid-line") || "rgba(150,150,180,0.12)"],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: false,
      cutout: "78%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              ctx.dataIndex === 0
                ? `Explained: ${(value * 100).toFixed(1)}%`
                : `Unexplained: ${((1 - value) * 100).toFixed(1)}%`,
          },
        },
      },
    },
  });
}

function showChartFallback(canvas) {
  if (!canvas || !canvas.parentElement) return;
  const note = document.createElement("p");
  note.className = "chart-card-hint";
  note.textContent = "Chart engine couldn't load — try refreshing the page.";
  canvas.replaceWith(note);
}

// ============================================================
// PREDICTION
// ============================================================
let lastPayload = null;

async function handlePredict(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = document.getElementById("submitBtnText");

  const payload = {
    company_name: form.company_name.value.trim(),
    mobile_weight: parseFloat(form.mobile_weight.value),
    ram: parseFloat(form.ram.value),
    front_camera: parseFloat(form.front_camera.value),
    back_camera: parseFloat(form.back_camera.value),
    processor: form.processor.value.trim(),
    battery_capacity: parseFloat(form.battery_capacity.value),
    screen_size: parseFloat(form.screen_size.value),
    launched_year: parseInt(form.launched_year.value, 10),
  };

  showResultState("loading");
  submitBtn.disabled = true;
  submitBtnText.textContent = "Predicting…";

  try {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail || `Request failed with status ${res.status}`);
    if (!data.success) throw new Error(data.message || "Prediction was unsuccessful.");

    lastPayload = payload;
    predictionHistory.push({
      year: payload.launched_year,
      price: Number(data.predicted_price),
      label: `${payload.company_name || "Phone"} · ${payload.processor || ""}`.trim(),
    });
    renderPredictionResult(data, payload);
    renderPriceHistoryChart();
  } catch (err) {
    document.getElementById("errorMessage").textContent =
      err.message || "Couldn't reach the prediction API. Is the FastAPI backend running?";
    showResultState("error");
  } finally {
    submitBtn.disabled = false;
    submitBtnText.textContent = "Predict launch price";
  }
}

function renderPredictionResult(data, payload) {
  const priceFormatted = "₹" + Number(data.predicted_price).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

  document.getElementById("resultPrice").textContent = priceFormatted;
  document.getElementById("resultMessage").textContent = data.message || "Estimated Indian launch price";

  renderPlausibilityCheck(payload);
  checkPhoneMatch(payload);
  renderErrorRange(Number(data.predicted_price));
  renderSpecRadarChart(payload);
  fetchAndRenderExplanation(payload);
  showResultState("success");
}

// ============================================================
// FEATURE 1 — REAL-PHONE PLAUSIBILITY CHECK
// ============================================================
// This quick rule-based check flags unusual values. The separate
// checkPhoneMatch call below performs the authoritative dataset lookup.
function renderPlausibilityCheck(payload) {
  const banner = document.getElementById("plausibilityWarning");
  const flags = [];

  if (!COMPANY_OPTIONS.includes(payload.company_name)) flags.push("brand");
  if (!PROCESSOR_OPTIONS.includes(payload.processor)) flags.push("processor");

  Object.entries(SPEC_RANGES).forEach(([key, range]) => {
    const value = payload[key];
    // Allow some headroom beyond the "typical" display range before flagging —
    // the radar chart range is intentionally tight for readability, this
    // check is intentionally looser so normal phones don't trip it.
    const slack = (range.max - range.min) * 0.25;
    if (value < range.min - slack || value > range.max + slack) flags.push(key);
  });

  banner.classList.toggle("hidden", flags.length === 0);
}

// ============================================================
// FEATURE 1B — KNOWN PHONE OR HYPOTHETICAL CONFIGURATION
// ============================================================
async function checkPhoneMatch(payload) {
  const requestId = ++phoneMatchRequestId;
  const status = document.getElementById("phoneMatchStatus");
  const icon = document.getElementById("phoneMatchIcon");
  const text = document.getElementById("phoneMatchText");

  status.className = "phone-match-status";
  status.classList.remove("hidden");
  icon.textContent = "⌕";
  text.textContent = "Checking this specification against the launch dataset…";

  try {
    const res = await fetch(`${API_BASE_URL}/phone-match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.detail || "Phone matching is unavailable.");
    if (requestId !== phoneMatchRequestId) return;

    if (data.is_known_phone) {
      const match = data.matches[0];
      const actual = Number(match.actual_price_inr).toLocaleString("en-IN", { maximumFractionDigits: 0 });
      const variantNote = data.match_count > 1 ? ` ${data.match_count} launched variants share these model inputs.` : "";
      status.classList.add("match-known");
      icon.textContent = "✓";
      text.textContent = `Known launched configuration: ${match.label}. A recorded Indian launch price is ₹${actual}.${variantNote}`;
    } else {
      status.classList.add("match-hypothetical");
      icon.textContent = "✦";
      text.textContent = "Hypothetical configuration — this exact combination of specifications is not in the launch dataset. The estimate is based on patterns learned from similar phones, not a confirmed launch.";
    }
  } catch (error) {
    if (requestId !== phoneMatchRequestId) return;
    // Avoid labelling a phone hypothetical when the dataset service is down.
    status.classList.add("hidden");
  }
}

// ============================================================
// FEATURE 2 — APPROXIMATE ERROR RANGE
// ============================================================
function renderErrorRange(predictedPrice) {
  const mae = latestMetrics ? latestMetrics.MAE : 6852.60;
  const low = Math.max(0, predictedPrice - mae);
  const high = predictedPrice + mae;
  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  document.getElementById("rangeValue").textContent = `${fmt(low)} – ${fmt(high)}`;
  document.getElementById("rangeMae").textContent = fmt(mae);
}

// ============================================================
// FEATURE 3 — WHY THIS PREDICTION? (SHAP feature contributions)
// ============================================================
// Calls a NEW backend endpoint, POST /explain, added alongside — not
// instead of — /predict. If your backend doesn't have this endpoint yet
// (see the main.py additions), this section fails gracefully and the
// price prediction above is completely unaffected.
let explainChartInstance = null;

async function fetchAndRenderExplanation(payload) {
  const loading = document.getElementById("explainLoading");
  const unavailable = document.getElementById("explainUnavailable");
  const chartBox = document.getElementById("explainChartBox");
  const explainerText = document.getElementById("explainExplainerText");

  loading.classList.remove("hidden");
  unavailable.classList.add("hidden");
  chartBox.classList.add("hidden");
  explainerText.classList.add("hidden");

  try {
    const res = await fetch(`${API_BASE_URL}/explain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Explain endpoint returned an error");
    const data = await res.json();
    if (!data.success || !Array.isArray(data.contributions)) throw new Error("Malformed explanation response");

    renderExplainChart(data.contributions);
    chartBox.classList.remove("hidden");
    explainerText.classList.remove("hidden");
  } catch (err) {
    unavailable.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

function renderExplainChart(contributions) {
  const canvas = document.getElementById("explainChart");
  if (!isChartAvailable()) return showChartFallback(canvas);
  if (explainChartInstance) explainChartInstance.destroy();

  const top = contributions.slice(0, 7);
  const accent1 = cssVar("--accent-1") || "#7C5CFC";
  const accent2 = cssVar("--accent-2") || "#22D3EE";
  const textDim = cssVar("--text-dim") || "#9195A8";
  const gridLine = cssVar("--grid-line") || "rgba(150,150,180,0.12)";

  explainChartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: top.map((c) => c.feature),
      datasets: [{
        data: top.map((c) => c.impact),
        backgroundColor: top.map((c) => (c.impact >= 0 ? accent2 : accent1)),
        borderRadius: 6,
        barThickness: 20,
      }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const sign = ctx.raw >= 0 ? "+" : "−";
              return `${sign}₹${Math.abs(ctx.raw).toLocaleString("en-IN")}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: textDim, callback: (v) => "₹" + v.toLocaleString("en-IN") },
          grid: { color: gridLine },
        },
        y: {
          ticks: { color: cssVar("--text") || "#1a1a1a", font: { family: "JetBrains Mono", size: 11 } },
          grid: { display: false },
        },
      },
    },
  });
}

function redrawRadarFromLastPayload() {
  if (lastPayload) renderSpecRadarChart(lastPayload);
}

function renderSpecRadarChart(payload) {
  const canvas = document.getElementById("specRadarChart");
  if (!isChartAvailable()) return showChartFallback(canvas);
  if (specRadarChartInstance) specRadarChartInstance.destroy();

  const keys = Object.keys(SPEC_RANGES);
  const labels = keys.map((k) => SPEC_RANGES[k].label);

  const values = keys.map((k) => {
    const { min, max, invert } = SPEC_RANGES[k];
    let pct = ((payload[k] - min) / (max - min)) * 100;
    pct = Math.max(0, Math.min(100, pct));
    return invert ? 100 - pct : pct;
  });

  const accent1 = cssVar("--accent-1") || "#7C5CFC";
  const textFaint = cssVar("--text-faint") || "#8B8DA3";
  const gridLine = cssVar("--grid-line") || "rgba(150,150,180,0.12)";

  specRadarChartInstance = new Chart(canvas, {
    type: "radar",
    data: {
      labels,
      datasets: [{
        label: "Submitted spec (normalized)",
        data: values,
        backgroundColor: hexToRgba(accent1, 0.18),
        borderColor: accent1,
        pointBackgroundColor: accent1,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => {
              const key = keys[ctx.dataIndex];
              const { unit } = SPEC_RANGES[key];
              return `${payload[key]} ${unit} (${ctx.raw.toFixed(0)}% of typical range)`;
            },
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: false },
          grid: { color: gridLine },
          angleLines: { color: gridLine },
          pointLabels: { color: textFaint, font: { family: "JetBrains Mono", size: 11 } },
        },
      },
    },
  });
}

// ============================================================
// PREDICTION HISTORY — built only from real /predict responses
// made during this browser session. Never seeded with invented
// or fetched "historical" market data.
// ============================================================
function renderPriceHistoryChart() {
  const box = document.getElementById("historyChartBox");
  const emptyState = document.getElementById("historyEmptyState");
  const explainer = document.getElementById("historyExplainer");
  const canvas = document.getElementById("priceHistoryChart");

  if (predictionHistory.length === 0) {
    box.classList.add("hidden");
    explainer.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  box.classList.remove("hidden");
  explainer.classList.remove("hidden");
  emptyState.classList.add("hidden");

  if (!isChartAvailable()) return showChartFallback(canvas);
  if (priceHistoryChartInstance) priceHistoryChartInstance.destroy();

  // Sort by launch year so the line reads left-to-right sensibly.
  const sorted = [...predictionHistory].sort((a, b) => a.year - b.year);

  const accent2 = cssVar("--accent-2") || "#22D3EE";
  const textDim = cssVar("--text-dim") || "#9195A8";
  const gridLine = cssVar("--grid-line") || "rgba(150,150,180,0.12)";

  priceHistoryChartInstance = new Chart(canvas, {
    type: "line",
    data: {
      labels: sorted.map((p) => p.year),
      datasets: [{
        label: "Predicted launch price",
        data: sorted.map((p) => p.price),
        borderColor: accent2,
        backgroundColor: hexToRgba(accent2, 0.15),
        pointBackgroundColor: accent2,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => `Launched ${items[0].label}`,
            label: (ctx) => {
              const point = sorted[ctx.dataIndex];
              return [`₹${Number(point.price).toLocaleString("en-IN")}`, point.label].filter(Boolean);
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: textDim, font: { family: "JetBrains Mono", size: 11 } },
          grid: { color: gridLine },
        },
        y: {
          ticks: { color: textDim, callback: (v) => "₹" + v.toLocaleString("en-IN") },
          grid: { color: gridLine },
        },
      },
    },
  });
}

function clearPredictionHistory() {
  predictionHistory = [];
  if (priceHistoryChartInstance) {
    priceHistoryChartInstance.destroy();
    priceHistoryChartInstance = null;
  }
  renderPriceHistoryChart();
}

// ============================================================
// HISTORICAL PRICE TRENDS — real dataset averages from /price-trends
// ============================================================
async function loadPriceTrends() {
  const box = document.getElementById("trendChartBox");
  const explainer = document.getElementById("trendExplainer");
  const unavailable = document.getElementById("trendUnavailable");
  const canvas = document.getElementById("priceTrendChart");

  try {
    const res = await fetch(`${API_BASE_URL}/price-trends`);
    const data = await res.json();

    if (!res.ok || !data.success || !Array.isArray(data.trend) || data.trend.length === 0) {
      throw new Error(data.detail || "Historical price data is unavailable.");
    }

    const trend = data.trend
      .map((item) => ({
        year: Number(item.year),
        avgPrice: Number(item.avg_price),
        count: Number(item.count),
      }))
      .filter((item) => Number.isFinite(item.year) && Number.isFinite(item.avgPrice) && Number.isFinite(item.count))
      .sort((a, b) => a.year - b.year);

    if (trend.length === 0) throw new Error("Historical price data contains no valid yearly values.");

    box.classList.remove("hidden");
    explainer.classList.remove("hidden");
    unavailable.classList.add("hidden");

    if (!isChartAvailable()) return showChartFallback(canvas);
    if (priceTrendChartInstance) priceTrendChartInstance.destroy();

    const accent = cssVar("--accent") || "#7C5CFC";
    const textDim = cssVar("--text-dim") || "#9195A8";
    const gridLine = cssVar("--grid-line") || "rgba(150,150,180,0.12)";

    priceTrendChartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: trend.map((item) => item.year),
        datasets: [{
          label: "Average Indian launch price",
          data: trend.map((item) => item.avgPrice),
          borderColor: accent,
          backgroundColor: hexToRgba(accent, 0.16),
          pointBackgroundColor: accent,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `Launch year ${items[0].label}`,
              label: (ctx) => `Average: ₹${Number(ctx.raw).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
              afterLabel: (ctx) => `${trend[ctx.dataIndex].count} phone${trend[ctx.dataIndex].count === 1 ? "" : "s"} in dataset`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: textDim, font: { family: "JetBrains Mono", size: 11 } },
            grid: { color: gridLine },
          },
          y: {
            ticks: {
              color: textDim,
              callback: (value) => `₹${Number(value).toLocaleString("en-IN")}`,
            },
            grid: { color: gridLine },
          },
        },
      },
    });
  } catch (error) {
    if (priceTrendChartInstance) {
      priceTrendChartInstance.destroy();
      priceTrendChartInstance = null;
    }
    box.classList.add("hidden");
    explainer.classList.add("hidden");
    unavailable.classList.remove("hidden");
    unavailable.textContent = error.message || "Historical price data is unavailable.";
  }
}

// ============================================================
// DATASET PRICE COMPARISON
// ============================================================
function featuredPhones(phones) {
  // Keep the dropdown useful rather than exposing all 930 records at once:
  // show the two most recent entries for each brand, ordered by brand/model.
  const perBrand = new Map();
  [...phones]
    .sort((a, b) => b.launched_year - a.launched_year || a.label.localeCompare(b.label))
    .forEach((phone) => {
      const brand = String(phone.company_name || "Other");
      const entries = perBrand.get(brand) || [];
      if (entries.length < 2) entries.push(phone);
      perBrand.set(brand, entries);
    });
  return [...perBrand.values()].flat().sort((a, b) => a.label.localeCompare(b.label));
}

async function loadValidationPhones() {
  const select = document.getElementById("validatePhoneInput");
  const button = document.getElementById("validateBtn");
  const unavailable = document.getElementById("validateUnavailable");

  try {
    const res = await fetch(`${API_BASE_URL}/phones`);
    const data = await res.json();
    if (!res.ok || !data.success || !Array.isArray(data.phones)) {
      throw new Error(data.detail || "Phone dataset is unavailable.");
    }

    validationPhones = featuredPhones(data.phones);
    if (validationPhones.length === 0) throw new Error("Phone dataset contains no comparable records.");

    select.replaceChildren();
    const placeholder = new Option("Choose a phone from the dataset…", "");
    placeholder.disabled = true;
    placeholder.selected = true;
    select.add(placeholder);
    validationPhones.forEach((phone) => {
      const price = Number(phone.actual_price_inr).toLocaleString("en-IN", { maximumFractionDigits: 0 });
      select.add(new Option(`${phone.label} — ₹${price}`, String(phone.id)));
    });
    select.disabled = false;
    button.disabled = false;
    unavailable.classList.add("hidden");
  } catch (error) {
    select.replaceChildren(new Option("Dataset phones are unavailable", ""));
    select.disabled = true;
    button.disabled = true;
    unavailable.textContent = error.message || "Dataset phones are unavailable.";
    unavailable.classList.remove("hidden");
  }
}

async function compareSelectedPhone() {
  const select = document.getElementById("validatePhoneInput");
  const button = document.getElementById("validateBtn");
  const phone = validationPhones.find((item) => String(item.id) === select.value);
  if (!phone) return;

  const payload = {
    company_name: phone.company_name,
    mobile_weight: phone.mobile_weight,
    ram: phone.ram,
    front_camera: phone.front_camera,
    back_camera: phone.back_camera,
    processor: phone.processor,
    battery_capacity: phone.battery_capacity,
    screen_size: phone.screen_size,
    launched_year: phone.launched_year,
  };

  button.disabled = true;
  button.textContent = "Comparing…";
  try {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.detail || "Prediction was unsuccessful.");

    renderDatasetComparison(Number(phone.actual_price_inr), Number(data.predicted_price));
  } catch (error) {
    const unavailable = document.getElementById("validateUnavailable");
    unavailable.textContent = error.message || "Comparison could not be completed.";
    unavailable.classList.remove("hidden");
  } finally {
    button.disabled = false;
    button.textContent = "Compare";
  }
}

function renderDatasetComparison(actual, predicted) {
  const format = (value) => `₹${Math.round(value).toLocaleString("en-IN")}`;
  const absoluteError = Math.abs(predicted - actual);
  const percentError = actual ? (absoluteError / actual) * 100 : 0;

  document.getElementById("validateActual").textContent = format(actual);
  document.getElementById("validatePredicted").textContent = format(predicted);
  document.getElementById("validateAbsError").textContent = format(absoluteError);
  document.getElementById("validatePctError").textContent = `${percentError.toFixed(1)}%`;
  document.getElementById("validateResult").classList.remove("hidden");
  document.getElementById("validateUnavailable").classList.add("hidden");

  const box = document.getElementById("validateChartBox");
  const explainer = document.getElementById("validateExplainer");
  const canvas = document.getElementById("validateChart");
  box.classList.remove("hidden");
  explainer.classList.remove("hidden");

  if (!isChartAvailable()) return showChartFallback(canvas);
  if (validationChartInstance) validationChartInstance.destroy();

  const accent = cssVar("--accent") || "#7C5CFC";
  const accent2 = cssVar("--accent-2") || "#22D3EE";
  const textDim = cssVar("--text-dim") || "#9195A8";
  const gridLine = cssVar("--grid-line") || "rgba(150,150,180,0.12)";
  validationChartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Recorded price", "Model estimate"],
      datasets: [{
        data: [actual, predicted],
        backgroundColor: [hexToRgba(accent2, 0.72), hexToRgba(accent, 0.72)],
        borderColor: [accent2, accent],
        borderWidth: 1,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => format(ctx.raw) } } },
      scales: {
        x: { ticks: { color: textDim }, grid: { display: false } },
        y: { ticks: { color: textDim, callback: (value) => format(value) }, grid: { color: gridLine } },
      },
    },
  });
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6) return `rgba(124, 92, 252, ${alpha})`;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================================
// RESULT PANEL STATE
// ============================================================
function showResultState(state) {
  const states = ["idle", "loading", "error", "success"];
  states.forEach((s) => {
    const el = document.getElementById(`state${capitalize(s)}`);
    if (el) el.classList.toggle("hidden", s !== state);
  });
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
