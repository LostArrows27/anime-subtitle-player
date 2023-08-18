import { NodeCue } from "subtitle";
import { AppContext } from "../provides/providers";
import { useContext, useEffect, useRef } from "react";
import { convertJapaneseBracket } from "@/lib/convertJapaneseBracket";
import { BesideSubtitleProps, Subtitle } from "@/utils/const";
import { compareSubtitle } from "../../lib/compareSubtitle";

function BesideSubtitle() {
  const {
    subPos,
    subTitle,
    setCurrentSubtitle,
    videoRef,
    currentSubtitle,
    currentFont,
  } = useContext(AppContext);

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
      {subTitle?.current.length === 0 ? (
        <span className="w-full h-full text-2xl text-gray-500 text-center grid place-items-center">
          <span>Please upload your subtitle</span>
        </span>
      ) : (
        ""
      )}
      {subTitle?.current!.map((sub: NodeCue, id: number) => {
        return (
          <SubTitleElement
            key={id}
            sub={sub}
            currentSubtitle={currentSubtitle}
            setCurrentSubtitle={setCurrentSubtitle}
            videoRef={videoRef}
            currentSubRef={currentSubRef!}
            currentFont={currentFont}
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
  currentFont,
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
          ? `px-2 py-6 w-full font-['${currentFont.name}'] text-2xl text-start bg-gray-500 box-border border-x-4 border-solid border-green-500`
          : `w-full font-['${currentFont.name}'] text-xl text-justify border-b px-3 py-6 border-b-gray-600 text-white border-solid`
      }
      style={{ fontWeight: currentFont.fontWeight }}
    >
      {convertJapaneseBracket(sub.data.text)}
    </div>
  );
}

export default BesideSubtitle;
