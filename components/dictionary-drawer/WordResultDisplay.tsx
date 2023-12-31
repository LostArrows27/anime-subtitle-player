"use client";

import unicodeEncoding from "@/lib/unicodeEncoding";
import {
  MaziiWordTranslate,
  KanjiMeaning,
  WordMeaning,
  WordExampleFromCommentsReturnType,
  WordExample,
  MaziiWordExampleReturnType,
} from "@/types/type";
import { Tooltip } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import xml2js from "xml2js";
import { useEffect, useState } from "react";
import KanjiSVG from "./KanjiSVG";
import EnKanji from "./EnKanji";
import ViKanji from "./ViKanji";
import ViExplainDetail from "./ViExplainDetail";
import EnExplainDetail from "./EnExplainDetail";

type WordResultDisplayProps = {
  data: MaziiWordTranslate | KanjiMeaning;
  searchRef: any;
};

function WordResultDisplay({ data, searchRef }: WordResultDisplayProps) {
  // Word display

  const [example, setExample] = useState<WordExample[]>([]);
  const [comment, setComment] = useState<{ mean: string }[]>([]);
  const [svgData, setSvgData] = useState<any>(null);

  // search lang
  let { lang, type } = searchRef.current
    ? searchRef.current
    : { lang: "javi", type: "word" };

  useEffect(() => {
    const getExample = async (type: "kanji" | "word") => {
      let { data: exampleData } = (await axios.post(
        "https://mazii.net/api/search",
        {
          type: "example",
          dict: lang,
          query: (data as MaziiWordTranslate).word,
        }
      )) as { data: MaziiWordExampleReturnType };

      if (exampleData.status === 200) {
        if (exampleData.results.length > 3) {
          setExample(exampleData.results.slice(0, 3));
        } else {
          setExample(exampleData.results);
        }
      }

      if (exampleData.status === 304) {
        setExample([]);
      }
    };

    const getComment = async (type: "kanji" | "word") => {
      let { data: commentData } = (await axios.post(
        "https://api.mazii.net/api/get-mean",
        {
          wordId: data.mobileId,
          type: type,
          dict: lang,
          word: (data as MaziiWordTranslate).word,
        }
      )) as { data: WordExampleFromCommentsReturnType };

      if (commentData.status === 200) {
        if (commentData.result.length > 5) {
          setComment(commentData.result.slice(0, 5));
        } else {
          setComment(commentData.result);
        }
      }

      if (commentData.status === 304) {
        setComment([]);
      }
    };

    const getKanjiArt = async () => {
      try {
        const kanjiArtData = await fetch(
          `https://data.mazii.net/kanji/0${unicodeEncoding(
            (data as KanjiMeaning).kanji
          )}.svg`
        ).then((res) => res.text());
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(kanjiArtData, (err: Error | null, result: any) => {
          if (!err) {
            setSvgData(kanjiArtData.split("]>")[1]);
          } else {
            console.error("Error parsing XML:", err);
          }
        });
      } catch {
        console.log("Error fetching art");
      }
    };

    const getCommentAndExample = async (type: "kanji" | "word") => {
      if (type === "kanji") {
        await Promise.all([getComment(type), getExample(type), getKanjiArt()]);
      }
      await Promise.all([getComment(type), getExample(type)]);
    };

    getCommentAndExample(type);
  }, [data]);

  if (type === "word") {
    const wordData = data as MaziiWordTranslate;
    return (
      <div className="mb-2 pt-2 pb-3 pr-3 pl-0 border-b-gray-700 border-b-[1px] border-solid text-white flex flex-col gap-y-2">
        <div className="hover:underline text-2xl font-bold text-red-400 cursor-pointer">
          <Tooltip aria-label="" label={"See more details on Mazii"}>
            <span
              onClick={() => {
                window.open(
                  `https://mazii.net/vi-VN/search/word/${lang}/${wordData.word}`
                );
              }}
              className="cursor-pointer"
            >
              {wordData.word}
            </span>
          </Tooltip>
        </div>
        <div className="text-green-400">{wordData.phonetic}</div>
        {wordData?.means?.map((e, index) => {
          return (
            <div key={index} className="flex">
              <span className="text-slate-500 mr-3">{index + 1}.</span>
              <span>{e.mean}</span>
            </div>
          );
        })}
        <div className="text-slate-500 gap-x-2 flex items-center mr-2">
          <span className="underline">Examples: </span>
        </div>
        <div className="text-sm">
          {wordData?.means?.map((e: WordMeaning, indexs: number) => {
            if (e.examples !== null) {
              return (
                <React.Fragment key={indexs}>
                  {e.examples?.map((example, index) => {
                    return (
                      <div key={index} className="mb-2">
                        <div className="flex">
                          <span className="mt-2 mr-2 text-base">・</span>
                          <ruby className="py-1">
                            {example.content}
                            <rt className="text-[11px] font-extralight text-slate-400">
                              {example.transcription}
                            </rt>
                          </ruby>
                        </div>
                        <div className="ml-6">{example.mean}</div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            }
            return <></>;
          })}
          {example.length > 0 &&
            example?.map((e, index) => {
              return (
                <div key={index} className="mb-1">
                  <div className="flex">
                    <span className="mt-2 mr-2 text-base">・</span>
                    <ruby className="py-1">
                      {e.content}
                      <rt className="text-[11px] font-extralight text-slate-400">
                        {e.transcription}
                      </rt>
                    </ruby>
                  </div>
                  <div className="ml-6">{e.mean}</div>
                </div>
              );
            })}
        </div>
        <div className="text-slate-500 gap-x-2 flex items-center mr-2">
          <span className="underline">Comments: </span>
        </div>
        {comment.length > 0 &&
          comment?.map((e, index) => {
            return (
              <div key={index} className="flex ml-6 text-base">
                <span className="mr-2 text-base">・</span>
                <span>{e.mean}</span>
              </div>
            );
          })}
      </div>
    );
  }

  if (type === "kanji") {
    return (
      <div className="py-4 border-b-gray-700 border-b-[1px] border-solid">
        <div className="flex mb-3">
          <div className="flex-1">
            {lang === "javi" ? (
              <ViKanji data={data as KanjiMeaning} />
            ) : (
              <EnKanji data={data as KanjiMeaning} />
            )}
          </div>
          <KanjiSVG className="w-[40%]" svgData={svgData} />
        </div>
        {lang === "javi" ? (
          <ViExplainDetail data={data as KanjiMeaning} />
        ) : (
          <EnExplainDetail data={data as KanjiMeaning} />
        )}
      </div>
    );
  }

  return <></>;
}

export default WordResultDisplay;
