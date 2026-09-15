export interface PaheliItem {
  id: number;
  title: string;
  riddle: string;
  options: [string, string, string]; // exactly 3 options for kids age 5-10
  answer: string;
  answerIndex: number;
  emoji: string;
  hint: string;
  funFact: string;
  soundPhrase: string;
  isFree: boolean;
}
