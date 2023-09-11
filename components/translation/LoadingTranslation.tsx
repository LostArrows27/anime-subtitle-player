import { Skeleton, Stack } from "@chakra-ui/react";

function LoadingTranslation() {
  return (
    <Stack spacing={"6"} className="mt-4">
      <Skeleton height={70} className="!rounded-[25px]" />
      <Skeleton height={70} className="!rounded-[25px]" />
      <Skeleton height={70} className="!rounded-[25px]" />
      <Skeleton height={70} className="!rounded-[25px]" />
    </Stack>
  );
}

export default LoadingTranslation;
