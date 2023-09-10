"use client";

import { WordTranslate } from "../subtitle/inVideoSubtitle";
import { AppContext } from "../provides/providers";
import { useContext } from "react";

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

  return (
    <div
      className="absolute !bg-gray-800 overflow-y-auto"
      style={{
        width: "550px",
        height: "400px",
        top: "-400px",
        left: `${xPosition}px`,
      }}
      ref={popupRef}
    >
      {isLoading ? (
        <div className="animate-pulse">Loading...</div>
      ) : (
        <>
          {wordContent?.infl_info && (
            <div>
              We have detect{" "}
              {wordContent.infl_info.inflections.reduce(
                (prev: string, curr: string) => {
                  return prev + curr + ", ";
                },
                ""
              )}{" "}
              of {wordContent.orginal_query}:{" "}
              <span className="text-green-500">
                {wordContent.infl_info.lexeme}
              </span>
            </div>
          )}
          <div>{JSON.stringify(data?.data?.content.words)}</div>
        </>
      )}
    </div>
  );
}

export default TranslationPopUp;
