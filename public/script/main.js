import {
  playIcon,
  pauseIcon,
  volumeHighIcon,
  volumeMuteIcon,
  fullScreenIcon,
  contractIcon,
  tvOutLineIcon,
  magnetIcon,
  albumIcon,
} from "../svg/icon.js";

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
const speedButtons = document.querySelectorAll(".setting-menu li");
const backwardSate = document.querySelector(".state-backward");
const forwardSate = document.querySelector(".state-forward");
const loader = document.querySelector(".custom-loader");
const fileUpload = document.querySelector("#file-upload");

let isPlaying = false,
  mouseDownProgress = false,
  mouseDownVol = false,
  isCursorOnControls = false,
  muted = false,
  timeout = 0,
  volumeVal = 1,
  mouseOverDuration = false,
  touchClientX = 0,
  touchPastDurationWidth = 0,
  touchStartTime = 0,
  isSpeedMenuOpen = false;

fileUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const fileTitle = file.name.split(".")[0];
  const filePath = URL.createObjectURL(file);
  video.src = filePath;
  video.addEventListener("loadedmetadata", function () {
    totalDuration.innerHTML = showDuration(video.duration);
  });
  isPlaying = true;
  playPause.innerHTML = pauseIcon(17, 17);
  mainState.classList.remove("show-state");
  handleMainStateIcon(pauseIcon(40, 40));
  hideControls();
  video.play();
  currentDuration.innerHTML = showDuration(0);
  document.title = fileTitle;
});

currentVol.style.width = volumeVal * 100 + "%";

video.addEventListener("loadedmetadata", canPlayInit);

function canPlayInit() {
  totalDuration.innerHTML = showDuration(video.duration);
  video.volume = volumeVal;
  muted = video.muted;
  if (video.paused) {
    controls.classList.add("show-controls");
    mainState.classList.add("show-state");
    handleMainStateIcon(playIcon(40, 40));
  }
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

  video.addEventListener("ended", (e) => {
    e.stopPropagation();
    e.preventDefault();
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

  speedButtons.forEach((btn) => {
    btn.addEventListener("click", handlePlaybackRate);
  });
}

function showDuration(time) {
  if (isNaN(time)) {
    return `0:00`;
  }
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

function handleMainStateIcon(icon) {
  mainState.classList.add("animate-state");
  mainState.innerHTML = icon;
}

function play() {
  if (!!video.src && !isPlaying) {
    video.play();
    isPlaying = true;
    playPause.innerHTML = pauseIcon(17, 17);
    mainState.classList.remove("show-state");
    handleMainStateIcon(pauseIcon(40, 40));
    hideControls();
    watchProgress();
  }
}

function watchProgress() {
  if (isPlaying) {
    requestAnimationFrame(watchProgress);
    handleProgressBar();
  }
}

function handleProgressBar() {
  // console.log(`%c${video.currentTime}`, "color: red");
  currentTime.style.width = (video.currentTime / video.duration) * 100 + "%";
  currentDuration.innerHTML = showDuration(video.currentTime);
}

function pause() {
  video.pause();
  isPlaying = false;
  playPause.innerHTML = playIcon(17, 17);
  controls.classList.add("show-controls");
  mainState.classList.add("show-state");
  handleMainStateIcon(playIcon(40, 40));
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
  video.currentTime = (width / totalDurationRect.width) * video.duration;
  console.log(`%c${video.currentTime}`, "color: blue");
  currentTime.style.width = (video.currentTime / video.duration) * 100 + "%";
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

function toggleMuteUnmute() {
  if (!muted) {
    video.volume = 0;
    muted = true;
    muteUnmute.innerHTML = volumeMuteIcon(17, 17);
    handleMainStateIcon(volumeMuteIcon(40, 40));
    totalVol.classList.remove("show");
  } else {
    video.volume = volumeVal;
    muted = false;
    totalVol.classList.add("show");
    handleMainStateIcon(volumeHighIcon(40, 40));
    muteUnmute.innerHTML = volumeHighIcon(17, 17);
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
    handleMainStateIcon(fullScreenIcon(40, 40));
  } else {
    handleMainStateIcon(contractIcon(40, 40));
    document.exitFullscreen();
  }
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

function handleMainSateAnimationEnd() {
  mainState.classList.remove("animate-state");
  if (!isPlaying) {
    mainState.innerHTML = playIcon(40, 40);
  }
  if (document.pictureInPictureElement) {
    mainState.innerHTML = tvOutLineIcon(40, 40);
  }
}

function toggleMiniPlayer(e) {
  e.stopPropagation();
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    handleMainStateIcon(magnetIcon(40, 40));
  } else {
    video.requestPictureInPicture();
    handleMainStateIcon(albumIcon(40, 40));
  }
}

function handleSettingMenu(e) {
  settingMenu.classList.toggle("show-setting-menu");
  isSpeedMenuOpen = !isSpeedMenuOpen;
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
  //   currentTime.style.width = parseInt(e.key) * 10 + "%";
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
