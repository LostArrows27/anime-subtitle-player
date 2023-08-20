import { NodeCue } from "subtitle";
import { AppContext } from "../provides/providers";
import { useCallback, useContext, useEffect, useRef } from "react";
import { convertJapaneseBracket } from "@/lib/convertJapaneseBracket";
import { BesideSubtitleProps, FontName, Subtitle } from "@/utils/const";
import { compareSubtitle } from "../../lib/compareSubtitle";
import { convertFontName } from "@/lib/convertFontName";

function BesideSubtitle() {
  const {
    subPos,
    subTitle,
    setCurrentSubtitle,
    videoRef,
    currentSubtitle,
    currentFont,
    fontSize,
    subtitleSyncDiff,
    setIsHoverSubtitle,
    preventPlaying,
    setPreventPlaying,
  } = useContext(AppContext);

  const currentSubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tempRef = currentSubRef.current;

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

    if (currentSubRef.current) {
      currentSubRef.current.addEventListener("mouseenter", handleMouseEnter);
      currentSubRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (tempRef) {
        tempRef.removeEventListener("mouseenter", handleMouseEnter);
        tempRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [currentSubRef.current]);

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
        <span className="place-items-center grid w-full h-full text-2xl text-center text-gray-500">
          <span>Please upload your subtitle</span>
        </span>
      ) : (
        ""
      )}
      {subTitle?.current!.map((sub: NodeCue, id: number) => {
        return (
          <SubTitleElement
            subtitleSyncDiff={subtitleSyncDiff}
            fontSize={fontSize}
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
  fontSize,
  subtitleSyncDiff,
}: BesideSubtitleProps) {
  const isCurrentSubtitle = compareSubtitle(currentSubtitle, sub);

  return (
    <div
      ref={isCurrentSubtitle ? currentSubRef : null}
      onClick={() => {
        videoRef!.current!.currentTime =
          sub.data.start / 1000 + subtitleSyncDiff;
        setCurrentSubtitle({
          text: sub.data.text,
          start: sub.data.start,
          end: sub.data.end,
        });
      }}
      className={
        isCurrentSubtitle
          ? `px-2 py-6 w-full text-start bg-gray-500 box-border border-x-4 border-solid border-green-500`
          : `w-full text-justify border-b px-3 py-6 border-b-gray-600 text-white border-solid`
      }
      style={{
        fontWeight: currentFont.fontWeight,
        fontFamily: convertFontName(currentFont.name as FontName),
        fontSize: isCurrentSubtitle ? (fontSize - 8) * 1.2 : fontSize - 8,
      }}
    >
      {convertJapaneseBracket(sub.data.text)}
    </div>
  );
}

export default BesideSubtitle;
