/*************************************************
 * THE PERFECT TRADE – SCORING ENGINE
 *************************************************/

const sections = {
  weekly: "weeklyScore",
  daily: "dailyScore",
  h4: "h4Score",
  lower: "lScore",
  m5m1: "m5Score",
  session: "sessionScore",
  discipline: "disciplineScore"

};

const summaryMap = {
  weekly: "wSum",
  daily: "dSum",
  h4: "h4Sum",
  lower: "lSum",
  m5m1: "eSum",
  discipline: "disciplineSum",
  session: "ssum"

};

function calculateSection(sectionClass) {
  let total = 0;
  document.querySelectorAll(`.${sectionClass}:checked`).forEach(cb => {
    total += Number(cb.dataset.score || 0);
  });
  const scoreEl = document.getElementById(sections[sectionClass]);
  if (scoreEl) scoreEl.textContent = total + "%";
  const sumEl = document.getElementById(summaryMap[sectionClass]);
  if (sumEl) sumEl.textContent = total + "%";
  return total;
}

function calculateOverall() {
  let grandTotal = 0;
  Object.keys(sections).forEach(section => {
    grandTotal += calculateSection(section);
  });
  document.getElementById("overallScore").textContent = grandTotal + "%";
  document.getElementById("verdict").textContent = verdictText(grandTotal);
}

function verdictText(p) {
  if (p >= 0 && p <= 40) return `${p}% – Weak Setup`;
  if (p >= 41 && p <= 50) return `${p}% – Below Standard`;
  if (p >= 51 && p <= 60) return `${p}% – Moderate`;
  if (p >= 61 && p <= 70) return `${p}% – Acceptable`;
  if (p >= 71 && p <= 80) return `${p}% – Good`;
  if (p >= 81 && p <= 90) return `${p}% – Strong`;
  if (p >= 91 && p <= 110) return `${p}% – Very Strong`;
  if (p >= 111 && p <= 130) return `${p}% – Outstanding`;
  if (p >= 131 && p <= 150) return `${p}% – Excellent`;
  if (p >= 151 && p <= 200) return `${p}% – Perfect Trade`;
  return `${p}% – No Setup`;
}

function init() {
  // Attach listener to ALL checkboxes
  document.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(input => {
  input.addEventListener("change", calculateOverall);
});


  // Confirmation toggles
  const confirmations = [
    {btnId: "confirmBtn", optionsId: "confirmationM15"},
    {btnId: "confirmBtnH1", optionsId: "confirmationH1"},
    {btnId: "confirmBtnM5", optionsId: "confirmationM5"}
  ];

  confirmations.forEach(item => {
    const btn = document.getElementById(item.btnId);
    const options = document.getElementById(item.optionsId);
    if (btn && options) {
      btn.addEventListener("click", () => {
        options.classList.toggle("active");
      });
    }
  });
}

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", init);
// List of theme CSS files in order
// =========================
// Theme Toggle
// =========================
const themes = [
  "theme-cyber-neon.css",
  "theme-forest.css",
  "theme-light.css",
  "theme-gray.css",
  "theme-monokai.css",
  "theme-ocean.css",
  "theme-paper.css",
  "theme-stealth-dark.css",
  "theme-sunset.css",
  "sunset-glow.css",
  "electric-pink.css",
  "midnight-voilet.css",
  "neon-matrix.css",
  "ocen-depths.css",
];

let currentTheme = 0;

function ensureThemeLink() {
  let link = document.getElementById("themeStylesheet");
  if (!link) {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "themeStylesheet";
    document.head.appendChild(link);
  }
  return link;
}

function switchTheme() {
  currentTheme = (currentTheme + 1) % themes.length;
  const link = ensureThemeLink();
  link.href = themes[currentTheme];
}

// Attach event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if(btn) btn.addEventListener("click", switchTheme);

  // Load first theme by default
  ensureThemeLink().href = themes[currentTheme];
});
