import { useContext, useState } from "react";
import { AppContext } from "@/components/provides/providers";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
} from "@chakra-ui/react";

function SubtitleBackground() {
  const { backgroundOpacity, setBackgroundOpacity } = useContext(AppContext);

  return (
    <div className="flex justify-between w-full h-[80px] mt-6 mb-1">
      <div>
        <h2 className="mb-2 text-[18px] font-bold text-green-500">
          Background
        </h2>
        <h4 className="text- text-sm text-gray-300">
          Add background to subtitle
        </h4>
      </div>
      <div className="w-2/5">
        <SliderThumbOpacity
          backgroundOpacity={backgroundOpacity}
          setBackgroundOpacity={setBackgroundOpacity}
        />
      </div>
    </div>
  );
}

function SliderThumbOpacity({
  backgroundOpacity,
  setBackgroundOpacity,
}: {
  backgroundOpacity: number;
  setBackgroundOpacity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <Slider
      id="slider"
      defaultValue={backgroundOpacity * 100}
      min={0}
      max={100}
      colorScheme="green"
      py={5}
      mt={8}
      size="lg"
      onChange={(v) => {
        setBackgroundOpacity(v / 100);
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
        p="2"
        bgColor={`rgba(0, 0, 0, ${backgroundOpacity})`}
        isOpen={showTooltip}
        label={
          <div className="text-2xl transition-all duration-100">このように</div>
        }
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default SubtitleBackground;
