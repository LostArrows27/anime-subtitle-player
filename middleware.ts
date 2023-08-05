import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type SearchParams = {
    [key: string]: string
}

export function middleware(request: NextRequest) {
    const myArr: SearchParams[] = []
    request.nextUrl.searchParams.forEach((value: string, key: string) => {
        myArr.push({ [value]: key });
    })


    return NextResponse.json({ data: myArr })

}

export const config = { matcher: ["/about"] }