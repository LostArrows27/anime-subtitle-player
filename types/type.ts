import { DictionaryMethod } from "@/components/dictionary-drawer/DicitonayDrawer";
import { Dispatch, SetStateAction, RefObject, MutableRefObject } from "react";
import { NodeCue } from "subtitle";

type FontKey =
  | "simsunRegular"
  | "simsunBold"
  | "sawarabiGothicRegular"
  | "sawarabiGothicBold"
  | "zenMaruGothicRegular"
  | "zenMaruGothicBold"
  | "notoSansJPRegular"
  | "notoSansJPBold"
  | "zenKakuGothicRegular"
  | "zenKakuGothicBold"
  | "rampartOneRegular"
  | "trainOne"
  | "dotGothic";

type AppProviderProps = {
  currentSubIndex: number;
  isSubtitle: boolean;
  currentSubtitle: Subtitle;
  subPos: SubPosition;
  showBorder: boolean;
  setShowBorder: Dispatch<SetStateAction<boolean>>;
  setSubtitle: (data: NodeCue[]) => void;
  videoRef: RefObject<HTMLVideoElement> | null;
  subTitle: MutableRefObject<NodeCue[]> | null;
  setCurrentSubtitle: Dispatch<SetStateAction<Subtitle>>;
  setIsSubtitle: Dispatch<SetStateAction<boolean>>;
  setSubPos: Dispatch<SetStateAction<SubPosition>>;
  setCurrentSubIndex: Dispatch<SetStateAction<number>>;
  currentFont: FontOption;
  setCurrentFont: Dispatch<SetStateAction<FontOption>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  backgroundOpacity: number;
  setBackgroundOpacity: Dispatch<SetStateAction<number>>;
  showSubtitle: boolean;
  setShowSubtitle: Dispatch<SetStateAction<boolean>>;
  subtitleSyncDiff: number;
  setSubtitleSyncDiff: Dispatch<SetStateAction<number>>;
  isHoverSubtitle: boolean;
  setIsHoverSubtitle: Dispatch<SetStateAction<boolean>>;
  preventPlaying: boolean;
  setPreventPlaying: Dispatch<SetStateAction<boolean>>;
  isTextShadow: boolean;
  setIsTextShadow: Dispatch<SetStateAction<boolean>>;
  isSyncingSubtitle: boolean;
  setIsSyncingSubtitle: Dispatch<SetStateAction<boolean>>;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  video: File | null;
  setVideo: Dispatch<SetStateAction<File | null>>;
  isCtrlPressed: boolean;
  setIsCtrlPressed: Dispatch<SetStateAction<boolean>>;
  popupRef: RefObject<HTMLDivElement> | null;
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  dictionaryRef: RefObject<DictionaryMethod> | null;
};

type FontOption = {
  name: FontName;
  title:
    | "Simsun"
    | "Simsun Bold"
    | "Sawarabi Gothic Bold"
    | "Sawarabi Gothic"
    | "Maru Gothic"
    | "Maru Gothic Bold"
    | "Noto JP"
    | "Noto JP Bold"
    | "Kaku"
    | "Kaku Bold"
    | "Rampart"
    | "Train One"
    | "Dot Gothic";
  fontWeight: number;
};

type FontName =
  | "simsun"
  | "Sawarabi_Gothic"
  | "Zen_Maru_Gothic"
  | "Noto_Sans_JP"
  | "Zen_Kaku_Gothic"
  | "Rampart_One"
  | "Train_One"
  | "Dot_Gothic";

type LayoutProps = {
  children?: React.ReactNode;
};

type SettingModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Subtitle = { start?: number; end?: number; text?: string };

type BesideSubtitleProps = {
  sub: NodeCue;
  currentSubtitle: Subtitle;
  setCurrentSubtitle: Dispatch<SetStateAction<Subtitle>>;
  videoRef: RefObject<HTMLVideoElement> | null;
  currentSubRef: RefObject<HTMLDivElement>;
  currentFont: FontOption;
  fontSize: number;
  subtitleSyncDiff: number;
  isSyncingSubtitle: boolean;
};

type SubPosition = "in-video" | "under-video" | "right-video";

type TranslationData = {
  data: WordBreakDownData[];
};

type WordBreakDownData = {
  text: string;
  furigana?: string;
  romaji: string;
  definition: { type: string; meaning: string }[];
};

/**Jotoba API /api/suggestion return type*/
type WordRecommendRequestBody = {
  input: string;
  hashtag: "false";
  search_type: "0";
  lang: "en-US";
  radicals: [];
};

type WordRecommend = {
  primary: string;
  secondary?: string;
};

type WordRecommendReturnType = {
  suggestions: WordRecommend[];
  suggestion_type: "default";
};

/**Jotoba API /api/word return type */
type WordTraslationRequestBody = {
  query_str: string;
  settings: {
    user_lang: "en-US";
    show_english: true;
    english_on_top: false;
    show_example_sentences: true;
    sentence_furigana: true;
    /** curr_index result array size */
    page_size: number;
  };
  page: 1;
  /**curr_index in the sentence array */
  word_index: 0;
};

type WordSenses = {
  /**meaning of word */
  glosses: string[];
  information?: string;
  /**classify word
      ```js 
      [{Verb: {Godan: "Bu"}}, {Verb: "Transitive"}] 
      ```
  */
  part_of_speech:
    | { [key: string]: string | { [key: string]: string } }
    | string[];
  language: string;
  /**
   * 1. sentence with furigana "[kanji|furigana|...]..."
   * 2. meaning in English
   */
  example_sentence?: [string, string];
  /**term, example: financial, mahjong,....*/
  field?: string;
  /**more information of word, option write in camel case. Example: ThisIsAMsic*/
  misc?: string;
};

