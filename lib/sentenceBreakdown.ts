import { TranslationData, WordBreakDownData } from "@/types/type";
import parse from "node-html-parser";

export async function sentenceBreakdown(
  sentence: string | undefined
): Promise<TranslationData> {
  // if (sentence === undefined) return { data: [] }
  // not handling space yet
  // Exp: そか 何をやっての だったのか => g-{data_part}-0-0 => data_part is in ul[data_part="data_part"]

  const { text } = await fetch("http://localhost:3000/api", {
    method: "POST",
    body: JSON.stringify({
      sentence: sentence,
    }),
  }).then((res) => res.json());
  const root = parse(text);
  const sentenceBreakdown: TranslationData = {
    data: root.querySelectorAll(`[id ^= "g-0-0-"]`).map((al) => {
      let text = "";
      let furigana = "";
      const romaji = al.querySelector(".gloss-rtext em")?.textContent as string;
      const arrWord = al
        .querySelector(".alternatives dt")
        ?.textContent.split(" ") as string[];
      const defArr = al.querySelectorAll(".gloss-definitions li").map((d) => {
        return {
          type: d.querySelector(".pos-desc")?.textContent,
          meaning: d.querySelector(".gloss-desc")?.textContent,
        };
      });

      if (arrWord.length === 3) {
        text = arrWord[1];
        furigana = arrWord[2];
      } else {
        if (arrWord[0].includes(".")) {
          text = arrWord[1];
        } else {
          text = arrWord[0];
          furigana = arrWord[1];
        }
      }
      const word: WordBreakDownData = {
        text,
        romaji,
        definition: defArr as { type: string; meaning: string }[],
      };
      if (furigana !== "") {
        word.furigana = furigana;
      }
      return word;
    }),
  };
  return sentenceBreakdown;
}
