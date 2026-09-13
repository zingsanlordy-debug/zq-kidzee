// Kids Education Half-Premium Data: ABCD, Varnamala, Numbers 1-100, Tables 2-20

export interface AbcdItem {
  id: string;
  letter: string;
  word: string;
  hindiWord: string;
  emoji: string;
  color: string;
  speakText: string;
  isFree: boolean; // A to M FREE, N to Z PREMIUM
}

export const ABCD_DATA: AbcdItem[] = [
  { id: 'a', letter: 'A', word: 'Apple', hindiWord: 'सेब', emoji: '🍎', color: 'from-red-400 to-rose-600', speakText: 'A for Apple. ए फॉर एप्पल। सेब।', isFree: true },
  { id: 'b', letter: 'B', word: 'Ball', hindiWord: 'गेंद', emoji: '⚽', color: 'from-blue-400 to-indigo-600', speakText: 'B for Ball. बी फॉर बॉल। गेंद।', isFree: true },
  { id: 'c', letter: 'C', word: 'Cat', hindiWord: 'बिल्ली', emoji: '🐱', color: 'from-amber-400 to-orange-500', speakText: 'C for Cat. सी फॉर कैट। बिल्ली।', isFree: true },
  { id: 'd', letter: 'D', word: 'Dog', hindiWord: 'कुत्ता', emoji: '🐶', color: 'from-emerald-400 to-green-600', speakText: 'D for Dog. डी फॉर डॉग। कुत्ता।', isFree: true },
  { id: 'e', letter: 'E', word: 'Elephant', hindiWord: 'हाथी', emoji: '🐘', color: 'from-sky-400 to-cyan-600', speakText: 'E for Elephant. ई फॉर एलिफेंट। हाथी।', isFree: true },
  { id: 'f', letter: 'F', word: 'Fish', hindiWord: 'मछली', emoji: '🐟', color: 'from-teal-400 to-emerald-600', speakText: 'F for Fish. एफ फॉर फिश। मछली।', isFree: true },
  { id: 'g', letter: 'G', word: 'Grapes', hindiWord: 'अंगूर', emoji: '🍇', color: 'from-purple-400 to-violet-600', speakText: 'G for Grapes. जी फॉर ग्रेप्स। अंगूर।', isFree: true },
  { id: 'h', letter: 'H', word: 'Horse', hindiWord: 'घोड़ा', emoji: '🐎', color: 'from-orange-400 to-amber-600', speakText: 'H for Horse. एच फॉर हॉर्स। घोड़ा।', isFree: true },
  { id: 'i', letter: 'I', word: 'Ice Cream', hindiWord: 'आइसक्रीम', emoji: '🍦', color: 'from-pink-400 to-rose-500', speakText: 'I for Ice Cream. आई फॉर आइसक्रीम।', isFree: true },
  { id: 'j', letter: 'J', word: 'Jug', hindiWord: 'जग', emoji: '🧃', color: 'from-cyan-400 to-blue-500', speakText: 'J for Jug. जे फॉर जग।', isFree: true },
  { id: 'k', letter: 'K', word: 'Kite', hindiWord: 'पतंग', emoji: '🪁', color: 'from-yellow-400 to-amber-500', speakText: 'K for Kite. के फॉर काइट। पतंग।', isFree: true },
  { id: 'l', letter: 'L', word: 'Lion', hindiWord: 'शेर', emoji: '🦁', color: 'from-amber-500 to-red-500', speakText: 'L for Lion. एल फॉर लायन। शेर राजा।', isFree: true },
  { id: 'm', letter: 'M', word: 'Mango', hindiWord: 'आम', emoji: '🥭', color: 'from-yellow-400 to-orange-500', speakText: 'M for Mango. एम फॉर मैंगो। फलों का राजा आम।', isFree: true },
  // Half Premium: N to Z
  { id: 'n', letter: 'N', word: 'Nest', hindiWord: 'घोंसला', emoji: '🪺', color: 'from-amber-600 to-yellow-700', speakText: 'N for Nest. एन फॉर नेस्ट। चिड़िया का घोंसला।', isFree: false },
  { id: 'o', letter: 'O', word: 'Orange', hindiWord: 'संतरा', emoji: '🍊', color: 'from-orange-500 to-amber-600', speakText: 'O for Orange. ओ फॉर ऑरेंज। संतरा।', isFree: false },
  { id: 'p', letter: 'P', word: 'Parrot', hindiWord: 'तोता', emoji: '🦜', color: 'from-emerald-500 to-green-600', speakText: 'P for Parrot. पी फॉर पैरट। मीठू तोता।', isFree: false },
  { id: 'q', letter: 'Q', word: 'Queen', hindiWord: 'रानी', emoji: '👑', color: 'from-purple-500 to-pink-600', speakText: 'Q for Queen. क्यू फॉर क्वीन। सुंदर रानी।', isFree: false },
  { id: 'r', letter: 'R', word: 'Rabbit', hindiWord: 'खरगोश', emoji: '🐰', color: 'from-rose-400 to-pink-500', speakText: 'R for Rabbit. आर फॉर रैबिट। प्यारा खरगोश।', isFree: false },
  { id: 's', letter: 'S', word: 'Sun', hindiWord: 'सूरज', emoji: '☀️', color: 'from-amber-400 to-yellow-500', speakText: 'S for Sun. एस फॉर सन। चमकता सूरज।', isFree: false },
  { id: 't', letter: 'T', word: 'Tiger', hindiWord: 'बाघ', emoji: '🐯', color: 'from-orange-500 to-red-600', speakText: 'T for Tiger. टी फॉर टाइगर। बाघ।', isFree: false },
  { id: 'u', letter: 'U', word: 'Umbrella', hindiWord: 'छतरी', emoji: '☂️', color: 'from-violet-500 to-indigo-600', speakText: 'U for Umbrella. यू फॉर अम्ब्रेला। रंग-बिरंगी छतरी।', isFree: false },
  { id: 'v', letter: 'V', word: 'Van', hindiWord: 'वैन', emoji: '🚐', color: 'from-blue-500 to-cyan-600', speakText: 'V for Van. वी फॉर वैन। स्कूल वैन।', isFree: false },
  { id: 'w', letter: 'W', word: 'Watch', hindiWord: 'घड़ी', emoji: '⌚', color: 'from-teal-500 to-emerald-600', speakText: 'W for Watch. डब्ल्यू फॉर वॉच। हाथ की घड़ी।', isFree: false },
  { id: 'x', letter: 'X', word: 'Xylophone', hindiWord: 'जाइलोफ़ोन', emoji: '🎼', color: 'from-fuchsia-500 to-purple-600', speakText: 'X for Xylophone. एक्स फॉर ज़ाइलोफ़ोन।', isFree: false },
  { id: 'y', letter: 'Y', word: 'Yak', hindiWord: 'याक', emoji: '🐂', color: 'from-stone-500 to-zinc-600', speakText: 'Y for Yak. वाई फॉर याक।', isFree: false },
  { id: 'z', letter: 'Z', word: 'Zebra', hindiWord: 'ज़ेबरा', emoji: '🦓', color: 'from-slate-700 to-zinc-900', speakText: 'Z for Zebra. ज़ेड फॉर ज़ेबरा। काली-सफेद धारियों वाला।', isFree: false },
];

