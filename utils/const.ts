import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { NodeCue } from "subtitle";

const DEFAULT_FONT_SIZE = 45;

const containerStyle = {
    position: "absolute",
    bottom: "75px",
    left: '0',
    right: '0',
    width: "100%",
    margin: "auto",
    textAlign: "center",
    zIndex: '100',
} as const;

const subTitleWrapperStyle = {
    display: "inline-block",
    fontWeight: '900',
    marginLeft: "0",
    padding: '0 15px',
    marginRight: "0",
    border: "none",
    cursor: "pointer",
    borderRadius: "40px",
    userSelect: "none",
} as const

const subTitleAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0',
} as const;

const subTitleTextStyle = {
    display: 'inline-block',
    margin: '7px 10px 7px 10px',
    textAlign: 'center',
} as const;

const fonts: { [keys in FontKey]: FontOption } = {
    simsunRegular: {
        name: 'simsun',
        title: 'Simsun',
        fontWeight: 400,
    },
    simsunBold: {
        name: 'simsun',
        title: 'Simsun Bold',
        fontWeight: 900,
    },
    rampartOneRegular: {
        name: "Rampart_One",
        title: 'Rampart',
        fontWeight: 400,
    },
    dotGothic: {
        name: "Dot_Gothic",
        title: 'Dot Gothic',
        fontWeight: 400,
    },
    trainOne: {
        name: "Train_One",
        title: 'Train One',
        fontWeight: 400,
    },
    sawarabiGothicRegular: {
        name: "Sawarabi_Gothic",
        title: 'Sawarabi Gothic',
        fontWeight: 400,
    },
    sawarabiGothicBold: {
        name: "Sawarabi_Gothic",
        title: 'Sawarabi Gothic Bold',
        fontWeight: 900,
    },
    zenMaruGothicRegular: {
        name: "Zen_Maru_Gothic",
        title: 'Maru Gothic',
        fontWeight: 400,
    },
    zenMaruGothicBold: {
        name: "Zen_Maru_Gothic",
        title: 'Maru Gothic Bold',
        fontWeight: 900,
    },
    notoSansJPRegular: {
        name: "Noto_Sans_JP",
        title: 'Noto JP',
        fontWeight: 400,
    },
    notoSansJPBold: {
        name: "Noto_Sans_JP",
        title: 'Noto JP Bold',
        fontWeight: 900,
    },
    zenKakuGothicRegular: {
        name: "Zen_Kaku_Gothic",
        title: 'Kaku',
        fontWeight: 400,
    },
    zenKakuGothicBold: {
        name: "Zen_Kaku_Gothic",
        title: 'Kaku Bold',
        fontWeight: 900,
    },
}

type FontKey = 'simsunRegular' | 'simsunBold' | 'sawarabiGothicRegular' | 'sawarabiGothicBold' | 'zenMaruGothicRegular' | 'zenMaruGothicBold' | 'notoSansJPRegular' | 'notoSansJPBold' | 'zenKakuGothicRegular' | 'zenKakuGothicBold' | 'rampartOneRegular' | 'trainOne' | 'dotGothic'

type AppProviderProps = {
    currentSubIndex: number
    isSubtitle: boolean,
    currentSubtitle: Subtitle,
    subPos: SubPosition,
    showBorder: boolean,
    setShowBorder: Dispatch<SetStateAction<boolean>>,
    setSubtitle: (data: NodeCue[]) => void,
    videoRef: RefObject<HTMLVideoElement> | null,
    subTitle: MutableRefObject<NodeCue[]> | null,
    setCurrentSubtitle: Dispatch<SetStateAction<Subtitle>>,
    setIsSubtitle: Dispatch<SetStateAction<boolean>>,
    setSubPos: Dispatch<SetStateAction<SubPosition>>,
    setCurrentSubIndex: Dispatch<SetStateAction<number>>,
    currentFont: FontOption,
    setCurrentFont: Dispatch<SetStateAction<FontOption>>,
    fontSize: number,
    setFontSize: Dispatch<SetStateAction<number>>,
    backgroundOpacity: number,
    setBackgroundOpacity: Dispatch<SetStateAction<number>>,
    showSubtitle: boolean,
    setShowSubtitle: Dispatch<SetStateAction<boolean>>,
    subtitleSyncDiff: number,
    setSubtitleSyncDiff: Dispatch<SetStateAction<number>>,
    isHoverSubtitle: boolean,
    setIsHoverSubtitle: Dispatch<SetStateAction<boolean>>,
    preventPlaying: boolean,
    setPreventPlaying: Dispatch<SetStateAction<boolean>>,
    isTextShadow: boolean,
    setIsTextShadow: Dispatch<SetStateAction<boolean>>,
}

type FontOption = {
    name: FontName,
    title: 'Simsun' | 'Simsun Bold' | 'Sawarabi Gothic Bold' | 'Sawarabi Gothic' | 'Maru Gothic' | 'Maru Gothic Bold' | 'Noto JP' | 'Noto JP Bold' | 'Kaku' | 'Kaku Bold' | 'Rampart' | 'Train One' | 'Dot Gothic'
    fontWeight: number
}

type FontName = 'simsun' | 'Sawarabi_Gothic' | 'Zen_Maru_Gothic' | 'Noto_Sans_JP' | 'Zen_Kaku_Gothic' | 'Rampart_One' | 'Train_One' | 'Dot_Gothic'

type LayoutProps = {
    children?: React.ReactNode;
};

type SettingModelProps = {
    isOpen: boolean,
    onClose: () => void
}

type Subtitle = { start?: number; end?: number; text?: string };


type BesideSubtitleProps = {
    sub: NodeCue;
    currentSubtitle: Subtitle;
    setCurrentSubtitle: Dispatch<SetStateAction<Subtitle>>;
    videoRef: RefObject<HTMLVideoElement> | null;
    currentSubRef: RefObject<HTMLDivElement>;
    currentFont: FontOption
    fontSize: number,
    subtitleSyncDiff: number
}

type SubPosition = 'in-video' | 'under-video' | 'right-video'

export { containerStyle, subTitleAreaStyle, subTitleTextStyle, subTitleWrapperStyle, fonts, DEFAULT_FONT_SIZE }

export type { AppProviderProps, LayoutProps, SettingModelProps, SubPosition, BesideSubtitleProps, Subtitle, FontOption, FontName }