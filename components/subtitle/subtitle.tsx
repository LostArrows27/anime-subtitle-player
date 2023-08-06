"use client";

import Draggable from "react-draggable";
import {
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import {
  compile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";
import { NodeCue, parseSync } from "subtitle";
import { Input } from "@chakra-ui/react";

type Subtitle = { start?: number; end?: number; text?: string };

function msToMinSecMs(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const paddedMilliseconds =
    milliseconds < 100 ? `0${milliseconds}` : milliseconds;
  return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
}

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

function Subtitle(props: any) {
  const {
    currentSubtitle,
    setCurrentSubtitle,
    isSubtitle,
    setSubtitle,
    setIsSubtitle,
  } = props;

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