export interface VarnamalaItem {
  id: string;
  letter: string;
  word: string;
  englishMeaning: string;
  emoji: string;
  color: string;
  speakText: string;
  isFree: boolean; // क to ण (15 items) FREE, त to ज्ञ (21 items) PREMIUM
}

export const VARNAMALA_DATA: VarnamalaItem[] = [
  // 15 FREE items
  { id: 'v1', letter: 'क', word: 'कबूतर', englishMeaning: 'Pigeon', emoji: '🕊️', color: 'from-rose-400 to-red-500', speakText: 'क से कबूतर। गुटर गूं करता कबूतर।', isFree: true },
  { id: 'v2', letter: 'ख', word: 'खरगोश', englishMeaning: 'Rabbit', emoji: '🐇', color: 'from-orange-400 to-amber-500', speakText: 'ख से खरगोश। फुदक-फुदक कर दौड़ता खरगोश।', isFree: true },
  { id: 'v3', letter: 'ग', word: 'गमला', englishMeaning: 'Flower Pot', emoji: '🪴', color: 'from-emerald-400 to-green-600', speakText: 'ग से गमला। फूलों वाला सुंदर गमला।', isFree: true },
  { id: 'v4', letter: 'घ', word: 'घड़ी', englishMeaning: 'Clock', emoji: '⏰', color: 'from-blue-400 to-cyan-500', speakText: 'घ से घड़ी। टिक-टिक करती प्यारी घड़ी।', isFree: true },
  { id: 'v5', letter: 'ङ', word: 'खाली', englishMeaning: 'Blank', emoji: '⭕', color: 'from-slate-400 to-slate-500', speakText: 'ङ से खाली। बच्चे बजाओ ताली!', isFree: true },
  { id: 'v6', letter: 'च', word: 'चम्मच', englishMeaning: 'Spoon', emoji: '🥄', color: 'from-purple-400 to-violet-500', speakText: 'च से चम्मच। खीर खाने की चम्मच।', isFree: true },
  { id: 'v7', letter: 'छ', word: 'छतरी', englishMeaning: 'Umbrella', emoji: '☂️', color: 'from-pink-400 to-rose-500', speakText: 'छ से छतरी। बारिश में काम आए छतरी।', isFree: true },
  { id: 'v8', letter: 'ज', word: 'जहाज', englishMeaning: 'Ship', emoji: '🚢', color: 'from-cyan-500 to-blue-600', speakText: 'ज से जहाज। पानी पर चलता बड़ा जहाज।', isFree: true },
  { id: 'v9', letter: 'झ', word: 'झंडा', englishMeaning: 'Flag', emoji: '🇮🇳', color: 'from-amber-500 to-orange-600', speakText: 'झ से झंडा। तिरंगा हमारा प्यारा झंडा।', isFree: true },
  { id: 'v10', letter: 'ञ', word: 'खाली', englishMeaning: 'Blank', emoji: '⭕', color: 'from-slate-400 to-slate-500', speakText: 'ञ से खाली। बच्चे बजाओ ताली!', isFree: true },
  { id: 'v11', letter: 'ट', word: 'टमाटर', englishMeaning: 'Tomato', emoji: '🍅', color: 'from-red-500 to-rose-600', speakText: 'ट से टमाटर। लाल-लाल रसीला टमाटर।', isFree: true },
  { id: 'v12', letter: 'ठ', word: 'ठठेरा', englishMeaning: 'Utensil Maker', emoji: '🔨', color: 'from-amber-600 to-yellow-600', speakText: 'ठ से ठठेरा। बर्तन बनाता ठठेरा।', isFree: true },
  { id: 'v13', letter: 'ड', word: 'डमरू', englishMeaning: 'Dumroo', emoji: '🪘', color: 'from-indigo-400 to-blue-500', speakText: 'ड से डमरू। डम-डम बाजे डमरू।', isFree: true },
  { id: 'v14', letter: 'ढ', word: 'ढक्कन', englishMeaning: 'Lid', emoji: '🫕', color: 'from-teal-400 to-emerald-500', speakText: 'ढ से ढक्कन। बर्तन पर ढको ढक्कन।', isFree: true },
  { id: 'v15', letter: 'ण', word: 'खाली', englishMeaning: 'Blank', emoji: '⭕', color: 'from-slate-400 to-slate-500', speakText: 'ण से खाली। बच्चे बजाओ ताली!', isFree: true },
  // Half Premium: त to ज्ञ (21 items)
  { id: 'v16', letter: 'त', word: 'तरबूज', englishMeaning: 'Watermelon', emoji: '🍉', color: 'from-green-500 to-emerald-700', speakText: 'त से तरबूज। मीठा-मीठा लाल तरबूज।', isFree: false },
  { id: 'v17', letter: 'थ', word: 'थर्मस', englishMeaning: 'Thermos', emoji: '🍼', color: 'from-sky-500 to-cyan-600', speakText: 'थ से थर्मस। गर्म रखे चाय-पानी थर्मस।', isFree: false },
  { id: 'v18', letter: 'द', word: 'दवात', englishMeaning: 'Inkpot', emoji: '🖋️', color: 'from-blue-600 to-indigo-700', speakText: 'द से दवात। स्याही भरी दवात।', isFree: false },
  { id: 'v19', letter: 'ध', word: 'धनुष', englishMeaning: 'Bow', emoji: '🏹', color: 'from-amber-600 to-yellow-700', speakText: 'ध से धनुष। राम जी का धनुष बाण।', isFree: false },
  { id: 'v20', letter: 'न', word: 'नल', englishMeaning: 'Tap', emoji: '🚰', color: 'from-cyan-500 to-teal-600', speakText: 'न से नल। नल से टपके निर्मल जल।', isFree: false },
  { id: 'v21', letter: 'प', word: 'पतंग', englishMeaning: 'Kite', emoji: '🪁', color: 'from-rose-500 to-pink-600', speakText: 'प से पतंग। आसमान में उड़े पतंग।', isFree: false },
  { id: 'v22', letter: 'फ', word: 'फल', englishMeaning: 'Fruits', emoji: '🍎', color: 'from-red-500 to-orange-500', speakText: 'फ से फल। सेहत बनाएं मीठे फल।', isFree: false },
  { id: 'v23', letter: 'ब', word: 'बत्तख', englishMeaning: 'Duck', emoji: '🦆', color: 'from-yellow-400 to-amber-500', speakText: 'ब से बत्तख। पानी में तैरे बत्तख।', isFree: false },
  { id: 'v24', letter: 'भ', word: 'भालू', englishMeaning: 'Bear', emoji: '🐻', color: 'from-amber-700 to-stone-800', speakText: 'भ से भालू। नाच दिखाए काला भालू।', isFree: false },
  { id: 'v25', letter: 'म', word: 'मछली', englishMeaning: 'Fish', emoji: '🐟', color: 'from-blue-400 to-teal-500', speakText: 'म से मछली। मछली जल की रानी है।', isFree: false },
  { id: 'v26', letter: 'य', word: 'यज्ञ', englishMeaning: 'Sacred Ritual', emoji: '🪔', color: 'from-orange-500 to-red-600', speakText: 'य से यज्ञ। ऋषि मुनि करते हैं यज्ञ।', isFree: false },
  { id: 'v27', letter: 'र', word: 'रथ', englishMeaning: 'Chariot', emoji: '🎠', color: 'from-amber-500 to-yellow-600', speakText: 'र से रथ। राजा की सवारी रथ।', isFree: false },
  { id: 'v28', letter: 'ल', word: 'लट्टू', englishMeaning: 'Spinning Top', emoji: '🪀', color: 'from-indigo-500 to-purple-600', speakText: 'ल से लट्टू। गोल-गोल घूमे लट्टू।', isFree: false },
  { id: 'v29', letter: 'व', word: 'वन', englishMeaning: 'Forest', emoji: '🌳', color: 'from-emerald-600 to-green-700', speakText: 'व से वन। हरा-भरा प्यारा वन।', isFree: false },
  { id: 'v30', letter: 'श', word: 'शलजम', englishMeaning: 'Turnip', emoji: '🥗', color: 'from-fuchsia-500 to-pink-600', speakText: 'श से शलजम। ताकतवर मीठा शलजम।', isFree: false },
  { id: 'v31', letter: 'ष', word: 'षट्कोण', englishMeaning: 'Hexagon', emoji: '⬡', color: 'from-purple-600 to-indigo-700', speakText: 'ष से षट्कोण। छह कोनों वाला षट्कोण।', isFree: false },
  { id: 'v32', letter: 'स', word: 'सेब', englishMeaning: 'Apple', emoji: '🍏', color: 'from-green-500 to-emerald-600', speakText: 'स से सेब। रोज खाओ मीठा सेब।', isFree: false },
  { id: 'v33', letter: 'ह', word: 'हाथी', englishMeaning: 'Elephant', emoji: '🐘', color: 'from-slate-600 to-stone-700', speakText: 'ह से हाथी। सबसे बड़ा जानवर हाथी।', isFree: false },
  { id: 'v34', letter: 'क्ष', word: 'क्षत्रिय', englishMeaning: 'Warrior', emoji: '⚔️', color: 'from-red-600 to-rose-700', speakText: 'क्ष से क्षत्रिय। वीर और साहसी क्षत्रिय।', isFree: false },
  { id: 'v35', letter: 'त्र', word: 'त्रिशूल', englishMeaning: 'Trident', emoji: '🔱', color: 'from-amber-500 to-orange-600', speakText: 'त्र से त्रिशूल। शिव जी का पावन त्रिशूल।', isFree: false },
  { id: 'v36', letter: 'ज्ञ', word: 'ज्ञानी', englishMeaning: 'Wise Scholar', emoji: '🧙', color: 'from-violet-600 to-purple-700', speakText: 'ज्ञ से ज्ञानी। ज्ञान बांटते हैं ज्ञानी।', isFree: false },
];

