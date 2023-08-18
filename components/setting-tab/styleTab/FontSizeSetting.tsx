import { useContext, useState } from "react";
import { AppContext } from "@/components/provides/providers";
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
} from "@chakra-ui/react";
import React from "react";

function FontSizeSetting() {
  const { fontSize, setFontSize } = useContext(AppContext);

  return (
    <div className="flex justify-between w-full my-5">
      <h4>Font Size</h4>
      <div className="w-2/5">
        <SliderThumbWithTooltip fontSize={fontSize} setFontSize={setFontSize} />
      </div>
    </div>
  );
}

function SliderThumbWithTooltip({
  fontSize,
  setFontSize,
}: {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <Slider
      id="slider"
      defaultValue={(fontSize - 20) * (100 / 25)}
      min={0}
      max={100}
      colorScheme="green"
      py={5}
      size="lg"
      onChange={(v) => {
        let fontsize = Math.round((v / 100) * 25) + 20;
        setFontSize(fontsize);
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseDown={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderMark
        className={`${getActiveRange("S", fontSize) ? "text-green-400" : ""}`}
        value={0}
        mt="2.5"
        ml="-1"
        fontSize="sm"
        fontStyle="bold"
      >
        S
      </SliderMark>
      <SliderMark
        className={`${getActiveRange("M", fontSize) ? "text-green-400" : ""}`}
        value={50}
        mt="2.5"
        ml="-1"
        fontSize="sm"
        fontStyle="bold"
      >
        M
      </SliderMark>
      <SliderMark
        className={`${getActiveRange("L", fontSize) ? "text-green-400" : ""}`}
        value={100}
        mt="2.5"
        ml="-1"
        fontSize="sm"
        fontStyle="bold"
      >
        L
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="green.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={
          <div
            style={{ fontSize: `${fontSize}px` }}
            className="transition-all duration-100"
          >
            あ
          </div>
        }
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

function getActiveRange(range: "S" | "M" | "L", fontSize: number) {
  switch (range) {
    case "S":
      return fontSize <= 28;
    case "M":
      return fontSize > 28 && fontSize <= 36;
    case "L":
      return fontSize > 36;
  }
}

export default FontSizeSetting;
