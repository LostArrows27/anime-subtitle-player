import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Tooltip,
} from "@chakra-ui/react";
import { SynchronizationTabProps } from "./SynchronizationTab";
import { useState } from "react";

function HandSyncSetting({ setSubtitleSyncDiffAdd }: SynchronizationTabProps) {
  const [isSetSubtitleEalier, setIsSetSubtitleEalier] = useState<boolean>(true);

  return (
    <div className="flex justify-between">
      <div>
        <h2 className="mb-2 text-[18px] font-bold text-green-500">
          Synchronization
        </h2>
        <div className="mt-4 text-sm text-gray-300">
          <h4 className="mb-1">Adjust subtitle to faster or slower</h4>
          <h4>(Click Save to save settings)</h4>
        </div>
      </div>
      <div className="flex flex-col items-center w-2/5 mt-3">
        <div className="flex items-center justify-between w-3/4">
          <div>Earlier</div>
          <Switch
            isChecked={!isSetSubtitleEalier}
            onChange={() => setIsSetSubtitleEalier(!isSetSubtitleEalier)}
            size="md"
            px={2}
            colorScheme="green"
          />
          <div>Later</div>
        </div>
        <SliderThumbSync
          isSetSubtitleEalier={isSetSubtitleEalier}
          setSubtitleSyncDiffAdd={setSubtitleSyncDiffAdd}
        />
      </div>
    </div>
  );
}

function SliderThumbSync({
  isSetSubtitleEalier,
  setSubtitleSyncDiffAdd,
}: {
  isSetSubtitleEalier: boolean;
  setSubtitleSyncDiffAdd: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  return (
    <Slider
      id="slider"
      defaultValue={0}
      min={0}
      max={100}
      colorScheme="green"
      py={5}
      mt={6}
      size="lg"
      onChange={(v) => {
        setValue(v / 10);
        if (isSetSubtitleEalier) {
          setSubtitleSyncDiffAdd(-v / 10);
        } else {
          setSubtitleSyncDiffAdd(v / 10);
        }
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseDown={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        color="white"
        placement="top"
        hasArrow
        bg="green.500"
        p="2"
        isOpen={showTooltip}
        label={
          <div className="text-2xl transition-all duration-100">
            {value.toFixed(1)}s
          </div>
        }
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default HandSyncSetting;
