// Multilingual translations for all 350+ Learning items and categories
// Supporting Hindi, English, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada, Malayalam, Urdu, Punjabi, Odia, Assamese, etc.

export interface CategoryTranslation {
  title: string;
  freeDesc: string;
  spokenIntro: string;
}

export const CATEGORY_TRANSLATIONS: Record<string, Record<string, CategoryTranslation>> = {
  abcd: {
    hi: { title: "ABCD वर्णमाला (A to Z)", freeDesc: "A से Z तक", spokenIntro: "आइए अंग्रेजी वर्णमाला ए टू जेड सीखें!" },
    en: { title: "ABCD Alphabet (A to Z)", freeDesc: "A to Z Phonics", spokenIntro: "Let's learn the English alphabet from A to Z!" },
    mr: { title: "ABCD मुळाक्षरे (A to Z)", freeDesc: "A ते Z", spokenIntro: "चला इंग्रजी मुळाक्षरे ए टू झेड शिकूया!" },
    ta: { title: "ABCD ஆங்கில எழுத்துக்கள் (A to Z)", freeDesc: "A முதல் Z வரை", spokenIntro: "வாருங்கள் ஏ முதல் இசட் வரை ஆங்கில எழுத்துக்களைக் கற்போம்!" },
    te: { title: "ABCD ఆంగ్ల అక్షరాలు (A to Z)", freeDesc: "A నుండి Z వరకు", spokenIntro: "రండి ఏ నుండి జెడ్ వరకు ఆంగ్ల అక్షరాలు నేర్చుకుందాం!" },
    bn: { title: "ABCD বর্ণমালা (A to Z)", freeDesc: "A থেকে Z পর্যন্ত", spokenIntro: "চলুন ইংরেজি বর্ণমালা এ টু জেড শিখি!" },
    gu: { title: "ABCD કક્કો (A to Z)", freeDesc: "A થી Z સુધી", spokenIntro: "ચાલો અંગ્રેજી મૂળાક્ષરો એ ટુ ઝેડ શીખીએ!" },
    kn: { title: "ABCD ವರ್ಣಮಾಲೆ (A to Z)", freeDesc: "A ಇಂದ Z ವರೆಗೆ", spokenIntro: "ಬನ್ನಿ ಇಂಗ್ಲಿಷ್ ವರ್ಣಮಾಲೆ ಎ ಇಂದ ಝೆಡ್ ಕಲಿಯೋಣ!" },
    ml: { title: "ABCD അക്ഷരമാല (A to Z)", freeDesc: "A മുതൽ Z വരെ", spokenIntro: "വരൂ നമുക്ക് എ മുതൽ ഇസഡ് വരെയുള്ള ഇംഗ്ലീഷ് അക്ഷരങ്ങൾ പഠിക്കാം!" },
    ur: { title: "ABCD حروف تہجی (A to Z)", freeDesc: "A سے Z تک", spokenIntro: "آئیے اے سے زیڈ تک انگریزی حروف تہجی سیکھیں!" },
    pa: { title: "ABCD ਵਰਣਮਾਲਾ (A to Z)", freeDesc: "A ਤੋਂ Z ਤੱਕ", spokenIntro: "ਆਓ ਅੰਗਰੇਜ਼ੀ ਵਰਣਮਾਲਾ ਏ ਟੂ ਜ਼ੈਡ ਸਿੱਖੀਏ!" },
    or: { title: "ABCD ବର୍ଣ୍ଣମାଳା (A to Z)", freeDesc: "A ରୁ Z ଯାଏଁ", spokenIntro: "ଆସନ୍ତୁ ଇଂରାଜୀ ବର୍ଣ୍ଣମାଳା ଏ ଟୁ ଜେଡ୍ ଶିଖିବା!" },
    as: { title: "ABCD বৰ্ণমালা (A to Z)", freeDesc: "A ৰ পৰা Z লৈ", spokenIntro: "আহাঁ আমি ইংৰাজী বৰ্ণমালা এ টু জেড শিকোঁ!" }
  },
  varnamala: {
    hi: { title: "हिन्दी वर्णमाला (अ से ज्ञ)", freeDesc: "अ से ज्ञ स्वर व व्यंजन", spokenIntro: "आइए हिन्दी वर्णमाला स्वर और व्यंजन सीखें!" },
    en: { title: "Hindi Varnamala (A to Gya)", freeDesc: "Vowels & Consonants", spokenIntro: "Let's learn Hindi Varnamala vowels and consonants!" },
    mr: { title: "मराठी व हिंदी वर्णमाला (अ ते ज्ञ)", freeDesc: "स्वर व व्यंजने", spokenIntro: "चला वर्णमाला स्वर आणि व्यंजने शिकूया!" },
    ta: { title: "இந்தி மற்றும் தாய்மொழி எழுத்துக்கள் (அ முதல் ஞ)", freeDesc: "உயிர் & மெய் எழுத்துக்கள்", spokenIntro: "எழுத்துக்களின் ஒலிகளையும் உச்சரிப்பையும் கற்போம்!" },
    te: { title: "హిందీ వర్ణమాల (అ నుండి జ్ఞ)", freeDesc: "అచ్చులు & హల్లులు", spokenIntro: "రండి అచ్చులు మరియు హల్లులు నేర్చుకుందాం!" },
    bn: { title: "হিন্দি বর্ণমালা (অ থেকে জ্ঞ)", freeDesc: "স্বর ও ব্যঞ্জনবর্ণ", spokenIntro: "চলুন স্বরবর্ণ ও ব্যঞ্জনবর্ণ শিখি!" },
    gu: { title: "વર્ણમાલા (અ થી જ્ઞ)", freeDesc: "સ્વર અને વ્યંજન", spokenIntro: "ચાલો સ્વર અને વ્યંજન શીખીએ!" },
    kn: { title: "ಹಿಂದಿ ವರ್ಣಮಾಲೆ (ಅ ಇಂದ ಜ್ಞ)", freeDesc: "ಸ್ವರಗಳು ಮತ್ತು ವ್ಯಂಜನಗಳು", spokenIntro: "ಬನ್ನಿ ಸ್ವರಗಳು ಮತ್ತು ವ್ಯಂಜನಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "ഹിന്ദി വർണ്ണമാല (അ മുതൽ ജ്ഞ)", freeDesc: "സ്വരങ്ങളും വ്യഞ്ജനങ്ങളും", spokenIntro: "വരൂ നമുക്ക് വർണ്ണമാല പഠിക്കാം!" },
    ur: { title: "ہندی حروف تہجی (ا سے گیا)", freeDesc: "حروف و مصوتے", spokenIntro: "آئیے حروف تہجی سیکھیں!" },
    pa: { title: "ਵਰਣਮਾਲਾ (ਅ ਤੋਂ ਗਿਆ)", freeDesc: "ਸਵਰ ਤੇ ਵਿਅੰਜਨ", spokenIntro: "ਆਓ ਵਰਣਮਾਲਾ ਸਿੱਖੀਏ!" },
    or: { title: "ବର୍ଣ୍ଣମାଳା (ଅ ରୁ ଜ୍ଞ)", freeDesc: "ସ୍ଵର ଓ ବ୍ୟଞ୍ଜନ", spokenIntro: "ଆସନ୍ତୁ ବର୍ଣ୍ଣମାଳା ଶିଖିବା!" },
    as: { title: "বৰ্ণমালা (অ ৰ পৰা জ্ঞ)", freeDesc: "স্বৰবৰ্ণ আৰু ব্যঞ্জনবৰ্ণ", spokenIntro: "আহাঁ আমি বৰ্ণমালা শিকোঁ!" }
  },
  numbers: {
    hi: { title: "गिनती 1 से 100 (Numbers)", freeDesc: "1-100 सचित्र गिनती", spokenIntro: "आइए एक से सौ तक गिनती सीखें!" },
    en: { title: "Numbers 1 to 100", freeDesc: "Count 1 to 100", spokenIntro: "Let's learn counting numbers 1 to 100!" },
    mr: { title: "अंक मोजणी १ ते १०० (Numbers)", freeDesc: "१ ते १०० मोजणी", spokenIntro: "चला एक ते शंभर अंक मोजूया!" },
    ta: { title: "எண்கள் 1 முதல் 100 வரை", freeDesc: "1-100 எண்கள்", spokenIntro: "வாருங்கள் ஒன்று முதல் நூறு வரை எண்களைக் கற்போம்!" },
    te: { title: "అంకెలు 1 నుండి 100 వరకు", freeDesc: "1-100 సంఖ్యలు", spokenIntro: "రండి ఒకటి నుండి వంద వరకు అంకెలు నేర్చుకుందాం!" },
    bn: { title: "সংখ্যা গণনা ১ থেকে ১০০", freeDesc: "১-১০০ সংখ্যা", spokenIntro: "চলুন এক থেকে একশো পর্যন্ত সংখ্যা গণনা শিখি!" },
    gu: { title: "એકડા ૧ થી ૧૦૦ (Numbers)", freeDesc: "૧-૧૦૦ ગણતરી", spokenIntro: "ચાલો એક થી સો સુધી એકડા શીખીએ!" },
    kn: { title: "ಸಂಖ್ಯೆಗಳು 1 ರಿಂದ 100 ರವರೆಗೆ", freeDesc: "1-100 ಎಣಿಕೆ", spokenIntro: "ಬನ್ನಿ ಒಂದರಿಂದ ನೂರರವರೆಗೆ ಸಂಖ್ಯೆಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "സംഖ്യകൾ 1 മുതൽ 100 വരെ", freeDesc: "1-100 എണ്ണൽ", spokenIntro: "വരൂ നമുക്ക് ഒന്ന് മുതൽ നൂറ് വരെയുള്ള സംഖ്യകൾ പഠിക്കാം!" },
    ur: { title: "گنتی 1 سے 100 تک (Numbers)", freeDesc: "1-100 اعداد", spokenIntro: "آئیے ایک سے سو تک گنتی سیکھیں!" },
    pa: { title: "ਗਿਣਤੀ 1 ਤੋਂ 100 (Numbers)", freeDesc: "1-100 ਗਿਣਤੀ", spokenIntro: "ਆਓ ਇੱਕ ਤੋਂ ਸੌ ਤੱਕ ਗਿਣਤੀ ਸਿੱਖੀਏ!" },
    or: { title: "ଗଣନା ୧ ରୁ ୧୦୦", freeDesc: "୧-୧୦୦ ସଂଖ୍ୟା", spokenIntro: "ଆସନ୍ତୁ ଏକ ରୁ ଶହେ ଯାଏଁ ଗଣନା ଶିଖିବା!" },
    as: { title: "সংখ্যা ১ ৰ পৰা ১০০", freeDesc: "১-১০০ গণনা", spokenIntro: "আহাঁ আমি একৰ পৰা এশলৈ সংখ্যা শিকোঁ!" }
  },
  tables: {
    hi: { title: "पहाड़े 2 से 20 (Tables)", freeDesc: "लयबद्ध पहाड़े 2-20", spokenIntro: "आइए दो से बीस तक पहाड़े सीखें!" },
    en: { title: "Multiplication Tables 2 to 20", freeDesc: "Tables 2 to 20", spokenIntro: "Let's learn math multiplication tables from 2 to 20!" },
    mr: { title: "पाढे २ ते २० (Math Tables)", freeDesc: "२ ते २० पाढे", spokenIntro: "चला दोन ते वीस पर्यंतचे पाढे तालासुरात म्हणूया!" },
    ta: { title: "பெருக்கல் வாய்ப்பாடு 2 முதல் 20", freeDesc: "வாய்ப்பாடு 2-20", spokenIntro: "வாருங்கள் 2 முதல் 20 வரை பெருக்கல் வாய்ப்பாடு கற்போம்!" },
    te: { title: "ఎక్కాలు 2 నుండి 20 వరకు", freeDesc: "2-20 ఎక్కాలు", spokenIntro: "రండి రెండు నుండి ఇరవై వరకు ఎక్కాలు నేర్చుకుందాం!" },
    bn: { title: "নামতা ২ থেকে ২০ (Tables)", freeDesc: "২-২০ ঘরের নামতা", spokenIntro: "চলুন দুই থেকে কুড়ি পর্যন্ত নামতা শিখি!" },
    gu: { title: "ઘડિયા ૨ થી ૨૦ (Tables)", freeDesc: "૨-૨૦ ઘડિયા", spokenIntro: "ચાલો બે થી વીસ સુધીના ઘડિયા શીખીએ!" },
    kn: { title: "ಮಗ್ಗಿಗಳು 2 ರಿಂದ 20 ರವರೆಗೆ", freeDesc: "2-20 ಮಗ್ಗಿ", spokenIntro: "ಬನ್ನಿ ಎರಡರಿಂದ ಇಪ್ಪತ್ತರವರೆಗೆ ಮಗ್ಗಿಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "ഗുണനപ്പട്ടിക 2 മുതൽ 20 വരെ", freeDesc: "പട്ടിക 2-20", spokenIntro: "വരൂ നമുക്ക് ഗുണനപ്പട്ടിക പഠിക്കാം!" },
    ur: { title: "پہاڑے 2 سے 20 تک (Tables)", freeDesc: "2 تا 20 پہاڑے", spokenIntro: "آئیے دو سے بیس تک پہاڑے سیکھیں!" },
    pa: { title: "ਪਹਾੜੇ 2 ਤੋਂ 20 (Tables)", freeDesc: "2-20 ਪਹਾੜੇ", spokenIntro: "ਆਓ ਦੋ ਤੋਂ ਵੀਹ ਤੱਕ ਪਹਾੜੇ ਸਿੱਖੀਏ!" },
    or: { title: "ପଣିକିଆ ୨ ରୁ ୨୦", freeDesc: "୨-୨୦ ପଣିକିଆ", spokenIntro: "ଆସନ୍ତୁ ଦୁଇ ରୁ କୋଡ଼ିଏ ପଣିକିଆ ଶିଖିବା!" },
    as: { title: "নেওতা ২ ৰ পৰা ২০", freeDesc: "২-২০ নেওতা", spokenIntro: "আহাঁ আমি দুইৰ পৰা বিশলৈ নেওতা শিকোঁ!" }
  },
  animals: {
    hi: { title: "50 जानवर (Animals HD)", freeDesc: "50 जानवरों के असली चित्र", spokenIntro: "आइए 50 जानवरों के नाम और आवाज़ें सीखें!" },
    en: { title: "50 Animals (HD Photos)", freeDesc: "50 Real Animals Photos", spokenIntro: "Let's learn about 50 amazing animals!" },
    mr: { title: "५० प्राणी (Animals HD)", freeDesc: "५० प्राण्यांची चित्रे", spokenIntro: "चला ५० विविध प्राण्यांची नावे व माहिती जाणून घेऊया!" },
    ta: { title: "50 விலங்குகள் (Animals HD)", freeDesc: "50 விலங்குகளின் படங்கள்", spokenIntro: "வாருங்கள் 50 விலங்குகளின் பெயர்களையும் சிறப்புகளையும் அறிவோம்!" },
    te: { title: "50 జంతువులు (Animals HD)", freeDesc: "50 జంతువుల చిత్రాలు", spokenIntro: "రండి 50 అందమైన జంతువుల పేర్లు తెలుసుకుందాం!" },
    bn: { title: "৫০টি প্রাণী (Animals HD)", freeDesc: "৫০টি পশুপাখির ছবি", spokenIntro: "চলুন ৫০টি বিভিন্ন পশুর নাম ও পরিচয় জানি!" },
    gu: { title: "૫૦ પ્રાણીઓ (Animals HD)", freeDesc: "૫૦ પ્રાણીઓના ફોટા", spokenIntro: "ચાલો ૫૦ અદ્ભુત પ્રાણીઓ વિશે જાણીએ!" },
    kn: { title: "50 ಪ್ರಾಣಿಗಳು (Animals HD)", freeDesc: "50 ಪ್ರಾಣಿಗಳ ಚಿತ್ರಗಳು", spokenIntro: "ಬನ್ನಿ 50 ಮುದ್ದಾದ ಪ್ರಾಣಿಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "50 മൃഗങ്ങൾ (Animals HD)", freeDesc: "50 മൃഗങ്ങളുടെ ചിത്രങ്ങൾ", spokenIntro: "വരൂ നമുക്ക് 50 വന്യമൃഗങ്ങളെയും വളർത്തുമൃഗങ്ങളെയും പരിചയപ്പെടാം!" },
    ur: { title: "50 جانور (Animals HD)", freeDesc: "50 جانوروں کی خوبصورت تصاویر", spokenIntro: "آئیے پچاس جانوروں کے نام اور ان کے بارے میں سیکھیں!" },
    pa: { title: "50 ਜਾਨਵਰ (Animals HD)", freeDesc: "50 ਜਾਨਵਰਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ", spokenIntro: "ਆਓ 50 ਜਾਨਵਰਾਂ ਦੇ ਨਾਂ ਜਾਣੀਏ!" },
    or: { title: "୫୦ ପଶୁ (Animals HD)", freeDesc: "୫୦ ଜୀବଜନ୍ତୁଙ୍କ ଚିତ୍ର", spokenIntro: "ଆସନ୍ତୁ ୫୦ ପଶୁଙ୍କ ନାମ ଶିଖିବା!" },
    as: { title: "৫০টা জন্তু (Animals HD)", freeDesc: "৫০টা জন্তুৰ ছবি", spokenIntro: "আহাঁ আমি ৫০টা জন্তুৰ নাম শিকোঁ!" }
  },
  birds: {
    hi: { title: "50 पक्षी (Birds HD)", freeDesc: "50 रंग-बिरंगे पक्षी", spokenIntro: "आइए 50 सुंदर पक्षियों के नाम सीखें!" },
    en: { title: "50 Birds (HD Photos)", freeDesc: "50 Beautiful Birds", spokenIntro: "Let's learn about 50 colorful birds!" },
    mr: { title: "५० पक्षी (Birds HD)", freeDesc: "५० सुंदर पक्ष्यांची चित्रे", spokenIntro: "चला ५० सुंदर पक्ष्यांची नावे शिकूया!" },
    ta: { title: "50 பறவைகள் (Birds HD)", freeDesc: "50 வண்ணப் பறவைகள்", spokenIntro: "வாருங்கள் 50 அழகிய பறவைகளைப் பற்றி அறிவோம்!" },
    te: { title: "50 పక్షులు (Birds HD)", freeDesc: "50 రంగురంగుల పక్షులు", spokenIntro: "రండి 50 రకాల పక్షుల పేర్లు తెలుసుకుందాం!" },
    bn: { title: "৫০টি পাখি (Birds HD)", freeDesc: "৫০টি রঙিন পাখির ছবি", spokenIntro: "চলুন ৫০টি মিষ্টি পাখির নাম শিখি!" },
    gu: { title: "૫૦ પક્ષીઓ (Birds HD)", freeDesc: "૫૦ સુંદર પંખીઓ", spokenIntro: "ચાલો ૫૦ સુંદર પંખીઓની ઓળખ કરીએ!" },
    kn: { title: "50 ಪಕ್ಷಿಗಳು (Birds HD)", freeDesc: "50 ಸುಂದರ ಹಕ್ಕಿಗಳು", spokenIntro: "ಬನ್ನಿ 50 ಬಣ್ಣಬಣ್ಣದ ಪಕ್ಷಿಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "50 പക്ഷികൾ (Birds HD)", freeDesc: "50 മനോഹര പക്ഷികൾ", spokenIntro: "വരൂ നമുക്ക് 50 പക്ഷികളെ പരിചയപ്പെടാം!" },
    ur: { title: "50 پرندے (Birds HD)", freeDesc: "50 پرندوں کی تصویریں", spokenIntro: "آئیے پچاس پرندوں کے نام سیکھیں!" },
    pa: { title: "50 ਪੰਛੀ (Birds HD)", freeDesc: "50 ਸੋਹਣੇ ਪੰਛੀ", spokenIntro: "ਆਓ 50 ਪੰਛੀਆਂ ਦੇ ਨਾਂ ਜਾਣੀਏ!" },
    or: { title: "୫୦ ପକ୍ଷୀ (Birds HD)", freeDesc: "୫୦ ସୁନ୍ଦର ପକ୍ଷୀ", spokenIntro: "ଆସନ୍ତୁ ୫୦ ପକ୍ଷୀଙ୍କ ନାମ ଶିଖିବା!" },
    as: { title: "৫০টা চৰাই (Birds HD)", freeDesc: "৫০টা ধুনীয়া চৰাই", spokenIntro: "আহাঁ আমি ৫০টা চৰাইৰ নাম শিকোঁ!" }
  },
  flowers: {
    hi: { title: "50 फूल (Flowers HD)", freeDesc: "50 सुगंधित व सुंदर फूल", spokenIntro: "आइए 50 मनमोहक फूलों के नाम सीखें!" },
    en: { title: "50 Flowers (HD Photos)", freeDesc: "50 Beautiful Flowers", spokenIntro: "Let's discover 50 lovely flowers!" },
    mr: { title: "५० फुले (Flowers HD)", freeDesc: "५० सुगंधी फुलांची चित्रे", spokenIntro: "चला ५० रंगीबेरंगी फुलांची नावे जाणून घेऊया!" },
    ta: { title: "50 மலர்கள் (Flowers HD)", freeDesc: "50 வண்ண மலர்கள்", spokenIntro: "வாருங்கள் 50 மலர்களின் அழகிய பெயர்களைக் கற்போம்!" },
    te: { title: "50 పువ్వులు (Flowers HD)", freeDesc: "50 అందమైన పూలు", spokenIntro: "రండి 50 రకాల పూల పేర్లు తెలుసుకుందాం!" },
    bn: { title: "৫০টি ফুল (Flowers HD)", freeDesc: "৫০টি সুবাসিত ফুলের ছবি", spokenIntro: "চলুন ৫০টি রঙিন ফুলের নাম জানি!" },
    gu: { title: "૫૦ ફૂલો (Flowers HD)", freeDesc: "૫૦ સુગંધી ફૂલો", spokenIntro: "ચાલો ૫૦ સુંદર ફૂલો વિશે જાણીએ!" },
    kn: { title: "50 ಹೂಗಳು (Flowers HD)", freeDesc: "50 ಸುಂದರ ಹೂವುಗಳು", spokenIntro: "ಬನ್ನಿ 50 ಬಗೆಬಗೆಯ ಹೂಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "50 പൂക്കൾ (Flowers HD)", freeDesc: "50 സുന്ദര പുഷ്പങ്ങൾ", spokenIntro: "വരൂ നമുക്ക് 50 പൂക്കളെക്കുറിച്ച് പഠിക്കാം!" },
    ur: { title: "50 پھول (Flowers HD)", freeDesc: "50 خوبصورت پھول", spokenIntro: "آئیے پچاس خوشبودار پھولوں کے نام سیکھیں!" },
    pa: { title: "50 ਫੁੱਲ (Flowers HD)", freeDesc: "50 ਰੰਗ-ਬਰੰਗੇ ਫੁੱਲ", spokenIntro: "ਆਓ 50 ਫੁੱਲਾਂ ਦੇ ਨਾਂ ਜਾਣੀਏ!" },
    or: { title: "୫୦ ଫୁଲ (Flowers HD)", freeDesc: "୫୦ ସୁନ୍ଦର ଫୁଲ", spokenIntro: "ଆସନ୍ତୁ ୫୦ ଫୁଲଙ୍କ ନାମ ଶିଖିବା!" },
    as: { title: "৫০টা ফুল (Flowers HD)", freeDesc: "৫০টা সুগন্ধি ফুল", spokenIntro: "আহাঁ আমি ৫০টা ফুলৰ নাম শিকোঁ!" }
  },
  fruits: {
    hi: { title: "50 फल (Fruits HD)", freeDesc: "50 स्वादिष्ट व पौष्टिक फल", spokenIntro: "आइए 50 मीठे और सेहतमंद फलों के नाम सीखें!" },
    en: { title: "50 Fruits (HD Photos)", freeDesc: "50 Delicious Fruits", spokenIntro: "Let's explore 50 tasty and healthy fruits!" },
    mr: { title: "५० फळे (Fruits HD)", freeDesc: "५० गोड व रसाळ फळे", spokenIntro: "चला ५० चवदार फळांची नावे जाणून घेऊया!" },
    ta: { title: "50 பழங்கள் (Fruits HD)", freeDesc: "50 சுவையான பழங்கள்", spokenIntro: "வாருங்கள் 50 ஆரோக்கியமான பழங்களின் பெயர்களை அறிவோம்!" },
    te: { title: "50 పండ్లు (Fruits HD)", freeDesc: "50 రుచికరమైన పండ్లు", spokenIntro: "రండి 50 రకాల పండ్ల పేర్లు తెలుసుకుందాం!" },
    bn: { title: "৫০টি ফল (Fruits HD)", freeDesc: "৫০টি পুষ্টিকর ফলের ছবি", spokenIntro: "চলুন ৫০টি মিষ্টি ফলের নাম শিখি!" },
    gu: { title: "૫૦ ફળો (Fruits HD)", freeDesc: "૫૦ પૌષ્ટિક ફળો", spokenIntro: "ચાલો ૫૦ મીઠા ફળો વિશે જાણીએ!" },
    kn: { title: "50 ಹಣ್ಣುಗಳು (Fruits HD)", freeDesc: "50 ರುಚಿಕರ ಹಣ್ಣುಗಳು", spokenIntro: "ಬನ್ನಿ 50 ಸಿಹಿ ಹಣ್ಣುಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "50 പഴങ്ങൾ (Fruits HD)", freeDesc: "50 സ്വാദിഷ്ടമായ പഴങ്ങൾ", spokenIntro: "വരൂ നമുക്ക് 50 പഴങ്ങളെ പരിചയപ്പെടാം!" },
    ur: { title: "50 پھل (Fruits HD)", freeDesc: "50 مزیدار پھل", spokenIntro: "آئیے پچاس لذیذ پھلوں کے نام سیکھیں!" },
    pa: { title: "50 ਫਲ (Fruits HD)", freeDesc: "50 ਮਿੱਠੇ ਫਲ", spokenIntro: "ਆਓ 50 ਫਲਾਂ ਦੇ ਨਾਂ ਜਾਣੀਏ!" },
    or: { title: "୫୦ ଫଳ (Fruits HD)", freeDesc: "୫୦ ସ୍ୱାଦିଷ୍ଟ ଫଳ", spokenIntro: "ଆସନ୍ତୁ ୫୦ ଫଳଙ୍କ ନାମ ଶିଖିବା!" },
    as: { title: "৫০টা ফল (Fruits HD)", freeDesc: "৫০টা সোৱাদযুক্ত ফল", spokenIntro: "আহাঁ আমি ৫০টা ফলৰ নাম শিকোঁ!" }
  },
  vegetables: {
    hi: { title: "50 सब्जियां (Vegetables HD)", freeDesc: "50 ताजी हरी सब्जियां", spokenIntro: "आइए 50 पौष्टिक और ताजी सब्जियों के नाम सीखें!" },
    en: { title: "50 Vegetables (HD Photos)", freeDesc: "50 Fresh Green Veggies", spokenIntro: "Let's learn about 50 healthy vegetables!" },
    mr: { title: "५० भाज्या (Vegetables HD)", freeDesc: "५० ताज्या भाज्यांची चित्रे", spokenIntro: "चला ५० ताज्या व पौष्टिक भाज्यांची नावे शिकूया!" },
    ta: { title: "50 காய்கறிகள் (Vegetables HD)", freeDesc: "50 புதிய காய்கறிகள்", spokenIntro: "வாருங்கள் 50 சத்தான காய்கறிகளின் பெயர்களை அறிவோம்!" },
    te: { title: "50 కూరగాయలు (Vegetables HD)", freeDesc: "50 తాజా కూరగాయలు", spokenIntro: "రండి 50 రకాల ఆరోగ్యకరమైన కూరగాయల పేర్లు తెలుసుకుందాం!" },
    bn: { title: "৫০টি শাকসবজি (Vegetables HD)", freeDesc: "৫০টি টাটকা সবজির ছবি", spokenIntro: "চলুন ৫০টি পুষ্টিকর শাকসবজির নাম শিখি!" },
    gu: { title: "૫૦ શાકભાજી (Vegetables HD)", freeDesc: "૫૦ તાજાં શાકભાજી", spokenIntro: "ચાલો ૫૦ ગુણકારી શાકભાજી વિશે જાણીએ!" },
    kn: { title: "50 ತರಕಾರಿಗಳು (Vegetables HD)", freeDesc: "50 ತಾಜಾ ತರಕಾರಿಗಳು", spokenIntro: "ಬನ್ನಿ 50 ಪೌಷ್ಟಿಕ ತರಕಾರಿಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "50 പച്ചക്കറികൾ (Vegetables HD)", freeDesc: "50 പച്ചക്കറികൾ", spokenIntro: "വരൂ നമുക്ക് 50 പച്ചക്കറികളെ പരിചയപ്പെടാം!" },
    ur: { title: "50 سبزیاں (Vegetables HD)", freeDesc: "50 تازہ سبزیاں", spokenIntro: "آئیے پچاس صحت بخش سبزیوں کے نام سیکھیں!" },
    pa: { title: "50 ਸਬਜ਼ੀਆਂ (Vegetables HD)", freeDesc: "50 ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ", spokenIntro: "ਆਓ 50 ਸਬਜ਼ੀਆਂ ਦੇ ਨਾਂ ਜਾਣੀਏ!" },
    or: { title: "୫୦ ପନିପରିବା (Vegetables HD)", freeDesc: "୫୦ ସତେଜ ପନିପରିବା", spokenIntro: "ଆସନ୍ତୁ ୫୦ ପନିପରିବାଙ୍କ ନାମ ଶିଖିବା!" },
    as: { title: "৫০ বিধ শাক-পাচলি (Vegetables HD)", freeDesc: "৫০ বিধ শাক-পাচলি", spokenIntro: "আহাঁ আমি ৫০ বিধ পাচলিৰ নাম শিকোঁ!" }
  },
  vehicles: {
    hi: { title: "50 वाहन (Vehicles HD)", freeDesc: "50 तेज व उपयोगी वाहन", spokenIntro: "आइए 50 अलग-अलग वाहनों के नाम और उपयोग सीखें!" },
    en: { title: "50 Vehicles & Transport", freeDesc: "50 Vehicles HD Photos", spokenIntro: "Let's explore 50 exciting vehicles and transport!" },
    mr: { title: "५० वाहने (Vehicles HD)", freeDesc: "५० वाहनांची चित्रे", spokenIntro: "चला ५० उपयुक्त व वेगवान वाहनांची नावे जाणून घेऊया!" },
    ta: { title: "50 வாகனங்கள் (Vehicles HD)", freeDesc: "50 நவீன வாகனங்கள்", spokenIntro: "வாருங்கள் 50 வகையான வாகனங்களின் பெயர்களை அறிவோம்!" },
    te: { title: "50 వాహనాలు (Vehicles HD)", freeDesc: "50 రకాల వాహనాలు", spokenIntro: "రండి 50 రకాల వాహనాల పేర్లు తెలుసుకుందాం!" },
    bn: { title: "৫০টি যানবাহন (Vehicles HD)", freeDesc: "৫০টি আধুনিক যানবাহনের ছবি", spokenIntro: "চলুন ৫০টি দ্রুতগামী যানবাহনের নাম জানি!" },
    gu: { title: "૫૦ વાહનો (Vehicles HD)", freeDesc: "૫૦ અવનવાં વાહનો", spokenIntro: "ચાલો ૫૦ વાહનો વિશે જાણીએ!" },
    kn: { title: "50 ವಾಹನಗಳು (Vehicles HD)", freeDesc: "50 ವೇಗದ ವಾಹನಗಳು", spokenIntro: "ಬನ್ನಿ 50 ವಿವಿಧ ವಾಹನಗಳ ಹೆಸರುಗಳನ್ನು ಕಲಿಯೋಣ!" },
    ml: { title: "50 വാഹനങ്ങൾ (Vehicles HD)", freeDesc: "50 വാഹനങ്ങളുടെ ചിത്രങ്ങൾ", spokenIntro: "വരൂ നമുക്ക് 50 വാഹനങ്ങളെ പരിചയപ്പെടാം!" },
    ur: { title: "50 گاڑیاں اور سواریاں", freeDesc: "50 تیز رفتار سواریاں", spokenIntro: "آئیے پچاس مختلف گاڑیوں کے نام سیکھیں!" },
    pa: { title: "50 ਗੱਡੀਆਂ ਤੇ ਵਾਹਨ", freeDesc: "50 ਵਾਹਨਾਂ ਦੀਆਂ ਤਸਵੀਰਾਂ", spokenIntro: "ਆਓ 50 ਵਾਹਨਾਂ ਦੇ ਨਾਂ ਜਾਣੀਏ!" },
    or: { title: "୫୦ ଯାନବାହନ (Vehicles HD)", freeDesc: "୫୦ ଦ୍ରୁତ ଯାନବାହନ", spokenIntro: "ଆସନ୍ତୁ ୫୦ ଯାନବାହନଙ୍କ ନାମ ଶିଖିବା!" },
    as: { title: "৫০ খন যান-বাহন (Vehicles HD)", freeDesc: "৫০ খন যান-বাহনৰ ছবি", spokenIntro: "আহাঁ আমি ৫০ খন যান-বাহনৰ নাম শিকোঁ!" }
  }
};

// Item Native Name & Phrase Dictionary
export const ITEM_TRANSLATIONS: Record<string, Record<string, { name: string; phrase: string }>> = {
  // Animals (Sample of key items with complete native phrases)
  a1: { // Lion
    hi: { name: "शेर (Lion)", phrase: "शेर। यह जंगल का पराक्रमी राजा है।" },
    en: { name: "Lion", phrase: "Lion. The mighty king of the jungle." },
    mr: { name: "सिंह (Lion)", phrase: "सिंह. हा जंगलाचा शूर राजा आहे." },
    ta: { name: "சிங்கம் (Lion)", phrase: "சிங்கம். இது காட்டின் கம்பீரமான ராஜா." },
    te: { name: "సింహం (Lion)", phrase: "సింహం. ఇది అడవికి రాజు." },
    bn: { name: "সিংহ (Lion)", phrase: "সিংহ। এটি বনের শক্তিশালী রাজা।" },
    gu: { name: "સિંહ (Lion)", phrase: "સિંહ. આ જંગલનો પ્રતાપી રાજા છે." },
    kn: { name: "ಸಿಂಹ (Lion)", phrase: "ಸಿಂಹ. ಇದು ಕಾಡಿನ ರಾಜ." },
    ml: { name: "സിംഹം (Lion)", phrase: "സിംഹം. ഇത് കാട്ടിലെ രാജാവാണ്." },
    ur: { name: "شیر (Lion)", phrase: "شیر۔ یہ جنگل کا بہادر بادشاہ ہے۔" },
    pa: { name: "ਸ਼ੇਰ (Lion)", phrase: "ਸ਼ੇਰ। ਇਹ ਜੰਗਲ ਦਾ ਰਾਜਾ ਹੈ।" },
    or: { name: "ସିଂହ (Lion)", phrase: "ସିଂହ। ଏହା ଜଙ୍ଗଲର ବଳବାନ ରଜା।" },
    as: { name: "সিংহ (Lion)", phrase: "সিংহ। এইটো হাবিৰ ৰজা।" }
  },
  a2: { // Tiger
    hi: { name: "बाघ (Tiger)", phrase: "बाघ। यह हमारा राष्ट्रीय पशु है।" },
    en: { name: "Tiger", phrase: "Tiger. It is our national animal." },
    mr: { name: "वाघ (Tiger)", phrase: "वाघ. हा आपला राष्ट्रीय प्राणी आहे." },
    ta: { name: "புலி (Tiger)", phrase: "புலி. இது நமது தேசிய விலங்கு." },
    te: { name: "పులి (Tiger)", phrase: "పులి. ఇది మన జాతీయ జంతువు." },
    bn: { name: "বাঘ (Tiger)", phrase: "বাঘ। এটি আমাদের জাতীয় পশু।" },
    gu: { name: "વાઘ (Tiger)", phrase: "વાઘ. આ આપણું રાષ્ટ્રીય પ્રાણી છે." },
    kn: { name: "ಹುಲಿ (Tiger)", phrase: "ಹುಲಿ. ಇದು ನಮ್ಮ ರಾಷ್ಟ್ರೀಯ ಪ್ರಾಣಿ." },
    ml: { name: "കടുവ (Tiger)", phrase: "കടുവ. ഇത് നമ്മുടെ ദേശീയ മൃഗമാണ്." },
    ur: { name: "چیتا / شیر ببر (Tiger)", phrase: "ٹائیگر۔ یہ ہمارا قومی جانور ہے۔" },
    pa: { name: "ਬਾਘ (Tiger)", phrase: "ਬਾਘ। ਇਹ ਸਾਡਾ ਕੌਮੀ ਜਾਨਵਰ ਹੈ।" },
    or: { name: "ବାଘ (Tiger)", phrase: "ବାଘ। ଏହା ଆମ ଜାତୀୟ ପଶୁ।" },
    as: { name: "বাঘ (Tiger)", phrase: "বাঘ। এইটো আমাৰ জাতীয় পশু।" }
  },
  a3: { // Elephant
    hi: { name: "हाथी (Elephant)", phrase: "हाथी। यह धरती का सबसे विशाल जीव है।" },
    en: { name: "Elephant", phrase: "Elephant. The largest land mammal with a long trunk." },
    mr: { name: "हत्ती (Elephant)", phrase: "हत्ती. लांब सोंड असलेला प्रचंड प्राणी." },
    ta: { name: "யானை (Elephant)", phrase: "யானை. நீண்ட தும்பிக்கை கொண்ட பெரிய விலங்கு." },
    te: { name: "ఏనుగు (Elephant)", phrase: "ఏనుగు. తొండం కలిగిన భారీ జంతువు." },
    bn: { name: "হাতি (Elephant)", phrase: "হাতি। দীর্ঘ শুঁড়ওয়ালা বিশাল প্রাণী।" },
    gu: { name: "હાથી (Elephant)", phrase: "હાથી. લાંબી સૂંઢવાળું કદાવર પ્રાણી." },
    kn: { name: "ಆನೆ (Elephant)", phrase: "ಆನೆ. ಉದ್ದನೆಯ ಸೊಂಡಿಲು ಇರುವ ಬೃಹತ್ ಪ್ರಾಣಿ." },
    ml: { name: "ആന (Elephant)", phrase: "ആന. തുമ്പിക്കൈ ഉള്ള വലിയ മൃഗം." },
    ur: { name: "ہاتھی (Elephant)", phrase: "ہاتھی۔ لمبی سونڈ والا بھاری بھرکم جانور۔" },
    pa: { name: "ਹਾਥੀ (Elephant)", phrase: "ਹਾਥੀ। ਲੰਬੀ ਸੁੰਡ ਵਾਲਾ ਵੱਡਾ ਜਾਨਵਰ।" },
    or: { name: "ହାତୀ (Elephant)", phrase: "ହାତୀ। ଲମ୍ବା ଶୁଣ୍ଢ ଥିବା ବିରାଟ ପଶୁ।" },
    as: { name: "হাতী (Elephant)", phrase: "হাতী। ডাঙৰ শুঁৰ থকা বৃহৎ জন্তু।" }
  },
  // Birds
  b1: { // Peacock
    hi: { name: "मोर (Peacock)", phrase: "मोर। यह हमारा मनमोहक राष्ट्रीय पक्षी है।" },
    en: { name: "Peacock", phrase: "Peacock. Our beautiful national bird." },
    mr: { name: "मोर (Peacock)", phrase: "मोर. सुंदर पिसारा फुलवणारा आपला राष्ट्रीय पक्षी." },
    ta: { name: "மயில் (Peacock)", phrase: "மயில். தோகை விரித்தாடும் நமது தேசியப் பறவை." },
    te: { name: "నెమలి (Peacock)", phrase: "నెమలి. అందమైన పురివిప్పే మన జాతీయ పక్షి." },
    bn: { name: "ময়ূর (Peacock)", phrase: "ময়ূর। পেখম তোলা আমাদের রূপসী জাতীয় পাখি।" },
    gu: { name: "મોર (Peacock)", phrase: "મોર. કળા કરતું આપણું રાષ્ટ્રીય પક્ષી." },
    kn: { name: "ನವಿಲು (Peacock)", phrase: "ನವಿಲು. ಗರಿ ಬಿಚ್ಚಿ ಕುಣಿಯುವ ನಮ್ಮ ರಾಷ್ಟ್ರೀಯ ಪಕ್ಷಿ." },
    ml: { name: "മയിൽ (Peacock)", phrase: "മയിൽ. പീലി വിടർത്തുന്ന മനോഹരമായ ദേശീയ പക്ഷി." },
    ur: { name: "مور (Peacock)", phrase: "مور۔ پر پھیلا کر ناچنے والا قومی پرندہ۔" },
    pa: { name: "ਮੋਰ (Peacock)", phrase: "ਮੋਰ। ਖੰਭ ਖਿਲਾਰ ਕੇ ਨੱਚਣ ਵਾਲਾ ਕੌਮੀ ਪੰਛੀ।" },
    or: { name: "ମୟୂର (Peacock)", phrase: "ମୟୂର। ପେଖମ ଖୋଲୁଥିବା ଆମ ଜାତୀୟ ପକ୍ଷୀ।" },
    as: { name: "ময়ূৰ (Peacock)", phrase: "ময়ূৰ। পেখম ধৰা আমাৰ সুন্দৰ জাতীয় চৰাই।" }
  },
  b2: { // Parrot
    hi: { name: "तोता (Parrot)", phrase: "तोता। यह लाल चोंच वाला मीठा बोलने वाला पक्षी है।" },
    en: { name: "Parrot", phrase: "Parrot. A friendly green bird with a bright red beak." },
    mr: { name: "पोपट (Parrot)", phrase: "पोपट. गोड बोलणारा हिरवा पक्षी." },
    ta: { name: "கிளி (Parrot)", phrase: "கிளி. கொஞ்சிப் பேசும் பச்சைக்கிளி." },
    te: { name: "చిలుక (Parrot)", phrase: "చిలుక. ముద్దుగా మాట్లాడే రామచిలుక." },
    bn: { name: "টিয়া পাখি (Parrot)", phrase: "টিয়া পাখি। লাল ঠোঁটওয়ালা সুন্দর সবুজ পাখি।" },
    gu: { name: "પોપટ (Parrot)", phrase: "પોપટ. મીઠું મીઠું બોલતો લીલો પોપટ." },
    kn: { name: "ಗಿಳಿ (Parrot)", phrase: "ಗಿಳಿ. ಮುದ್ದಾಗಿ ಮಾತನಾಡುವ ಹಸಿರು ಗಿಳಿ." },
    ml: { name: "തത്ത (Parrot)", phrase: "തത്ത. കൊഞ്ചിച്ചിരിക്കുന്ന പച്ചത്തത്ത." },
    ur: { name: "طوطا (Parrot)", phrase: "طوطا۔ میٹھی بولی بولنے والا سبز پرندہ۔" },
    pa: { name: "ਤੋਤਾ (Parrot)", phrase: "ਤੋਤਾ। ਮਿੱਠੀਆਂ ਗੱਲਾਂ ਕਰਨ ਵਾਲਾ ਪੰਛੀ।" },
    or: { name: "ଶୁଆ (Parrot)", phrase: "ଶୁଆ। ଲାଲ ଥଣ୍ଟ ଥିବା ସବୁଜ ଶୁଆ।" },
    as: { name: "ভাটৌ (Parrot)", phrase: "ভাটৌ চৰাই। মিঠা মাত মতা সেউজীয়া চৰাই।" }
  },
  // Flowers
  fl1: { // Lotus
    hi: { name: "कमल (Lotus)", phrase: "कमल। यह भारत का पवित्र राष्ट्रीय फूल है।" },
    en: { name: "Lotus", phrase: "Lotus. The sacred national flower of India." },
    mr: { name: "कमळ (Lotus)", phrase: "कमळ. आपले पवित्र राष्ट्रीय फूल." },
    ta: { name: "தாமரை (Lotus)", phrase: "தாமரை. நமது புனிதமான தேசிய மலர்." },
    te: { name: "తామర పువ్వు (Lotus)", phrase: "తామర పువ్వు. మన పవిత్ర జాతీయ పుష్పం." },
    bn: { name: "পদ্মফুল (Lotus)", phrase: "পদ্মফুল। ভারতের পবিত্র জাতীয় ফুল।" },
    gu: { name: "કમળ (Lotus)", phrase: "કમળ. કાદવમાં ખીલતું પવિત્ર રાષ્ટ્રીય ફૂલ." },
    kn: { name: "ಕಮಲ (Lotus)", phrase: "ಕಮಲ. ನಮ್ಮ ಪವಿತ್ರ ರಾಷ್ಟ್ರೀಯ ಪುಷ್ಪ." },
    ml: { name: "താമര (Lotus)", phrase: "താമര. നമ്മുടെ പവിത്രമായ ദേശീയ പുഷ്പം." },
    ur: { name: "کنول (Lotus)", phrase: "کنول کا پھول۔ ہمارا مقدس قومی پھول۔" },
    pa: { name: "ਕਮਲ (Lotus)", phrase: "ਕਮਲ। ਪਵਿੱਤਰ ਕੌਮੀ ਫੁੱਲ।" },
    or: { name: "ପଦ୍ମ ଫୁଲ (Lotus)", phrase: "ପଦ୍ମ। ପବିତ୍ର ଜାତୀୟ ଫୁଲ।" },
    as: { name: "পদ্ম ফুল (Lotus)", phrase: "পদ্ম ফুল। পবিত্ৰ জাতীয় ফুল।" }
  },
  fl2: { // Rose
    hi: { name: "गुलाब (Rose)", phrase: "गुलाब। यह फूलों का प्यारा राजा कहलाता है।" },
    en: { name: "Rose", phrase: "Rose. The fragrant king of flowers." },
    mr: { name: "गुलाब (Rose)", phrase: "गुलाब. सुगंधित फुलांचा लाडका राजा." },
    ta: { name: "ரோஜா (Rose)", phrase: "ரோஜா. நறுமணம் வீசும் மலர்களின் அரசன்." },
    te: { name: "గులాబీ (Rose)", phrase: "గులాబీ. సువాసనల పూల రారాజు." },
    bn: { name: "গোলাপ (Rose)", phrase: "গোলাপ। সুগন্ধি ফুলের রানী।" },
    gu: { name: "ગુલાબ (Rose)", phrase: "ગુલાબ. સૌને ગમતું સુગંધીદાર ફૂલ." },
    kn: { name: "ಗುಲಾಬಿ (Rose)", phrase: "ಗುಲಾಬಿ. ಸುಗಂಧ ಸೂಸುವ ಹೂಗಳ ರಾಜ." },
    ml: { name: "റോസാപ്പൂ (Rose)", phrase: "റോസാപ്പൂവ്. സുഗന്ധമുള്ള മനോഹര പുഷ്പം." },
    ur: { name: "گلاب (Rose)", phrase: "گلاب۔ خوشبودار پھولوں کا بادشاہ۔" },
    pa: { name: "ਗੁਲਾਬ (Rose)", phrase: "ਗੁਲਾਬ। ਖੁਸ਼ਬੂਦਾਰ ਫੁੱਲਾਂ ਦਾ ਰਾਜਾ।" },
    or: { name: "ଗୋଲାପ (Rose)", phrase: "ଗୋଲାପ। ସୁବାସିତ ଫୁଲର ରଜା।" },
    as: { name: "গোলাপ (Rose)", phrase: "গোলাপ ফুল। সুগন্ধি ফুলৰ ৰজা।" }
  },
  // Fruits
  fr1: { // Mango
    hi: { name: "आम (Mango)", phrase: "आम। यह रसीला और स्वादिष्ट फलों का राजा है।" },
    en: { name: "Mango", phrase: "Mango. The delicious and juicy king of fruits." },
    mr: { name: "आंबा (Mango)", phrase: "आंबा. रसाळ व गोड फळांचा राजा." },
    ta: { name: "மாம்பழம் (Mango)", phrase: "மாம்பழம். சுவையான முக்கனிகளில் முதன்மையான பழங்களின் அரசன்." },
    te: { name: "మామిడి పండు (Mango)", phrase: "మామిడి. తియ్యనైన పండ్ల రారాజు." },
    bn: { name: "আম (Mango)", phrase: "আম। মিষ্টি ও রসালো ফলের রাজা।" },
    gu: { name: "કેરી (Mango)", phrase: "કેરી. મીઠો રસ આપતો ફળોનો રાજા." },
    kn: { name: "ಮಾವಿನ ಹಣ್ಣು (Mango)", phrase: "ಮಾವಿನ ಹಣ್ಣು. ರಸಭರಿತ ಹಣ್ಣುಗಳ ರಾಜ." },
    ml: { name: "മാമ്പഴം (Mango)", phrase: "മാമ്പഴം. സ്വാദിഷ്ടമായ പഴങ്ങളുടെ രാജാവ്." },
    ur: { name: "آم (Mango)", phrase: "آم۔ رسیلا اور لذیذ پھلوں کا بادشاہ۔" },
    pa: { name: "ਅੰਬ (Mango)", phrase: "ਅੰਬ। ਰਸੀਲੇ ਫਲਾਂ ਦਾ ਰਾਜਾ।" },
    or: { name: "ଆମ୍ବ (Mango)", phrase: "ଆମ୍ବ। ମିଠା ଓ ରସାଳ ଫଳର ରଜା।" },
    as: { name: "আম (Mango)", phrase: "আম। সুস্বাদু ফলৰ ৰজা।" }
  },
  fr2: { // Apple
    hi: { name: "सेब (Apple)", phrase: "सेब। रोज एक सेब खाने से सेहत अच्छी रहती है।" },
    en: { name: "Apple", phrase: "Apple. An apple a day keeps the doctor away!" },
    mr: { name: "सफरचंद (Apple)", phrase: "सफरचंद. आरोग्यासाठी अतिशय गुणकारी लाल सफरचंद." },
    ta: { name: "ஆப்பிள் (Apple)", phrase: "ஆப்பிள். தினமும் ஒரு ஆப்பிள் சாப்பிடுவது உடலுக்கு நல்லது." },
    te: { name: "యాపిల్ (Apple)", phrase: "యాపిల్. రోజుకో యాపిల్ తింటే ఆరోగ్యానికి ఎంతో మంచిది." },
    bn: { name: "আপেল (Apple)", phrase: "আপেল। প্রতিদিন একটি আপেল সুস্বাস্থ্যের প্রতীক।" },
    gu: { name: "સફરજન (Apple)", phrase: "સફરજન. દરરોજ એક સફરજન ખાવાથી તંદુરસ્તી વધે છે." },
    kn: { name: "ಸೇಬು (Apple)", phrase: "ಸೇಬು. ದಿನಕ್ಕೊಂದು ಸೇಬು ತಿಂದರೆ ಆರೋಗ್ಯಕ್ಕೆ ಹಿತ." },
    ml: { name: "ആപ്പിൾ (Apple)", phrase: "ആപ്പിൾ. ദിവസവും ഒരു ആപ്പിൾ കഴിക്കുന്നത് നല്ലതാണ്." },
    ur: { name: "سیب (Apple)", phrase: "سیب۔ روزانہ ایک سیب کھانا صحت کے لیے مفید ہے۔" },
    pa: { name: "ਸੇਬ (Apple)", phrase: "ਸੇਬ। ਲਾਲ ਤੇ ਗੁਣਕਾਰੀ ਫਲ।" },
    or: { name: "ସେଓ (Apple)", phrase: "ସେଓ। ଲାଲ ଓ ସ୍ୱାସ୍ଥ୍ୟପ୍ରଦ ଫଳ।" },
    as: { name: "আপেল (Apple)", phrase: "আপেল। স্বাস্থ্যৰ বাবে উপকাৰী ফল।" }
  },
  // Vegetables
  v1: { // Potato
    hi: { name: "आलू (Potato)", phrase: "आलू। यह सभी सब्जियों का प्यारा साथी है।" },
    en: { name: "Potato", phrase: "Potato. The versatile king of daily vegetables." },
    mr: { name: "बटाटा (Potato)", phrase: "बटाटा. सर्वांची आवडती भाजी." },
    ta: { name: "உருளைக்கிழங்கு (Potato)", phrase: "உருளைக்கிழங்கு. குழந்தைகள் விரும்பும் சத்தான உணவு." },
    te: { name: "బంగాళాదుంప (Potato)", phrase: "బంగాళాదుంప. అందరికీ ఇష్టమైన కూరగాయ." },
    bn: { name: "আলু (Potato)", phrase: "আলু। সবার প্রিয় সুস্বাদু সবজি।" },
    gu: { name: "બટાકા (Potato)", phrase: "બટાકા. બધાં શાકનો રાજા અને બાળકોનું પ્રિય." },
    kn: { name: "ಆಲೂಗಡ್ಡೆ (Potato)", phrase: "ಆಲೂಗಡ್ಡೆ. ಎಲ್ಲರಿಗೂ ಅಚ್ಚುಮೆಚ್ಚಿನ ತರಕಾರಿ." },
    ml: { name: "ഉരുളക്കിഴങ്ങ് (Potato)", phrase: "ഉരുളക്കിഴങ്ങ്. സ്വാദിഷ്ടമായ കിഴങ്ങ് വർഗ്ഗം." },
    ur: { name: "آلو (Potato)", phrase: "آلو۔ سبزیوں کا سب سے مقبول ساتھی۔" },
    pa: { name: "ਆਲੂ (Potato)", phrase: "ਆਲੂ। ਸਾਰਿਆਂ ਦੀ ਮਨਪਸੰਦ ਸਬਜ਼ੀ।" },
    or: { name: "ଆଳୁ (Potato)", phrase: "ଆଳୁ। ସମସ୍ତଙ୍କ ପ୍ରିୟ ପରିବା।" },
    as: { name: "আলু (Potato)", phrase: "আলু। সকলোৰে প্ৰিয় পাচলি।" }
  },
  v2: { // Tomato
    hi: { name: "टमाटर (Tomato)", phrase: "टमाटर। लाल-लाल रसीला टमाटर विटामिन से भरपूर होता है।" },
    en: { name: "Tomato", phrase: "Tomato. Juicy red tomato full of vitamins." },
    mr: { name: "टोमॅटो (Tomato)", phrase: "टोमॅटो. लाल चुटुक आणि रसाळ टोमॅटो." },
    ta: { name: "தக்காளி (Tomato)", phrase: "தக்காளி. வைட்டமின்கள் நிறைந்த சிவப்பு தக்காளி." },
    te: { name: "టమోటా (Tomato)", phrase: "టమోటా. ఎర్రటి రసభరితమైన టమోటా." },
    bn: { name: "টমেটো (Tomato)", phrase: "টমেটো। পুষ্টিকর লাল টমেটো।" },
    gu: { name: "ટામેટાં (Tomato)", phrase: "ટામેટાં. લાલચટક સ્વાદિષ્ટ ટામેટું." },
    kn: { name: "ಟೊಮೆಟೊ (Tomato)", phrase: "ಟೊಮೆಟೊ. ಜೀವಸತ್ವಗಳುಳ್ಳ ಕೆಂಪು ಟೊಮೆಟೊ." },
    ml: { name: "തക്കാളി (Tomato)", phrase: "തക്കാളി. ചുവന്ന സ്വാദിഷ്ടമായ തക്കാളി." },
    ur: { name: "ٹماٹر (Tomato)", phrase: "ٹماٹر۔ سرخ اور رسیلا ٹماٹر۔" },
    pa: { name: "ਟਮਾਟਰ (Tomato)", phrase: "ਟਮਾਟਰ। ਲਾਲ ਤੇ ਰਸੀਲਾ ਟਮਾਟਰ।" },
    or: { name: "ଟମାଟୋ (Tomato)", phrase: "ଟମାଟୋ। ଲାଲ ଓ ରସାଳ ଟମାଟୋ।" },
    as: { name: "টমেটো (Tomato)", phrase: "টমেটো। ভিটামিনযুক্ত ৰঙা টমেটো।" }
  },
  // Vehicles
  vh1: { // Bus
    hi: { name: "बस (School & City Bus)", phrase: "बस। बच्चे बैठकर स्कूल जाते हैं।" },
    en: { name: "Bus", phrase: "Bus. Takes happy children safely to school." },
    mr: { name: "बस (Bus)", phrase: "बस. मुले बसमध्ये बसून शाळेत जातात." },
    ta: { name: "பேருந்து (Bus)", phrase: "பேருந்து. குழந்தைகள் பள்ளிக்குச் செல்ல உதவும் வாகனம்." },
    te: { name: "బస్సు (Bus)", phrase: "బస్సు. పిల్లలను బడికి తీసుకెళ్లే సురక్షిత వాహనం." },
    bn: { name: "বাস (Bus)", phrase: "বাস। ছাত্র-ছাত্রীরা বাসে চড়ে স্কুলে যায়।" },
    gu: { name: "બસ (Bus)", phrase: "બસ. બાળકોને શાળાએ લઈ જતી બસ." },
    kn: { name: "ಬಸ್ (Bus)", phrase: "ಬಸ್. ಮಕ್ಕಳು ಶಾಲೆಗೆ ಹೋಗುವ ಸುಂದರ ವಾಹನ." },
    ml: { name: "ബസ്സ് (Bus)", phrase: "ബസ്. കുട്ടികൾ സ്കൂളിൽ പോകാൻ ഉപയോഗിക്കുന്ന വാഹനം." },
    ur: { name: "بس (Bus)", phrase: "بس۔ بچے بس میں بیٹھ کر اسکول جاتے ہیں۔" },
    pa: { name: "ਬੱਸ (Bus)", phrase: "ਬੱਸ। ਬੱਚੇ ਸਕੂਲ ਜਾਣ ਲਈ ਬੱਸ ਵਰਤਦੇ ਹਨ।" },
    or: { name: "ବସ୍ (Bus)", phrase: "ବସ୍। ପିଲାମାନେ ସ୍କୁଲ ଯିବା ପାଇଁ ବସ୍ ଚଢ଼ନ୍ତି।" },
    as: { name: "বাছ (Bus)", phrase: "বাছ। ছাত্ৰ-ছাত্ৰীসকলে বাছত উঠি স্কুললৈ যায়।" }
  },
  vh2: { // Train
    hi: { name: "रेलगाड़ी (Train - Chhuk Chhuk)", phrase: "रेलगाड़ी। छुक-छुक करती लंबी ट्रेन दूर-दूर तक ले जाती है।" },
    en: { name: "Train", phrase: "Train. Choo-choo train running fast along the tracks." },
    mr: { name: "आगगाडी (Train)", phrase: "आगगाडी. झुकझुक करत धावणारी लांबच लांब आगगाडी." },
    ta: { name: "தொடர்வண்டி (Train)", phrase: "ரயில் வண்டி. கூ கூ என்று தடத்தில் வேகமாக ஓடும் தொடர்வண்டி." },
    te: { name: "రైలు బండి (Train)", phrase: "రైలు బండి. కూ కూ అంటూ పట్టాలపై వేగంగా వెళ్తుంది." },
    bn: { name: "রেলগাড়ি (Train)", phrase: "রেলগাড়ি। ঝিকঝিক করে ছুটে চলা লম্বা ট্রেন।" },
    gu: { name: "ટ્રેન (Train)", phrase: "ટ્રેન. છુક છુક કરતી પાટા પર દોડતી ગાડી." },
    kn: { name: "ರೈಲು (Train)", phrase: "ರೈಲು. ಹಳಿಗಳ ಮೇಲೆ ವೇಗವಾಗಿ ಚಲಿಸುವ ರೈಲುಬಂಡಿ." },
    ml: { name: "തീവണ്ടി (Train)", phrase: "തീവണ്ടി. കൂ കൂ പാഞ്ഞ് പോകുന്ന ട്രെയിൻ." },
    ur: { name: "ریل گاڑی (Train)", phrase: "ریل گاڑی۔ پٹڑی پر چھک چھک کر کے دوڑنے والی ٹرین۔" },
    pa: { name: "ਰੇਲਗੱਡੀ (Train)", phrase: "ਰੇਲਗੱਡੀ। ਛੁੱਕ-ਛੁੱਕ ਕਰਦੀ ਪਟੜੀ 'ਤੇ ਦੌੜਦੀ ਗੱਡੀ।" },
    or: { name: "ରେଳଗାଡ଼ି (Train)", phrase: "ରେଳଗାଡ଼ି। ଧାରଣା ଉପରେ ଚାଲୁଥିବା ଲମ୍ବା ଟ୍ରେନ୍।" },
    as: { name: "ৰে'লগাড়ী (Train)", phrase: "ৰে'লগাড়ী। লাইনৰ ওপৰেৰে তীব্ৰ গতিত চলা ৰে'ল।" }
  },
  vh3: { // Airplane
    hi: { name: "हवाई जहाज (Airplane)", phrase: "हवाई जहाज। यह बादलों के ऊपर आसमान में उड़ता है।" },
    en: { name: "Airplane", phrase: "Airplane. Flies high in the sky above the clouds." },
    mr: { name: "विमान (Airplane)", phrase: "विमान. आकाशात ढगांवरून उंच उडणारे विमान." },
    ta: { name: "விமானம் (Airplane)", phrase: "விமானம். வானத்தில் மேகங்களுக்கு மேலே பறக்கும் விமானம்." },
    te: { name: "విమానం (Airplane)", phrase: "విమానం. ఆకాశంలో మేఘాల పైకి ఎగిరే విమానం." },
    bn: { name: "উড়োজাহাজ (Airplane)", phrase: "উড়োজাহাজ। মেঘের ওপর দিয়ে আকাশে উড়ে যায়।" },
    gu: { name: "વિમાન (Airplane)", phrase: "વિમાન. આકાશમાં વાદળોની ઉપર ઊડતું વિમાન." },
    kn: { name: "ವಿಮಾನ (Airplane)", phrase: "ವಿಮಾನ. ಆಗಸದಲ್ಲಿ ಮೋಡಗಳ ಮೇಲೆ ಹಾರುವ ವಿಮಾನ." },
    ml: { name: "വിമാനം (Airplane)", phrase: "വിമാനം. ആകാശത്ത് മേഘങ്ങൾക്ക് മുകളിലൂടെ പറക്കുന്നു." },
    ur: { name: "ہوائی جہاز (Airplane)", phrase: "ہوائی جہاز۔ بادلوں سے اوپر آسمان میں اڑتا ہے۔" },
    pa: { name: "ਹਵਾਈ ਜਹਾਜ਼ (Airplane)", phrase: "ਹਵਾਈ ਜਹਾਜ਼। ਅਸਮਾਨ ਵਿੱਚ ਉੱਡਣ ਵਾਲਾ ਜਹਾਜ਼।" },
    or: { name: "ଉଡ଼ାଜାହାଜ (Airplane)", phrase: "ଉଡ଼ାଜାହାଜ। ଆକାଶରେ ମେଘ ଉପରେ ଉଡ଼େ।" },
    as: { name: "উৰাজাহাজ (Airplane)", phrase: "উৰাজাহাজ। আকাশত মেঘৰ ওপৰেৰে উৰি যায়।" }
  }
};

export function getTranslatedCategoryMeta(catId: string, langCode: string): CategoryTranslation {
  const cat = CATEGORY_TRANSLATIONS[catId];
  if (!cat) {
    return { title: catId, freeDesc: "", spokenIntro: "" };
  }
  return cat[langCode] || cat.en || cat.hi || { title: catId, freeDesc: "", spokenIntro: "" };
}

export function getTranslatedItem(itemId: string, defaultName: string, defaultHindiName: string, langCode: string) {
  const item = ITEM_TRANSLATIONS[itemId];
  if (item && item[langCode]) {
    return item[langCode];
  }
  if (langCode === 'en') {
    return { name: defaultName, phrase: `${defaultName}. Learn with joy!` };
  }
  if (langCode === 'hi') {
    return { name: `${defaultHindiName} (${defaultName})`, phrase: `${defaultHindiName}। ${defaultName}।` };
  }
  // If no direct entry, provide clean native title
  return {
    name: `${defaultHindiName} (${defaultName})`,
    phrase: `${defaultName}. ${defaultHindiName}.`
  };
}
