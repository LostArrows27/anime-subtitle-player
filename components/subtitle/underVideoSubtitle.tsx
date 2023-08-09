import { useContext } from "react";
import { AppContext } from "../provides/providers";

function UnderVideoSubtitle() {
  const { currentSubtitle } = useContext(AppContext);

  return (
    <div
      className={`w-full h-[calc(100vh-522px)] bg-[rgb(25,25,25)] px-[calc((100vw-840px)/2)] grid place-items-center`}
    >
      <div className="h-full flex items-center justify-center w-full">
        <span className="text-shadow-black text-center leading-[50px] font-[simsun] text-white text-4xl">
          {currentSubtitle.text}
        </span>
      </div>
    </div>
  );
}

export default UnderVideoSubtitle;
