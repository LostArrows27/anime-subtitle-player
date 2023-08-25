"use client";

import { Button, Input, useDisclosure } from "@chakra-ui/react";
import {
  compile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";
import { NodeCue, parseSync } from "subtitle";
import { useContext } from "react";
import { AppContext } from "../provides/providers";
import { FaLanguage } from "react-icons/fa";
import { AiFillVideoCamera } from "react-icons/ai";
import { PiGear } from "react-icons/pi";
import SettingModal from "../setting-modal/modal";
import { Subtitle } from "@/types/type";

function Headers() {
  const { setIsSubtitle, setSubtitle, subPos, showSubtitle } =
    useContext(AppContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = (event.target as HTMLInputElement).files![0] as File;
    if (!!!file) return;
    const types = file.name.split(".").pop();
    const reader = new FileReader();
    reader.onload = function (event: ProgressEvent<FileReader>) {
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
    (event.target as HTMLInputElement).files = null;
  };

  return (
    <div
      className={`flex items-center !my-2 ${
        subPos === "under-video" && showSubtitle
          ? "flex-col-reverse w-[calc((100vw-928px)/2)] h-full absolute right-0 justify-around"
          : "w-[1024px] h-20 justify-between"
      }`}
    >
      <div
        className={
          subPos === "under-video" && showSubtitle
            ? "flex flex-col-reverse justify-end h-3/5"
            : "flex"
        }
      >
        <input type="file" style={{ display: "none" }} id="file-upload" />
        <Button
          className="relative"
          rightIcon={<FaLanguage size="24px" />}
          width={subPos === "under-video" && showSubtitle ? "168px" : "200px"}
          color="green.800"
        >
          <label
            className="absolute w-full h-full"
            htmlFor="video-upload"
          ></label>
          Load Subtitles
        </Button>
        <Button
          className={
            subPos === "under-video" && showSubtitle ? "mb-4" : "ml-4 relative"
          }
          rightIcon={<AiFillVideoCamera size="18px" />}
          colorScheme="whatsapp"
        >
          <label
            htmlFor="file-upload"
            className="absolute w-full h-full"
          ></label>
          Load Video
        </Button>
        <Input
          id="video-upload"
          className="hidden"
          type="file"
          onChange={handleChange}
        />
      </div>
      <PiGear
        className={`text-green-500 hover:text-green-700 active:text-green-700 ${
          subPos === "under-video" && showSubtitle
            ? "absolute top-1 right-1"
            : ""
        }`}
        size="40px"
        onClick={() => {
          onOpen();
        }}
      />
      <SettingModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export { Headers };
