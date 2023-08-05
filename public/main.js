const addMoreButton = [
  "play-back-outline",
  "play-outline",
  "play-forward-outline",
  "play-outline-1",
  "volume-high-outline",
  "play-back-outline-1",
  "play-forward-outline-1",
  "arrow-back-outline",
  "arrow-forward-outline",
  "albums-outline",
  "options-outline",
  "apps-outline",
  "tablet-landscape-outline",
  "tv-outline",
  "scan-outline",
  "contract-outline",
];

addMoreButton.forEach((value) => {
  let myElement = document.querySelector(`#${value}`);
  if (value.endsWith("-1")) {
    value = value.slice(0, -2);
  }
  myElement.outerHTML = `<ion-icon name="${value}"></ion-icon>`;
});

const episodeUl = document.querySelector(".setting-menu-eps");

// set Anime total episodes and Anime Name
const totalEpisodes = 13;
const animeName = "君は放課後インソムニア";
document.title = `Episodes - ${localStorage.getItem("episode")}`;

let currentEpisode;
if (!localStorage.getItem("episode")) {
  localStorage.setItem("episode", "1");
} else {
  currentEpisode = localStorage.getItem("episode");
}

const episodes = Array.from(
  { length: totalEpisodes },
  (_, i) => `/anime/1 (${i + 1}).mkv`
).forEach((data, index) => {
  if (index === currentEpisode - 1) {
    episodeUl.innerHTML += `<li data-value="${data}" class="speed-active-eps">${
      index + 1
    }</li>`;
    return;
  }
  episodeUl.innerHTML += ` <li data-value="${data}">${index + 1}</li>`;
});

const animeTitle = document.querySelector(".title");
const video = document.querySelector("video");
const fullscreen = document.querySelector(".fullscreen-btn");
const playPause = document.querySelector(".play-pause");
const volume = document.querySelector(".volume");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const buffer = document.querySelector(".buffer");
const totalDuration = document.querySelector(".total-duration");
const currentDuration = document.querySelector(".current-duration");
const controls = document.querySelector(".controls");
const videoContainer = document.querySelector(".video-container");
const currentVol = document.querySelector(".current-vol");
const totalVol = document.querySelector(".max-vol");
const mainState = document.querySelector(".main-state");
const muteUnmute = document.querySelector(".mute-unmute");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");
const hoverTime = document.querySelector(".hover-time");
const hoverDuration = document.querySelector(".hover-duration");
const miniPlayer = document.querySelector(".mini-player");
const settingsBtn = document.querySelector(".setting-btn");
const settingMenu = document.querySelector(".setting-menu");
const episodesBtn = document.querySelector(".setting-btn-eps");
const episodeMenu = document.querySelector(".setting-menu-eps");
const episodeItem = document.querySelectorAll(".setting-menu-eps li");
const speedButtons = document.querySelectorAll(".setting-menu li");
const backwardSate = document.querySelector(".state-backward");
const forwardSate = document.querySelector(".state-forward");
const loader = document.querySelector(".custom-loader");
const nextEpisodes = document.querySelector(".next-episodes");
const prevEpisodes = document.querySelector(".prev-episodes");
const fileUpload = document.querySelector("#file-upload");

totalDuration.innerHTML = showDuration(video.duration);
video.src = `./anime/1 (${localStorage.getItem("episode")}).mkv`;
if (
  parseInt(localStorage.getItem("currentTime")) >
  parseInt(localStorage.getItem("duration"))
) {
  localStorage.setItem("currentTime", 0);
}
video.currentTime = localStorage.getItem("currentTime") || 0;

video.addEventListener("loadedmetadata", function () {
  localStorage.setItem("duration", video.duration);
});

animeTitle.innerHTML = animeName + " - " + localStorage.getItem("episode");

let isPlaying = false,
  mouseDownProgress = false,
  mouseDownVol = false,
  isCursorOnControls = false,
  muted = false,
  timeout,
  volumeVal = 1,
  mouseOverDuration = false,
  touchClientX = 0,
  touchPastDurationWidth = 0,
  touchStartTime = 0,
  isEpsMenuOpen = false,
  isSpeedMenuOpen = false;

