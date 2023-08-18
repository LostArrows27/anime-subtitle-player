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
  const { currentSubtitle, isSubtitle, subPos, currentFont, fontSize } =
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
              style={{
                ...subTitleTextStyle,
                fontWeight: currentFont.fontWeight,
                fontFamily: convertFontName(currentFont.name as FontName),
                fontSize: fontSize,
              }}
              className="text-shadow-black"
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
