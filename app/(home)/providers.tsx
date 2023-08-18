"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { themeLight } from "@/utils/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={themeLight}>{children}</ChakraProvider>;
}