export interface NumberItem {
  num: number;
  english: string;
  hindi: string;
  emoji: string;
  isFree: boolean; // 1 to 50 FREE, 51 to 100 PREMIUM
}

const HINDI_NUMBER_NAMES = [
  "", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ", "दस",
  "ग्यारह", "बारह", "तेरह", "चौदह", "पंद्रह", "सोलह", "सत्रह", "अट्ठारह", "उन्नीस", "बीस",
  "इक्कीस", "बाईस", "तेईस", "चौबीस", "पच्चीस", "छब्बीस", "सत्ताईस", "अट्ठाईस", "उनतीस", "तीस",
  "इकतीस", "बत्तीस", "तैंतीस", "चौंतीस", "पैंतीस", "छत्तीस", "सैंतीस", "अड़तीस", "उनतालीस", "चालीस",
  "इकतालीस", "बयालीस", "तैंतालीस", "चवालीस", "पैंतालीस", "छियालीस", "सैंतालीस", "अड़तालीस", "उनचास", "पचास",
  "इक्यावन", "बावन", "तिरेपन", "चौवन", "पचपन", "छप्पन", "सत्तावन", "अट्ठावन", "उनसठ", "साठ",
  "इकसठ", "बासठ", "तिरेसठ", "चौंसठ", "पैंसठ", "छियासठ", "सरसठ", "अड़सठ", "उनहत्तर", "सत्तर",
  "इकहत्तर", "बहत्तर", "तिहत्तर", "चौहत्तर", "पचहत्तर", "छिहत्तर", "सतहत्तर", "अठहत्तर", "उन्नासी", "अस्सी",
  "इक्यासी", "बयासी", "तिरासी", "चौरासी", "पचासी", "छियासी", "सत्तासी", "अट्ठासी", "नवासी", "नब्बे",
  "इक्यानवे", "बानवे", "तिरानवे", "चौरानवे", "पंचानवे", "छियानवे", "सत्तानवे", "अट्ठानवे", "निन्यानवे", "सौ"
];

