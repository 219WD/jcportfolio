//Cursor
const siteWideCursor = document.querySelector(".custom-cursor.site-wide");

document.addEventListener("mouseenter", ()=>{
  siteWideCursor.style.display = "block";
});

document.addEventListener("mouseleave", ()=>{
  siteWideCursor.style.display = "none";
});

document.addEventListener("mousemove", TrackCursor);

document.addEventListener("mousedown", ()=> siteWideCursor.classList.add("active"));
document.addEventListener("mouseup", ()=> siteWideCursor.classList.remove("active"));

function TrackCursor(evt){
  const w = siteWideCursor.clientWidth;
  const h = siteWideCursor.clientHeight;
  siteWideCursor.style.transform = `translate(${evt.clientX - w/2}px, ${evt.clientY - h/2}px)`;
}



//Navbar
tl = new TimelineMax({ paused: true });

			tl.to(".menu-left", 1, {
				left: 0,
				ease: Expo.easeInOut,
			});

			tl.to(
				".menu-right",
				1,
				{
					right: 0,
					ease: Expo.easeInOut,
				},
				"-=1"
			);

			tl.staggerFrom(
				".menu-links > div",
				0.8,
				{
					y: 100,
					opacity: 0,
					ease: Expo.easeOut,
				},
				"0.1",
				"-=0.4"
			);

			tl.staggerFrom(
				".mail > div, .socials > div",
				0.8,
				{
					y: 100,
					opacity: 0,
					ease: Expo.easeOut,
				},
				"0.1",
				"-=1"
			);

			tl.from(
				".menu-close",
				1,
				{
					scale: 0,
					opacity: 1,
					ease: Expo.easeInOut,
				},
				"-=1"
			);

			tl.to(
				".hr",
				0.4,
				{
					scaleY: 1,
					transformOrigin: "0% 50%",
					ease: Power2.ease,
				},
				"-=2"
			);

			tl.reverse();
			$(document).on("click", ".menu-open", function () {
				tl.reversed(!tl.reversed());
			});
			$(document).on("click", ".menu-close", function () {
				tl.reversed(!tl.reversed());
			});

      //Social media
      const dockContainer = document.querySelector(".dock");
const dockItems = dockContainer.querySelectorAll(".dock-item");

const defaultItemScale = 1;
const hoverItemScale = 2.5;
const neighborItemScale = 2;

const defaultMargin = "10px";
const expandedMargin = "20px";

// Función para actualizar los estilos de los ítems en el dock
const updateDockItems = () => {
    dockItems.forEach((item, index) => {
        let scale = defaultItemScale;
        let margin = defaultMargin;

        if (item.isHovered) {
            scale = hoverItemScale;
            margin = expandedMargin;
        } else if (item.isNeighbor) {
            scale = neighborItemScale;
            margin = expandedMargin;
        }

        item.style.transform = `scale(${scale})`;
        item.style.margin = `0 ${margin}`;
    });
};

dockItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        dockItems.forEach((otherItem) => {
            otherItem.isHovered = otherItem === item;
            otherItem.isNeighbor =
                Math.abs(
                    Array.from(dockItems).indexOf(otherItem) -
                    Array.from(dockItems).indexOf(item) 
                ) === 1;
        });
        updateDockItems();
    });

    // Reiniciar estado cuando el cursor sale de un ítem
    item.addEventListener("mouseleave", () => {
        dockItems.forEach((otherItem) => {
            otherItem.isHovered = false;
            otherItem.isNeighbor = false;
        });
        updateDockItems();
    });
});

// Reiniciar estado cuando el cursor sale de todo el dock
dockContainer.addEventListener("mouseleave", () => {
    dockItems.forEach((item) => {
        item.isHovered = false;
        item.isNeighbor = false;
    });
    updateDockItems();
});
          

//Reproductor de musica
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

let currentTrack = new Audio();
let soundBars = document.querySelector(".sound-bars");

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

let soundBarsLottie = bodymovin.loadAnimation({
  container: soundBars,
  renderer: "svg",
  loop: true,
  autoPlay: false,
  path: "http://assets5.lottiefiles.com/packages/lf20_jJJl6i.json",
});

let trackList = [

    {
        name: "Feel Good Inc",
        artist: "Gorillaz",
        path: "/songs/Gorillaz - Feel Good Inc. (Official Video).mp3",
    },
    
    {
        name: "Clint Eastwood",
        artist: "Gorillaz",
        path: "/songs/Gorillaz - Clint Eastwood (Official Video).mp3",
    },

    {
        name: "19-2000",
        artist: "Gorillaz",
        path: "/songs/Gorillaz - 19-2000 (Official Video).mp3",
    },
];

function loadTrack(trackIndex) {
    currentTrack.pause(); // Pause the previous track
    currentTrack = new Audio(); // Create a new audio element
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
  }
  
  function playPauseTrack() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }
  
  function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<ion-icon name="pause-sharp"></ion-icon>';
    soundBarsLottie.playSegment([0, 120], true);
  }
  
  function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<ion-icon name="play-sharp"></ion-icon>';
    soundBarsLottie.stop();
  }
  
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
  
  // Load the initial track
  loadTrack(trackIndex);

//Efx
gsap.from(".logo", {duration: 1, opacity: 0, scale: 0.3, y: -200});
gsap.from(".menu-open", {duration: 1, opacity: 0, scale: 0.3, y: -200});
gsap.from(".img", {duration: 1.5, opacity: 0, scale: 0.3, ease: "back"});
gsap.from(".h1", {duration: 1, opacity: 0, scale: 0.3, y: -200});
gsap.from("hr", {duration: 2.5, opacity: 0, scale: 0.3, ease: "back"});
gsap.from(".h2", {duration: 1, opacity: 0, scale: 0.3, y: 200});
gsap.from(".h3", {duration: 1, opacity: 0, scale: 0.3, x: 200});
gsap.from(".txt-about", {duration: 1.5, opacity: 0, scale: 0.3, ease: "back"});
gsap.from(".arrow", {duration: 1.5, opacity: 0, scale: 0.3, ease: "back"});
gsap.from(".brush", {duration: 1, delay: 0.5, opacity: 0, scale: 0.3, x: 100});
gsap.from(".p", {duration: 1, opacity: 0, scale: 0.3, y: 200});
gsap.from(".music-player-container", {duration: 1, opacity: 0, scale: 0.3, x: 200});