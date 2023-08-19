import { Button } from "@chakra-ui/react";
import { FaSync } from "react-icons/fa";

function AutoSynSetting() {
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
        onClick={() => {
          // handle auto sync by whisper AI modal
        }}
      >
        Auto Sync
      </Button>
    </div>
  );
}

export default AutoSynSetting;
