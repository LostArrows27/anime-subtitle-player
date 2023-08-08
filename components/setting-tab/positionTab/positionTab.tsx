"use client";

import { useContext } from "react";
import { OptionTab } from "./optionTab";
import { AppContext } from "@/components/provides/providers";

function PositionTab() {
  const { tabPos, setTabPos } = useContext(AppContext);

  return (
    <div className="w-full mt-8 mb-2">
      <div className="flex items-center justify-between w-full">
        <OptionTab
          setTabPos={setTabPos}
          defaultPos="in-video"
          currentPos={tabPos}
        />
        <OptionTab
          setTabPos={setTabPos}
          defaultPos="under-video"
          currentPos={tabPos}
        />
        <OptionTab
          setTabPos={setTabPos}
          defaultPos="right-video"
          currentPos={tabPos}
        />
      </div>
    </div>
  );
}

export default PositionTab;
