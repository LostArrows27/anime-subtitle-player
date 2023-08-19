"use client";
import { useContext, useEffect } from "react";
import { NodeCue } from "subtitle";
import { AppContext } from "../provides/providers";
import InVideoSubtitle from "../subtitle/inVideoSubtitle";
import { FiPlay } from "react-icons/fi";
import {
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoVolumeHighOutline,
  IoAlbumsOutline,
  IoOptionsOutline,
  IoScanOutline,
  IoContractOutline,
  IoPlayOutline,
} from "react-icons/io5";
function Video() {
  const {
    videoRef,
    setCurrentSubtitle,
    showBorder,
    subTitle,
    subPos,
    setCurrentSubIndex,
    setShowBorder,
    subtitleSyncDiff,
  } = useContext(AppContext);

  useEffect(() => {
    if (videoRef?.current && videoRef.current.src) {
      setShowBorder(false);
    }
  }, [videoRef?.current?.src]);

  useEffect(() => {
    if (videoRef!.current) {
      videoRef!.current.ontimeupdate = (e) => {
        const curSubIndex: number = subTitle!.current.findIndex(
          (value: NodeCue) => {
            let currentTime = parseFloat(
              videoRef!.current?.currentTime.toFixed(3) as string
            );
            console.log(subtitleSyncDiff);

            return (
              currentTime >= value.data.start / 1000 + subtitleSyncDiff &&
              currentTime <= value.data.end / 1000 + subtitleSyncDiff
            );
          }
        );
        setCurrentSubIndex(curSubIndex);
        if (curSubIndex === -1) {
          setCurrentSubtitle({ text: "", start: -100, end: -100 });
        }
        let currentSubFound = subTitle!.current[curSubIndex];
        setCurrentSubtitle({
          text: currentSubFound?.data.text,
          start: currentSubFound?.data.start,
          end: currentSubFound?.data.end,
        });
      };
    }
  }, [videoRef!.current, subtitleSyncDiff]);

  return (
    <div
      className={`relative video-container text-white overflow-hidden bg-[rgb(25,25,25)] flex justify-center items-center ${
        showBorder ? "border-green-500 border-solid border-2" : ""
      } ${
        subPos === "under-video"
          ? `w-[928px] h-[522px]`
          : "w-[1024px] h-[576px]"
      }`}
    >
      <InVideoSubtitle />
      {showBorder ? (
        <div
          onClick={() => {
            (
              document.querySelector('[for="file-upload"]') as HTMLElement
            )?.click();
          }}
          className="h-[70px] z-[999] w-[70px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <FiPlay
            className="animate-pulse glow-element text-green-500 cursor-pointer"
            size="70px"
          />
        </div>
      ) : (
        ""
      )}
      <video ref={videoRef} id="video" disableRemotePlayback></video>
      <span className="custom-loader"></span>
      <div className="player-state">
        <span className="state-btn state-backward">
          <span id="play-back-outline">
            <IoPlayBackOutline size="17px" />
          </span>
          <span className="backward-duration">5</span>
        </span>
        <span className="main-state state-btn">
          <span id="play-outline">
            <IoPlayOutline size="17px" />
          </span>
        </span>
        <span className="state-btn state-forward">
          <span className="forward-duration">5</span>
          <span id="play-forward-outline">
            <IoPlayForwardOutline size="17px" />
          </span>
        </span>
      </div>
      <div className="controls">
        <div className="duration">
          <div className="current-time"></div>
          <div className="hover-time">
            <span className="hover-duration"></span>
          </div>
          <div className="buffer"></div>
        </div>
        <div className="btn-controls">
          <div className="btn-con">
            <span className="play-pause control-btn">
              <span id="play-outline-1">
                <IoPlayOutline size="17px" />
              </span>
            </span>
            <span className="volume">
              <span className="mute-unmute control-btn">
                <span id="volume-high-outline">
                  <IoVolumeHighOutline size="17px" />
                </span>
              </span>
              <div className="max-vol">
                <div className="current-vol"></div>
              </div>
            </span>
            <span className="time-container">
              <span className="current-duration">0:00</span>
              <span>/</span>
              <span className="total-duration">0:00</span>
            </span>
          </div>
          <div className="right-controls">
            <span className="backward control-btn" title="5 backward">
              <span id="play-back-outline-1">
                <IoPlayBackOutline size="17px" />
              </span>
            </span>
            <span className="forward control-btn" title="5 forward">
              <span id="play-forward-outline-1">
                <IoPlayForwardOutline size="17px" />
              </span>
            </span>
            <span className="mini-player control-btn">
              <span id="albums-outline">
                <IoAlbumsOutline size="17px" />
              </span>
            </span>
            <span className="settings control-btn">
              <span className="setting-btn">
                <span id="options-outline">
                  <IoOptionsOutline size="17px" />
                </span>
              </span>
              <ul className="setting-menu">
                <li data-value="0.25">0.25x</li>
                <li data-value="0.5">0.5x</li>
                <li data-value="0.75">0.75x</li>
                <li data-value="1" className="speed-active">
                  1x
                </li>
                <li data-value="1.25">1.25x</li>
                <li data-value="1.5">1.5x</li>
                <li data-value="1.75">1.75x</li>
                <li data-value="2">2x</li>
              </ul>
            </span>
            <span className="fullscreen-btn control-btn" title="fullscreen">
              <span className="full">
                <span id="scan-outline">
                  <IoScanOutline size="17px" />
                </span>
              </span>
              <span className="contract">
                <span id="contract-outline">
                  <IoContractOutline size="17px" />
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Video };
