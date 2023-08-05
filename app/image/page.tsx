'use client'

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function MyPage() {
    return (
        <>
            <Image
                src="/gotoubun.jpg"
                alt="gotoubun"
                width={728}
                height={453}
                className=" transition-opacity opacity-0 duration-[2s]"
                objectFit="contain"
                objectPosition="center"
                onLoadingComplete={(image: HTMLImageElement) => {
                    image.classList.remove('opacity-0');
                }}
            />
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </>)
}

export default MyPage;