import { FontName } from "@/types/type";

export const convertFontName = (name: FontName) => {
  switch (name) {
    case "simsun":
      return "simsun, sans-serif";
    case "Sawarabi_Gothic":
      return "Sawarabi Gothic, sans-serif";
    case "Zen_Maru_Gothic":
      return "Zen Maru Gothic New, sans-serif";
    case "Noto_Sans_JP":
      return "Noto Sans JP, sans-serif";
    case "Zen_Kaku_Gothic":
      return "Zen Kaku Gothic New, sans-serif";
    case "Rampart_One":
      return "Rampart One, cursive";
    case "Dot_Gothic":
      return "DotGothic16, sans-serif";
    case "Train_One":
      return "Train One, cursive";
    default:
      return "simsun, sans-serif";
  }
};
