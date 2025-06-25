console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio();
let currentTimeDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.querySelectorAll('.songItem');
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    { songName: "old song", filePath: "songs/old song.mp3", coverPath: "covers/cover1.jpg" },
    { songName: "Sanam Teri Kasam", filePath: "songs/sanam teri kasam.mp3", coverPath: "covers/cover9.jpg" },
    { songName: "bewajah", filePath: "songs/bewajah.mp3", coverPath: "covers/cover10.jpg" },
    { songName: "hal e dil", filePath: "songs/hal e dil.mp3", coverPath: "covers/cover4.jpg" },
    { songName: "teara chehara", filePath: "songs/tera chehara.mp3", coverPath: "covers/cover5.jpg" },
    { songName: "lai vi n gai", filePath: "songs/layi vi n gai te nibhai bhi n gai.mp3", coverPath: "covers/cover6.jpg" },
    { songName: "tere ishq me nachenge", filePath: "songs/tere ishq me nachenge.mp3", coverPath: "covers/cover11.jpg" },
    { songName: "har kisi ko nahi milta", filePath: "songs/har kisi ko nahi milta.mp3", coverPath: "covers/cover12.jpg" }
];
songItems.forEach((item, index) => {
    let audio = new Audio(songs[index].filePath);
    
    // Wait for metadata to load
    audio.addEventListener('loadedmetadata', () => {
        let totalSec = Math.floor(audio.duration);
        let minutes = Math.floor(totalSec / 60);
        let seconds = totalSec % 60;
        if (seconds < 10) seconds = "0" + seconds;

        // Set formatted duration to .songDuration span
        item.querySelector('.songDuration').innerText = `${minutes}:${seconds}`;
    });
});
audioElement.addEventListener("loadedmetadata", () => {
    let duration = audioElement.duration;
    durationDisplay.innerText = formatTime(duration);
});

audioElement.addEventListener("timeupdate", () => {
  let currentTime = audioElement.currentTime;
  currentTimeDisplay.innerText = formatTime(currentTime);
});

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

// Song duration when loaded
audioElement.addEventListener("loadedmetadata", () => {
  durationDisplay.innerText = formatTime(audioElement.duration);
});

// Current time while playing
audioElement.addEventListener("timeupdate", () => {
  currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
});


// Show song name & cover
document.querySelectorAll('.songItem').forEach((el, i) => {
    el.querySelector('img').src = songs[i].coverPath;
    el.querySelector('.songName').innerText = songs[i].songName;
});

function resetAllPlays() {
    songItemPlays.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
}

// Play a specific song
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();

    let selectedBtn = document.getElementsByClassName('songItemPlay')[songIndex];
    selectedBtn.classList.remove('fa-play-circle');
    selectedBtn.classList.add('fa-pause-circle');

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    // ✅ Bottom current song name update
    document.getElementById('currentSongName').innerText = songs[songIndex].songName;
}

let muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
    if (audioElement.muted) {
        audioElement.muted = false;
        muteBtn.innerText = "🔊";
    } else {
        audioElement.muted = true;
        muteBtn.innerText = "🔇";
    }
});


// Song Play Button click
songItemPlays.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (songIndex === i && !audioElement.paused) {
            audioElement.pause();
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            playSong(i);
        }
    });
});

// Master play button
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();   // Resume from last paused position
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    } else {
        audioElement.pause();  // Pause & remember position
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSong(songIndex);
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    } else {
        songIndex -= 1;
    }
    playSong(songIndex);
});

//auto play next song
audioElement.addEventListener('ended', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSong(songIndex);
});



