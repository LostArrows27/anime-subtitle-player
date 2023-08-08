"use client";

import { Headers } from "@/components/main/headers";
import { Video } from "@/components/main/video";
import { Providers } from "@/components/provides/providers";
import BesideSubtitle from "@/components/subtitle/besideSubtitle";
import { AppProviderProps, SubPosition, Subtitle } from "@/utils/const";
import { useRef, useState } from "react";
import { NodeCue } from "subtitle";

function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  let subTitle = useRef<NodeCue[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle>({text: '', start: -100, end: -100 });
  const [isSubtitle, setIsSubtitle] = useState<boolean>(false);
  const [subPos, setSubPos] = useState<SubPosition>("in-video");

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
  };

  return (
    <Providers appProps={props}>
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
    </Providers>
  );
}

export default Page;
