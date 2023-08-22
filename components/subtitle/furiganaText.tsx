import { ReactNode } from "react";

function FuriganaSentece({ text }: { text: string }): ReactNode {
  // text is often with "[kanji|furigana|furigana|...]otherText" like "[教室|きょう|しつ]で[友達|ともだち]と[話|はな]しました"
  // we need to convert text to <ruby> and <rt> tag
  // example "[教室|きょう|しつ]" will become <ruby>教<rt>きょう</rt>室<rt>しつ</rt></ruby>
  function convertToFuriganaJSX(text: string) {
    const [rubyText, otherPart] = text.split("[")[1].split("]");
    const [kanjiText, ...furiganaArray] = rubyText.split("|");
    const kanjiArray = kanjiText.split("");
    return (
      <ruby>
        {kanjiArray.map((kanji: string, index: number) => {
          return (
            <>
              {kanji}
              <rt>{furiganaArray[index]}</rt>
            </>
          );
        })}
        {otherPart}
      </ruby>
    );
  }

  return convertToFuriganaJSX(text);
}

export default FuriganaSentece;
