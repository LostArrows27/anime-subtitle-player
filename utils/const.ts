import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { NodeCue } from "subtitle";

const containerStyle = {
    position: "absolute",
    bottom: "75px",
    left: '0',
    right: '0',
    width: "100%",
    margin: "auto",
    textAlign: "center",
    zIndex: '100'
} as const;

const subTitleWrapperStyle = {
    display: "inline-block",
    backgroundColor: "transparent",
    fontWeight: '900',
    marginLeft: "0",
    marginRight: "0",
    border: "none",
    cursor: "pointer",
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
    netflixSansRegular: {
        name: "Netflix_Sans",
        title: 'Netflix Sans',
        fontWeight: 400,
    },
    netflixSansBold: {
        name: "Netflix_Sans",
        title: 'Netflix Sans Bold',
        fontWeight: 900,
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
}

type FontKey = 'simsunRegular' | 'simsunBold' | 'netflixSansRegular' | 'netflixSansBold' | 'sawarabiGothicRegular' | 'sawarabiGothicBold' | 'zenMaruGothicRegular' | 'zenMaruGothicBold'

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
    setCurrentFont: Dispatch<SetStateAction<FontOption>>
}

type FontOption = {
    name: FontName,
    title: 'Simsun' | 'Simsun Bold' | 'Netflix Sans' | 'Netflix Sans Bold' | 'Sawarabi Gothic Bold' | 'Sawarabi Gothic' | 'Maru Gothic' | 'Maru Gothic Bold',
    fontWeight: number
}

type FontName = 'simsun' | 'Netflix_Sans' | 'Sawarabi_Gothic' | 'Zen_Maru_Gothic'

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
}

type SubPosition = 'in-video' | 'under-video' | 'right-video'

export { containerStyle, subTitleAreaStyle, subTitleTextStyle, subTitleWrapperStyle, fonts }

export type { AppProviderProps, LayoutProps, SettingModelProps, SubPosition, BesideSubtitleProps, Subtitle, FontOption, FontName }