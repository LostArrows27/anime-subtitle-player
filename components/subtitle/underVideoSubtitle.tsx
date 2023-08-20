import { useContext } from "react";
import { AppContext } from "../provides/providers";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { NodeCue } from "subtitle";
import { convertFontName } from "@/lib/convertFontName";
import { FontName } from "@/utils/const";

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
  } = useContext(AppContext);

  const handlePrevSubtitle = () => {
    let currentTime = videoRef?.current?.currentTime as number;
    if (currentTime === undefined) return;
    let newArray = subTitle?.current.filter((sub: NodeCue) => {
      return sub.data.end / 1000 + subtitleSyncDiff < currentTime;
    });
    if (newArray === undefined) return;
    let prevSubIndex = newArray[newArray.length - 1];
    if (!prevSubIndex?.data) return;
    videoRef!.current!.currentTime =
      prevSubIndex.data.start / 1000 + subtitleSyncDiff;
    setCurrentSubtitle({
      start: prevSubIndex.data.start,
      end: prevSubIndex.data.end,
      text: prevSubIndex.data.text,
    });
  };

  const handleNextSubtitle = () => {
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
  };

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
            className={`${convertFontName(
              currentFont.name as FontName
            )} text-center text-2xl mt-2 text-gray-700 select-none`}
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
            }}
            className={`${
              isTextShadow ? "text-shadow-black" : ""
            } text-center leading-[50px] text-white ${convertFontName(
              currentFont.name as FontName
            )}`}
          >
            {currentSubtitle.text}
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
