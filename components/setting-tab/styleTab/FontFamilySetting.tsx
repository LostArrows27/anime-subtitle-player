import { fonts, FontOption } from "@/utils/const";
import {
  MenuItemOption,
  Tooltip,
  IconButton,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

type FontFamilySettingProps = {
  setCurrentFont: Dispatch<SetStateAction<FontOption>>;
  currentFont: FontOption;
  setPreviewFont: Dispatch<SetStateAction<FontOption>>;
  onOpen: () => void;
};

function FontFamilySetting({
  setCurrentFont,
  currentFont,
  setPreviewFont,
  onOpen,
}: FontFamilySettingProps) {
  function mapFontOption() {
    let fontArray = [];
    for (let font in fonts) {
      fontArray.push({ font: fonts[font as keyof typeof fonts] });
    }
    return fontArray.map((fontChild: { font: FontOption }, id: number) => {
      return (
        <MenuItemOption
          isChecked={
            `${fontChild.font.title} ${fontChild.font.fontWeight}` ===
            `${currentFont.title} ${currentFont.fontWeight}`
          }
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
    <div className="flex justify-between w-full items-center h-[80px]">
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
          zIndex={9999}
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
  );
}

export default FontFamilySetting;
