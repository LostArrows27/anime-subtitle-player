import { NextResponse } from "next/server"
export async function POST(request: Request) {
    const { sentence } = await request.json();
    console.log(sentence);

    const result = await fetch(`https://ichi.moe/cl/qr/?q=${sentence}&r=htr`)
        .then(async (res) => {
            return res.text()
        }
        )
    return NextResponse.json({ text: result })
}