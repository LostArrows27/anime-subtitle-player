"use client";

import Draggable from "react-draggable";
import {
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import {
  CurrentWordTraslation,
  WordPart,
  WordTranslationReturnType,
} from "@/types/type";
import { NodeCue } from "subtitle";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AppContext } from "../provides/providers";
import { convertFontName } from "@/lib/convertFontName";
import FuriganaSentece from "./furiganaText";

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

type WordTranslate = {
  position: number;
  data: CurrentWordTraslation[] | undefined;
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
    isCtrlPressed,
  } = useContext(AppContext);
  const [newFuriganaOne, setNewFuriganaOne] = useState<JSX.Element[]>([
    <div key="1"></div>,
  ]);
  const [sentence, setSentence] = useState<string>("This is english");
  const [breakDownSentence, setBreakDownSentence] = useState<WordPart[]>([]);
  const [wordTranslation, setWordTranslation] = useState<WordTranslate[]>([]);

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

  const getSentenceBreakdown = async (index: number = 0) => {
    return (await fetch("/api/breakdown", {
      method: "POST",
      body: JSON.stringify({ sentence: text, wordIndex: index }),
      cache: "force-cache",
    }).then((res) => res.json())) as WordTranslationReturnType;
  };

  const getWordPart = async (index: number = 0) => {
    const translationResult = await getSentenceBreakdown(index);
    return translationResult.content.sentence.parts.slice(0, -3);
  };

  const getWordTranslation = async (index: number = 0) => {
    const translationResult = await getSentenceBreakdown(index);
    return translationResult.content.words;
  };

  const handleMouseMove = async () => {
    if (!isCtrlPressed || sentence === text) return;
    setSentence(text!);
    const translationResult = await getWordPart();
    console.log(translationResult);
    setBreakDownSentence(translationResult);
  };

  const breakDownSentenceToJSX = () => {
    return (
      <>
        {breakDownSentence.map((value: WordPart, key: number) => {
          return (
            <span
              onMouseEnter={async () => {
                //TODO: handle pop over dictionaries
                //TODO: handle multiple pop-up (not fetch done this word => jump to next word)
                // 1: multiple pop-up
                // 2: 1 pop-up moving
                if (
                  value.word_class === undefined ||
                  value.word_class === "Symbol" ||
                  value.word_class === "Space"
                )
                  return;
                if (!isCtrlPressed) return;
                console.log("hover to: ", value.inflected);
                const result = wordTranslation.find(
                  (wordTranslate: WordTranslate, index: number) => {
                    return value.position === wordTranslate.position;
                  }
                );
                // have fetched before
                if (result !== undefined) {
                  console.log("found: ", result.data);
                  return;
                }
                // haven't fetched before
                console.log("fetching: ", value.inflected);
                const newWordTranslation = await getWordTranslation(
                  value.position
                );
                console.log("fetched: ", newWordTranslation);
                setWordTranslation((prev) => {
                  return [
                    ...prev,
                    {
                      position: value.position,
                      data: newWordTranslation,
                    },
                  ];
                });
                return;
              }}
              className="text-green-500"
              key={key}
            >
              {value.inflected}
            </span>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    setBreakDownSentence([]); // every time the subtitle changes, reset the breakdown sentence
    // async function setFurigana() {
    //   if (text === "" || text === undefined) return;
    //   const translationResult = (await fetch("/api/breakdown", {
    //     method: "POST",
    //     body: JSON.stringify({ sentence: text }),
    //     cache: "force-cache",
    //   }).then((res) => res.json())) as WordTranslationReturnType;
    //   // setNewFuriganaOne(
    //   //   translationResult.content.sentence.parts
    //   //     .slice(0, -3)
    //   //     .map((value: WordPart, key: number) => {
    //   //       if (!!value.furigana) {
    //   //         return <FuriganaSentece text={value.furigana} key={key} />;
    //   //       }
    //   //       return <span key={key}>{value.inflected}</span>;
    //   //     })
    //   // );
    //   console.log(translationResult.content.sentence.parts.slice(0, -3));
    // }
    // setNewFuriganaOne([<div key="0">{text}</div>]);
    // setFurigana();
  }, [currentSubtitle?.text]);

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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              style={{
                ...subTitleTextStyle,
                fontWeight: currentFont.fontWeight,
                fontFamily: fontName,
                fontSize: fontSize,
              }}
              className={`${isTextShadow ? "text-shadow-black" : ""} ${
                isSyncingSubtitle ? "!text-[lime]" : "!text-white"
              }`}
            >
              {breakDownSentence.length > 0 ? breakDownSentenceToJSX() : text}
              {/* <div>{!!currentSubtitle?.text ? newFuriganaOne : text}</div> */}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default InVideoSubtitle;
