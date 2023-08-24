import { FontOption, FontKey } from "@/types/type";
const DEFAULT_FONT_SIZE = 45;

const containerStyle = {
  position: "absolute",
  bottom: "75px",
  left: "0",
  right: "0",
  width: "100%",
  margin: "auto",
  textAlign: "center",
  zIndex: "100",
} as const;

const subTitleWrapperStyle = {
  display: "inline-block",
  fontWeight: "900",
  marginLeft: "0",
  padding: "0 15px",
  marginRight: "0",
  border: "none",
  cursor: "pointer",
  borderRadius: "40px",
  userSelect: "none",
} as const;

const subTitleAreaStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "0",
} as const;

const subTitleTextStyle = {
  display: "inline-block",
  margin: "7px 10px 7px 10px",
  textAlign: "center",
} as const;

const fonts: { [keys in FontKey]: FontOption } = {
  simsunRegular: {
    name: "simsun",
    title: "Simsun",
    fontWeight: 400,
  },
  simsunBold: {
    name: "simsun",
    title: "Simsun Bold",
    fontWeight: 900,
  },
  rampartOneRegular: {
    name: "Rampart_One",
    title: "Rampart",
    fontWeight: 400,
  },
  dotGothic: {
    name: "Dot_Gothic",
    title: "Dot Gothic",
    fontWeight: 400,
  },
  trainOne: {
    name: "Train_One",
    title: "Train One",
    fontWeight: 400,
  },
  sawarabiGothicRegular: {
    name: "Sawarabi_Gothic",
    title: "Sawarabi Gothic",
    fontWeight: 400,
  },
  sawarabiGothicBold: {
    name: "Sawarabi_Gothic",
    title: "Sawarabi Gothic Bold",
    fontWeight: 900,
  },
  zenMaruGothicRegular: {
    name: "Zen_Maru_Gothic",
    title: "Maru Gothic",
    fontWeight: 400,
  },
  zenMaruGothicBold: {
    name: "Zen_Maru_Gothic",
    title: "Maru Gothic Bold",
    fontWeight: 900,
  },
  notoSansJPRegular: {
    name: "Noto_Sans_JP",
    title: "Noto JP",
    fontWeight: 400,
  },
  notoSansJPBold: {
    name: "Noto_Sans_JP",
    title: "Noto JP Bold",
    fontWeight: 900,
  },
  zenKakuGothicRegular: {
    name: "Zen_Kaku_Gothic",
    title: "Kaku",
    fontWeight: 400,
  },
  zenKakuGothicBold: {
    name: "Zen_Kaku_Gothic",
    title: "Kaku Bold",
    fontWeight: 900,
  },
};

export {
  containerStyle,
  subTitleAreaStyle,
  subTitleTextStyle,
  subTitleWrapperStyle,
  fonts,
  DEFAULT_FONT_SIZE,
};
