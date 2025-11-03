// ===== CONFIGURATION =====
const correctCode = "071B";
let inputCode = "";

// ===== ÉLÉMENTS DOM =====
const displayCode = document.getElementById("displayCode");
const accessScreen = document.getElementById("accessScreen");
const loadingScreen = document.getElementById("loadingScreen");
const loadingVideo = document.getElementById("loadingVideo");
const fiche = document.getElementById("fiche");
const buttonsContainer = document.getElementById("buttons");
const errorMsg = document.getElementById("errorMsg");
const ficheImage = document.getElementById("ficheImage");
const btnSuppr = document.getElementById("btnSuppr");
const btnValider = document.getElementById("btnValider");
const btnGuest = document.getElementById("btnGuest");

// ===== CRÉATION DU PAVÉ NUMÉRIQUE =====
const buttons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"];

buttons.forEach((value) => {
  const btn = document.createElement("button");
  btn.textContent = value;
  btn.addEventListener("click", () => handleButtonClick(value, btn));
  buttonsContainer.appendChild(btn);
});

// ===== ÉVÉNEMENTS BOUTONS SPÉCIAUX =====
btnSuppr.addEventListener("click", () => handleButtonClick("Suppr", btnSuppr));
btnValider.addEventListener("click", () => handleButtonClick("Valider", btnValider));

// ===== BOUTON ACCÈS INVITÉ =====
btnGuest.addEventListener("click", () => {
  playSound("success");
  setTimeout(() => {
    const loadingSound = new Audio("Media/digital_loading.mp3");
    loadingSound.volume = 0.2;
    loadingSound.play().catch(() => {});
  }, 500);
  showLoadingScreen(true);
});

// ===== GESTION DU CLAVIER =====
document.addEventListener("keydown", (e) => {
  if (accessScreen.style.display === "none") return;
  
  const key = e.key.toUpperCase();
  
  if (key === "BACKSPACE" || key === "DELETE") {
    e.preventDefault();
    handleButtonClick("Suppr", btnSuppr);
  } 
  else if (key === "ENTER") {
    e.preventDefault();
    handleButtonClick("Valider", btnValider);
  }
  else if (/^[0-9AB]$/.test(key)) {
    e.preventDefault();
    const btn = Array.from(buttonsContainer.children).find(b => b.textContent === key);
    if (btn) {
      handleButtonClick(key, btn);
    }
  }
});

// ===== GESTION DU DIGICODE =====
function handleButtonClick(value, btnElement) {
  // Effet visuel d'activation
  btnElement.classList.add("active-btn");
  setTimeout(() => btnElement.classList.remove("active-btn"), 300);

  if (value === "Suppr") {
    // Effacer le dernier caractère
    if (inputCode.length > 0) {
      playSound("suppr");
      inputCode = inputCode.slice(0, -1);
      displayCode.textContent = inputCode.padEnd(4, "·");
    }
  } 
  else if (value === "Valider") {
    // Vérification du code
    if (inputCode === correctCode) {
      // Code correct : accès accordé
      playSound("success");
      setTimeout(() => {
        const loadingSound = new Audio("Media/digital_loading.mp3");
        loadingSound.volume = 0.2;
        loadingSound.play().catch(() => {});
      }, 500);
      showLoadingScreen();
    } else {
      // Code incorrect : affichage erreur
      playSound("error");
      showError();
    }
  } 
  else {
    // Ajout d'un chiffre/lettre
    if (inputCode.length < 4) {
      playSound("input");
      inputCode += value;
      displayCode.textContent = inputCode.padEnd(4, "·");
    }
  }
}

// Affichage de l'écran de chargement
function showLoadingScreen(isGuestMode = false) {
  // Masquer le digicode
  accessScreen.style.display = "none";
  
  // Afficher l'écran de chargement
  loadingScreen.style.display = "flex";
  loadingScreen.classList.add("show");
  
  // Lancer la vidéo
  loadingVideo.currentTime = 0;
  loadingVideo.play();
  
  // Attendre la fin de la vidéo (3 secondes)
  setTimeout(() => {
    loadingScreen.style.display = "none";
    loadingScreen.classList.remove("show");
    fiche.style.display = "block";
    
    if (isGuestMode) {
      fiche.classList.add("guest-mode");
    }
    
    setTimeout(() => fiche.classList.add("show"), 50);
  }, 3000);
}

// Affichage de l'erreur
function showError() {
  displayCode.textContent = "ACCÈS REFUSÉ";
  displayCode.classList.add("error-text", "error-state");
  errorMsg.classList.add("show");
  
  inputCode = "";
  
  setTimeout(() => {
    displayCode.classList.remove("error-text", "error-state");
    displayCode.textContent = "····";
    errorMsg.classList.remove("show");
  }, 1500);
}

