import { cn } from "@/lib/utils";

function KanjiSVG({ svgData, className }: { svgData: any; className: string }) {
  if (!svgData) {
    return null;
  }

  return (
    <div
      className={cn("kanji-text flex justify-center", className)}
      dangerouslySetInnerHTML={{ __html: svgData }}
    ></div>
  );
}

export default KanjiSVG;