currentVol.style.width = volumeVal * 100 + "%";

// Video Event Listeners
video.addEventListener("loadedmetadata", canPlayInit);
video.addEventListener("play", play);
video.addEventListener("pause", pause);
video.addEventListener("progress", handleProgress);
video.addEventListener("waiting", handleWaiting);
video.addEventListener("playing", handlePlaying);
video.addEventListener("timeupdate", handleProgressBar);

document.addEventListener("keydown", handleShorthand);
fullscreen.addEventListener("click", toggleFullscreen);

duration.addEventListener("click", (e) => {
  e.stopPropagation();
  navigate(e);
});

duration.addEventListener("mousedown", (e) => {
  mouseDownProgress = true;
  navigate(e);
});

totalVol.addEventListener("mousedown", (e) => {
  e.stopPropagation();
  mouseDownVol = true;
  handleVolume(e);
});

document.addEventListener("mouseup", (e) => {
  mouseDownProgress = false;
  mouseDownVol = false;
});

document.addEventListener("mousemove", handleMousemove);

duration.addEventListener("mouseenter", (e) => {
  mouseOverDuration = true;
});
duration.addEventListener("mouseleave", (e) => {
  mouseOverDuration = false;
  hoverTime.style.width = 0;
  hoverDuration.innerHTML = "";
});

// wholeSeries.onclick = (e) => {
//   if (nextEpisodes.style.display === "none") {
//     nextEpisodes.style.display = "flex";
//     prevEpisodes.style.display = "flex";
//     document.querySelector(".settings-eps").style.display = "flex";
//     video.src = `./anime/1 (${localStorage.getItem("episode")}).mkv`;
//     video.currentTime = 0;
//     document.title = `Episodes - ${localStorage.getItem("episode")}`;
//     animeTitle.innerHTML = animeName + " - " + localStorage.getItem("episode");
//     video.play();
//   }
//   e.stopPropagation();
// };

fileUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const fileTitle = file.name.split(".")[0];
  const filePath = URL.createObjectURL(file);
  video.src = filePath;
  video.addEventListener("loadedmetadata", function () {
    totalDuration.innerHTML = showDuration(video.duration);
  });
  video.play();
  currentDuration.innerHTML = showDuration(0);
  animeTitle.innerHTML = fileTitle;
  document.title = fileTitle;
  nextEpisodes.style.display = "none";
  prevEpisodes.style.display = "none";
  document.querySelector(".settings-eps").style.display = "none";
});

video.addEventListener("ended", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const episode = localStorage.getItem("episode");
  if (parseInt(episode) < totalEpisodes) {
    localStorage.setItem("episode", parseInt(episode) + 1);
    document.title = `Episodes - ${localStorage.getItem("episode")}`;
    animeTitle.innerHTML = animeName + " - " + localStorage.getItem("episode");
    video.src = `./anime/1 (${localStorage.getItem("episode")}).mkv`;
    video.addEventListener("loadedmetadata", function () {
      totalDuration.innerHTML = showDuration(video.duration);
    });
    currentDuration.innerHTML = showDuration(0);
    video.play();
  } else {
    alert("This is the last episode of this anime");
  }
});

nextEpisodes.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const episode = localStorage.getItem("episode");
  if (parseInt(episode) < totalEpisodes) {
    localStorage.setItem("episode", parseInt(episode) + 1);
    document.title = `Episodes - ${localStorage.getItem("episode")}`;
    animeTitle.innerHTML = animeName + " - " + localStorage.getItem("episode");
    video.src = `./anime/1 (${localStorage.getItem("episode")}).mkv`;
    video.addEventListener("loadedmetadata", function () {
      totalDuration.innerHTML = showDuration(video.duration);
    });
    currentDuration.innerHTML = showDuration(0);
    video.play();
  } else {
    alert("This is the last episode of this anime");
  }
});

