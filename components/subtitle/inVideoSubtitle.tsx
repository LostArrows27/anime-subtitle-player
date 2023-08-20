"use client";

import Draggable from "react-draggable";
import {
  FontName,
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import { NodeCue } from "subtitle";
import { useContext } from "react";
import { AppContext } from "../provides/providers";
import { convertFontName } from "@/lib/convertFontName";

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

function InVideoSubtitle() {
  const {
    currentSubtitle,
    isSubtitle,
    subPos,
    currentFont,
    fontSize,
    backgroundOpacity,
    showSubtitle,
    setIsHoverSubtitle,
    preventPlaying,
    setPreventPlaying,
    videoRef,
    isTextShadow,
  } = useContext(AppContext);

  if (subPos !== "in-video" || !showSubtitle) return;

  return (
    <Draggable
      defaultClassName="jss3 react-draggable relative"
      axis="y"
      disabled={!isSubtitle}
    >
      <div
        style={containerStyle}
        className={currentSubtitle?.text === "" ? "hidden" : ""}
      >
        <div
          style={{
            ...subTitleWrapperStyle,
            backgroundColor: `rgba(0,0,0,${backgroundOpacity})`,
            width: !!currentSubtitle?.text ? "auto" : "0",
            height: !!currentSubtitle?.text ? "auto" : "0",
          }}
        >
          <div style={subTitleAreaStyle}>
            <div
              onMouseEnter={() => {
                setIsHoverSubtitle(true);
                if (videoRef?.current?.paused) {
                  setPreventPlaying(true);
                } else {
                  videoRef?.current?.pause();
                  setPreventPlaying(false);
                }
              }}
              onMouseLeave={() => {
                setIsHoverSubtitle(false);
                if (!preventPlaying) {
                  videoRef?.current?.play();
                }
              }}
              style={{
                ...subTitleTextStyle,
                fontWeight: currentFont.fontWeight,
                fontSize: fontSize,
              }}
              className={`${convertFontName(currentFont.name as FontName)} ${
                isTextShadow ? "text-shadow-black" : ""
              }`}
            >
              {currentSubtitle?.text}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default InVideoSubtitle;
