"use client";

import { useDebounce } from "@/hooks/useDebounce";
import {
  MaziiWordTranslate,
  KanjiMeaning,
  MaziiWordMeaningReturnType,
} from "@/types/type";
import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
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
  setSearchType: Dispatch<SetStateAction<"kanji" | "word">>;
  setLang: Dispatch<SetStateAction<"javi" | "jaen">>;
};

function SearchField({
  myRef,
  lang,
  result,
  type,
  setResult,
  isDrawerOpen,
  setLang,
  setSearchType,
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
      <div className="relative">
        <Input
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
          pr={"150px"}
          ref={myRef}
          id="search-field"
          placeholder="アニメ, anime, ..."
        />
        <Menu>
          <MenuButton
            className="top-0 right-0 flex"
            height={"40px"}
            position={"absolute"}
            as={Button}
            backgroundColor={"transparent !important"}
            textColor={"white !important"}
            borderLeft={"1px solid #4A5568"}
            borderTopLeftRadius={"0px"}
            borderBottomLeftRadius={"0px"}
            _hover={{
              backgroundColor: "transparent",
              textColor: "white",
            }}
            rightIcon={<FaChevronDown />}
          >
            <div className="flex items-center w-full h-full">
              <span className="mr-2">{type}</span>
              <Image
                width={32}
                height={32}
                className="w-6 h-6 mx-1"
                alt="lang"
                src={lang === "jaen" ? "/image/en.png" : "/image/vi.png"}
              />
            </div>
          </MenuButton>
          <MenuList
            minW="0"
            w={"130px"}
            backgroundColor={"#4b5563 !important"}
            py={"0"}
            overflow={"hidden"}
          >
            <MenuItem
              justifyContent={"space-between"}
              maxWidth={"130px !important"}
              backgroundColor={"#4b5563 !important"}
              height={"48px"}
              alignItems={"center"}
              _hover={{
                backgroundColor: "#d1d5db !important",
                textColor: "black  !important",
              }}
              onClick={(e) => {
                setLang("javi");
                setSearchType("word");
              }}
            >
              <span className="ml-2 mr-3">word</span>
              <Image
                width={32}
                height={32}
                className="w-7 h-7 mr-4"
                alt="lang"
                src={"/image/vi.png"}
              />
            </MenuItem>
            <MenuItem
              justifyContent={"space-between"}
              maxWidth={"130px !important"}
              backgroundColor={"#4b5563 !important"}
              height={"48px"}
              _hover={{
                backgroundColor: "#d1d5db !important",
                textColor: "black  !important",
              }}
              onClick={(e) => {
                setLang("jaen");
                setSearchType("word");
              }}
              alignItems={"center"}
            >
              <span className="ml-2 mr-3">word</span>
              <Image
                width={32}
                height={32}
                className="w-7 h-7 mr-4"
                alt="lang"
                src={"/image/en.png"}
              />
            </MenuItem>
            <MenuItem
              justifyContent={"space-between"}
              maxWidth={"130px !important"}
              backgroundColor={"#4b5563 !important"}
              height={"48px"}
              alignItems={"center"}
              _hover={{
                backgroundColor: "#d1d5db !important",
                textColor: "black  !important",
              }}
              onClick={(e) => {
                setLang("javi");
                setSearchType("kanji");
              }}
            >
              <span className="ml-2 mr-3">kanji</span>
              <Image
                width={32}
                height={32}
                className="w-7 h-7 mr-4"
                alt="lang"
                src={"/image/vi.png"}
              />
            </MenuItem>
            <MenuItem
              justifyContent={"space-between"}
              maxWidth={"130px !important"}
              backgroundColor={"#4b5563 !important"}
              height={"48px"}
              _hover={{
                backgroundColor: "#d1d5db !important",
                textColor: "black  !important",
              }}
              onClick={(e) => {
                setLang("jaen");
                setSearchType("kanji");
              }}
              alignItems={"center"}
            >
              <span className="ml-2 mr-3">kanji</span>
              <Image
                width={32}
                height={32}
                className="w-7 h-7 mr-4"
                alt="lang"
                src={"/image/en.png"}
              />
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div
        className="absolute top-[132px] w-[464px]"
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