prevEpisodes.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const episode = localStorage.getItem("episode");
  if (parseInt(episode) > 1) {
    localStorage.setItem("episode", parseInt(episode) - 1);
    document.title = `Episodes - ${localStorage.getItem("episode")}`;
    animeTitle.innerHTML = animeName + " - " + localStorage.getItem("episode");
    video.src = `./anime/1 (${localStorage.getItem("episode")}).mkv`;
    video.addEventListener("loadedmetadata", function () {
      totalDuration.innerHTML = showDuration(video.duration);
    });
    video.play();
    currentDuration.innerHTML = showDuration(0);
  } else {
    alert("This is the first episode of this anime");
  }
});

videoContainer.addEventListener("click", toggleMainState);
videoContainer.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("fullscreen", document.fullscreenElement);
});
videoContainer.addEventListener("mouseleave", hideControls);
videoContainer.addEventListener("mousemove", (e) => {
  controls.classList.add("show-controls");
  hideControls();
});
videoContainer.addEventListener("touchstart", (e) => {
  controls.classList.add("show-controls");
  touchClientX = e.changedTouches[0].clientX;
  const currentTimeRect = currentTime.getBoundingClientRect();
  touchPastDurationWidth = currentTimeRect.width;
  touchStartTime = e.timeStamp;
});
videoContainer.addEventListener("touchend", () => {
  hideControls();
  touchClientX = 0;
  touchPastDurationWidth = 0;
  touchStartTime = 0;
});
videoContainer.addEventListener("touchmove", handleTouchNavigate);

controls.addEventListener("mouseenter", (e) => {
  controls.classList.add("show-controls");
  isCursorOnControls = true;
});

controls.addEventListener("mouseleave", (e) => {
  isCursorOnControls = false;
});

mainState.addEventListener("click", toggleMainState);

mainState.addEventListener("animationend", handleMainSateAnimationEnd);

muteUnmute.addEventListener("click", toggleMuteUnmute);

muteUnmute.addEventListener("mouseenter", (e) => {
  if (!muted) {
    totalVol.classList.add("show");
  } else {
    totalVol.classList.remove("show");
  }
});

muteUnmute.addEventListener("mouseleave", (e) => {
  if (e.relatedTarget != volume) {
    totalVol.classList.remove("show");
  }
});

forward.addEventListener("click", handleForward);

forwardSate.addEventListener("animationend", () => {
  forwardSate.classList.remove("show-state");
  forwardSate.classList.remove("animate-state");
});

backward.addEventListener("click", handleBackward);

backwardSate.addEventListener("animationend", () => {
  backwardSate.classList.remove("show-state");
  backwardSate.classList.remove("animate-state");
});

miniPlayer.addEventListener("click", toggleMiniPlayer);

settingsBtn.addEventListener("click", handleSettingMenu);

episodesBtn.addEventListener("click", handleEpisodeMenu);

speedButtons.forEach((btn) => {
  btn.addEventListener("click", handlePlaybackRate);
});

episodeItem.forEach((btn) => {
  btn.addEventListener("click", handleEpisode);
});

function canPlayInit() {
  totalDuration.innerHTML = showDuration(video.duration);
  video.volume = volumeVal;
  muted = video.muted;
  if (video.paused) {
    controls.classList.add("show-controls");
    mainState.classList.add("show-state");
    handleMainStateIcon(`<ion-icon name="play-outline"></ion-icon>`);
  }
}

function play() {
  video.play();
  isPlaying = true;
  playPause.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
  mainState.classList.remove("show-state");
  handleMainStateIcon(`<ion-icon name="pause-outline"></ion-icon>`);
  hideControls();
  watchProgress();
}

function watchProgress() {
  if (isPlaying) {
    requestAnimationFrame(watchProgress);
    handleProgressBar();
  }
}

function handleProgressBar() {
  currentTime.style.width = (video.currentTime / video.duration) * 100 + "%";
  currentDuration.innerHTML = showDuration(video.currentTime);
  localStorage.setItem("currentTime", video.currentTime);
}

function pause() {
  video.pause();
  isPlaying = false;
  playPause.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
  controls.classList.add("show-controls");
  mainState.classList.add("show-state");
  handleMainStateIcon(`<ion-icon name="play-outline"></ion-icon>`);
  if (video.ended) {
    currentTime.style.width = 100 + "%";
  }
}

