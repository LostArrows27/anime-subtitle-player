"use client";

import { useContext } from "react";
import { OptionTab } from "./optionTab";
import { AppContext } from "@/components/provides/providers";

function PositionTab() {
  const { subPos, setSubPos, setShowSubtitle } = useContext(AppContext);

  return (
    <div className="w-full mt-8 mb-2">
      <div className="flex items-center justify-between w-full">
        <OptionTab
          setShowSubtitle={setShowSubtitle}
          setSubPos={setSubPos}
          defaultPos="in-video"
          currentPos={subPos}
        />
        <OptionTab
          setShowSubtitle={setShowSubtitle}
          setSubPos={setSubPos}
          defaultPos="under-video"
          currentPos={subPos}
        />
        <OptionTab
          setShowSubtitle={setShowSubtitle}
          setSubPos={setSubPos}
          defaultPos="right-video"
          currentPos={subPos}
        />
      </div>
    </div>
  );
}

export default PositionTab;
