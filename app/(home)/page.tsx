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
import { useRef, useState } from "react";
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
  };

  return (
    <Providers appProps={props}>
      <div
        className={
          subPos !== "under-video"
            ? "flex flex-col items-center w-full relative"
            : `flex !h-[522px] relative justify-center w-full`
        }
      >
        <Headers />
        <div
          className={
            subPos === "right-video"
              ? "flex items-center justify-between w-full px-4"
              : ""
          }
        >
          <Video />
          <BesideSubtitle />
        </div>
      </div>
      {subPos === "under-video" ? <UnderVideoSubtitle /> : <></>}
    </Providers>
  );
}

export default Page;