function handleWaiting() {
  loader.style.display = "unset";
}

function handlePlaying() {
  loader.style.display = "none";
}

function navigate(e) {
  const totalDurationRect = duration.getBoundingClientRect();
  const width = Math.min(
    Math.max(0, e.clientX - totalDurationRect.x),
    totalDurationRect.width
  );
  currentTime.style.width = (width / totalDurationRect.width) * 100 + "%";
  video.currentTime = (width / totalDurationRect.width) * video.duration;
}

function handleTouchNavigate(e) {
  hideControls();
  if (e.timeStamp - touchStartTime > 500) {
    const durationRect = duration.getBoundingClientRect();
    const clientX = e.changedTouches[0].clientX;
    const value = Math.min(
      Math.max(0, touchPastDurationWidth + (clientX - touchClientX) * 0.2),
      durationRect.width
    );
    currentTime.style.width = value + "px";
    video.currentTime = (value / durationRect.width) * video.duration;
    currentDuration.innerHTML = showDuration(video.currentTime);
  }
}

function showDuration(time) {
  const hours = Math.floor(time / 60 ** 2);
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);
  if (hours > 0) {
    return `${formatter(hours)}:${formatter(min)}:${formatter(sec)}`;
  } else {
    return `${formatter(min)}:${formatter(sec)}`;
  }
}

function formatter(number) {
  return new Intl.NumberFormat({}, { minimumIntegerDigits: 2 }).format(number);
}

function toggleMuteUnmute() {
  if (!muted) {
    video.volume = 0;
    muted = true;
    muteUnmute.innerHTML = `<ion-icon name="volume-mute-outline"></ion-icon>`;
    handleMainStateIcon(`<ion-icon name="volume-mute-outline"></ion-icon>`);
    totalVol.classList.remove("show");
  } else {
    video.volume = volumeVal;
    muted = false;
    totalVol.classList.add("show");
    handleMainStateIcon(`<ion-icon name="volume-high-outline"></ion-icon>`);
    muteUnmute.innerHTML = `<ion-icon name="volume-high-outline"></ion-icon>`;
  }
}

function hideControls() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (isPlaying && !isCursorOnControls) {
      controls.classList.remove("show-controls");
      settingMenu.classList.remove("show-setting-menu");
    }
  }, 1000);
}

function toggleMainState(e) {
  e.stopPropagation();
  if (!e.path?.includes(controls)) {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }
}

function handleVolume(e) {
  const totalVolRect = totalVol.getBoundingClientRect();
  currentVol.style.width =
    Math.min(Math.max(0, e.clientX - totalVolRect.x), totalVolRect.width) +
    "px";
  volumeVal = Math.min(
    Math.max(0, (e.clientX - totalVolRect.x) / totalVolRect.width),
    1
  );
  video.volume = volumeVal;
}

function handleProgress() {
  if (!video.buffered || !video.buffered.length) {
    return;
  }
  const width = (video.buffered.end(0) / video.duration) * 100 + "%";
  buffer.style.width = width;
}

function toggleFullscreen(e) {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    handleMainStateIcon(`<ion-icon name="scan-outline"></ion-icon>`);
  } else {
    handleMainStateIcon(` <ion-icon name="contract-outline"></ion-icon>`);
    document.exitFullscreen();
  }
  e.stopPropagation();
}

function handleMousemove(e) {
  if (mouseDownProgress) {
    e.preventDefault();
    navigate(e);
  }
  if (mouseDownVol) {
    handleVolume(e);
  }
  if (mouseOverDuration) {
    const rect = duration.getBoundingClientRect();
    const width = Math.min(Math.max(0, e.clientX - rect.x), rect.width);
    const percent = (width / rect.width) * 100;
    hoverTime.style.width = width + "px";
    hoverDuration.innerHTML = showDuration((video.duration / 100) * percent);
  }
}

function handleForward(e) {
  forwardSate.classList.add("show-state");
  forwardSate.classList.add("animate-state");
  video.currentTime += 5;
  handleProgressBar();
  e?.stopPropagation();
}

