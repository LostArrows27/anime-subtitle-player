"use client";

import { WordTranslate } from "../subtitle/inVideoSubtitle";
import { AppContext } from "../provides/providers";
import { useContext } from "react";
import { Roboto } from "next/font/google";
import PopupHeader from "./PopupHeader";
import { CurrentWordTraslation } from "@/types/type";
import PopupBody from "./PopupBody";
import FuriganaSentece from "../subtitle/furiganaText";
import LoadingTranslation from "./LoadingTranslation";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

type TranslationPopUpProps = {
  data: WordTranslate | undefined;
  xPosition: number;
  isLoading: boolean;
};

function TranslationPopUp({
  data,
  xPosition,
  isLoading,
}: TranslationPopUpProps) {
  const wordContent = data?.data?.content;

  const { popupRef } = useContext(AppContext);
  console.log(wordContent);

  return (
    <div
      id="translation-popup"
      className={`absolute px-5 py-3 custom-scroll-bar-2 !bg-gray-800 overflow-y-auto text-2xl font-normal  ${roboto.className}`}
      style={{
        width: "550px",
        height: "400px",
        top: "-400px",
        textShadow: "none",
        left: `${xPosition}px`,
        zIndex: "999999999",
      }}
      ref={popupRef}
    >
      {isLoading ? (
        <LoadingTranslation />
      ) : (
        <>
          {wordContent?.sentence.parts[wordContent.sentence.curr_index]
            .furigana && (
            <div className="my-2 text-4xl text-green-400">
              <FuriganaSentece
                text={
                  wordContent?.sentence.parts[wordContent.sentence.curr_index]
                    .furigana || ""
                }
              />
            </div>
          )}
          {wordContent?.infl_info && (
            <div className="py-2 text-3xl">
              <span
                className="text-slate-300"
                style={{
                  fontFamily: "Noto Sans JP, sans-serif",
                }}
              >
                {wordContent.infl_info.lexeme}
              </span>
              {" : "}
              {wordContent.infl_info.inflections.reduce(
                (prev: string, curr: string) => {
                  if (wordContent.infl_info?.inflections.length === 1)
                    return prev + curr + " form ";
                  return prev + curr + "form, ";
                },
                ""
              )}{" "}
            </div>
          )}
          {!wordContent?.words || wordContent?.words.length === 0 ? (
            <div className="text-center">{`Can't find translation of ${
              wordContent!.orginal_query
            }`}</div>
          ) : (
            wordContent!.words.map(
              (word: CurrentWordTraslation, index: number) => {
                return <TranslationChild key={index} data={word} />;
              }
            )
          )}
        </>
      )}
    </div>
  );
}

function TranslationChild({
  data,
}: {
  data: CurrentWordTraslation | undefined;
}) {
  return (
    <div className="border-b-slate-500 flex flex-col my-4 border-b border-solid">
      <PopupHeader key={Math.random()} data={data} />
      <PopupBody data={data} />
    </div>
  );
}

export default TranslationPopUp;
