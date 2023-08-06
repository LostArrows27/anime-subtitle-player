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

type Subtitle = { start?: number; end?: number; text?: string };

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

function Subtitle() {
  const {
    currentSubtitle,
    setCurrentSubtitle,
    isSubtitle,
    setSubtitle,
    setIsSubtitle,
  } = useContext(AppContext);

  return (
    <Draggable
      defaultClassName="jss3 react-draggable relative"
      axis="y"
      disabled={!isSubtitle}
    >
      <div
        style={containerStyle}
        className={currentSubtitle === "" ? "hidden" : ""}
      >
        <div style={subTitleWrapperStyle}>
          <div style={subTitleAreaStyle}>
            <div style={subTitleTextStyle}>{currentSubtitle}</div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Subtitle;
