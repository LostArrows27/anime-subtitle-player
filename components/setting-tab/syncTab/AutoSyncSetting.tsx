import { Button, useToast } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";
import { AppContext } from "@/components/provides/providers";
import { useContext, useState } from "react";
import axios from "axios";
import { Subtitle } from "@/types/type";
import { convertAssFileText } from "@/lib/convertAssFileText";
import { prepareFormdataTranscribe } from "@/lib/prepareFormdataTranscribe";

function AutoSynSetting() {
  const { video, setSubtitleSyncDiff, subTitle, isSubtitle } =
    useContext(AppContext);
  const [isSyncing, setisSyncing] = useState<boolean>(false);
  const toast = useToast();

  const handleSyncSubtitle = async () => {
    let message = "";
    if (video === null && isSubtitle)
      message = "Please upload video file first !";
    if (!isSubtitle && video !== null)
      message = "Please upload subtitle file first !";
    if (video === null && !isSubtitle)
      message = "Please upload video and subtitle file first !";
    if (isSyncing) message = "Subtitle is being synced !";
    if (message !== "") {
      toast({
        isClosable: true,
        title: message,
        position: "bottom",
        variant: "solid",
        status: "warning",
      });
      return;
    }
    try {
      setisSyncing(true);
      const formData = prepareFormdataTranscribe(video!);
      const {
        data: { id },
      } = await axios.post(
        process.env.NEXT_PUBLIC_TRANSCRIBE_URL as string,
        formData
      );
      console.log(id);

      const subtitleURL = `${process.env.NEXT_PUBLIC_SUBTITLE_URL}/${id}`;

      const { data: resultText } = await axios.get(subtitleURL, {
        responseType: "text",
      });
      let myArray: Subtitle[] = convertAssFileText(resultText);

      if (subTitle?.current === undefined) {
        alert("Please upload subtitle first");
      }
      const syncDiff =
        myArray[0].start! - subTitle!.current![0].data.start / 1000;
      console.log(syncDiff);
      setSubtitleSyncDiff(syncDiff);
      setisSyncing(false);
      toast.closeAll();
      toast({
        isClosable: true,
        title: "Finish subtitle sync !",
        position: "bottom",
        variant: "solid",
        status: "success",
      });
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
