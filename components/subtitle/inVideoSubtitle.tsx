"use client";

import Draggable from "react-draggable";
import {
  WordPart,
  WordTranslationReturnType,
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import { NodeCue } from "subtitle";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../provides/providers";
import { convertFontName } from "@/lib/convertFontName";
import FuriganaSentece from "./furiganaText";

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
  const [newFuriganaOne, setNewFuriganaOne] = useState<JSX.Element[]>([
    <div key="1"></div>,
  ]);

  useLayoutEffect(() => {
    async function setFurigana() {
      if (text === "" || text === undefined) return;
      const translationResult = (await fetch("/api/breakdown", {
        method: "POST",
        body: JSON.stringify({ sentence: text }),
        cache: "force-cache",
      }).then((res) => res.json())) as WordTranslationReturnType;
      setNewFuriganaOne(
        translationResult.content.sentence.parts
          .slice(0, -3)
          .map((value: WordPart, key: number) => {
            if (!!value.furigana) {
              return <FuriganaSentece text={value.furigana} key={key} />;
            }
            return <span key={key}>{value.inflected}</span>;
          })
      );
    }
    setNewFuriganaOne([<div key="0">{text}</div>]);
    setFurigana();
  }, [currentSubtitle?.text]);

  if (subPos !== "in-video" || !showSubtitle) return;
  let fontName = convertFontName(currentFont.name);
  let text = currentSubtitle?.text;

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
              onMouseEnter={async () => {
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
                fontFamily: fontName,
                fontSize: fontSize,
              }}
              className={`${isTextShadow ? "text-shadow-black" : ""}`}
            >
              {/* {text} */}
              <div>{!!currentSubtitle?.text ? newFuriganaOne : text}</div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default InVideoSubtitle;
