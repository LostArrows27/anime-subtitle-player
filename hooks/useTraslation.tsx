"use client";

import { WordTranslate } from "@/components/subtitle/inVideoSubtitle";
import {
  WordPart,
  WordTranslationReturnType,
  WordTraslationContent,
} from "@/types/type";
import { useState, useContext, useEffect, useMemo } from "react";
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

  useEffect(() => {
    setBreakDownSentence([]);
    setWordTranslation([]);
    setOriginalSentence(sentenceRef.current?.innerText!);
  }, [currentSubtitle?.text, sentenceRef]);

  const getSentenceBreakdown = async (index: number = 0) => {
    return (await fetch("/api/breakdown", {
      method: "POST",
      body: JSON.stringify({
        sentence: originalSentence,
        wordIndex: index,
      }),
      cache: "force-cache",
    }).then((res) => res.json())) as WordTranslationReturnType;
  };

  const getWordPart = async (index: number = 0) => {
    const translationResult = await getSentenceBreakdown(index);
    return translationResult.content.sentence.parts.slice(0, -3);
  };

  const getWordTranslation = async (index: number = 0) => {
    const translationResult = await getSentenceBreakdown(index);
    return translationResult.content;
  };

  const handleMouseMove = async () => {
    if (!isCtrlPressed || sentence === originalSentence) return;
    setSentence(originalSentence!);
    const translationResult = await getWordPart();
    setBreakDownSentence(translationResult);
    // add the breakDownSentenceToJSX component to sentenceRef child
  };

  // parse Text to span element to scan able
  const parseText = (text: string) => {
    if (breakDownSentence.length === 0) return text;

    return (
      <>
        {showPopup && (
          <TranslationPopUp
            xPosition={popupXPosition}
            data={currentWordTranslation}
            isLoading={isLoading}
          />
        )}
        {breakDownSentence.map((value: WordPart, key: number) => {
          return (
            <span
              onMouseEnter={async (e) => {
                if (!isCtrlPressed) return;
                if (
                  value.word_class === undefined ||
                  value.word_class === "Symbol" ||
                  value.word_class === "Space"
                )
                  return;
                setShowPopup(true);
                let spanElement = e.target as HTMLSpanElement;
                let spanParentElement = spanElement.parentElement;
                let xPosition =
                  spanElement.getBoundingClientRect().x -
                  spanParentElement!.getBoundingClientRect().x;
                const leftSpaceToRight =
                  window.innerWidth -
                  spanParentElement!.getBoundingClientRect().x;

                if (xPosition + 550 > leftSpaceToRight) {
                  xPosition = leftSpaceToRight - 550;
                }
                setPopupXPosition(xPosition);
                setIsLoading(true);
                //TODO: handle pop over dictionaries
                //TODO: handle multiple pop-up (not fetch done this word => jump to next word)
                // 1: multiple pop-up
                // 2: 1 pop-up moving
                console.log("hover to: ", value.inflected);
                const result = wordTranslation.find(
                  (wordTranslate: WordTranslate, index: number) => {
                    return value.inflected === wordTranslate.origin;
                  }
                );
                // have fetched before
                if (result !== undefined) {
                  setIsLoading(false);
                  setCurrentWordTranslation(result);
                  console.log("found: ", result.data);
                  return;
                }
                // haven't fetched before
                console.log("fetching: ", value.inflected);
                const newWordTranslation = await getWordTranslation(
                  value.position
                );
                console.log("fetched: ", newWordTranslation);
                setIsLoading(false);
                setWordTranslation((prev) => {
                  const wordResult = {
                    position: value.position,
                    data: { content: newWordTranslation },
                    origin: value.inflected,
                  };
                  setCurrentWordTranslation(wordResult);
                  return [...prev, wordResult];
                });
                return;
              }}
              className="text-green-500"
              key={key}
            >
              {value.inflected}
            </span>
          );
        })}
      </>
    );
  };

  return { parseText, handleMouseMove };
}

export default useTranslation;
