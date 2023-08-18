import { AppProviderProps } from "@/utils/const";
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
