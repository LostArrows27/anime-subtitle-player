import { Button } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { AppContext } from "@/components/provides/providers";
import { useContext } from "react";
import axios from "axios";
import { Subtitle } from "@/types/type";
import { convertAssFileText } from "@/lib/convertAssFileText";
import { prepareFormdataTranscribe } from "@/lib/prepareFormdataTranscribe";

function AutoSynSetting() {
  const { video, setSubtitleSyncDiff, subTitle } = useContext(AppContext);

  const handleSyncSubtitle = async () => {
    try {
      const formData = prepareFormdataTranscribe(video!);
      const {
        data: { id },
      } = await axios.post(
        process.env.NEXT_PUBLIC_TRANSCRIBE_URL as string,
        formData
      );

      const subtitleURL = `${process.env.NEXT_PUBLIC_SUBTITLE_URL}/${id}`;
      const resultText = await fetch(subtitleURL).then((res) => res.text());
      let myArray: Subtitle[] = convertAssFileText(resultText);

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
