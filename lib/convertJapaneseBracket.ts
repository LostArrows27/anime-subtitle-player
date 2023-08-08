export function convertJapaneseBracket(str: string): string {
    const fullWidthOpeningBracket = /（/g; // Regular expression to match full-width opening bracket
    const fullWidthClosingBracket = /）/g; // Regular expression to match full-width closing bracket

    const replacedStr = str.replace(fullWidthOpeningBracket, '(').replace(fullWidthClosingBracket, ') ');
    return replacedStr;
}