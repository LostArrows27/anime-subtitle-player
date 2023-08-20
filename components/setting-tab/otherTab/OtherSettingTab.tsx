import { useContext } from "react";
import { AppContext } from "@/components/provides/providers";
import { Switch } from "@chakra-ui/react";

function OtherSettingTab() {
  const { showSubtitle, setShowSubtitle } = useContext(AppContext);
  return (
    <div className="w-full h-full">
      <div className="flex justify-between my-5">
        <div>
          <h2 className="mb-2 text-[18px] font-bold text-green-500">
            Toggle Subtitle
          </h2>
          <h4 className="text- text-sm text-gray-300">
            Show or hide inside video subtitle
          </h4>
        </div>
        <div>
          <Switch
            size="lg"
            mt={5}
            colorScheme="green"
            isChecked={showSubtitle}
            onChange={(e) => {
              setShowSubtitle(!showSubtitle);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default OtherSettingTab;
