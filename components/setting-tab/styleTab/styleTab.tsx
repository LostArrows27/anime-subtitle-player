import { AppContext } from "@/components/provides/providers";
import { convertFontName } from "@/lib/convertFontName";
import { FontOption, FontName } from "@/utils/const";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import FontFamilySetting from "./FontFamilySetting";
import FontSizeSetting from "./FontSizeSetting";

function StyleTab() {
  const { currentFont, setCurrentFont } = useContext(AppContext);
  const [previewFont, setPreviewFont] = useState<FontOption>(currentFont);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full h-full">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex items-center bg-gray-700 !w-[900px] !max-w-[900px] justify-center self-center">
          <div className="relative grid place-items-center bg-gray-700">
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
                fontFamily: convertFontName(previewFont.name as FontName),
              }}
              className={`w-full absolute py-4 px-2 bottom-0 text-white text-4xl grid place-items-center text-shadow-black`}
            >
              <span>わ。。私、怒ってるわけない！</span>
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
    </div>
  );
}

export default StyleTab;
