// Reproductor de música
// Selecciona los elementos del reproductor de música.
let musicPlayer = document.querySelector(".music-player-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = new Audio(); // Elemento de audio para la pista actual
let soundBars = document.querySelector(".sound-bars");

// Función para alternar la visibilidad del reproductor al hacer clic en el botón de alternar.
togglePlayer.addEventListener("click", function () {
    isHidden = !isHidden;
    if (isHidden) {
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

// Carga la animación de las barras de sonido utilizando Lottie.
let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPlay: false,
    path: "http://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
});

// Lista de pistas de música.
let trackList = [
    {
        name: "Feel Good Inc",
        artist: "Gorillaz",
        path: "/songs/Gorillaz - Feel Good Inc. (Official Video).mp3",
    },
    // ... Otras pistas ...
];

// Función para cargar una pista específica.
function loadTrack(trackIndex) {
    currentTrack.pause(); // Pausa la pista anterior
    currentTrack = new Audio(); // Crea un nuevo elemento de audio
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
}

// Función para reproducir o pausar la pista actual.
function playPauseTrack() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

// Función para reproducir la pista actual.
function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
    soundBarsLottie.playSegment([0, 120], true);
}

// Función para pausar la pista actual.
function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    soundBarsLottie.stop();
}

// Funciones para cambiar a la siguiente o anterior pista.
function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

// Carga la pista inicial al cargar la página.
loadTrack(trackIndex);