"use client";

import { WordTranslate } from "@/components/subtitle/inVideoSubtitle";
import {
  WordPart,
  WordTranslationReturnType,
  WordTraslationContent,
} from "@/types/type";
import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { AppContext } from "@/components/provides/providers";
import TranslationPopUp from "@/components/translation/TraslationPopup";

// Explain: this hooks use to get translation for each word in sentence
// 1. create the ref of the div that contain the sentence
// 2. parse that ref into useTranslation + the parents div
// 3. wrap {textContent} of that div (the sentence) into parseText(textContent)
// 4. pass the handleMouseMove to onMouseMove of parents div
function useTranslation(sentenceRef: React.RefObject<HTMLDivElement>) {
  const [sentence, setSentence] = useState<string>("This is english");
  const [breakDownSentence, setBreakDownSentence] = useState<WordPart[]>([]);
  const [wordTranslation, setWordTranslation] = useState<WordTranslate[]>([]);
  const [popupXPosition, setPopupXPosition] = useState<number>(0);
  const [currentWordTranslation, setCurrentWordTranslation] = useState<
    WordTranslate | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalSentence, setOriginalSentence] = useState<string>("");

  const { isCtrlPressed, currentSubtitle, setShowPopup, showPopup } =
    useContext(AppContext);

  const [fetchTime, setFetchTime] = useState<number>(0);

  useEffect(() => {
    setFetchTime(0);
    console.log("fetch time reset");
  }, [currentSubtitle.text]);

  useEffect(() => {
    setBreakDownSentence([]);
    setWordTranslation([]);
    setOriginalSentence(currentSubtitle.text || "");
  }, [currentSubtitle?.text, sentenceRef]);

  useEffect(() => {
    if (
      sentenceRef.current &&
      !sentenceRef.current.classList.contains("relative")
    ) {
      sentenceRef.current.classList.add("relative");
    }
  }, [sentenceRef]);

  const getSentenceBreakdown = async (index: number = 0) => {
    const result = (await fetch("/api/breakdown", {
      method: "POST",
      body: JSON.stringify({
        sentence: originalSentence,
        wordIndex: index,
      }),
      cache: "force-cache",
    }).then((res) => res.json())) as WordTranslationReturnType;
    return result;
  };

  const getWordPart = async (index: number = 0) => {
    // console.log("get word part");
    if (fetchTime > 0) return;
    const translationResult = await getSentenceBreakdown(index);
    return translationResult.content.sentence.parts.slice(0, -2);
  };

  const getWordTranslation = async (index: number = 0) => {
    const translationResult = await getSentenceBreakdown(index);
    return translationResult.content;
  };

  const handleMouseMove = useCallback(async () => {
    console.log(
      "handle mouse move - ",
      isCtrlPressed ? "Ctrl pressed" : "Ctrl not pressed"
    );

    if (!isCtrlPressed) return;
    if (sentence === originalSentence) return;
    if (fetchTime > 0) return;
    setSentence(originalSentence!);
    setFetchTime(1);
    console.log("fetch time: ", fetchTime);
    const translationResult = await getWordPart();
    setBreakDownSentence(translationResult!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCtrlPressed, originalSentence, sentenceRef]);

  // parse Text to span element to scan able
  const parseText = (text: string) => {
    if (!text) return text;
    if (breakDownSentence.length === 0) return text;

    let result = [];
    let lastIndex = 0;

    breakDownSentence.forEach((part, index) => {
      const partIndex = text.indexOf(part.inflected, lastIndex);

      if (partIndex === -1) return;

      // Add text between the last segment and the current one
      if (partIndex > lastIndex) {
        result.push(text.substring(lastIndex, partIndex));
      }

      // Add the current segment wrapped in a span
      result.push(
        <span
          onMouseEnter={async (e) => {
            if (!isCtrlPressed) return;
            if (
              part.word_class === undefined ||
              part.word_class === "Symbol" ||
              part.word_class === "Space"
            )
              return;
            setShowPopup(true);
            let spanElement = e.target as HTMLSpanElement;
            let spanParentElement = spanElement.parentElement;
            let xPosition =
              spanElement.getBoundingClientRect().x -
              spanParentElement!.getBoundingClientRect().x;
            const leftSpaceToRight =
              window.innerWidth - spanParentElement!.getBoundingClientRect().x;

            if (xPosition + 550 > leftSpaceToRight) {
              xPosition = leftSpaceToRight - 550;
            }
            setPopupXPosition(xPosition);
            setIsLoading(true);
            let findIndex = 0;
            const result = wordTranslation.find(
              (wordTranslate: WordTranslate, index: number) => {
                if (part.inflected === wordTranslate.origin) findIndex = index;
                return part.inflected === wordTranslate.origin;
              }
            );
            // have fetched before
            if (result !== undefined) {
              setIsLoading(false);
              setCurrentWordTranslation(result);
              return;
            }
            // haven't fetched before
            const newWordTranslation = await getWordTranslation(part.position);
            setIsLoading(false);
            setWordTranslation((prev) => {
              const wordResult = {
                position: part.position,
                data: { content: newWordTranslation },
                origin: part.inflected,
              };
              setCurrentWordTranslation(wordResult);
              return [...prev, wordResult];
            });
            return;
          }}
          key={index}
        >
          {part.inflected}
        </span>
      );

      lastIndex = partIndex + part.inflected.length;
    });

    // Add any remaining text after the last segment
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return (
      <>
        {showPopup && (
          <TranslationPopUp
            xPosition={popupXPosition}
            data={currentWordTranslation}
            isLoading={isLoading}
          />
        )}
        {result}
      </>
    );
  };

  return { parseText, handleMouseMove };
}

export default useTranslation;
