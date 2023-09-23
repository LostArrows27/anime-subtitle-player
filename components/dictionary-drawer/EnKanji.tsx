import { KanjiMeaning } from "@/types/type";

function EnKanji({ data }: { data: KanjiMeaning }) {
  return (
    <div className="gap-y-3 flex flex-col">
      <div className="gap-x-3 flex">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Kanji</span>
        </div>
        <div className="flex-1">
          <span className=" text-red-400">{data.kanji}</span>
        </div>
      </div>
      <div className="gap-x-3 flex">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Kunyomi</span>
        </div>
        <div className="flex-1">{data?.kun}</div>
      </div>
      <div className="gap-x-3 flex">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Onyomi</span>
        </div>
        <div className="flex-1">{data?.on}</div>
      </div>
      <div className="gap-x-3 flex">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Stroke</span>
        </div>
        <div className="flex-1">{data?.stroke_count}</div>
      </div>
      <div className="gap-x-3 flex">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Compo</span>
        </div>
        <div className="flex-1">
          {data?.compDetail?.map((value) => {
            return value.w + "  ";
          })}
        </div>
      </div>
    </div>
  );
}

export default EnKanji;
