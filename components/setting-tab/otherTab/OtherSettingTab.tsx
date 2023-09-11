import { useContext } from "react";
import { AppContext } from "@/components/provides/providers";
import { Switch } from "@chakra-ui/react";
import KeyboardGuild from "./KeyboardGuild";

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
      <div className="flex justify-between my-5">
        <div>
          <h2 className="mb-2 text-[18px] font-bold text-green-500">
            Keyboard Shortcuts
          </h2>
        </div>
      </div>
      <section className="gap-y-8 gap-x-5 grid grid-cols-3">
        <KeyboardGuild keyboard="f" guild="Fullscreen" />
        <KeyboardGuild keyboard="i" guild="Mini Player" />
        <KeyboardGuild keyboard="m" guild="Mute" />
        <KeyboardGuild keyboard="→" guild="Forward 5s" />
        <KeyboardGuild keyboard="←" guild="Backward 5s" />
        <KeyboardGuild keyboard="c" guild="Toggle subtitle" />
        <KeyboardGuild keyboard="+" guild="Increase speed" />
        <KeyboardGuild keyboard="-" guild="Decrease speed" />
        <KeyboardGuild keyboard="q" guild="Open settings" />
        <KeyboardGuild keyboard="a" guild="Previous subtitle" />
        <KeyboardGuild keyboard="d" guild="Next subtitle" />
        <KeyboardGuild keyboard="Space" guild="Play / pause" />
        <KeyboardGuild keyboard="w" guild="Subtitle ealier 1s" />
        <KeyboardGuild keyboard="s" guild="Subtitle later 1s" />
        <KeyboardGuild keyboard="Ctrl" guild="Hover translate" />
      </section>
    </div>
  );
}

export default OtherSettingTab;
