import { NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export async function POST(request: Request) {
  const body = await request.formData();
  const videoFile = body.get("file") as File;
  const formData = new FormData();
  formData.append("video", videoFile);
  formData.append("language", "ja");
  formData.append("task", "transcribe");
  formData.append("vadEnabled", "true");
  formData.append("maxCharsPerLine", "42");
  formData.append("maxLinesPerSub", "2");
  formData.append("advancedSubtitlesEnabled", "false");
  formData.append("id", uuidv4());
  const { data } = await axios.post(
    process.env.TRANSCRIBE_URL as string,
    formData
  );

  return NextResponse.json(data);
}
