"use client";

import { Headers } from "@/components/main/headers";
import { Video } from "@/components/main/video";
import { Providers } from "@/components/provides/providers";
import { AppProviderProps } from "@/utils/const";
import { useRef, useState } from "react";
import { NodeCue } from "subtitle";

function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  let subTitle = useRef<NodeCue[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [isSubtitle, setIsSubtitle] = useState<boolean>(false);

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
    subTitle
  };

  return (
    <Providers appProps={props}>
      <Headers />
      <Video />
    </Providers>
  );
}

export default Page;
