import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
  Input,
} from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { GiBookshelf } from "react-icons/gi";
import SearchField from "./SearchField";
import { KanjiMeaning, MaziiWordTranslate } from "@/types/type";
import WordResultDisplay from "./WordResultDisplay";

export type DictionaryMethod = {
  openDictionary: () => void;
  closeDictionary: () => void;
  isOpen: boolean;
};

type Props = {};

export type SearchFieldMethod = {
  lang: "javi" | "jaen";
  type: "kanji" | "word";
};

function DictionaryDrawer(props: any, ref: any) {
  const [result, setResult] = useState<MaziiWordTranslate[] | KanjiMeaning[]>(
    []
  );

  const searchFieldRef = useRef<SearchFieldMethod>(null);

  useImperativeHandle(ref, () => {
    return {
      openDictionary: () => {
        onOpen();
      },
      closeDictionary: () => {
        onClose();
      },
      isOpen: isOpen,
    };
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  // pass firstField to which element need to be focused
  const firstField = useRef(null);

  return (
    <div className="gap-x-4 flex" ref={ref}>
      <Button leftIcon={<GiBookshelf />} colorScheme="teal" onClick={onOpen}>
        Dictionary
      </Button>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent className="!bg-gray-800 !text-white">
          <DrawerCloseButton />
          <DrawerBody>
            <div className="flex justify-between">
              <h1 className="mt-6 mb-6 text-2xl font-bold">Search for word</h1>
            </div>
            <SearchField
              result={result}
              myRef={firstField}
              setResult={setResult}
              isDrawerOpen={isOpen}
              ref={searchFieldRef}
            />
            <div className="mt-2 pl-1 max-h-[calc(100vh-144px)] max-w-[483px] overflow-x-hidden overflow-y-scroll custom-scroll-bar-2 -mr-5">
              {result.length > 0 &&
                result.map((e, index) => {
                  return (
                    <WordResultDisplay
                      searchRef={searchFieldRef}
                      data={e}
                      key={index}
                    />
                  );
                })}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default forwardRef<DictionaryMethod, Props>(DictionaryDrawer);
