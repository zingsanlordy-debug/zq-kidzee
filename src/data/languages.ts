export interface LanguageItem {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const SUPPORTED_33_LANGUAGES: LanguageItem[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechCode: 'en-US' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechCode: 'te-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speechCode: 'mr-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', speechCode: 'bn-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speechCode: 'gu-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', speechCode: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechCode: 'pa-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', speechCode: 'or-IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', speechCode: 'as-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', speechCode: 'ur-PK' },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो (Bodo)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी (Dogri)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी (Konkani)', flag: '🇮🇳', speechCode: 'kok-IN' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली (Maithili)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্ (Manipuri)', flag: '🇮🇳', speechCode: 'mni-IN' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली (Nepali)', flag: '🇳🇵', speechCode: 'ne-NP' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम् (Sanskrit)', flag: '🇮🇳', speechCode: 'sa-IN' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي / सिन्धी', flag: '🇮🇳', speechCode: 'sd-IN' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر / कश्मीरी', flag: '🇮🇳', speechCode: 'ks-IN' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी (Rajasthani)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'bgc', name: 'Haryanvi', nativeName: 'हरियाणवी (Haryanvi)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी (Bhojpuri)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'hne', name: 'Chhattisgarhi', nativeName: 'छत्तीसगढ़ी (Chhattisgarhi)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechCode: 'fr-FR' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechCode: 'es-ES' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية (Arabic)', flag: '🇸🇦', speechCode: 'ar-SA' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (Chinese)', flag: '🇨🇳', speechCode: 'zh-CN' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский (Russian)', flag: '🇷🇺', speechCode: 'ru-RU' },
];

export const getLanguageByCode = (code: string): LanguageItem => {
  return (
    SUPPORTED_33_LANGUAGES.find(l => l.code === code) ||
    SUPPORTED_33_LANGUAGES[0]
  );
};
