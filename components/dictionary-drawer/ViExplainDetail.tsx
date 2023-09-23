import { KanjiExampleFromCommentsReturnType, KanjiMeaning } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

function ViExplainDetail({ data }: { data: KanjiMeaning }) {
  const [example, setExample] = useState<string>("");
  const [comment, setComment] = useState<{ mean: string }[]>([]);

  useEffect(() => {
    const fetchExapmle = async () => {
      const { data: exampleData } = await axios.get(
        `https://mina.mazii.net/api/getNoteKanji.php?word=${encodeURI(
          data.kanji
        )}`
      );
      if (exampleData) {
        setExample(exampleData[0].note);
      }
      console.log(exampleData);
    };

    const fetchComment = async () => {
      const { data: commentData } = (await axios.post(
        "https://api.mazii.net/api/get-mean",
        {
          wordId: data.mobileId,
          type: "kanji",
          dict: "javi",
          word: data.kanji,
        }
      )) as { data: KanjiExampleFromCommentsReturnType };
      if (!commentData || !commentData?.result) return;
      if (commentData!.result.length > 5) {
        setComment(commentData!.result.slice(0, 5));
      } else {
        setComment(commentData!.result);
      }
    };

    const fetchAll = async () => {
      await Promise.all([fetchExapmle(), fetchComment()]);
    };

    if (data?.kanji) {
      fetchAll();
    }
  }, [data]);

  return (
    <>
      <div className="gap-x-3 flex flex-col pr-4">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Nghĩa</span>
        </div>
        <div className="flex-1 my-3">
          {(data as KanjiMeaning)?.detail
            ?.split(".##")
            .map((e) => e.split(". ")[0])
            .join(". ")
            .split(".")
            .map((e) => e + ". ")}
        </div>
      </div>
      <div className="gap-x-3 flex flex-col pr-4">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Giải nghĩa</span>
        </div>
        <div className="flex-1 my-3">
          {(data as KanjiMeaning)?.detail?.split(".##").map((e, index) => {
            return (
              <div key={index} className="mb-2">
                <span className="mr-2 text-base">・</span>
                <span>{e}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="gap-x-3 flex flex-col pr-4">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Ví dụ</span>
        </div>
        <div className="flex-1 my-4">
          {example?.split("※")?.map((e, index) => {
            const [kanji, reading, meaning] = e.split("∴");

            if (!kanji || !reading || !meaning) return <></>;

            return (
              <div key={index} className="flex mb-3">
                <span className="mr-2 text-base">・</span>
                <span className="text-red-400 block truncate w-[70px]">
                  {kanji}
                </span>
                <span className="w-[120px] mx-3 text-gray-400">{reading}</span>
                <span className="flex-1">{meaning}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="gap-x-3 flex flex-col pr-4">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Comments</span>
        </div>
        <div className="flex-1 my-4">
          {comment.length > 0 &&
            comment?.map((e, index) => {
              return (
                <div key={index} className="flex mb-3">
                  <span className="mr-2 text-base">・</span>
                  <span>{e.mean}</span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ViExplainDetail;
