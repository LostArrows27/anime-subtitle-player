import { NodeCue } from "subtitle";
import { AppContext } from "../provides/providers";
import { useContext, useEffect, useRef } from "react";
import { convertJapaneseBracket } from "@/lib/convertJapaneseBracket";
import { BesideSubtitleProps, Subtitle } from "@/utils/const";
import { compareSubtitle } from "../../lib/compareSubtitle";

function BesideSubtitle() {
  const { subPos, subTitle, setCurrentSubtitle, videoRef, currentSubtitle } =
    useContext(AppContext);

  const currentSubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSubRef.current) {
      currentSubRef.current.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, [currentSubtitle]);

  if (subPos !== "right-video") return;

  return (
    <div className="rounded custom-scroll-bar w-[calc(100%-1044px)] h-[calc((9/16)*1024px)] bg-[#202024] text-white overflow-y-scroll">
      {subTitle?.current!.map((sub: NodeCue, id: number) => {
        return (
          <SubTitleElement
            key={id}
            sub={sub}
            currentSubtitle={currentSubtitle}
            setCurrentSubtitle={setCurrentSubtitle}
            videoRef={videoRef}
            currentSubRef={currentSubRef!}
          />
        );
      })}
    </div>
  );
}

function SubTitleElement({
  sub,
  currentSubtitle,
  setCurrentSubtitle,
  videoRef,
  currentSubRef,
}: BesideSubtitleProps) {
  const isCurrentSubtitle = compareSubtitle(currentSubtitle, sub);

  return (
    <div
      ref={isCurrentSubtitle ? currentSubRef : null}
      onClick={() => {
        videoRef!.current!.currentTime = sub.data.start / 1000;
        setCurrentSubtitle({
          text: sub.data.text,
          start: sub.data.start,
          end: sub.data.end,
        });
      }}
      className={
        isCurrentSubtitle
          ? "px-2 py-6 w-full font-['simsun'] text-2xl text-start bg-gray-500 box-border border-x-4 border-solid border-green-500"
          : "w-full font-['simsun'] text-xl text-start border-b px-2 py-6 border-b-gray-600 text-white border-solid"
      }
    >
      {convertJapaneseBracket(sub.data.text)}
    </div>
  );
}

export default BesideSubtitle;
