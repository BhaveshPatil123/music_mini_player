// ✅ Cleaned and updated version of your script.js

let songIndex = 0;
let audioElement = new Audio();
let currentTimeDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let muteBtn = document.getElementById("muteBtn");
let previousVolume = 0.5;
let volumeSlider = document.getElementById("volumeSlider");
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));
let isSongSelected = false;
const searchResults = document.getElementById("searchResults");

let songs = [
  { songName: "Lagan Ma Dekhna Rani Tula", filePath: "songs/lagan ma dekhna rani tula.mp3", coverPath: "https://i.ytimg.com/vi/b6Wpm3pMwMk/maxresdefault.jpg" },
  { songName: "Mani Sahiba Tu", filePath: "songs/mani-sahiba-tu.mp3", coverPath: "https://c.saavncdn.com/703/Mani-Sahiba-Tu-Unknown-2024-20240502144023-500x500.jpg" },
  { songName: "Changli Rangni Ka Tuni Mehandi", filePath: "songs/changli rangni ka tuni mehandi.mp3", coverPath: "https://pendujatt.com.se/uploads/album/changli-rangani-ka-tuni-mehandi.webp" },
  { songName: "O Dilbara", filePath: "songs/o dilbara.mp3", coverPath: "https://i.ytimg.com/vi/trwapxFEEAw/maxresdefault.jpg" },
  { songName: "Zim Zim Pani Ma", filePath: "songs/zim-zim-pani-ma.mp3", coverPath: "https://cdn-images.dzcdn.net/images/cover/40c8f74fb0b1476769c1301b1480d76f/0x1900-000000-80-0-0.jpg" },
  { songName: "Pahili Pahili Bar", filePath: "songs/pahili pahili bar.mp3", coverPath: "covers/pahili-pahili-bar.jpg" },
  { songName: "Thod Sukh Bhetude", filePath: "songs/thod-sukh-bhetude.mp3", coverPath: "https://cdn-images.dzcdn.net/images/cover/55108b4fef8ca6f23f56494a572aee3f/1900x1900-000000-80-0-0.jpg" },
  { songName: "Tuna Khota Hota Sara Pyar", filePath: "songs/tuna khota hota sara pyar.mp3", coverPath: "covers/tuna khota hota sara pyar.jpg" },
  { songName: "Radi Raynu Roj Ratle", filePath: "songs/radi raynu roj ratle.mp3", coverPath: "covers/radi raynu roj ratle.jpg" },
  { songName: "Tuna Pyar Padi Gaya", filePath: "songs/tuna-pyar-ma-padi-gaya.mp3", coverPath: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/25/4f/a7/254fa7a2-fc25-65a1-6403-d1e8c37e5a0a/8905992094537.jpg/1200x630bb.jpg" },
  { songName: "Me Tuna S Na Raja", filePath: "songs/me-tuna-s-na-raja.mp3", coverPath: "https://i.ytimg.com/vi/q-O_fnfOInw/maxresdefault.jpg" },
  { songName: "Me Mari Jasu", filePath: "songs/me mari  jasu.mp3", coverPath: "covers/me mari jasu.jpg" },
  { songName: "4 Varis Na Pyar", filePath: "songs/char varis na pyar.mp3", coverPath: "covers/char varisna pyar.jpg" },
  { songName: "Dil Dil Tadap Tadap", filePath: "songs/dil tadap tadap.mp3", coverPath: "covers/dil tadap tadap.jpg" },
  { songName: "Tuna Lagin Na Lagna Nirop", filePath: "songs/tuna lagin na lagna nirop.mp3", coverPath: "covers/tuna lagin na lagna nirop.jpg" },
  { songName: "Aaj Tile Hayad Lagni", filePath: "songs/aaj tile hayad lagni.mp3", coverPath: "covers/aaj tile hayad lagni.jpg" },
  { songName: "Dil Ma Badal Garajna", filePath: "songs/dil ma badal garajna.mp3", coverPath: "covers/dil ma badal garajna.jpg" },
  { songName: "Aai Jindagani Tuna Havale Karnis", filePath: "songs/aai jindagani tuna havale karni s.mp3", coverPath: "covers/o yara me pyar tuna var karnaye.jpg" },
  { songName: "Mana Pyar Adhura Rahi Gaya", filePath: "songs/mana pyar adhura rahi gaya.mp3", coverPath: "covers/mana pyar adhura rahi gaya.jpg" },
  { songName: "Bhuli Gai Mana Pyarla", filePath: "songs/bhuli gai mana pyarla.mp3", coverPath: "covers/bhuli gaya mana pyarla.jpg" },
  { songName: "Mani Rani Tuna Pyar Ma", filePath: "songs/mani rani tuna pyarma.mp3", coverPath: "covers/mani  rani tuna pyarma.jpg" },
  { songName: "Mana Pauna", filePath: "songs/mana pauna.mp3", coverPath: "covers/mana pauna.jpg" },
  { songName: "Tuni Yadma Dil Rat Din Radye(Female Version)", filePath: "songs/tuni yadma dil ratdin radye fv..mp3", coverPath: "covers/tuni yadma dil rat din radye fv.jpg" },
  { songName: "Tuni Yadma Dil Rat Din Radye(Male Version)", filePath: "songs/tuni yadma dil rat din radye mv..mp3", coverPath: "covers/tuni yadma dil rat din radye mv.jpg" },
  { songName: "Gujrat La Javan", filePath: "songs/gujrat la javan s.mp3", coverPath: "covers/gujrat la javan s.jpg" },
  { songName: "Resham Na Ghaghra", filePath: "songs/resham na ghaghra.mp3", coverPath: "covers/resham na ghaghra.jpg" },
  { songName: "Pori Tuni Payal", filePath: "songs/pori tuni payal.mp3", coverPath: "covers/pori tuni payal.jpg" },
  { songName: "Ya Barish Na Mausam Ma", filePath: "songs/barish na mausam ma.mp3", coverPath: "covers/barish na mausam ma.jpg" },
  { songName: "Na Din Dikhe Na Rat", filePath: "songs/na din dikhe na rat.mp3", coverPath: "covers/na din dikhe na rat.jpg" },
  { songName: "Khandesh Ni Me Pushpa", filePath: "songs/khandesh ni me pushpa.mp3", coverPath: "covers/khandesh ni me pushpa.jpg" },
];

const Songs = [
  { songName: "Mani Rani Tuna Pyar Ma" },
  { songName: "Pahili Pahili Bar" },
  { songName: "Zim Zim Pani Ma" },
  // ... baki na song
];

const searchInput = document.getElementById("searchInput");
const songItems = Array.from(document.getElementsByClassName("songItem"));

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  songItems.forEach(item => {
    const songName = item.querySelector(".songName").textContent.toLowerCase();

    if (songName.includes(searchTerm)) {
      item.style.display = "flex"; // or "block", based on your CSS layout
    } else {
      item.style.display = "none";
    }
  });
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  songItems.forEach(item => {
    const songName = item.querySelector(".songName").textContent.toLowerCase();

    if (songName.includes(searchTerm)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// 🔁 Function to reset search
function resetSearch() {
  searchInput.value = "";
  songItems.forEach(item => {
    item.style.display = "flex";
  });
}

// 🎵 On song item click, reset search
songItems.forEach(item => {
  item.addEventListener("click", () => {
    resetSearch();
  });
});

// 🖱️ If clicked outside searchInput, also reset
document.addEventListener("click", (e) => {
  // Avoid clearing if user is typing in search box
  if (e.target !== searchInput && !searchInput.contains(e.target)) {
    resetSearch();
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const results = songs.filter(song =>
    song.songName.toLowerCase().includes(searchTerm)
  );

  console.log("Search Results:", results);
});

document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});


function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgressSmooth() {
  if (audioElement.duration) {
    const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progressPercent;
    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    durationDisplay.textContent = formatTime(audioElement.duration);
  }
  if (!audioElement.paused && !audioElement.ended) {
    requestAnimationFrame(updateProgressSmooth);
  }
}

audioElement.addEventListener('play', () => {
  requestAnimationFrame(updateProgressSmooth);
});

function resetAllPlays() {
  songItemPlays.forEach(element => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
}

function playSong(index) {
  songIndex = index;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  soundGif.style.display = "inline"; // ✅ Add this line here
  isSongSelected = true;
  resetAllPlays();
  songItemPlays[songIndex].classList.remove("fa-play-circle");
  songItemPlays[songIndex].classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");

  document.getElementById("nowPlaying").style.display = "flex";
  document.getElementById("currentSongName").innerText = songs[songIndex].songName;
  document.getElementById("currentCover").src = songs[songIndex].coverPath;

  audioElement.addEventListener("loadedmetadata", () => {
    durationDisplay.innerText = formatTime(audioElement.duration);
  });
}

songItems.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    if (!event.target.classList.contains("songItemPlay")) {
      playSong(index);
    }
  });
});

