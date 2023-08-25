import { Kbd } from "@chakra-ui/react";

type KeyboardGuildProps = {
  guild: string;
  keyboard: string;
};

function KeyboardGuild({ guild, keyboard }: KeyboardGuildProps) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-[130px]">{guild}</div>
      <Kbd color="white" className="!bg-gray-500 !text-[17px]">
        {keyboard}
      </Kbd>
    </div>
  );
}

export default KeyboardGuild;
