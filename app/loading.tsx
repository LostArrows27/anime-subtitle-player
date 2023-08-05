import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <>
      {[1, 2, 3, 4].map((e) => {
        return (
          <div
            className="flex items-center justify-center min-h-[100px]"
            key={e}
          >
            <Skeleton className="w-24 h-[54px] mr-4 rounded-full"></Skeleton>
            <Skeleton className="w-24 h-[54px] mb-4"></Skeleton>
          </div>
        );
      })}
    </>
  );
}

export default Loading;
