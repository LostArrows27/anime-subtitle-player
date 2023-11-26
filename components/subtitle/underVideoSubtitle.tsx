"use client";

import { useCallback, useContext, useMemo, useRef } from "react";
import { AppContext } from "../provides/providers";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { NodeCue } from "subtitle";
import { convertFontName } from "@/lib/convertFontName";
import { FontName } from "@/types/type";
import useTranslation from "@/hooks/useTraslation";

function UnderVideoSubtitle() {
  const {
    currentSubtitle,
    videoRef,
    subTitle,
    setCurrentSubtitle,
    currentFont,
    fontSize,
    subtitleSyncDiff,
    setIsHoverSubtitle,
    preventPlaying,
    setPreventPlaying,
    isTextShadow,
    isSyncingSubtitle,
  } = useContext(AppContext);

  let text = currentSubtitle?.text;
  let fontName = convertFontName(currentFont.name);

  const handlePrevSubtitle = useCallback(() => {
    let currentTime = videoRef?.current?.currentTime as number;
    if (currentTime === undefined) return;
    let newArray = subTitle?.current.filter((sub: NodeCue) => {
      return sub.data.end / 1000 + subtitleSyncDiff < currentTime;
    });
    if (newArray === undefined) return;
    let prevSubIndex = newArray[newArray.length - 1];
    if (!prevSubIndex?.data) return;
    videoRef!.current!.currentTime =
      prevSubIndex.data.start / 1000 + subtitleSyncDiff + 0.0001;
    setCurrentSubtitle({
      start: prevSubIndex.data.start,
      end: prevSubIndex.data.end,
      text: prevSubIndex.data.text,
    });
  }, [subtitleSyncDiff]);

  const handleNextSubtitle = useCallback(() => {
    let currentTime = videoRef?.current?.currentTime as number;
    if (currentTime === undefined) return;
    let nextSubIndex: NodeCue | undefined = subTitle?.current.find(
      (sub: NodeCue) => {
        return sub.data.start / 1000 + subtitleSyncDiff > currentTime;
      }
    );
    if (nextSubIndex === undefined) return;
    videoRef!.current!.currentTime =
      nextSubIndex.data.start / 1000 + subtitleSyncDiff + 0.0001;
    setCurrentSubtitle({
      start: nextSubIndex.data.start,
      end: nextSubIndex.data.end,
      text: nextSubIndex.data.text,
    });
  }, [subtitleSyncDiff]);

  const sentenceRef = useRef(null);

  const { parseText, handleMouseMove } = useTranslation(sentenceRef);

  return (
    <div
      className={`relative w-full h-[calc(100vh-522px)] bg-[rgb(25,25,25)] px-[calc((100vw-840px)/2)] flex justify-center items-cen`}
    >
      <BsChevronLeft
        onClick={handlePrevSubtitle}
        size="40px"
        className="absolute left-[calc((100vw-1250px)/2)] top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-500 active:text-green-500 cursor-pointer"
      />
      <div className="relative flex items-center justify-center h-full">
        {subTitle?.current.length === 0 ? (
          <span
            style={{ fontFamily: fontName }}
            className="mt-2 text-2xl text-center text-gray-700 select-none"
          >
            - Please upload your subtitle -
          </span>
        ) : (
          <span
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
              fontWeight: currentFont.fontWeight,
              fontSize: fontSize,
              fontFamily: fontName,
            }}
            className={`${
              isTextShadow ? "text-shadow-black" : ""
            } text-center leading-[50px] ${
              isSyncingSubtitle ? "!text-[lime]" : "!text-white"
            }`}
            ref={sentenceRef}
            onMouseMove={handleMouseMove}
          >
            {parseText(text!)}
          </span>
        )}
      </div>
      <BsChevronRight
        onClick={handleNextSubtitle}
        size="40px"
        className="absolute right-[calc((100vw-1250px)/2)] top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-500 active:text-green-500 cursor-pointer"
      />
    </div>
  );
}

export default UnderVideoSubtitle;
