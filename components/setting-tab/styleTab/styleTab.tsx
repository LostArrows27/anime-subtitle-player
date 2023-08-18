import { AppContext } from "@/components/provides/providers";
import { convertFontName } from "@/lib/convertFontName";
import { fonts, FontOption, FontName } from "@/utils/const";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItemOption,
  MenuOptionGroup,
  Tooltip,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

function StyleTab() {
  const { currentFont, setCurrentFont } = useContext(AppContext);
  const [previewFont, setPreviewFont] = useState<FontOption>(currentFont);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function mapFontOption() {
    let fontArray = [];
    for (let font in fonts) {
      fontArray.push({ font: fonts[font as keyof typeof fonts] });
    }
    return fontArray.map((fontChild: { font: FontOption }, id: number) => {
      return (
        <MenuItemOption
          isChecked={true}
          key={id}
          backgroundColor="gray.700"
          py={1.5}
          px={2}
          _hover={{ backgroundColor: "gray.600" }}
          value={`${fontChild.font.name} ${fontChild.font.fontWeight}`}
          onClick={() => {
            setCurrentFont(fontChild.font);
          }}
        >
          <div className="flex justify-between items-center">
            <span className="mr-2 pl-1">{fontChild.font.title}</span>
            <Tooltip
              bg="gray.500"
              hasArrow
              label="Preview font"
              aria-label="A tooltip"
            >
              <IconButton
                colorScheme=""
                aria-label="preview font"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewFont(fontChild.font);
                  onOpen();
                }}
                icon={<FiEye className="ml-1 text-green-400" size="24" />}
              />
            </Tooltip>
          </div>
        </MenuItemOption>
      );
    });
  }

  return (
    <div className="w-full h-full">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="flex items-center !w-[900px] !max-w-[900px] justify-center self-center">
          <div className="relative grid place-items-center">
            <Image
              src="/image/preview.png"
              width="900"
              height="500"
              alt="preview image"
              placeholder="blur"
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
      <div className="flex justify-between w-full">
        <h4>Font Style</h4>
        <Menu placement="bottom-end" closeOnSelect closeOnBlur={false}>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.400"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "green.500", textColor: "white" }}
            _focus={{ boxShadow: "outline" }}
            as={Button}
            rightIcon={<FaChevronDown />}
          >
            {currentFont.title}
          </MenuButton>
          <MenuList
            overflowY="scroll"
            backgroundColor="gray.700"
            height="217px"
            className="custom-scroll-bar-2"
            borderColor="whiteAlpha.300"
          >
            <MenuOptionGroup
              defaultValue={`${currentFont.title} ${currentFont.fontWeight}`}
              type="radio"
            >
              {mapFontOption()}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default StyleTab;
