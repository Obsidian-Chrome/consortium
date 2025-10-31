const correctCode = "071B";
let inputCode = "";

// Récupération des éléments du DOM
const displayCode = document.getElementById("displayCode");
const accessScreen = document.getElementById("accessScreen");
const fiche = document.getElementById("fiche");
const buttonsContainer = document.getElementById("buttons");
const ficheImage = document.getElementById("ficheImage");
const btnCivil = document.getElementById("btnCivil");
const btnChasseur = document.getElementById("btnChasseur");
const btnSuppr = document.getElementById("btnSuppr");
const btnValider = document.getElementById("btnValider");

// Boutons du pavé numérique (sans Suppr ni Valider)
const buttons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"];

// Création du pavé numérique
buttons.forEach((value) => {
  const btn = document.createElement("button");
  btn.textContent = value;
  btn.className =
    "py-3 rounded-lg font-bold text-lg border flex items-center justify-center pointer-events-auto transition-all duration-300 bg-transparent border-cyan-400/30 hover:bg-cyan-400/20 active:bg-cyan-400/40";
  btn.addEventListener("click", () => handleButtonClick(value, btn));
  buttonsContainer.appendChild(btn);
});

// Lien des boutons spéciaux
btnSuppr.addEventListener("click", () => handleButtonClick("Suppr", btnSuppr));
btnValider.addEventListener("click", () =>
  handleButtonClick("Valider", btnValider)
);

// Fonction principale de gestion du digicode
function handleButtonClick(value, btnElement) {
  // Effet visuel d’activation
  btnElement.classList.add("active-btn");
  setTimeout(() => btnElement.classList.remove("active-btn"), 500);

  if (value === "Suppr") {
    inputCode = inputCode.slice(0, -1);
  } else if (value === "Valider") {
    if (inputCode === correctCode) {
      playSound("success");
      accessScreen.style.display = "none";
      fiche.style.display = "block";
      fiche.classList.add("show");
    } else {
      // Erreur → message temporaire à la place du code
      playSound("error");
      displayCode.textContent = "INCORRECT";
      displayCode.classList.add("error-text");
      displayCode.classList.add("error-state");

      inputCode = ""; // reset

      setTimeout(() => {
        displayCode.classList.remove("error-text");
        displayCode.classList.remove("error-state");
        displayCode.textContent = "····";
      }, 1000);
    }
  } else {
    if (inputCode.length < 4) inputCode += value;
  }

  if (value !== "Valider") {
    displayCode.textContent = inputCode.padEnd(4, "·");
  }
}

// Gestion des sons
function playSound(type) {
  const audio = new Audio(
    type === "success" ? "Media/success_code.mp3" : "Media/error_code.mp3"
  );
  audio.volume = 0.3;
  audio.play();
}

// Carousel d'images Civil / Chasseur
btnCivil.addEventListener("click", () => {
  ficheImage.src = "Media/25102025_01.png";
  ficheImage.alt = "Selim Dousan";
  btnCivil.classList.add("active");
  btnChasseur.classList.remove("active");
});

btnChasseur.addEventListener("click", () => {
  ficheImage.src = "Media/22102025_01.png";
  ficheImage.alt = "Obsidian Chrome";
  btnChasseur.classList.add("active");
  btnCivil.classList.remove("active");
});

// === 🎵 LECTEUR AUDIO ===
const audio = new Audio("Media/Nyhxia-SiLvErExe.mp3");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const trackTitle = document.getElementById("trackTitle");

let isPlaying = false;

// Lecture / Pause
playPauseBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  }
});

// Mise à jour de la barre de progression
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Changer la position avec le slider
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Contrôle du volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});
