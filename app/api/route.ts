import { NextResponse } from "next/server"
import { parseSync } from 'subtitle';

export async function POST(request: Request) {
    const requestBody = await request.json();
    const nodes = parseSync(requestBody.text);
    return NextResponse.json({ data: nodes });
}
