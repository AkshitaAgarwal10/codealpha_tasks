// Playlist data - each song has a title, artist, cover image, and audio file.
// These are free demo tracks (SoundHelix), picked and renamed to fit a
// "late-night radio" mood. Swap the "src" values with your own mp3
// files/URLs whenever you're ready to use real songs.
const songs = [
  {
    title: "Late Night Drive",
    artist: "Soundhelix Sessions",
    cover: "https://picsum.photos/id/1043/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "City Lights",
    artist: "Soundhelix Sessions",
    cover: "https://picsum.photos/id/1050/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Neon Skyline",
    artist: "Soundhelix Sessions",
    cover: "https://picsum.photos/id/1074/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Quiet Hours",
    artist: "Soundhelix Sessions",
    cover: "https://picsum.photos/id/1080/300/300",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

let currentSong = 0;
let isPlaying = false;

// Grab all the elements we need to control
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const disc = document.getElementById("disc");
const tonearm = document.getElementById("tonearm");
const equalizer = document.getElementById("equalizer");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

// Build the playlist list in the UI (bonus feature)
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${song.title}</span>`;
  li.onclick = () => loadSong(index, true);
  playlistEl.appendChild(li);
});

// Load a song into the player. autoplay = true starts it immediately.
function loadSong(index, autoplay) {
  currentSong = index;
  const song = songs[currentSong];

  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;

  // Highlight the active song in the playlist
  document.querySelectorAll(".playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === currentSong);
  });

  if (autoplay) {
    audio.play();
    setPlayingState(true);
  }
}

// Play or pause the current song
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    setPlayingState(false);
  } else {
    audio.play();
    setPlayingState(true);
  }
}

// Central place that updates the button icon, disc spin, tonearm and
// equalizer bars together, so they never fall out of sync.
function setPlayingState(playing) {
  isPlaying = playing;
  playBtn.innerHTML = playing ? "&#10074;&#10074;" : "&#9658;";
  disc.classList.toggle("spinning", playing);
  tonearm.classList.toggle("playing", playing);
  equalizer.classList.toggle("playing", playing);
}

// Skip to the next song (wraps around to the first)
function nextSong() {
  const next = (currentSong + 1) % songs.length;
  loadSong(next, true);
}

// Go back to the previous song (wraps around to the last)
function prevSong() {
  const prev = (currentSong - 1 + songs.length) % songs.length;
  loadSong(prev, true);
}

// Bonus: autoplay the next song when the current one finishes
audio.addEventListener("ended", nextSong);

// Update the progress bar and time labels as the song plays
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressPercent || 0}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Set the total duration once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Click anywhere on the progress bar to jump to that point in the song
function seek(event) {
  const width = event.currentTarget.clientWidth;
  const clickX = event.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

// Change the volume using the slider
function changeVolume() {
  audio.volume = document.getElementById("volume").value;
}

// Helper: convert seconds into "M:SS" format
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

// Load the first song when the page opens (without autoplaying)
loadSong(currentSong, false);
