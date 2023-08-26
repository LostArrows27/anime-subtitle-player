import { v4 as uuidv4 } from "uuid";

export function prepareFormdataTranscribe(video: File): FormData {
  let formData = new FormData();
  formData.append("video", video!);
  formData.append("language", "ja");
  formData.append("task", "transcribe");
  formData.append("vadEnabled", "true");
  formData.append("maxCharsPerLine", "42");
  formData.append("maxLinesPerSub", "2");
  formData.append("advancedSubtitlesEnabled", "false");
  formData.append("id", uuidv4());
  return formData;
}
