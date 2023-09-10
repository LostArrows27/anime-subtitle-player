// convert camel case to normal text
export const convertToNormalText = (text: string | undefined) => {
  if (!text) return "";
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
