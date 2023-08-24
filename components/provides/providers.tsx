import { DEFAULT_FONT_SIZE } from "@/utils/const";
import { AppProviderProps } from "@/types/type";
import { createContext, ReactNode } from "react";

const AppContext = createContext<AppProviderProps>({
  videoRef: null,
  currentSubtitle: { text: "", start: -100, end: -100 },
  setCurrentSubtitle: () => {},
  isSubtitle: false,
  setIsSubtitle: () => {},
  setSubtitle: () => {},
  subTitle: null,
  subPos: "in-video",
  setSubPos: () => {},
  currentSubIndex: -1,
  setCurrentSubIndex: () => {},
  showBorder: true,
  setShowBorder: () => {},
  currentFont: {
    name: "simsun",
    title: "Simsun Bold",
    fontWeight: 900,
  },
  setCurrentFont: () => {},
  fontSize: DEFAULT_FONT_SIZE,
  setFontSize: () => {},
  backgroundOpacity: 0,
  setBackgroundOpacity: () => {},
  showSubtitle: true,
  setShowSubtitle: () => {},
  subtitleSyncDiff: 0,
  setSubtitleSyncDiff: () => {},
  isHoverSubtitle: false,
  setIsHoverSubtitle: () => {},
  preventPlaying: false,
  setPreventPlaying: () => {},
  isTextShadow: true,
  setIsTextShadow: () => {},
  isSyncingSubtitle: false,
  setIsSyncingSubtitle: () => {},
  openMenu: false,
  setOpenMenu: () => {},
});

const Providers = ({
  children,
  appProps,
}: {
  children: ReactNode;
  appProps: AppProviderProps;
}) => {
  return <AppContext.Provider value={appProps}>{children}</AppContext.Provider>;
};

export { AppContext, Providers };
