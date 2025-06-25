console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio();
let currentTimeDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let muteBtn = document.getElementById("muteBtn");
let songItems = document.querySelectorAll('.songItem');
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));
let volumeSlider = document.getElementById("volumeSlider");
let isSongSelected = false;

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

// Set song names and covers
songItems.forEach((item, index) => {
    item.querySelector('.songName').innerText = songs[index].songName;
    item.querySelector('img').src = songs[index].coverPath;

    let audio = new Audio(songs[index].filePath);
    audio.addEventListener('loadedmetadata', () => {
        let duration = formatTime(audio.duration);
        item.querySelector('.songDuration').innerText = duration;
    });
});

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function resetAllPlays() {
    songItemPlays.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
}

function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    isSongSelected = true; // ✅ activate all controls only after song play

    resetAllPlays();
    songItemPlays[songIndex].classList.remove('fa-play-circle');
    songItemPlays[songIndex].classList.add('fa-pause-circle');

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    document.getElementById('currentSongName').innerText = songs[songIndex].songName;
}


volumeSlider.addEventListener("input", () => {
    let volumeValue = volumeSlider.value;
    audioElement.volume = volumeValue / 100;

    if (volumeValue == 0) {
        audioElement.muted = true;
        muteBtn.innerText = "🔇";
    } else {
        audioElement.muted = false;
        muteBtn.innerText = "🔊";
    }
});

// Update time displays
audioElement.addEventListener("timeupdate", () => {
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

audioElement.addEventListener("loadedmetadata", () => {
    durationDisplay.innerText = formatTime(audioElement.duration);
});

// Seek bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Mute/Unmute
muteBtn.addEventListener("click", () => {
    audioElement.muted = !audioElement.muted;

    if (audioElement.muted) {
        muteBtn.innerText = "🔇";
        volumeSlider.value = 0; // ✅ slider 0
    } else {
        muteBtn.innerText = "🔊";
        volumeSlider.value = audioElement.volume * 100; // ✅ slider back to current volume
    }
});


// Song list buttons
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

// Master play/pause button
masterPlay.addEventListener("click", () => {
    if (!isSongSelected) return; // 🛑 no song selected, do nothing

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;

        resetAllPlays();
        songItemPlays[songIndex].classList.remove('fa-play-circle');
        songItemPlays[songIndex].classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;

        resetAllPlays();
    }
});



// Next song
document.getElementById('next').addEventListener('click', () => {
    if (!isSongSelected) return; // 🛑 ignore if no song selected

    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});


// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (!isSongSelected) return; // 🛑 ignore if no song selected

    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});


// Auto next song
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// 5 second forward
document.getElementById('forward5').addEventListener('click', () => {
    if (!isSongSelected) return; // Only if song selected
    audioElement.currentTime = Math.min(audioElement.currentTime + 5, audioElement.duration);
});

// 5 second backward
document.getElementById('backward5').addEventListener('click', () => {
    if (!isSongSelected) return; // Only if song selected
    audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
});
