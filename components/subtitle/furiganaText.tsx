import React from "react";
import { ReactNode } from "react";

function parseText(text: any) {
  const regex = /\[(.*?)\]|([^\[\]]+)/g;
  const matches = [...text.matchAll(regex)];

  const result = matches.map((match) => {
    const [full, inBrackets, outsideBrackets] = match;
    return {
      text: inBrackets || outsideBrackets,
      isInBrackets: !!inBrackets,
    };
  });

  return result;
}

function FuriganaSentece({ text }: { text: string }): ReactNode {
  // text is often with "[kanji|furigana|furigana|...]otherText" like "[教室|きょう|しつ]で[友達|ともだち]と[話|はな]しました"
  // we need to convert text to <ruby> and <rt> tag
  // example "[教室|きょう|しつ]" will become <ruby>教<rt>きょう</rt>室<rt>しつ</rt></ruby>
  // [何故|なぜ]
  //[戸惑|と|まど]い
  //[記憶|き|おく]
  //お[前|まえ]お
  // [有|あ]り[難|がと]う
  // console.log("parsing ", text);
  const infoArr = parseText(text);
  const mapArr = infoArr.map((info, index) => {
    if (!info.isInBrackets) {
      return <span key={index}>{info.text}</span>;
    }
    const [kanjiText, ...furiganaArray] = info.text.split("|");
    if (furiganaArray.length === 1)
      return (
        <ruby key={index}>
          {kanjiText}
          <rt className="text-[48%] mb-1">{furiganaArray[0]}</rt>
        </ruby>
      );
    const kanjiArray = kanjiText.split("");
    return (
      <ruby key={index}>
        {kanjiArray.map((kanji: string, index: number) => {
          return (
            <React.Fragment key={index}>
              {kanji}
              <rt className="text-[48%] mb-1">{furiganaArray[index]}</rt>
            </React.Fragment>
          );
        })}
      </ruby>
    );
  });
  return <>{mapArr}</>;
}

export default FuriganaSentece;
