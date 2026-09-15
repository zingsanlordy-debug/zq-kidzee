export interface UserProfile {
  name: string;
  bio: string;
  address: string;
  dp: string;
  followersCount: number;
  followingCount: number;
  isLoggedIn: boolean;
}

export interface FeedPost {
  id: string;
  uid: string;
  name: string;
  dp: string;
  address: string;
  text: string;
  time: number;
  likes: number;
  isLiked?: boolean;
  isFollowing?: boolean;
}

export interface StoryQuestion {
  question: string;
  options?: string[];
  answer: string;
}

export interface StoryItem {
  id: number;
  title: string;
  englishTitle: string;
  emoji: string;
  moral: string;
  summary: string;
  fullStory: string;
  category: string;
  bgGradient: string;
  vId?: string;
  part1_intro?: string;
  part2_drama?: string;
  part3_ending?: string;
  questions?: StoryQuestion[];
  bgType?: 'jungle' | 'rajmahal' | 'kitchen' | 'racetrack' | 'gaon' | 'river' | 'sky' | 'fairytale' | 'desert';
  soundFx?: 'sher' | 'shehnai' | 'cat_mouse' | 'race_wind' | 'birds' | 'water' | 'space' | 'village' | 'magic';
  lines?: string[];
}

export type StoryVideo = StoryItem;

export interface LoriItem {
  id: number;
  title: string;
  hindiLyrics: string;
  englishMeaning: string;
  tag: string;
  fullLyrics?: string;
  paragraphs?: string[];
  lines?: string[];
}

export interface PoemItem {
  id: number;
  title: string;
  englishTitle: string;
  lyrics: string;
  emoji: string;
  theme: string;
  lines16?: string[];
  soundType?: 'dholak_piano' | 'horse_trot' | 'train_chug' | 'rain_drops' | 'nature_birds';
}

export interface SketchItem {
  id: number;
  name: string;
  category: 'Prakriti' | 'Fal & Sabzi' | 'Ghar & Shahar' | 'Moortiyan' | 'Vahan & Khilone';
  emoji: string;
  outlineType: string;
}

export interface Dict33Meanings {
  hi: string;
  en: string;
  ta: string;
  te: string;
  mr: string;
  bn: string;
  gu: string;
  kn: string;
  ml: string;
  pa: string;
  or: string;
  as: string;
  ur: string;
  brx: string;
  doi: string;
  kok: string;
  mai: string;
  mni: string;
  ne: string;
  sa: string;
  sat: string;
  sd: string;
  ks: string;
  raj: string;
  bgc: string;
  bho: string;
  hne: string;
  fr: string;
  es: string;
  de: string;
  ar: string;
  zh: string;
  ru: string;
}

export interface Dict33Word {
  id: number;
  word: string;
  letter: string;
  partOfSpeech: string;
  example?: string;
  meanings: Dict33Meanings;
}

export interface DictWord {
  id: number;
  hindi: string;
  english: string;
  hinglish: string;
  meaning: string;
  partOfSpeech: string;
  meanings?: Dict33Meanings;
}

export interface GkItem {
  id: number;
  title: string;
  detail: string;
  category: string;
  imageUrl: string;
  keyFact: string;
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  marks: number;
  explanation: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  marks: number;
  percentage: number;
  date: string;
  badge: string;
}

export interface LiveQuestion {
  id: string;
  author: string;
  avatar: string;
  question: string;
  time: number;
  answers: {
    author: string;
    text: string;
    time: number;
  }[];
}

export interface PaheliItem {
  id: number;
  title: string;
  riddle: string;
  options: [string, string, string]; // 3 options for kids age 5-10
  answer: string;
  answerIndex: number;
  emoji: string;
  hint: string;
  funFact: string;
  soundPhrase: string;
  isFree: boolean;
}
