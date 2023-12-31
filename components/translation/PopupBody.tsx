"use client";

import { CurrentWordTraslation } from "@/types/type";
import FuriganaSentece from "../subtitle/furiganaText";
import { convertToNormalText } from "@/lib/convertToNormalText";
import { FiArrowRight } from "react-icons/fi";

type PopupBodyProps = {
  data: CurrentWordTraslation | undefined;
};

//TODO: add senses.example_sentence and senses.part_of_speech

function PopupBody({ data }: PopupBodyProps) {
  return (
    <div className="gap-x-2 mt-3 mb-5 text-xl">
      {data?.senses.map((value, index) => {
        return (
          <div key={index}>
            <div className="flex mt-2">
              <div className="text-slate-500 mr-3">{index + 1}.</div>
              <div className="text-start text-white">
                {value.glosses.reduce((total, curr, index) => {
                  if (index === value.glosses.length - 1) return total + curr;
                  return total + curr + ", ";
                }, "")}
              </div>
            </div>
            {value.example_sentence && (
              <div className="text-slate-400 text-start mt-2 ml-6 text-base">
                <div className="flex items-center">
                  <span className="mr-2 pt-[5px]">Exp:</span>
                  <span>
                    <FuriganaSentece text={value.example_sentence[0]} />
                  </span>
                </div>
                <div className="flex items-center">
                  <FiArrowRight size="14px" className="mr-1" />
                  <span>{value.example_sentence[1]}</span>
                </div>
              </div>
            )}
            <div className="text-start text-slate-500 mt-2 text-base">
              {value.misc && <span>{convertToNormalText(value.misc)}</span>}
              {((value.misc && value.information) ||
                (value.misc && value.field)) &&
                ", "}
              {value.information && <span>{value.information}</span>}
              {value.field && value.information && ", "}
              {value.field && <span>{value.field}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PopupBody;
