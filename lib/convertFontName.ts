import { FontName } from "@/utils/const";

export const convertFontName = (name: FontName) => {
    switch (name) {
        case 'simsun':
            return 'simsun'
        case 'Netflix_Sans':
            return 'Netflix Sans'
        case 'Sawarabi_Gothic':
            return 'Sawarabi Gothic'
        case 'Zen_Maru_Gothic':
            return 'Zen Maru Gothic'
        default:
            return 'simsun'
    }

}