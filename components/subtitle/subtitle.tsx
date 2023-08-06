"use client";

import Draggable from "react-draggable";
import {
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
} from "@/utils/const";
import {
  compile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";
import { NodeCue, parseSync } from "subtitle";
import { Input } from "@chakra-ui/react";

type Subtitle = { start?: number; end?: number; text?: string };

function msToMinSecMs(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const paddedMilliseconds =
    milliseconds < 100 ? `0${milliseconds}` : milliseconds;
  return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
}

export interface RefType {
  setCurrentSubtitle: () => void;
  getSubtitle: () => NodeCue[];
}

function Subtitle(props: any) {
  const {
    currentSubtitle,
    setCurrentSubtitle,
    isSubtitle,
    setSubtitle,
    setIsSubtitle,
  } = props;

  const handleChange = (event: any) => {
    event.stopPropagation();
    const file = event.target.files[0] as File;
    const types = file.name.split(".").pop();
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileText = reader.result as string;
      if (types === "srt") {
        const data = parseSync(fileText);
        setSubtitle(data);
        setIsSubtitle(true);
        return;
      }
      if (types === "ass") {
        const compiledASS = compile(fileText, {});
        let myArray: Subtitle[] = [];
        const temp: Subtitle = {};
        compiledASS.dialogues.forEach((dialogue: Dialogue) => {
          const myDialogueFragments: Subtitle = {};
          const totalText = dialogue.slices.reduce(
            (prev: string, slice: DialogueSlice) => {
              return (
                prev +
                "\n" +
                slice.fragments.reduce(
                  (prev: string, frags: DialogueFragment) => {
                    return prev + " " + frags.text;
                  },
                  ""
                )
              );
            },
            ""
          );
          myDialogueFragments.start = dialogue.start;
          myDialogueFragments.end = dialogue.end;
          myDialogueFragments.text = totalText;
          myArray.push(myDialogueFragments);
        });
        setIsSubtitle(true);
        return;
      }
    };
    reader.readAsText(file);
    event.target = null;
  };
  return !isSubtitle ? (
    <div className="w-full h-full flex items-center justify-center absolute right-0 left-0 z-40">
      <label
        onClick={(e) => {
          e.stopPropagation();
        }}
        htmlFor="video-upload"
        className="bg-slate-500 px-10 py-7 text-2xl rounded-3xl uppercase"
      >
        Upload Subtitle
        <Input
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          id="video-upload"
          className="hidden"
          type="file"
          onChange={handleChange}
        />
      </label>
    </div>
  ) : (
    <Draggable
      defaultClassName="jss3 react-draggable relative"
      axis="y"
      disabled={!isSubtitle}
    >
      <div style={containerStyle}>
        <div style={subTitleWrapperStyle}>
          <div style={subTitleAreaStyle}>
            <div style={subTitleTextStyle}>{currentSubtitle}</div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Subtitle;
