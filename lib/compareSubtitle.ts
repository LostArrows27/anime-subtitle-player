import { Subtitle } from "@/types/type";
import { NodeCue } from "subtitle";

export function compareSubtitle(first: Subtitle, second: NodeCue): boolean {
  if (first.text !== second.data.text) return false;
  if (first.start !== second.data.start) return false;
  if (first.end !== second.data.end) return false;
  return true;
}
