"use client";

import { WordTranslate } from "@/components/subtitle/inVideoSubtitle";
import { WordPart, WordTranslationReturnType } from "@/types/type";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "@/components/provides/providers";

// Explain: this hooks use to get translation for each word in sentence
// 1. create the ref of the div that contain the sentence
// 2. parse that ref into useTranslation + the parents div
// 3. wrap {textContent} of that div (the sentence) into parseText(textContent)
// 4. pass the handleMouseMove to onMouseMove of parents div
function useTranslation(sentenceRef: React.RefObject<HTMLDivElement>) {
  const [sentence, setSentence] = useState<string>("This is english");
  const [breakDownSentence, setBreakDownSentence] = useState<WordPart[]>([]);
  const [wordTranslation, setWordTranslation] = useState<WordTranslate[]>([]);

  const { isCtrlPressed, currentSubtitle } = useContext(AppContext);

  useEffect(() => {
    setBreakDownSentence([]);
    setWordTranslation([]);
  }, [currentSubtitle?.text]);

  const getSentenceBreakdown = async (index: number = 0) => {
    return (await fetch("/api/breakdown", {
      method: "POST",
      body: JSON.stringify({
        sentence: sentenceRef.current?.innerText,
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
    return translationResult.content.words;
  };

  const handleMouseMove = async () => {
    if (!isCtrlPressed || sentence === sentenceRef.current?.innerText) return;
    setSentence(sentenceRef.current?.innerText!);
    const translationResult = await getWordPart();
    console.log(translationResult);
    setBreakDownSentence(translationResult);
    // add the breakDownSentenceToJSX component to sentenceRef child
  };

  // parse Text to span element to scan able
  const parseText = (text: string) => {
    if (breakDownSentence.length === 0) return text;

    return (
      <>
        {breakDownSentence.map((value: WordPart, key: number) => {
          return (
            <span
              onMouseEnter={async () => {
                //TODO: handle pop over dictionaries
                //TODO: handle multiple pop-up (not fetch done this word => jump to next word)
                // 1: multiple pop-up
                // 2: 1 pop-up moving
                if (
                  value.word_class === undefined ||
                  value.word_class === "Symbol" ||
                  value.word_class === "Space"
                )
                  return;
                if (!isCtrlPressed) return;
                console.log("hover to: ", value.inflected);
                const result = wordTranslation.find(
                  (wordTranslate: WordTranslate, index: number) => {
                    return value.inflected === wordTranslate.origin;
                  }
                );
                // have fetched before
                if (result !== undefined) {
                  console.log("found: ", result.data);
                  return;
                }
                // haven't fetched before
                console.log("fetching: ", value.inflected);
                const newWordTranslation = await getWordTranslation(
                  value.position
                );
                console.log("fetched: ", newWordTranslation);
                setWordTranslation((prev) => {
                  return [
                    ...prev,
                    {
                      position: value.position,
                      data: newWordTranslation,
                      origin: value.inflected,
                    },
                  ];
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