songItemPlays.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audioElement.paused || songIndex !== index) {
      playSong(index);
    } else {
      audioElement.pause();
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      soundGif.style.display = "none"; // ✅ Hide GIF when paused from top
    }
  });
});


masterPlay.addEventListener("click", () => {
  if (!isSongSelected) return;
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    soundGif.style.display = "inline";
    resetAllPlays();
    songItemPlays[songIndex].classList.remove('fa-play-circle');
    songItemPlays[songIndex].classList.add('fa-pause-circle');
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    soundGif.style.display = "none";
    resetAllPlays();
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (!isSongSelected) return;
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
  if (!isSongSelected) return;
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

audioElement.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

function updateProgressBarSmoothly() {
  if (audioElement.duration) {
    const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progressPercent;
  }
  if (!audioElement.paused && !audioElement.ended) {
    requestAnimationFrame(updateProgressBarSmoothly);
  }
}

audioElement.addEventListener('play', () => {
  requestAnimationFrame(updateProgressBarSmoothly);
});

myProgressBar.addEventListener('input', () => {
  const seekTime = (myProgressBar.value * audioElement.duration) / 100;
  audioElement.currentTime = seekTime;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('forward5').addEventListener('click', () => {
  if (!isSongSelected) return;
  audioElement.currentTime = Math.min(audioElement.currentTime + 5, audioElement.duration);
});

document.getElementById('backward5').addEventListener('click', () => {
  if (!isSongSelected) return;
  audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
});

volumeSlider.addEventListener("input", () => {
  let volumeValue = volumeSlider.value / 100;
  audioElement.volume = volumeValue;
  if (volumeValue === 0) {
    audioElement.muted = true;
    muteBtn.innerText = "🔇";
  } else {
    previousVolume = volumeValue;
    audioElement.muted = false;
    muteBtn.innerText = "🔊";
  }
});

muteBtn.addEventListener("click", () => {
  if (audioElement.muted || audioElement.volume === 0) {
    audioElement.muted = false;
    audioElement.volume = previousVolume;
    volumeSlider.value = previousVolume * 100;
    muteBtn.innerText = "🔊";
  } else {
    previousVolume = audioElement.volume;
    audioElement.muted = true;
    volumeSlider.value = 0;
    muteBtn.innerText = "🔇";
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
}

// Hide .nowPlaying section when the page loads or refreshes
window.addEventListener("load", () => {
  const nowPlaying = document.getElementById("nowPlaying");
  if (nowPlaying) {
    nowPlaying.style.display = "none";
  }
});
