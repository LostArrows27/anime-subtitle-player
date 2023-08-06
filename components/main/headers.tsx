"use client";

import { Input } from "@chakra-ui/react";
import {
  compile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";
import { NodeCue, parseSync } from "subtitle";
import Subtitle from "../subtitle/subtitle";
import { useContext } from "react";
import { AppContext } from "../provides/providers";

function Headers() {
  const { setIsSubtitle, setSubtitle } = useContext(AppContext);

  const handleChange = (event: any) => {
    event.stopPropagation();
    const file = event.target.files[0] as File;
    const types = file.name.split(".").pop();
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileText = reader.result as string;
      if (types === "srt") {
        const data = parseSync(fileText);
        setSubtitle(data as NodeCue[]);
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

  return (
    <div className="header-container">
      <h2 className="title"></h2>
      <label htmlFor="file-upload" className="button">
        Choose Video
      </label>
      <input type="file" style={{ display: "none" }} id="file-upload" />
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
  );
}

export { Headers };
