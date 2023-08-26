import { Subtitle } from "@/types/type";
import {
  compile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";

export function convertAssFileText(text: string): Subtitle[] {
  let myArray: Subtitle[] = [];
  const compiledASS = compile(text, {});
  compiledASS.dialogues.forEach((dialogue: Dialogue) => {
    const myDialogueFragments: Subtitle = {};
    const totalText = dialogue.slices.reduce(
      (prev: string, slice: DialogueSlice) => {
        return (
          prev +
          "\n" +
          slice.fragments.reduce((prev: string, frags: DialogueFragment) => {
            return prev + " " + frags.text;
          }, "")
        );
      },
      ""
    );
    myDialogueFragments.start = dialogue.start;
    myDialogueFragments.end = dialogue.end;
    myDialogueFragments.text = totalText;
    myArray.push(myDialogueFragments);
  });
  return myArray;
}
