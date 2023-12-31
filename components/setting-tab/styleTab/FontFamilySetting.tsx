import { fonts } from "@/utils/const";
import { FontOption } from "@/types/type";
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
            console.log(fontChild.font);
          }}
        >
          <div className="flex items-center justify-between py-2">
            <span className="pl-1 mr-2">{fontChild.font.title}</span>
            <Tooltip
              bg="gray.500"
              hasArrow
              label="Preview font"
              aria-label="A tooltip"
            >
              <span>
                <FiEye
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setPreviewFont(fontChild.font);
                    onOpen();
                  }}
                  className="ml-2 text-green-400"
                  size="24"
                />
              </span>
            </Tooltip>
          </div>
        </MenuItemOption>
      );
    });
  }

  return (
    <div className=" mb-7 flex items-center justify-between w-full mt-6">
      <div>
        <h2 className="mb-2 text-[18px] font-bold text-green-500">
          Subtitle Font
        </h2>
        <h4 className="text- text-sm text-gray-300">
          Choose subtitle font family
        </h4>
      </div>
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
