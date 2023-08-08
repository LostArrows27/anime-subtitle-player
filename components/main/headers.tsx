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
import SettingModal from "../modal/modal";
import { Subtitle } from "@/utils/const";

function Headers() {
  const { setIsSubtitle, setSubtitle } = useContext(AppContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = (event.target as HTMLInputElement).files![0] as File;
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
    (event.target as HTMLInputElement).files = null;
  };

  return (
    <div className="header-container !my-2">
      <div className="flex">
        <input type="file" style={{ display: "none" }} id="file-upload" />
        <Button
          className="relative"
          rightIcon={<FaLanguage size="24px" />}
          width="200px"
          color="green.800"
        >
          <label
            className="absolute h-full w-full"
            htmlFor="video-upload"
          ></label>
          Load Subtitles
        </Button>
        <Button
          className="ml-4 relative"
          rightIcon={<AiFillVideoCamera size="18px" />}
          colorScheme="whatsapp"
        >
          <label
            htmlFor="file-upload"
            className="absolute h-full w-full"
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
        className="text-green-500 hover:text-green-700 active:text-green-700"
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
