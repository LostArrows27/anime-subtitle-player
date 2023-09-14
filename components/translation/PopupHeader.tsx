import { CurrentWordTraslation } from "@/types/type";
import FuriganaSentece from "../subtitle/furiganaText";
import { Tooltip } from "@chakra-ui/react";
import { BsPlayCircle } from "react-icons/bs";

type PopupHeaderProps = {
  data: CurrentWordTraslation | undefined;
};

function PopupHeader({ data }: PopupHeaderProps) {
  return (
    <div className="gap-x-2 flex items-center w-full mt-2" key={Math.random()}>
      <div className="gap-y-2 flex flex-col items-center justify-center w-6 text-base">
        {data?.is_common && (
          <Tooltip label="Common word" aria-label="A tooltip">
            <div className="bg-cyan-800 w-6 h-6 rounded-full">C</div>
          </Tooltip>
        )}
        {data?.jlpt_lvl && (
          <Tooltip label={`JLPT N${data.jlpt_lvl}`} aria-label="A tooltip">
            <div className="w-6 h-6 bg-green-600 rounded-full">
              {data?.jlpt_lvl}
            </div>
          </Tooltip>
        )}
      </div>
      <div
        className="text-4xl text-white"
        style={{
          //   fontWeight: "900",
          fontFamily: "Noto Sans JP, sans-serif",
        }}
      >
        <FuriganaSentece text={data?.furigana || data!.reading} />
      </div>
      {data?.audio && (
        <div className="flex flex-col items-center justify-center text-green-500">
          {data?.audio.tofugu && (
            <>
              <Tooltip label={`Tofugo's word audio`} aria-label="A tooltip">
                <button>
                  <BsPlayCircle
                    onClick={() => {
                      const audio = document.getElementById(
                        `tofugu-${data.audio.tofugu}`
                      ) as HTMLAudioElement;
                      if (audio) audio.play();
                    }}
                    className={data.audio.tofugu ? "mb-2" : ""}
                  />
                </button>
              </Tooltip>
              <audio preload="none" id={`tofugu-${data.audio.tofugu}`}>
                <source
                  type="audio/mp3"
                  src={`https://jotoba.de/resource/audio/tofugu/${data.audio.tofugu}`}
                />
              </audio>
            </>
          )}
          {data?.audio.kanjialive && (
            <>
              <Tooltip label={`KanjiAlive's word audio`} aria-label="A tooltip">
                <button>
                  <BsPlayCircle
                    onClick={() => {
                      const audio = document.getElementById(
                        `kanjialive-${data.audio.kanjialive}`
                      ) as HTMLAudioElement;
                      if (audio) audio.play();
                    }}
                  />
                </button>
              </Tooltip>
              <audio preload="none" id={`kanjialive-${data.audio.kanjialive}`}>
                <source
                  type="audio/mp3"
                  src={`https://jotoba.de/resource/audio/kanjialive/${data.audio.kanjialive}`}
                />
              </audio>
            </>
          )}
        </div>
      )}
      <div className="flex items-center justify-end flex-1 mt-3">
        {data?.accents &&
          data?.accents.length > 0 &&
          data.accents[0].parts.map((part, index) => {
            if (!part.part) return <></>;
            return (
              <div
                className={`${
                  part.high ? "pitch-high" : "pitch-low"
                } text-green-500`}
                key={index}
              >
                {part.part}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PopupHeader;
