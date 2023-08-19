"use client";

import { SettingModelProps } from "@/utils/const";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabIndicator,
} from "@chakra-ui/react";
import PositionTab from "../setting-tab/positionTab/positionTab";
import StyleTab from "../setting-tab/styleTab/styleTab";
import SynchronizationTab from "../setting-tab/syncTab/SynchronizationTab";
import { useContext, useState } from "react";
import { AppContext } from "../provides/providers";

function SettingModal({ isOpen, onClose }: SettingModelProps) {
  const { subtitleSyncDiff, setSubtitleSyncDiff } = useContext(AppContext);
  const [save, setSave] = useState<boolean>(false);
  const [subtitleSyncDiffAdd, setSubtitleSyncDiffAdd] = useState<number>(0);

  return (
    <Modal
      onCloseComplete={() => {
        if (save) {
          setSave(false);
        }
      }}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent className="!bg-gray-800 !z-[999999] !text-white !w-[700px] !max-w-[700px]">
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            position="relative"
            variant="unstyled"
            isFitted
            colorScheme="green"
          >
            <TabList>
              <Tab>
                <div className="font-bold">Sync</div>
              </Tab>
              <Tab>
                <div className="font-bold">Style</div>
              </Tab>
              <Tab>
                <div className="font-bold">Position</div>
              </Tab>
              <Tab>
                <div className="font-bold">Other</div>
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="green.400"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <SynchronizationTab
                  setSubtitleSyncDiffAdd={setSubtitleSyncDiffAdd}
                />
              </TabPanel>
              <TabPanel>
                <StyleTab />
              </TabPanel>
              <TabPanel>
                <PositionTab />
              </TabPanel>
              <TabPanel>
                <p>Other settng</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} className="mr-4">
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              setSubtitleSyncDiff((prev) => prev + subtitleSyncDiffAdd);
            }}
            colorScheme="green"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SettingModal;