// ===== GESTION DES SONS =====
function playSound(type) {
  let soundFile;
  
  switch(type) {
    case "success":
      soundFile = "Media/success_code.mp3";
      break;
    case "error":
      soundFile = "Media/error_code.mp3";
      break;
    case "input":
      soundFile = "Media/input_code.mp3";
      break;
    case "suppr":
      soundFile = "Media/suppr_code.mp3";
      break;
    default:
      return;
  }
  
  const audio = new Audio(soundFile);
  audio.volume = 0.3;
  audio.play().catch(() => {
    // Gestion silencieuse si le son ne peut pas être joué
  });
}

// ===== CAROUSEL D'IMAGES (TOGGLE) =====
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  playSound("input");
  const currentMode = toggleBtn.getAttribute("data-mode");
  
  if (currentMode === "civil") {
    ficheImage.src = "Media/22102025_01.png";
    ficheImage.alt = "Obsidian Chrome (chasseur)";
    toggleBtn.setAttribute("data-mode", "chasseur");
  } else {
    ficheImage.src = "Media/25102025_01.png";
    ficheImage.alt = "Selim Dousan (civil)";
    toggleBtn.setAttribute("data-mode", "civil");
  }
});

// ===== LECTEUR AUDIO =====
const audio = new Audio("Media/Nyhxia-SiLvErExe.mp3");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");

let isPlaying = false;

// Initialisation du volume
audio.volume = volumeSlider.value / 100;

// Lecture / Pause
playPauseBtn.addEventListener("click", () => {
  playSound("input");
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(() => {
      console.log("Lecture audio impossible");
    });
  } else {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Mise à jour de la barre de progression
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Changer la position avec le slider
progressBar.addEventListener("input", () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// Contrôle du volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});

// Réinitialisation à la fin de la lecture
audio.addEventListener("ended", () => {
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  progressBar.value = 0;
});

// ===== LECTEUR AUDIO 2 =====
const audio2 = new Audio("Media/CyberReality_Montee.mp3");
const playPauseBtn2 = document.getElementById("playPauseBtn2");
const progressBar2 = document.getElementById("progressBar2");
const volumeSlider2 = document.getElementById("volumeSlider2");

let isPlaying2 = false;

audio2.volume = volumeSlider2.value / 100;

playPauseBtn2.addEventListener("click", () => {
  playSound("input");
  if (!isPlaying2) {
    audio2.play().then(() => {
      isPlaying2 = true;
      playPauseBtn2.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(() => {
      console.log("Lecture audio impossible");
    });
  } else {
    audio2.pause();
    isPlaying2 = false;
    playPauseBtn2.innerHTML = '<i class="fas fa-play"></i>';
  }
});

audio2.addEventListener("timeupdate", () => {
  if (!isNaN(audio2.duration) && audio2.duration > 0) {
    progressBar2.value = (audio2.currentTime / audio2.duration) * 100;
  }
});

progressBar2.addEventListener("input", () => {
  if (!isNaN(audio2.duration) && audio2.duration > 0) {
    audio2.currentTime = (progressBar2.value / 100) * audio2.duration;
  }
});

volumeSlider2.addEventListener("input", () => {
  audio2.volume = volumeSlider2.value / 100;
});

audio2.addEventListener("ended", () => {
  isPlaying2 = false;
  playPauseBtn2.innerHTML = '<i class="fas fa-play"></i>';
  progressBar2.value = 0;
});

const medSection = document.querySelector('.medical-section');
const medChartVideo = document.getElementById('medChart');
if (medSection && medChartVideo) {
  const stopAt = 4;
  let hasPlayed = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasPlayed) {
        medChartVideo.currentTime = 0;
        medChartVideo.play().catch(() => {});
        hasPlayed = true;
      }
    });
  }, { threshold: 0.4 });
  io.observe(medSection);
  medChartVideo.addEventListener('timeupdate', () => {
    if (medChartVideo.currentTime >= stopAt) {
      medChartVideo.pause();
      medChartVideo.currentTime = stopAt;
    }
  });
}

const medInfoTitle = document.getElementById("medInfoTitle");
const medInfoText = document.getElementById("medInfoText");
const medDots = document.querySelectorAll(".med-dot");
if (medInfoTitle && medInfoText && medDots.length) {
  const selectDot = (dot) => {
    playSound("input");
    medDots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
    const t = dot.getAttribute("data-title") || "Détails médicaux";
    const x = dot.getAttribute("data-text") || "";
    medInfoTitle.textContent = t;
    medInfoText.textContent = x;
  };
  medDots.forEach((dot) => {
    dot.addEventListener("click", () => selectDot(dot));
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectDot(dot);
      }
    });
  });
}