function handleBackward(e) {
  backwardSate.classList.add("show-state");
  backwardSate.classList.add("animate-state");
  video.currentTime -= 5;
  handleProgressBar();
  e?.stopPropagation();
}

function handleMainStateIcon(icon) {
  mainState.classList.add("animate-state");
  mainState.innerHTML = icon;
}

function handleMainSateAnimationEnd() {
  mainState.classList.remove("animate-state");
  if (!isPlaying) {
    mainState.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
  }
  if (document.pictureInPictureElement) {
    mainState.innerHTML = ` <ion-icon name="tv-outline"></ion-icon>`;
  }
}

function toggleMiniPlayer(e) {
  e.stopPropagation();
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    handleMainStateIcon(`<ion-icon name="magnet-outline"></ion-icon>`);
  } else {
    video.requestPictureInPicture();
    handleMainStateIcon(`<ion-icon name="albums-outline"></ion-icon>`);
  }
}

function handleSettingMenu(e) {
  settingMenu.classList.toggle("show-setting-menu");
  isSpeedMenuOpen = !isSpeedMenuOpen;
  if (isEpsMenuOpen) {
    episodeMenu.classList.remove("show-episode-menu");
    isEpsMenuOpen = false;
  }
  e.stopPropagation();
}

function handleEpisodeMenu(e) {
  episodeMenu.classList.toggle("show-episode-menu");
  isEpsMenuOpen = !isEpsMenuOpen;
  if (isSpeedMenuOpen) {
    settingMenu.classList.remove("show-setting-menu");
    isSpeedMenuOpen = false;
  }
  e.stopPropagation();
}

function handlePlaybackRate(e) {
  video.playbackRate = parseFloat(e.target.dataset.value);
  speedButtons.forEach((btn) => {
    btn.classList.remove("speed-active");
  });
  e.target.classList.add("speed-active");
  settingMenu.classList.remove("show-setting-menu");
  e.stopPropagation();
}

function handleEpisode(e) {
  video.src = "./" + e.target.dataset.value;
  video.addEventListener("loadedmetadata", function () {
    totalDuration.innerHTML = showDuration(video.duration);
  });
  episodeItem.forEach((btn) => {
    btn.classList.remove("speed-active-eps");
  });
  localStorage.setItem("episode", e.target.innerHTML);
  document.title = `Episodes - ${localStorage.getItem("episode")}`;
  e.stopPropagation();
  e.target.classList.add("speed-active-eps");
  episodeMenu.classList.remove("show-episode-menu");
  currentDuration.innerHTML = showDuration(0);
  animeTitle.innerHTML = animeName + " - " + localStorage.getItem("episode");
  video.play();
}

function handlePlaybackRateKey(type = "") {
  if (type === "increase" && video.playbackRate < 2) {
    video.playbackRate += 0.25;
  } else if (video.playbackRate > 0.25 && type !== "increase") {
    video.playbackRate -= 0.25;
  }
  handleMainStateIcon(
    `<span style="font-size: 1.4rem">${video.playbackRate}x</span>`
  );
  speedButtons.forEach((btn) => {
    btn.classList.remove("speed-active");
    if (btn.dataset.value == video.playbackRate) {
      btn.classList.add("speed-active");
    }
  });
}

function handleShorthand(e) {
  const tagName = document.activeElement.tagName.toLowerCase();
  if (tagName === "input") return;
  // if (e.key.match(/[0-9]/gi)) {
  //   video.currentTime = (video.duration / 100) * (parseInt(e.key) * 10);
  currentTime.style.width = parseInt(e.key) * 10 + "%";
  // }
  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      break;
    case "f":
      toggleFullscreen();
      break;
    case "arrowright":
      handleForward();
      break;
    case "arrowleft":
      handleBackward();
      break;
    case "t":
      toggleTheater();
      break;
    case "i":
      toggleMiniPlayer();
      break;
    case "m":
      toggleMuteUnmute();
      break;
    case "+":
      handlePlaybackRateKey("increase");
      break;
    case "-":
      handlePlaybackRateKey();
      break;
    default:
      break;
  }
}
