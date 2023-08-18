import { AppContext } from "@/components/provides/providers";
import { fonts, FontOption } from "@/utils/const";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaChevronDown } from "react-icons/fa";

function StyleTab() {
  const { currentFont, setCurrentFont } = useContext(AppContext);

  function mapFontOption() {
    let fontArray = [];
    for (let font in fonts) {
      fontArray.push({ font: fonts[font as keyof typeof fonts] });
    }
    return fontArray.map((fontChild: { font: FontOption }, id: number) => {
      return (
        <MenuItemOption
          key={id}
          backgroundColor="gray.700"
          value={`${fontChild.font.name} ${fontChild.font.fontWeight}`}
          onClick={() => {
            setCurrentFont(fontChild.font);
          }}
        >
          {fontChild.font.title}
        </MenuItemOption>
      );
    });
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between w-full">
        <h4>Font Style</h4>
        <Menu placement="bottom-end">
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
          <MenuList backgroundColor="gray.700" borderColor="whiteAlpha.300">
            <MenuOptionGroup
              defaultValue={`${currentFont.name} ${currentFont.fontWeight}`}
              type="checkbox"
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
