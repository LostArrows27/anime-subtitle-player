"use client";
import { useContext, useEffect } from "react";
import { NodeCue } from "subtitle";
import { AppContext } from "../provides/providers";
import InVideoSubtitle from "../subtitle/inVideoSubtitle";

function Video() {
  const { videoRef, setCurrentSubtitle, subTitle, subPos } =
    useContext(AppContext);

  useEffect(() => {
    if (videoRef!.current) {
      videoRef!.current.ontimeupdate = (e) => {
        const curSub: NodeCue | undefined = subTitle!.current.find(
          (value: NodeCue) => {
            let currentTime = parseFloat(
              videoRef!.current?.currentTime.toFixed(3) as string
            );
            return (
              currentTime >= value.data.start / 1000 &&
              currentTime <= value.data.end / 1000
            );
          }
        );
        if (curSub === undefined) {
          setCurrentSubtitle({ text: "", start: -100, end: -100 });
        }
        setCurrentSubtitle({
          text: curSub?.data.text,
          start: curSub?.data.start,
          end: curSub?.data.end,
        });
      };
    }
  }, [videoRef]);

  return (
    <div
      className={`relative video-container text-white overflow-hidden bg-[rgb(25,25,25)] flex justify-center items-center ${
        subPos === "under-video"
          ? `w-[928px] h-[522px]`
          : "w-[1024px] h-[576px]"
      }`}
    >
      <InVideoSubtitle />
      <video ref={videoRef} id="video" disableRemotePlayback></video>
      <span className="custom-loader"></span>
      <div className="player-state">
        <span className="state-btn state-backward">
          <span id="play-back-outline"></span>
          <span className="backward-duration">5</span>
        </span>
        <span className="main-state state-btn">
          <span id="play-outline"></span>
        </span>
        <span className="state-btn state-forward">
          <span className="forward-duration">5</span>
          <span id="play-forward-outline"></span>
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
              <span id="play-outline-1"></span>
            </span>
            <span className="volume">
              <span className="mute-unmute control-btn">
                <span id="volume-high-outline"></span>
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
              <span id="play-back-outline-1"></span>
            </span>
            <span className="forward control-btn" title="5 forward">
              <span id="play-forward-outline-1"></span>
            </span>
            <span className="mini-player control-btn">
              <span id="albums-outline"></span>
            </span>
            <span className="settings control-btn">
              <span className="setting-btn">
                <span id="options-outline"></span>
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
            <span className="theater-btn control-btn">
              <span className="theater-default">
                <span id="tablet-landscape-outline"></span>
              </span>
              <span className="theater-active">
                <span id="tv-outline"></span>
              </span>
            </span>
            <span className="fullscreen-btn control-btn" title="fullscreen">
              <span className="full">
                <span id="scan-outline"></span>
              </span>
              <span className="contract">
                <span id="contract-outline"></span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Video };
