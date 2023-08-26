import { Button } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { AppContext } from "@/components/provides/providers";
import { useContext } from "react";
import axios from "axios";
import { Subtitle } from "@/types/type";
import {
  compile,
  Dialogue,
  DialogueSlice,
  DialogueFragment,
} from "ass-compiler";

function AutoSynSetting() {
  const { video, setSubtitleSyncDiff, subTitle } = useContext(AppContext);

  const handleSyncSubtitle = async () => {
    const formData = new FormData();
    formData.append("file", video!);
    try {
      const {
        data: { id },
      } = await axios.post("/api/transcribe", formData);
      const subtitleURL = `${process.env.NEXT_PUBLIC_SUBTITLE_URL}/${id}`;
      const result = await fetch(subtitleURL).then((res) => res.text());
      const compiledASS = compile(result, {});
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
      // console.log(myArray);
      if (subTitle?.current === undefined) {
        alert("Please upload subtitle first");
      }
      const syncDiff =
        myArray[0].start! - subTitle!.current![0].data.start / 1000;
      console.log(syncDiff);
      setSubtitleSyncDiff(syncDiff);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between mt-8">
      <div>
        <h2 className="mb-2 text-[18px] font-bold text-green-500">
          Auto Sync Subtitle
        </h2>
        <div className="mt-4 text-sm text-gray-300">
          <h4 className="mb-1">Auto sync subtitle with video by using AI</h4>
          <h4 className="text-red-400">
            (warning, result may not be accurate)
          </h4>
        </div>
      </div>
      <Button
        className="relative self-center mt-4"
        rightIcon={<FaSync size="16px" />}
        colorScheme="green"
        textColor="white"
        onClick={handleSyncSubtitle}
      >
        Auto Sync
      </Button>
    </div>
  );
}

export default AutoSynSetting;
