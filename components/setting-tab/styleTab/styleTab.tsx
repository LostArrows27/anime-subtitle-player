import { AppContext } from "@/components/provides/providers";
import { convertFontName } from "@/lib/convertFontName";
import { FontOption, FontName } from "@/utils/const";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Switch,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import FontFamilySetting from "./FontFamilySetting";
import FontSizeSetting from "./FontSizeSetting";
import SubtitleBackground from "./SubtitleBackground";

function StyleTab() {
  const { currentFont, setCurrentFont, isTextShadow, setIsTextShadow } =
    useContext(AppContext);
  const [previewFont, setPreviewFont] = useState<FontOption>(currentFont);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full h-full">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex items-center bg-gray-700 !w-[900px] !max-w-[900px] justify-center self-center">
          <div className="place-items-center relative grid bg-gray-700">
            <Image
              src="/image/preview.png"
              width="900"
              height="500"
              alt="preview image"
              placeholder="blur"
              blurDataURL="/image/preview.png"
            />
            <div
              style={{
                fontWeight: previewFont.fontWeight,
              }}
              className={`w-full absolute py-4 px-2 bottom-0 text-white text-4xl grid place-items-center ${
                isTextShadow ? "text-shadow-black" : ""
              }`}
            >
              <span
                className={`${convertFontName(previewFont.name as FontName)}`}
              >
                わ。。私、怒ってるわけない！
              </span>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <FontSizeSetting />
      <FontFamilySetting
        setCurrentFont={setCurrentFont}
        currentFont={currentFont}
        setPreviewFont={setPreviewFont}
        onOpen={onOpen}
      />
      <SubtitleBackground />
      <div className="flex justify-between my-5">
        <div>
          <h2 className="mb-2 text-[18px] font-bold text-green-500">
            Text Shadow
          </h2>
          <h4 className="text- text-sm text-gray-300">
            Add black shadow arround subtitle text
          </h4>
        </div>
        <div>
          <Switch
            size="lg"
            mt={5}
            colorScheme="green"
            isChecked={isTextShadow}
            onChange={(e) => {
              setIsTextShadow(!isTextShadow);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StyleTab;
