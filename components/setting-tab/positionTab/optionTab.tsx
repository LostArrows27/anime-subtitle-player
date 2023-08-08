import { TabPosition } from "@/utils/const";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";

export function OptionTab({
  defaultPos,
  currentPos,
  setTabPos,
}: {
  defaultPos: TabPosition;
  currentPos: TabPosition;
  setTabPos: Dispatch<SetStateAction<TabPosition>>;
}) {
  return (
    <div className="flex flex-col w-[30%] h-full">
      <div
        className={
          "w-full relative rounded-xl bg-gray-500 h-32 max-h-32 min-h-32 p-4" +
          (defaultPos === currentPos
            ? " outline-2 outline box-border outline-green-500"
            : "")
        }
        onClick={() => {
          setTabPos(defaultPos);
        }}
      >
        {convertPosToPreviewElemet(defaultPos, currentPos)}
        {defaultPos === currentPos && (
          <div className="rounded-full absolute w-8 h-8 flex items-center justify-center bg-[#1F2937] z-10 -top-3 -right-3">
            <AiFillCheckCircle size="28px" className="text-green-500" />
          </div>
        )}
      </div>
      <h4 className="mt-4">{convertPos(defaultPos)}</h4>
    </div>
  );
}

function convertPos(position: TabPosition) {
  if (position === "in-video") return "In video";
  if (position === "right-video") return "Beside video";
  return "Under video";
}

function convertPosToPreviewElemet(
  position: TabPosition,
  currentPos: TabPosition
): ReactNode {
  if (position === "in-video") {
    return (
      <div className="h-full w-full bg-gray-600 rounded-xl pt-4 pb-3 justify-between flex flex-col items-center">
        <FiPlay
          size="30px"
          className={`${
            position === currentPos ? "text-green-400" : "text-gray-400"
          }`}
        />
        <p
          className={`text-base select-none ${
            position === currentPos ? "text-green-400" : "text-gray-400"
          }`}
        >
          何よ？
        </p>
      </div>
    );
  }
  if (position === "under-video") {
    return (
      <div className="flex flex-col items-center h-full w-full justify-between">
        <div className="h-2/3 w-full bg-gray-600 rounded-xl grid place-items-center">
          <FiPlay
            size="26px"
            className={`${
              position === currentPos ? "text-green-400" : "text-gray-400"
            }`}
          />
        </div>
        <div className="h-1/4 w-full bg-gray-600 grid place-items-center rounded-lg">
          <p
            className={`text-base select-none ${
              position === currentPos ? "text-green-400" : "text-gray-400"
            }`}
          >
            何よ？
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-between w-full h-full">
      <div className="h-full w-3/5 bg-gray-600 rounded-xl grid place-items-center">
        <FiPlay
          size="30px"
          className={`${
            position === currentPos ? "text-green-400" : "text-gray-400"
          }`}
        />
      </div>
      <div className="rounded-lg h-full w-[35%] bg-gray-600 overflow-hidden select-none">
        <div className="w-full h-1/4 border-b border-gray-700 border-solid grid place-items-center text-[10px]">
          <p
            className={`${
              position === currentPos ? "text-green-400" : "text-gray-400"
            }`}
          >
            いち
          </p>
        </div>
        <div className="w-full h-1/4 border-b border-gray-700 border-solid grid place-items-center text-[10px]">
          <p
            className={`${
              position === currentPos ? "text-green-400" : "text-gray-400"
            }`}
          >
            にい
          </p>
        </div>
        <div className="w-full h-1/4 border-b border-gray-700 border-solid grid place-items-center text-[10px]">
          <p
            className={`${
              position === currentPos ? "text-green-400" : "text-gray-400"
            }`}
          >
            さん
          </p>
        </div>
        <div className="w-full h-1/4 grid place-items-center text-[10px]">
          <p
            className={`${
              position === currentPos ? "text-green-400" : "text-gray-400"
            }`}
          >
            よん
          </p>
        </div>
      </div>
    </div>
  );
}
