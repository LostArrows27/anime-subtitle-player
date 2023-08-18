"use client";

import Draggable from "react-draggable";
import {
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import { NodeCue } from "subtitle";
import { useContext } from "react";
import { AppContext } from "../provides/providers";

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

function InVideoSubtitle() {
  const { currentSubtitle, isSubtitle, subPos, currentFont } =
    useContext(AppContext);

  if (subPos !== "in-video") return;

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
        <div style={subTitleWrapperStyle}>
          <div style={subTitleAreaStyle}>
            <div
              style={{...subTitleTextStyle, fontWeight: currentFont.fontWeight}}
              className={`text-shadow-black font-['${currentFont.name}'] text-[45px]`}
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
