import { AppProviderProps } from "@/utils/const";
import { createContext, ReactNode } from "react";

const AppContext = createContext<AppProviderProps>({
  videoRef: null,
  currentSubtitle: "",
  setCurrentSubtitle: () => {},
  isSubtitle: false,
  setIsSubtitle: () => {},
  setSubtitle: () => {},
  subTitle: null,
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