const ENGLISH_NUMBER_NAMES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty",
  "Twenty-One", "Twenty-Two", "Twenty-Three", "Twenty-Four", "Twenty-Five", "Twenty-Six", "Twenty-Seven", "Twenty-Eight", "Twenty-Nine", "Thirty",
  "Thirty-One", "Thirty-Two", "Thirty-Three", "Thirty-Four", "Thirty-Five", "Thirty-Six", "Thirty-Seven", "Thirty-Eight", "Thirty-Nine", "Forty",
  "Forty-One", "Forty-Two", "Forty-Three", "Forty-Four", "Forty-Five", "Forty-Six", "Forty-Seven", "Forty-Eight", "Forty-Nine", "Fifty",
  "Fifty-One", "Fifty-Two", "Fifty-Three", "Fifty-Four", "Fifty-Five", "Fifty-Six", "Fifty-Seven", "Fifty-Eight", "Fifty-Nine", "Sixty",
  "Sixty-One", "Sixty-Two", "Sixty-Three", "Sixty-Four", "Sixty-Five", "Sixty-Six", "Sixty-Seven", "Sixty-Eight", "Sixty-Nine", "Seventy",
  "Seventy-One", "Seventy-Two", "Seventy-Three", "Seventy-Four", "Seventy-Five", "Seventy-Six", "Seventy-Seven", "Seventy-Eight", "Seventy-Nine", "Eighty",
  "Eighty-One", "Eighty-Two", "Eighty-Three", "Eighty-Four", "Eighty-Five", "Eighty-Six", "Eighty-Seven", "Eighty-Eight", "Eighty-Nine", "Ninety",
  "Ninety-One", "Ninety-Two", "Ninety-Three", "Ninety-Four", "Ninety-Five", "Ninety-Six", "Ninety-Seven", "Ninety-Eight", "Ninety-Nine", "One Hundred"
];

