"use client";

import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  parse,
  stringify,
  compile,
  decompile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";
import { parseSync, NodeCue, Cue } from "subtitle";
import { pipeline } from "@xenova/transformers";
import { HfInference } from "@huggingface/inference";
import Replicate from "replicate";
import fetch from "cross-fetch";

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

function UploadPage() {
  const [subTitle, setSubtitle] = useState<NodeCue[]>([]);
  const handleChange = (event: any) => {
    const file = event.target.files[0] as File;
    // fetch to /api with form data has file
    const formData = new FormData();
    formData.append("file", file);
    fetch("/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    // const types = file.name.split(".").pop();
    // const reader = new FileReader();
    // reader.onload = function (event) {
    //   const fileText = reader.result as string;
    //   if (types === "srt") {
    //     const data = parseSync(fileText);
    //     setSubtitle(data as NodeCue[]);
    //     return;
    //   }
    //   if (types === "ass") {
    //     const compiledASS = compile(fileText, {});
    //     let myArray: Subtitle[] = [];
    //     const temp: Subtitle = {};
    //     compiledASS.dialogues.forEach((dialogue: Dialogue) => {
    //       const myDialogueFragments: Subtitle = {};
    //       const totalText = dialogue.slices.reduce(
    //         (prev: string, slice: DialogueSlice) => {
    //           return (
    //             prev +
    //             "\n" +
    //             slice.fragments.reduce(
    //               (prev: string, frags: DialogueFragment) => {
    //                 return prev + " " + frags.text;
    //               },
    //               ""
    //             )
    //           );
    //         },
    //         ""
    //       );
    //       myDialogueFragments.start = dialogue.start;
    //       myDialogueFragments.end = dialogue.end;
    //       myDialogueFragments.text = totalText;
    //       myArray.push(myDialogueFragments);
    //     });
    //     console.log(myArray);
    //     return;
    //   }
    // };
    // reader.readAsText(file);
    // event.target = null;
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <Input type="file" onChange={handleChange} />
      {subTitle?.map((e: NodeCue, index: number) => {
        return (
          <div className="text-white" key={index}>
            <span className="font-bold text-yellow-300">{index}</span>
            <span>
              From: {msToMinSecMs(e.data.start)} - To {msToMinSecMs(e.data.end)}
              : {e.data.text}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default UploadPage;
