import { NodeCue } from "subtitle";
import { AppContext } from "../provides/providers";
import { useContext, useEffect, useRef } from "react";
import { convertJapaneseBracket } from "@/lib/convertJapaneseBracket";
import { BesideSubtitleProps } from "@/types/type";
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
    isSyncingSubtitle,
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

    currentSubRef.current?.addEventListener("mouseenter", handleMouseEnter);
    currentSubRef.current?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      tempRef?.removeEventListener("mouseenter", handleMouseEnter);
      tempRef?.removeEventListener("mouseleave", handleMouseLeave);
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
            isSyncingSubtitle={isSyncingSubtitle}
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
  isSyncingSubtitle,
}: BesideSubtitleProps) {
  let text = convertJapaneseBracket(sub.data.text);
  let fontName = convertFontName(currentFont.name);

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
      className={`${
        isCurrentSubtitle
          ? `px-2 py-6 w-full text-start bg-gray-500 box-border border-x-4 border-solid border-green-500`
          : `w-full text-justify border-b px-3 py-6 border-b-gray-600 border-solid`
      } ${
        isSyncingSubtitle && isCurrentSubtitle
          ? " !text-[lime]"
          : " !text-white"
      }`}
      style={{
        fontWeight: currentFont.fontWeight,
        fontSize: isCurrentSubtitle
          ? getSuitableSubSize((fontSize - 6) * 1.2)
          : getSuitableSubSize(fontSize - 6),
        fontFamily: fontName,
      }}
    >
      {text}
    </div>
  );
}

function getSuitableSubSize(fontSize: number) {
  if (fontSize < 14) return 14;
  if (fontSize > 40) return 40;
  return fontSize;
}

export default BesideSubtitle;
