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
import { useRef } from "react";
import { GiBookshelf } from "react-icons/gi";
import SearchField from "./SearchField";

export default function DictionaryDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // pass firstField to which element need to be focused
  const firstField = useRef(null);

  return (
    <>
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
            <h1 className="text-2xl font-bold mt-6 mb-6">Search for word</h1>
            <SearchField myRef={firstField} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
