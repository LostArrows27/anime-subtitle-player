"use client";

import { useDebounce } from "@/hooks/useDebounce";
import {
  MaziiWordTranslate,
  KanjiMeaning,
  MaziiWordMeaningReturnType,
} from "@/types/type";
import { Input, Menu } from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type WordSuggestType = {
  kanji: "string";
  reading: "string";
  meaning: "string";
};

type SearchFieldProps = {
  myRef: any;
  lang: "javi" | "jaen";
  result: MaziiWordTranslate[] | KanjiMeaning[];
  type: "kanji" | "word";
  setResult: Dispatch<SetStateAction<MaziiWordTranslate[] | KanjiMeaning[]>>;
  isDrawerOpen: boolean;
};

function SearchField({
  myRef,
  lang,
  result,
  type,
  setResult,
  isDrawerOpen,
}: SearchFieldProps) {
  const [searchWord, setSearchWord] = useState<string>("");
  const [suggestWordList, setSuggestWordList] = useState<WordSuggestType[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchWord, 500);

  const suggestMenuRef = useRef(null);

  const fetchWordMeaning = async () => {
    const { data: wordData } = (await axios.post(
      "https://mazii.net/api/search",
      {
        dict: lang,
        type: "word",
        query: searchWord,
        limit: "20",
        page: "1",
      }
    )) as { data: MaziiWordMeaningReturnType };
    if (wordData.status === 200) {
      console.log(wordData.data);
      setResult(wordData.data);
    }
  };

  const fetchKanjiMeaning = async () => {};

  useOnClickOutside(suggestMenuRef, () => {
    setIsFocus(false);
  });

  useEffect(() => {
    if (isDrawerOpen && searchWord === "") {
      setResult([]);
      return;
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (searchWord === "j") {
      setSearchWord("");
    }
  }, [searchWord]);

  useEffect(() => {
    async function fetchWordSuggestion() {
      const res = await axios.post("https://mazii.net/api/suggest", {
        keyword: debouncedValue,
        dict: lang,
      });
      if (res.data.status === 200) {
        const newArray: WordSuggestType[] = res.data.data.map((e: string) => {
          const [kanji, reading, meaning] = e.split("#");
          return { kanji, reading, meaning };
        });
        setSuggestWordList(newArray);
      }
    }

    if (!debouncedValue.trim()) {
      setIsFocus(false);
      return;
    }

    fetchWordSuggestion();

    if (
      document.activeElement &&
      document.activeElement.id !== "search-field"
    ) {
      return setIsFocus(false);
    }
    setIsFocus(true);
  }, [debouncedValue]);

  return (
    <Menu placement="bottom-start" isOpen={true}>
      <Input
        value={searchWord}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
        onFocus={() => {
          setIsFocus(true);
        }}
        ref={myRef}
        id="search-field"
        placeholder="アニメ, anime, ..."
      />
      <div
        className="relative"
        style={{
          display: isFocus ? "block" : "none",
        }}
      >
        <div
          ref={suggestMenuRef}
          className="text-white !bg-gray-600 max-h-[370px] custom-scroll-bar-2 overflow-y-auto rounded-md"
        >
          {suggestWordList.map((word, index) => {
            return (
              <div
                className="border-b-gray-500 px-4 py-3 border-b border-solid cursor-pointer"
                key={index}
                onClick={() => {
                  setSearchWord(word.kanji);
                  setIsFocus(false);
                  if (type === "word") {
                    fetchWordMeaning();
                  } else {
                    fetchKanjiMeaning();
                  }
                }}
              >
                <div className="gap-x-3 flex">
                  <span className="font-bold text-green-500">{word.kanji}</span>
                  <span className="text-red-400">{word.reading}</span>
                </div>
                <div className="truncate">{word.meaning}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Menu>
  );
}

export default SearchField;
