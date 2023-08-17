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
}

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
}

type SubPosition = 'in-video' | 'under-video' | 'right-video'

export { containerStyle, subTitleAreaStyle, subTitleTextStyle, subTitleWrapperStyle }

export type { AppProviderProps, LayoutProps, SettingModelProps, SubPosition, BesideSubtitleProps, Subtitle }