const NUMBER_EMOJIS = ['⭐', '🎈', '🍎', '🐱', '🌸', '🚗', '🚀', '🍬', '🍦', '🍓'];

export const NUMBERS_100_DATA: NumberItem[] = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1;
  return {
    num: n,
    english: ENGLISH_NUMBER_NAMES[n] || String(n),
    hindi: HINDI_NUMBER_NAMES[n] || String(n),
    emoji: NUMBER_EMOJIS[(n - 1) % NUMBER_EMOJIS.length],
    isFree: n <= 50 // 1 to 50 FREE, 51 to 100 PREMIUM
  };
});

export interface TableItem {
  tableNumber: number;
  title: string;
  hindiTitle: string;
  isFree: boolean; // Table 2 to 10 FREE, 11 to 20 PREMIUM
  lines: {
    multiplier: number;
    result: number;
    englishChant: string;
    hindiChant: string;
  }[];
}

const HINDI_MULTIPLIERS = [
  "", "एकम", "दूनी", "तिया", "चौके", "पंचे", "छक्के", "सत्ते", "अट्ठे", "नम्मे", "दहाम"
];

const ENGLISH_MULTIPLIERS = [
  "", "one za", "two za", "three za", "four za", "five za", "six za", "seven za", "eight za", "nine za", "ten za"
];

export const TABLES_2_TO_20_DATA: TableItem[] = Array.from({ length: 19 }, (_, i) => {
  const tableNumber = i + 2; // 2 to 20
  const isFree = tableNumber <= 10; // 2 to 10 FREE, 11 to 20 PREMIUM

  const lines = Array.from({ length: 10 }, (_, mIdx) => {
    const mult = mIdx + 1;
    const res = tableNumber * mult;
    return {
      multiplier: mult,
      result: res,
      englishChant: `${tableNumber} ${ENGLISH_MULTIPLIERS[mult]} ${res}`,
      hindiChant: `${tableNumber} ${HINDI_MULTIPLIERS[mult]} ${res}`
    };
  });

  return {
    tableNumber,
    title: `Table of ${tableNumber}`,
    hindiTitle: `${tableNumber} का पहाड़ा`,
    isFree,
    lines
  };
});
