import React from "react";
import { ReactNode } from "react";

function FuriganaSentece({ text }: { text: string }): ReactNode {
  // text is often with "[kanji|furigana|furigana|...]otherText" like "[教室|きょう|しつ]で[友達|ともだち]と[話|はな]しました"
  // we need to convert text to <ruby> and <rt> tag
  // example "[教室|きょう|しつ]" will become <ruby>教<rt>きょう</rt>室<rt>しつ</rt></ruby>

  // [何故|なぜ]
  //[戸惑|と|まど]い
  //[記憶|き|おく]
  //お[前|まえ]お
  if (text === "" || !text.includes("|")) return text;
  function convertToFuriganaJSX(text: string) {
    const firstPart = text.split("[")[0];
    const [rubyText, otherPart] = text.split("[")[1].split("]");
    let [kanjiText, ...furiganaArray] = rubyText.split("|");
    if (furiganaArray.length === 1)
      return (
        <>
          {firstPart}
          <ruby>
            {kanjiText}
            <rt className="text-[48%] mb-1">{furiganaArray[0]}</rt>
            {otherPart}
          </ruby>
        </>
      );
    const kanjiArray = kanjiText.split("");
    // if (kanjiArray.length === furiganaArray.length) {
    //   furiganaArray = furiganaArray.reduce((prev: string[], curr: string) => {
    //     return [...prev, ...curr.split("")];
    //   }, []);
    // }
    return (
      <>
        {firstPart}
        <ruby>
          {kanjiArray.map((kanji: string, index: number) => {
            return (
              <React.Fragment key={index}>
                {kanji}
                <rt className="text-[48%] mb-1">{furiganaArray[index]}</rt>
              </React.Fragment>
            );
          })}
          {otherPart}
        </ruby>
      </>
    );
  }

  return convertToFuriganaJSX(text);
}

export default FuriganaSentece;
