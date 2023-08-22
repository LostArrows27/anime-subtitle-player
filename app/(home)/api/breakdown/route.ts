import { NextResponse } from "next/server";
import axios from "axios";
import {
  WordTranslationReturnType,
  WordTraslationRequestBody,
} from "@/utils/const";

export async function POST(request: Request) {
  const { sentence } = await request.json();
  // alwasy but " ですね" end of sentence
  const body: WordTraslationRequestBody = {
    query_str: `${sentence} ですね`,
    settings: {
      user_lang: "en-US",
      show_english: true,
      english_on_top: false,
      page_size: 10,
      show_example_sentences: true,
      sentence_furigana: true,
    },
    page: 1,
    word_index: 0,
  };

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const { data }: { data: WordTranslationReturnType } = await axios.post(
    "https://jotoba.com/api/app/words",
    JSON.stringify(body),
    axiosConfig
  );

  return NextResponse.json(data);
}
