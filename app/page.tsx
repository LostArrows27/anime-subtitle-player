"use client";

import { Headers } from "@/components/main/headers";
import { Video } from "@/components/main/video";
import { Providers } from "@/components/provides/providers";
import { AppProviderProps, TabPosition } from "@/utils/const";
import { useRef, useState } from "react";
import { NodeCue } from "subtitle";
import { PiGear } from "react-icons/pi";

function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  let subTitle = useRef<NodeCue[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [isSubtitle, setIsSubtitle] = useState<boolean>(false);
  const [tabPos, setTabPos] = useState<TabPosition>("in-video");

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
    tabPos,
    setTabPos,
  };

  return (
    <Providers appProps={props}>
      <Headers />
      <Video />
    </Providers>
  );
}

export default Page;