type WordAccents = {
  /**segment the word and show pitch accent */
  parts: { part: string; high: boolean }[];
};

type WordKanji = {
  /**kanji */
  literal: string;
  stroke_count: number;
  grade: number;
  frequency: number;
  jlpt: 1 | 2 | 3 | 4 | 5;
  /**reading of the kanji alone */
  onyomi: { reading: string; has_words: true }[];
  /**reading of kanji with word
   * often with "kanji_furigana.last_part", exp: "言う" ＝ "い.う"
   */
  kunyomi: { reading: string; has_words: true }[];
  meanings: string[];
  vietnamese: string[];
  similar_kanji?: string[];
};

/**current word translation and more information */
type CurrentWordTraslation = {
  sequence: number;
  is_common: boolean;
  /**furigana of word, such as ([kanji|furigana]...) [云|い]う */
  reading: string;
  /**other furigana of word, such as [kanji|furigana] [言|ゆ]う */
  alt_readings?: string[];
  senses: WordSenses[];
  audio: {
    /**audio with source: jotoba/resources/audio/kanjialive/${number} */
    kanjialive?: string;
    /**audio with source: jotoba/resources/audio/tofugu/${number} */
    tofugu?: string;
  };
  /**all the way to speaking the word */
  accents: WordAccents[];
  /**furigana of word, such as ([kanji|furigana]...) [云|い]う */
  furigana: string;
  jlpt_lvl: 1 | 2 | 3 | 4 | 5;
  sentences_available: number;
  kanji: WordKanji[];
};

type WordPart = {
  /** parts of the sentence*/
  inflected: string;
  /** furigana of the inflected: [kanji|furigana] */
  furigana?: string;
  /** position in the WordPart array */
  position: number;
  /** word classes, such as Noun, Verb,..... */
  word_class?: string;
};

type WordTranslationReturnType = {
  content: {
    words: CurrentWordTraslation[];
    sentence: {
      /**default is 0, first word in sentence */
      curr_index: number;
      parts: WordPart[];
    };
    /**the natural form of word. Example: hakonda => hakobu + te form */
    infl_info?: {
      inflections: string[];
      lexeme: string;
    };
    /** current string from curr_index */
    orginal_query: string;
  };
  /** total_page of curr_index result */
  pages: number;
  /** current_page of pages */
  current_page: number;
};

type WordTraslationContent = Pick<WordTranslationReturnType, "content">;

// Mazii Word meaning return type

type WordExample = {
  /** sentence in Japanese */
  content: string;
  /** sentence translate */
  mean: string;
  /** reading of sentence (furigana) */
  transcription: string;
};

type WordMeaning = {
  mean: string;
  examples: WordExample[] | null;
};

type MaziiWordTranslate = {
  /** original word */
  word: string;
  /** opposite word of current word */
  opposite_word: string[] | null;
  /** short meaning, include all meaning of the current word */
  short_mean: string;
  /** reading of word */
  phonetic: string;
  /** word meaning */
  means: WordMeaning[];
  /** wordID to pass in another params */
  mobileId: number;
};

type MaziiWordMeaningReturnType = {
  status: number;
  found: boolean;
  data: MaziiWordTranslate[];
};

// Mazii word example return type

type MaziiWordExampleReturnType = {
  status: number;
  results: WordExample[];
};

// Mazii word Kanji return type

type OverallExample = {
  /** meaning in Vietnamese or English */
  m: string;
  /** word original */
  w: "自ら";
  /** word kanji reading. Example: 残高 => TÀN CAO */
  h: "TỰ";
  /** word furigana */
  p: " みずから";
};

type KunyomiExample = {
  /** the key is directly the kunyomi example */
  [kunyomiWord: string]: OverallExample[];
};

type OnyomiExample = {
  /** the key is directly the onyomi example */
  [onyomiWord: string]: OverallExample[];
};

type KanjiMeaning = {
  /** original kanji */
  kanji: string;
  /** kanji meaning in short way */
  mean: string;
  /** kunyomi */
  kun: string;
  /** onyomi */
  on: string;
  /** fully meaning of kanji */
  detail: string;
  /** example of kunyomi reading */
  example_kun: KunyomiExample[];
  /** example of onyomi reading */
  example_on: OnyomiExample[];
  /** kanji overall example, include on and kun */
  example: OverallExample[];
  /** wordID to pass in another params */
  mobileId: number;
  /** kanji stroke count */
  stroke_count: number;
  /** h: Kanji, w: writing */
  compDetail: { h: string; w: string }[];
};

type MaziiWordKanjiReturnType = {
  status: number;
  results: KanjiMeaning[];
};

// Mazii Kanji example from comments

type KanjiExampleFromCommentsReturnType = {
  status: number;
  result: { mean: string }[];
};

type WordExampleFromCommentsReturnType = {
  status: number;
  result: { mean: string }[];
};

export type {
  AppProviderProps,
  LayoutProps,
  SettingModelProps,
  SubPosition,
  BesideSubtitleProps,
  Subtitle,
  FontOption,
  FontName,
  TranslationData,
  WordBreakDownData,
  WordRecommendRequestBody,
  WordRecommend,
  WordRecommendReturnType,
  WordTraslationRequestBody,
  WordSenses,
  WordAccents,
  WordKanji,
  CurrentWordTraslation,
  WordPart,
  WordTranslationReturnType,
  FontKey,
  WordTraslationContent,
  WordExample,
  WordMeaning,
  MaziiWordTranslate,
  MaziiWordMeaningReturnType,
  MaziiWordExampleReturnType,
  MaziiWordKanjiReturnType,
  KanjiMeaning,
  KanjiExampleFromCommentsReturnType,
  WordExampleFromCommentsReturnType,
  OverallExample,
};
