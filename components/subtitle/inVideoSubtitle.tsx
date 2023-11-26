"use client";

import Draggable from "react-draggable";
import {
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import { CurrentWordTraslation, WordTraslationContent } from "@/types/type";
import { NodeCue } from "subtitle";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../provides/providers";
import { convertFontName } from "@/lib/convertFontName";
import useTranslation from "@/hooks/useTraslation";

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

export type WordTranslate = {
  position: number;
  data: WordTraslationContent | undefined;
  origin: string;
};

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
    isSyncingSubtitle,
  } = useContext(AppContext);
  const [newFuriganaOne, setNewFuriganaOne] = useState<JSX.Element[]>([
    <div key="1"></div>,
  ]);

  const textRef = useRef<HTMLDivElement>(null);

  const { handleMouseMove, parseText } = useTranslation(textRef);

  const handleMouseEnter = () => {
    setIsHoverSubtitle(true);
    if (videoRef?.current?.paused) {
      setPreventPlaying(true);
    } else {
      videoRef?.current?.pause();
      setPreventPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHoverSubtitle(false);
    if (!preventPlaying) {
      videoRef?.current?.play();
    }
  };

  if (subPos === "under-video" || !showSubtitle) return;
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
              ref={textRef}
              onMouseEnter={async () => {
                handleMouseEnter();
                await handleMouseMove();
              }}
              onMouseLeave={handleMouseLeave}
              // onMouseMove={handleMouseMove}
              style={{
                ...subTitleTextStyle,
                fontWeight: currentFont.fontWeight,
                fontFamily: fontName,
                fontSize: fontSize,
                position: "relative",
              }}
              className={`${isTextShadow ? "text-shadow-black" : ""} ${
                isSyncingSubtitle ? "!text-[lime]" : "!text-white"
              }`}
            >
              {parseText(text!)}
              {/* <div>{!!currentSubtitle?.text ? newFuriganaOne : text}</div> */}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

// useEffect(() => {
//   async function setFurigana() {
//     if (text === "" || text === undefined) return;
//     const translationResult = (await fetch("/api/breakdown", {
//       method: "POST",
//       body: JSON.stringify({ sentence: text }),
//       cache: "force-cache",
//     }).then((res) => res.json())) as WordTranslationReturnType;
//     // setNewFuriganaOne(
//     //   translationResult.content.sentence.parts
//     //     .slice(0, -3)
//     //     .map((value: WordPart, key: number) => {
//     //       if (!!value.furigana) {
//     //         return <FuriganaSentece text={value.furigana} key={key} />;
//     //       }
//     //       return <span key={key}>{value.inflected}</span>;
//     //     })
//     // );
//     console.log(translationResult.content.sentence.parts.slice(0, -3));
//   }
//   setNewFuriganaOne([<div key="0">{text}</div>]);
//   setFurigana();
// }, [currentSubtitle?.text]);

export default InVideoSubtitle;
