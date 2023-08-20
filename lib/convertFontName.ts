import { FontName } from "@/utils/const";

export const convertFontName = (name: FontName) => {
    switch (name) {
        case 'simsun':
            return 'font-simsun'
        case 'Netflix_Sans':
            return 'font-netflixSans'
        case 'Sawarabi_Gothic':
            return 'font-sawarabi'
        case 'Zen_Maru_Gothic':
            return 'font-zenMaruGothic'
        case 'Noto_Sans_JP':
            return 'font-notoSansJP'
        case 'Zen_Kaku_Gothic':
            return 'font-zenKakuGothic'
        case 'Rampart_One':
            return 'font-rampartOne'
        default:
            return 'font-simsun'
    }

}