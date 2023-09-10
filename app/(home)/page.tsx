"use client";

import { Headers } from "@/components/main/headers";
import { Video } from "@/components/main/video";
import { Providers } from "@/components/provides/providers";
import BesideSubtitle from "@/components/subtitle/besideSubtitle";
import UnderVideoSubtitle from "@/components/subtitle/underVideoSubtitle";
import {
  AppProviderProps,
  FontOption,
  SubPosition,
  Subtitle,
} from "@/types/type";
import { fonts } from "@/utils/const";
import { useCallback, useEffect, useRef, useState } from "react";
import { NodeCue } from "subtitle";

function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  let subTitle = useRef<NodeCue[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle>({
    text: "",
    start: -100,
    end: -100,
  });
  const [isSubtitle, setIsSubtitle] = useState<boolean>(false);
  const [subPos, setSubPos] = useState<SubPosition>("in-video");
  const [currentSubIndex, setCurrentSubIndex] = useState<number>(-1);
  const [showBorder, setShowBorder] = useState<boolean>(true);
  const [currentFont, setCurrentFont] = useState<FontOption>(fonts.simsunBold);
  const [fontSize, setFontSize] = useState<number>(45);
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(0);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(true);
  const [subtitleSyncDiff, setSubtitleSyncDiff] = useState<number>(0);
  const [isHoverSubtitle, setIsHoverSubtitle] = useState<boolean>(false);
  const [preventPlaying, setPreventPlaying] = useState<boolean>(false);
  const [isTextShadow, setIsTextShadow] = useState<boolean>(true);
  const [isSyncingSubtitle, setIsSyncingSubtitle] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [video, setVideo] = useState<File | null>(null);
  const [isCtrlPressed, setIsCtrlPressed] = useState<boolean>(false);

  const setSubtitle = (data: NodeCue[]): void => {
    subTitle.current = data;
  };

  const props: AppProviderProps = {
    videoRef: videoRef,
    currentSubtitle,
    setCurrentSubtitle,
    isSubtitle,
    setIsSubtitle,
    setSubtitle,
    subTitle,
    subPos,
    setSubPos,
    currentSubIndex,
    setCurrentSubIndex,
    showBorder,
    setShowBorder,
    currentFont,
    setCurrentFont,
    fontSize,
    setFontSize,
    backgroundOpacity,
    setBackgroundOpacity,
    showSubtitle,
    setShowSubtitle,
    subtitleSyncDiff,
    setSubtitleSyncDiff,
    isHoverSubtitle,
    setIsHoverSubtitle,
    preventPlaying,
    setPreventPlaying,
    isTextShadow,
    setIsTextShadow,
    isSyncingSubtitle,
    setIsSyncingSubtitle,
    openMenu,
    setOpenMenu,
    video,
    setVideo,
    isCtrlPressed,
    setIsCtrlPressed,
  };

  const handlepPrevSub = useCallback(() => {
    let currentTime = videoRef?.current?.currentTime as number;
    if (currentTime === undefined) return;
    let newArray = subTitle?.current.filter((sub: NodeCue) => {
      return sub.data.end / 1000 + subtitleSyncDiff < currentTime;
    });
    if (newArray === undefined) return;
    let prevSubIndex = newArray[newArray.length - 1];
    if (!prevSubIndex?.data) return;
    console.log(prevSubIndex.data.start / 1000);
    console.log(subtitleSyncDiff);

    videoRef!.current!.currentTime =
      prevSubIndex.data.start / 1000 + subtitleSyncDiff;
    setCurrentSubtitle({
      start: prevSubIndex.data.start,
      end: prevSubIndex.data.end,
      text: prevSubIndex.data.text,
    });
  }, [subtitleSyncDiff]);

  const handleNextSub = useCallback(() => {
    let currentTime = videoRef?.current?.currentTime as number;
    if (currentTime === undefined) return;
    let nextSubIndex: NodeCue | undefined = subTitle?.current.find(
      (sub: NodeCue) => {
        return sub.data.start / 1000 + subtitleSyncDiff > currentTime;
      }
    );
    if (nextSubIndex === undefined) return;
    videoRef!.current!.currentTime =
      nextSubIndex.data.start / 1000 + subtitleSyncDiff;
    setCurrentSubtitle({
      start: nextSubIndex.data.start,
      end: nextSubIndex.data.end,
      text: nextSubIndex.data.text,
    });
  }, [subtitleSyncDiff]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "c":
          // toggle subtitle
          setShowSubtitle((prev) => !prev);
          break;
        case "a":
          // prev subtitle
          handlepPrevSub();
          break;
        case "d":
          // next subtitle
          handleNextSub();
          break;
        case "w":
          // sync subtitle earlier 1s
          setSubtitleSyncDiff((prev) => prev - 1);
          setIsSyncingSubtitle(true);
          break;
        case "s":
          // sync subtitle later 1s
          setSubtitleSyncDiff((prev) => prev + 1);
          setIsSyncingSubtitle(true);
          break;
        case "q":
          // toggle setting menu open
          setOpenMenu((prev) => !prev);
          break;
        case "Control":
          setIsCtrlPressed(true);
          break;
        default:
      }
    },
    [handleNextSub, handlepPrevSub]
  );

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === "w" || event.key === "s") {
      setIsSyncingSubtitle(false);
      return;
    }
    if (event.key === "Control") {
      setIsCtrlPressed(false);
      return;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.addEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, handleKeyUp]);

  return (
    <Providers appProps={props}>
      <div
        id="hoverDiv"
        className={
          subPos !== "under-video" || !showSubtitle
            ? "flex flex-col items-center w-full relative"
            : `flex !h-[522px] relative justify-center w-full`
        }
      >
        <Headers />
        <div
          className={
            subPos === "right-video" && showSubtitle
              ? "flex items-center justify-between w-full px-4"
              : ""
          }
        >
          <Video />
          {showSubtitle && <BesideSubtitle />}
        </div>
      </div>
      {subPos === "under-video" && showSubtitle ? (
        <UnderVideoSubtitle />
      ) : (
        <></>
      )}
    </Providers>
  );
}

export default Page;
