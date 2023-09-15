"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { Input, Menu } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type WordSuggestType = {
  kanji: "string";
  reading: "string";
  meaning: "string";
};

function SearchField({ myRef }: { myRef: any }) {
  const [searchWord, setCurrentWord] = useState<string>("");
  const [suggestWordList, setSuggestWordList] = useState<WordSuggestType[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchWord, 500);

  const suggestMenuRef = useRef(null);

  useOnClickOutside(suggestMenuRef, () => {
    setIsFocus(false);
  });

  useEffect(() => {
    async function fetchWordSuggestion() {
      const formData = new FormData();
      formData.append("keyword", debouncedValue);
      formData.append("dict", "javi");
      const res = await axios.post("https://mazii.net/api/suggest", {
        keyword: debouncedValue,
        dict: "javi",
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
          setCurrentWord(e.target.value);
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
                className="cursor-pointer py-3 px-4 border-b border-solid border-b-gray-500"
                key={index}
                onClick={() => {
                  setCurrentWord(word.kanji);
                  setIsFocus(false);
                }}
              >
                <div className="flex gap-x-3">
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
