import { KanjiExampleFromCommentsReturnType, KanjiMeaning } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

function EnExplainDetail({ data }: { data: KanjiMeaning }) {
  const [comment, setComment] = useState<{ mean: string }[]>([]);

  useEffect(() => {
    const fetchComment = async () => {
      const { data: commentData } = (await axios.post(
        "https://api.mazii.net/api/get-mean",
        {
          wordId: data.mobileId,
          type: "kanji",
          dict: "jaen",
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

    if (data?.kanji) {
      fetchComment();
    }
  }, [data]);
  return (
    <>
      <div className="gap-x-3 flex flex-col pr-4">
        <div className="w-[90px] max-h-6 bg-green-500 rounded-lg flex justify-start items-center px-2 py-2">
          <span>Meaning</span>
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
          <span>Explain</span>
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

export default EnExplainDetail;
