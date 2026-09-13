import { GkItem } from '../types';

export interface GkFullItem extends GkItem {
  subCategory?: string;
  translations?: Partial<Record<string, { title: string; detail: string; keyFact: string }>>;
}

// 1. Bharat ki Nadiyan (नदियां)
export const BHARAT_KI_NADIYAN: GkFullItem[] = [
  {
    id: 101,
    title: "गंगा नदी (Ganga River)",
    detail: "लंबाई: 2,525 किमी | उद्गम: गंगोत्री हिमनद (भागीरथी), उत्तराखंड | मुहाना: बंगाल की खाड़ी (सुंदरवन डेल्टा)। भारत की सबसे पवित्र और सबसे लंबी नदी।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    keyFact: "2008 में भारत की 'राष्ट्रीय नदी' घोषित। देवप्रयाग में अलकनंदा और भागीरथी के संगम से 'गंगा' बनती है।",
    translations: {
      en: { title: "Ganga River (Ganges)", detail: "Length: 2,525 km | Origin: Gangotri Glacier (Uttarakhand) | Outflow: Bay of Bengal. India's longest and holiest river.", keyFact: "Declared National River of India in 2008." },
      ta: { title: "கங்கை நதி (Ganga)", detail: "நீளம்: 2,525 கிமீ | தோற்றம்: கங்கோத்ரி பனிப்பாறை, உத்தராகண்ட் | கலக்கும் இடம்: வங்காள விரிகுடா. இந்தியாவின் மிக நீண்ட மற்றும் புனித நதி.", keyFact: "2008 இல் இந்தியாவின் தேசிய நதியாக அறிவிக்கப்பட்டது." },
      te: { title: "గంగా నది (Ganga River)", detail: "పొడవు: 2,525 కి.మీ | పుట్టుక: గంగోత్రి హిమానీనదం, ఉత్తరాఖండ్ | చేరే ప్రదేశం: బంగాళాఖాతం. భారతదేశపు అత్యంత పవిత్రమైన నది.", keyFact: "2008లో భారతదేశ జాతీయ నదిగా ప్రకటించారు." },
      mr: { title: "गंगा नदी (Ganga River)", detail: "लांबी: २५२५ किमी | उगम: गंगोत्री हिमनदी, उत्तराखंड | विसर्जन: बंगालचा उपसागर. भारताची सर्वात लांब व पवित्र नदी.", keyFact: "२००८ मध्ये भारताची 'राष्ट्रीय नदी' म्हणून घोषित." },
      bn: { title: "গঙ্গা নদী (Ganga River)", detail: "দৈর্ঘ্য: ২,৫২৫ কিমি | উৎপত্তি: গঙ্গোত্রী হিমবাহ, উত্তরাখণ্ড | মোহনা: বঙ্গোপসাগর। ভারতের দীর্ঘতম ও পবিত্রতম নদী।", keyFact: "২০০৮ সালে ভারতের 'জাতীয় নদী' হিসেবে ঘোষিত।" },
      gu: { title: "ગંગા નદી (Ganga)", detail: "લંબાઈ: ૨,૫૨૫ કિમી | ઉદ્ગમ: ગંગોત્રી ગ્લેશિયર, ઉત્તરાખંડ | પતન: બંગાળની ખાડી. ભારતની સૌથી લાંબી અને પવિત્ર નદી.", keyFact: "૨૦૦૮માં ભારતની 'રાષ્ટ્રીય નદી' જાહેર કરાઈ." },
      kn: { title: "ಗಂಗಾ ನದಿ (Ganga River)", detail: "ಉದ್ದ: ೨,೫೨೫ ಕಿ.ಮೀ | ಮೂಲ: ಗಂಗೋತ್ರಿ ಹಿಮನದಿ, ಉತ್ತರಾಖಂಡ | ಕೊನೆಗೊಳ್ಳುವುದು: ಬಂಗಾಳಕೊಲ್ಲಿ. ಭಾರತದ ಅತಿ ಉದ್ದದ ಮತ್ತು ಪವಿತ್ರ ನದಿ.", keyFact: "೨೦೦೮ ರಲ್ಲಿ ಭಾರತದ ರಾಷ್ಟ್ರೀಯ ನದಿ ಎಂದು ಘೋಷಿಸಲಾಯಿತು." },
      ml: { title: "ഗംഗാ നദി (Ganga)", detail: "നീളം: 2,525 കി.മീ | ഉത്ഭവം: ഗംഗോത്രി ഹിമാനി, ഉത്തരാഖണ്ഡ് | അവസാനിക്കുന്നത്: ബംഗാൾ ഉൾക്കടൽ.", keyFact: "2008-ൽ ഭാരതത്തിന്റെ ദേശീയ നദിയായി പ്രഖ്യാപിച്ചു." },
      pa: { title: "ਗੰਗਾ ਨਦੀ (Ganga River)", detail: "ਲੰਬਾਈ: 2,525 ਕਿਲੋਮੀਟਰ | ਸਰੋਤ: ਗੰਗੋਤਰੀ ਹਿਮਨਦੀ, ਉੱਤਰਾਖੰਡ | ਡਿੱਗਣ ਸਥਾਨ: ਬੰਗਾਲ ਦੀ ਖਾੜੀ।", keyFact: "2008 ਵਿੱਚ ਭਾਰਤ ਦੀ 'ਰਾਸ਼ਟਰੀ ਨਦੀ' ਐਲਾਨੀ ਗਈ।" },
      ur: { title: "دریائے گنگا (Ganga)", detail: "لمبائی: 2,525 کلومیٹر | نکلنے کا مقام: گنگوتری گلیشیر، اتراکھنڈ | خلیج بنگال میں گرتا ہے۔", keyFact: "2008 میں بھارت کا قومی دریا قرار دیا گیا۔" },
      fr: { title: "Le Fleuve Gange (Ganga)", detail: "Longueur: 2 525 km | Source: Glacier de Gangotri, Uttarakhand | Embouchure: Golfe du Bengale. Fleuve sacré et le plus long d'Inde.", keyFact: "Déclaré fleuve national de l'Inde en 2008." },
      es: { title: "Río Ganges (Ganga)", detail: "Longitud: 2,525 km | Origen: Glaciar Gangotri, Uttarakhand | Desembocadura: Golfo de Bengala. Río más sagrado de la India.", keyFact: "Declarado Río Nacional de la India en 2008." },
      de: { title: "Der Fluss Ganges (Ganga)", detail: "Länge: 2.525 km | Quelle: Gangotri-Gletscher, Uttarakhand | Mündung: Golf von Bengalen.", keyFact: "2008 zum indischen Nationalfluss erklärt." },
      ar: { title: "نهر الغانج (Ganga)", detail: "الطول: 2525 كم | المنبع: نهر غانغوتري الجليدي | المصب: خليج البنغال.", keyFact: "أُعلن نهراً وطprocessياً للهند في عام 2008." },
      zh: { title: "恒河 (Ganga River)", detail: "全长：2,525公里 | 源头：北阿坎德邦甘戈特里冰川 | 归宿：孟加拉湾。印度的母亲河与最长河流。", keyFact: "2008年被正式指定为印度国河。" },
      ru: { title: "Река Ганг (Ganga)", detail: "Длина: 2525 км | Исток: ледник Ганготри, Уттаракханд | Устье: Бенгальский залив. Священная река Индии.", keyFact: "В 2008 году объявлена национальной рекой Индии." }
    }
  },
  {
    id: 102,
    title: "यमुना नदी (Yamuna River)",
    detail: "लंबाई: 1,376 किमी | उद्गम: यमुनोत्री हिमनद (बंदरपूंछ चोटी), उत्तराखंड | मुहाना: प्रयागराज में गंगा से संगम (त्रिवेणी संगम)। गंगा की सबसे बड़ी सहायक नदी।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80",
    keyFact: "दिल्ली, मथुरा और आगरा (ताजमहल) इसी नदी के तट पर बसे हैं।",
    translations: {
      en: { title: "Yamuna River", detail: "Length: 1,376 km | Origin: Yamunotri Glacier (Bandarpunch), Uttarakhand | Merges into Ganga at Prayagraj Sangam. Largest tributary of Ganga.", keyFact: "Delhi, Mathura and Agra (Taj Mahal) are located on its banks." },
      ta: { title: "யமுனை நதி (Yamuna)", detail: "நீளம்: 1,376 கிமீ | தோற்றம்: யமுனோத்ரி பனிப்பாறை | பிரயாக்ராஜில் கங்கையுடன் இணைகிறது.", keyFact: "டெல்லி, மதுரா மற்றும் ஆக்ரா (தாஜ்மஹால்) இதன் கரையில் உள்ளன." },
      te: { title: "యమునా నది (Yamuna)", detail: "పొడవు: 1,376 కి.మీ | పుట్టుక: యమునోత్రి | ప్రయాగ్‌రాజ్ వద్ద గంగతో సంగమం.", keyFact: "ఢిల్లీ, మథుర మరియు ఆగ్రా (తాజ్ మహల్) ఈ నదీ తీరాన ఉన్నాయి." },
      mr: { title: "यमुना नदी (Yamuna)", detail: "लांबी: १३७६ किमी | उगम: यमुनोत्री हिमनदी | प्रयागराज येथे गंगेला मिळते.", keyFact: "दिल्ली, मथुरा आणि आग्रा या नदिवर वसलेली प्रसिद्ध शहरे आहेत." },
      bn: { title: "যমুনা নদী (Yamuna)", detail: "দৈর্ঘ্য: ১,৩৭৬ কিমি | উৎপত্তি: যমুনোত্রী হিমবাহ | প্রয়াগরাজে গঙ্গার সাথে সঙ্গম।", keyFact: "দিল্লি, মথুরা ও আগ্রা (তাজমহল) এর তীরে অবস্থিত।" }
    }
  },
  {
    id: 103,
    title: "ब्रह्मपुत्र नदी (Brahmaputra River)",
    detail: "लंबाई: 2,900 किमी (भारत में 916 किमी) | उद्गम: चेमायुंगदुंग हिमनद (मानसरोवर झील के पास), तिब्बत। तिब्बत में 'सांगपो', अरुणाचल में 'दिहांग' व असम में 'ब्रह्मपुत्र' कहलाती है।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=400&q=80",
    keyFact: "विश्व का सबसे बड़ा नदी द्वीप 'माजुली' (Majuli Island) असम में इसी नदी में स्थित है।",
    translations: {
      en: { title: "Brahmaputra River", detail: "Length: 2,900 km | Origin: Mansarovar Lake, Tibet (Yarlung Tsangpo) | Enters Arunachal as Dihang and flows through Assam into Bay of Bengal.", keyFact: "Home to Majuli, the world's largest river island in Assam." },
      ta: { title: "பிரம்மபுத்திரா நதி", detail: "நீளம்: 2,900 கிமீ | தோற்றம்: திபெத் மானசரோவர் | அசாமில் பாய்கிறது.", keyFact: "உலகின் மிகப்பெரிய நதித் தீவான 'மஜுலி' அசாமில் உள்ளது." },
      te: { title: "బ్రహ్మపుత్ర నది", detail: "పొడవు: 2,900 కి.మీ | పుట్టుక: టిబెట్ మానససరోవరం | అస్సాంలో ప్రవహిస్తుంది.", keyFact: "ప్రపంచంలోనే అతిపెద్ద నదీ ద్వీపం 'మజులి' దీనిలో ఉంది." }
    }
  },
  {
    id: 104,
    title: "गोदावरी नदी - दक्षिण गंगा (Godavari River)",
    detail: "लंबाई: 1,465 किमी | उद्गम: त्र्यंबकेश्वर (नासिक), महाराष्ट्र | मुहाना: बंगाल की खाड़ी। दक्षिण भारत की सबसे लंबी नदी, इसे 'दक्षिण गंगा' या 'वृद्ध गंगा' कहा जाता है।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    keyFact: "भारत की दूसरी सबसे लंबी नदी है। नासिक में कुंभ मेला इसके तट पर लगता है।",
    translations: {
      en: { title: "Godavari River (Dakshin Ganga)", detail: "Length: 1,465 km | Origin: Trimbakeshwar (Nashik), Maharashtra | Outflow: Bay of Bengal. Longest river of Peninsular India.", keyFact: "Known as Dakshin Ganga (Ganges of the South). Kumbh Mela is held at Nashik on its banks." },
      ta: { title: "கோதாவரி நதி (தென் கங்கை)", detail: "நீளம்: 1,465 கிமீ | தோற்றம்: திரிம்பகேஸ்வர் (நாசிக்), மகாராஷ்டிரா | வங்காள விரிகுடாவில் கலக்கிறது.", keyFact: "தென்னிந்தியாவின் மிக நீண்ட நதி; 'தென் கங்கை' என அழைக்கப்படுகிறது." }
    }
  },
  {
    id: 105,
    title: "नर्मदा नदी (Narmada River)",
    detail: "लंबाई: 1,312 किमी | उद्गम: अमरकंटक पहाड़ी, मध्य प्रदेश | मुहाना: खंभात की खाड़ी (अरब सागर)। यह विंध्याचल और सतपुड़ा के बीच भ्रंश घाटी (Rift Valley) में पश्चिम की ओर बहती है।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    keyFact: "जबलपुर में प्रसिद्ध 'धुआंधार जलप्रपात' (मार्बल रॉक्स) बनाती है। सरदार सरोवर बांध इसी पर बना है।",
    translations: {
      en: { title: "Narmada River", detail: "Length: 1,312 km | Origin: Amarkantak, Madhya Pradesh | Flows west through a rift valley between Vindhya and Satpura into Arabian Sea.", keyFact: "Features the scenic Dhuandhar Falls at Jabalpur and Sardar Sarovar Dam." }
    }
  },
  {
    id: 106,
    title: "कृष्णा नदी (Krishna River)",
    detail: "लंबाई: 1,400 किमी | उद्गम: महाबलेश्वर (महाराष्ट्र) | मुहाना: बंगाल की खाड़ी। महाराष्ट्र, कर्नाटक, तेलंगाना और आंध्र प्रदेश से होकर बहती है।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80",
    keyFact: "नागार्जुन सागर बांध और श्रीशैलम जलविद्युत परियोजना कृष्णा नदी पर स्थित हैं।",
    translations: {
      en: { title: "Krishna River", detail: "Length: 1,400 km | Origin: Mahabaleshwar (Maharashtra) | Outflow: Bay of Bengal.", keyFact: "Home to Nagarjuna Sagar Dam and Srisailam Dam." }
    }
  },
  {
    id: 107,
    title: "कावेरी नदी (Kaveri River)",
    detail: "लंबाई: 800 किमी | उद्गम: तालकावेरी (ब्रह्मगिरि पर्वतमाला), कोडागु (कर्नाटक) | मुहाना: बंगाल की खाड़ी। इसे 'दक्षिण भारत की जीवनधारा' कहा जाता है।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
    keyFact: "कर्नाटक में शिवसमुद्रम जलप्रपात (भारत का पहला जलविद्युत गृह 1902) इसी नदी पर है।",
    translations: {
      en: { title: "Kaveri River (Cauvery)", detail: "Length: 800 km | Origin: Talakaveri, Brahmagiri Hills, Karnataka | Lifeline of Karnataka and Tamil Nadu.", keyFact: "Features the Shivanasamudra Falls, site of Asia's early hydroelectric plant (1902)." }
    }
  },
  {
    id: 108,
    title: "महानदी (Mahanadi River)",
    detail: "लंबाई: 851 किमी | उद्गम: सिहावा पर्वत, धमतरी (छत्तीसगढ़) | मुहाना: बंगाल की खाड़ी (ओडिशा)।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=400&q=80",
    keyFact: "संबलपुर (ओडिशा) में विश्व का सबसे लंबा मिट्टी का बांध 'हीराकुंड बांध' (25.8 किमी) महानदी पर बना है।",
    translations: {
      en: { title: "Mahanadi River", detail: "Length: 851 km | Origin: Sihawa, Chhattisgarh | Outflow: Bay of Bengal (Odisha).", keyFact: "Home to Hirakud Dam, the longest earthen dam in the world (25.8 km)." }
    }
  },
  {
    id: 109,
    title: "सिंधु नदी (Indus River)",
    detail: "लंबाई: 3,180 किमी (भारत में 1,114 किमी) | उद्गम: मानसरोवर के निकट बोखर चू हिमनद (तिब्बत) | मुहाना: अरब सागर (कराची)।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
    keyFact: "सिंधु जल समझौता 1960 में भारत और पाकिस्तान के बीच हुआ था। लद्दाख से बहने वाली मुख्य नदी।",
    translations: {
      en: { title: "Indus River (Sindhu)", detail: "Length: 3,180 km | Origin: Near Lake Mansarovar, Tibet | Flows through Ladakh into Arabian Sea.", keyFact: "Gave India its historic name; governed by the 1960 Indus Waters Treaty." }
    }
  },
  {
    id: 110,
    title: "ताप्ती / तापी नदी (Tapti River)",
    detail: "लंबाई: 724 किमी | उद्गम: मुल्ताई (बैतूल जिला), मध्य प्रदेश | मुहाना: खंभात की खाड़ी (अरब सागर)। नर्मदा के समानांतर पश्चिम में बहने वाली नदी।",
    category: "Nadiyan",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    keyFact: "सूरत (गुजरात) शहर ताप्ती नदी के मुहाने पर बसा प्रसिद्ध व्यापारिक केंद्र है।",
    translations: {
      en: { title: "Tapti / Tapi River", detail: "Length: 724 km | Origin: Multai, Betul, Madhya Pradesh | Flows westward into Arabian Sea.", keyFact: "The diamond city of Surat is situated on its banks." }
    }
  }
];

// 2. Bharat ke National Parks (राष्ट्रीय उद्यान)
export const NATIONAL_PARKS: GkFullItem[] = [
  {
    id: 201,
    title: "जिम कॉर्बेट राष्ट्रीय उद्यान (Jim Corbett National Park)",
    detail: "स्थान: नैनीताल / पौड़ी गढ़वाल, उत्तराखंड | स्थापना: 1936। भारत का प्रथम राष्ट्रीय उद्यान (पुराना नाम: हेली नेशनल पार्क)।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=400&q=80",
    keyFact: "1973 में 'प्रोजेक्ट टाइगर' (Project Tiger) की शुरुआत सबसे पहले यहीं से की गई थी।",
    translations: {
      en: { title: "Jim Corbett National Park", detail: "Location: Uttarakhand | Established: 1936. India's first national park (originally Hailey National Park).", keyFact: "Project Tiger was officially launched here in 1973." },
      ta: { title: "ஜிம் கார்பெட் தேசிய பூங்கா", detail: "இடம்: உத்தராகண்ட் | நிறுவப்பட்டது: 1936. இந்தியாவின் முதல் தேசிய பூங்கா.", keyFact: "1973 இல் புலிகள் பாதுகாப்பு திட்டம் இங்கிருந்து தொடங்கப்பட்டது." },
      te: { title: "జిమ్ కార్బెట్ నేషనల్ పార్క్", detail: "ప్రదేశం: ఉత్తరాఖండ్ | స్థాపన: 1936. భారతదేశపు మొట్టమొదటి జాతీయ ఉద్యానవనం.", keyFact: "1973లో ప్రాజెక్ట్ టైగర్ ఇక్కడి నుంచే ప్రారంభమైంది." }
    }
  },
  {
    id: 202,
    title: "काजीरंगा राष्ट्रीय उद्यान (Kaziranga National Park)",
    detail: "स्थान: गोलाघाट व नगांव, असम | स्थापना: 1905 / 1974। यूनेस्को (UNESCO) विश्व धरोहर स्थल।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=400&q=80",
    keyFact: "विश्व के दो-तिहाई एक सींग वाले गैंडे (Great One-Horned Rhinoceros) यहीं पाए जाते हैं।",
    translations: {
      en: { title: "Kaziranga National Park", detail: "Location: Assam | UNESCO World Heritage Site. Famous worldwide for wildlife conservation.", keyFact: "Home to two-thirds of the world's Great One-Horned Rhinoceroses." },
      ta: { title: "காசிரங்கா தேசிய பூங்கா", detail: "இடம்: அசாம் | யுனெஸ்கோ பாரம்பரிய களம்.", keyFact: "ஒற்றைக் கொம்பு காண்டாமிருகங்களுக்கு உலகப் புகழ்பெற்றது." }
    }
  },
  {
    id: 203,
    title: "गिर राष्ट्रीय उद्यान (Gir National Park)",
    detail: "स्थान: जूनागढ़, गुजरात | स्थापना: 1965। शुष्क पर्णपाती वनों से आच्छादित।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28caa142e9?auto=format&fit=crop&w=400&q=80",
    keyFact: "एशियाई शेरों (Asiatic Lions) का विश्व में एकमात्र प्राकृतिक निवास स्थान।",
    translations: {
      en: { title: "Gir National Park", detail: "Location: Junagadh, Gujarat | Established: 1965.", keyFact: "The only natural habitat of the majestic Asiatic Lion in the entire world." },
      ta: { title: "கிர் தேசிய பூங்கா", detail: "இடம்: குஜராத் | ஆசிய சிங்கங்களின் ஒரே வாழிடம்.", keyFact: "உலகில் ஆசிய சிங்கங்கள் வாழும் ஒரே இயற்கைக் காடு." }
    }
  },
  {
    id: 204,
    title: "कान्हा राष्ट्रीय उद्यान (Kanha National Park)",
    detail: "स्थान: मंडला व बालाघाट, मध्य प्रदेश | स्थापना: 1955। भारत के सबसे खूबसूरत व सुव्यवस्थित उद्यानों में से एक।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=400&q=80",
    keyFact: "दुर्लभ 'बारहसिंगा' (दलदली हिरण) का घर। रुडयार्ड किपलिंग की 'द जंगल बुक' की प्रेरणा यही वन है।",
    translations: {
      en: { title: "Kanha National Park", detail: "Location: Madhya Pradesh | One of the finest tiger reserves in Asia.", keyFact: "Saved the endangered Hard-ground Barasingha (Swamp Deer) and inspired Kipling's Jungle Book." }
    }
  },
  {
    id: 205,
    title: "सुंदरबन राष्ट्रीय उद्यान (Sundarbans National Park)",
    detail: "स्थान: दक्षिण 24 परगना, पश्चिम बंगाल | यूनेस्को विश्व धरोहर व रामसर आर्द्रभूमि स्थल।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80",
    keyFact: "विश्व का सबसे बड़ा मैंग्रोव (सुंदरी वन) डेल्टा और रॉयल बंगाल टाइगर का तैराकी क्षेत्र।",
    translations: {
      en: { title: "Sundarbans National Park", detail: "Location: West Bengal | UNESCO World Heritage Site & Ramsar Wetland.", keyFact: "World's largest mangrove forest, famous for Royal Bengal Tigers that swim in tidal rivers." }
    }
  },
  {
    id: 206,
    title: "रणथंभौर राष्ट्रीय उद्यान (Ranthambore National Park)",
    detail: "स्थान: सवाई माधोपुर, राजस्थान | स्थापना: 1980। अरावली और विंध्य पर्वतमाला के संगम पर स्थित।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    keyFact: "10वीं सदी का ऐतिहासिक रणथंभौर दुर्ग उद्यान के अंदर स्थित है। बाघों के दीदार हेतु प्रसिद्ध।",
    translations: {
      en: { title: "Ranthambore National Park", detail: "Location: Sawai Madhopur, Rajasthan.", keyFact: "Famous for daytime tiger sightings around ancient historic ruins and lakes." }
    }
  },
  {
    id: 207,
    title: "पेरियार राष्ट्रीय उद्यान (Periyar National Park)",
    detail: "स्थान: इडुक्की और पथानामथिट्टा, केरल | पश्चिमी घाट की सुरम्य पहाड़ियों में स्थित।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400&q=80",
    keyFact: "जंगली हाथियों (Wild Elephants) और कृत्रिम पेरियार झील में नौका विहार सफारी के लिए प्रसिद्ध।",
    translations: {
      en: { title: "Periyar National Park", detail: "Location: Western Ghats, Kerala.", keyFact: "Renowned elephant and tiger reserve surrounding the picturesque Periyar Lake." }
    }
  },
  {
    id: 208,
    title: "हेमिस राष्ट्रीय उद्यान (Hemis National Park)",
    detail: "स्थान: लेह, लद्दाख | स्थापना: 1981। 4,400 वर्ग किमी क्षेत्रफल के साथ भारत का सबसे बड़ा राष्ट्रीय उद्यान।",
    category: "National Parks",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    keyFact: "भारत का सर्वाधिक ऊंचाई पर स्थित उद्यान और 'हिम तेंदुए' (Snow Leopard) की वैश्विक राजधानी।",
    translations: {
      en: { title: "Hemis National Park", detail: "Location: Ladakh | India's largest national park (4,400 sq km).", keyFact: "World capital for observing the elusive Snow Leopard in high-altitude Himalayas." }
    }
  }
];

// 3. 28 Rajya & 8 UT with Capitals (राज्य व राजधानी)
export const RAJYA_AUR_RAJDHANI: GkFullItem[] = [
  {
    id: 301,
    title: "भारत के 28 राज्य और उनकी राजधानियां (Complete 28 States)",
    detail: "1. आंध्र प्रदेश: अमरावती | 2. अरुणाचल: ईटानगर | 3. असम: दिसपुर | 4. बिहार: पटना | 5. छत्तीसगढ़: रायपुर | 6. गोवा: पणजी | 7. गुजरात: गांधीनगर | 8. हरियाणा: चंडीगढ़ | 9. हिमाचल: शिमला | 10. झारखंड: रांची | 11. कर्नाटक: बेंगलुरु | 12. केरल: तिरुवनंतपुरम | 13. मध्य प्रदेश: भोपाल | 14. महाराष्ट्र: मुंबई | 15. मणिपुर: इंफाल | 16. मेघालय: शिलांग | 17. मिजोरम: आइजोल | 18. नगालैंड: कोहिमा | 19. ओडिशा: भुवनेश्वर | 20. पंजाब: चंडीगढ़ | 21. राजस्थान: जयपुर | 22. सिक्किम: गंगटोक | 23. तमिलनाडु: चेन्नई | 24. तेलंगाना: हैदराबाद | 25. त्रिपुरा: अगरतला | 26. उत्तर प्रदेश: लखनऊ | 27. उत्तराखंड: देहरादून | 28. पश्चिम बंगाल: कोलकाता।",
    category: "Rajya & Rajdhani",
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
    keyFact: "क्षेत्रफल में सबसे बड़ा राज्य राजस्थान और सबसे छोटा गोवा है। जनसंख्या में सबसे बड़ा उत्तर प्रदेश है।",
    translations: {
      en: { title: "28 States of India and Their Capitals", detail: "Andhra: Amaravati, Arunachal: Itanagar, Assam: Dispur, Bihar: Patna, Chhattisgarh: Raipur, Goa: Panaji, Gujarat: Gandhinagar, Haryana: Chandigarh, HP: Shimla, Jharkhand: Ranchi, Karnataka: Bengaluru, Kerala: Thiruvananthapuram, MP: Bhopal, Maharashtra: Mumbai, Manipur: Imphal, Meghalaya: Shillong, Mizoram: Aizawl, Nagaland: Kohima, Odisha: Bhubaneswar, Punjab: Chandigarh, Rajasthan: Jaipur, Sikkim: Gangtok, Tamil Nadu: Chennai, Telangana: Hyderabad, Tripura: Agartala, UP: Lucknow, Uttarakhand: Dehradun, West Bengal: Kolkata.", keyFact: "Rajasthan is largest by area, Goa smallest; UP is largest by population." }
    }
  },
  {
    id: 302,
    title: "भारत के 8 केंद्र शासित प्रदेश व राजधानियां (8 Union Territories)",
    detail: "1. अंडमान और निकोबार द्वीप समूह: पोर्ट ब्लेयर | 2. चंडीगढ़: चंडीगढ़ | 3. दादरा व नगर हवेली और दमन व दीव: दमन | 4. दिल्ली (राष्ट्रीय राजधानी क्षेत्र): नई दिल्ली | 5. जम्मू और कश्मीर: श्रीनगर (ग्रीष्म) / जम्मू (शीत) | 6. लद्दाख: लेह | 7. लक्षद्वीप: कवरत्ती | 8. पुडुचेरी: पुडुचेरी।",
    category: "Rajya & Rajdhani",
    imageUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80",
    keyFact: "31 अक्टूबर 2019 को जम्मू-कश्मीर और लद्दाख दो नए केंद्र शासित प्रदेश बने। दादरा-नगर हवेली व दमन-दीव का विलय 26 जनवरी 2020 को हुआ।",
    translations: {
      en: { title: "8 Union Territories of India & Capitals", detail: "1. Andaman & Nicobar: Port Blair | 2. Chandigarh: Chandigarh | 3. Dadra & Nagar Haveli & Daman & Diu: Daman | 4. Delhi (NCT): New Delhi | 5. Jammu & Kashmir: Srinagar/Jammu | 6. Ladakh: Leh | 7. Lakshadweep: Kavaratti | 8. Puducherry: Puducherry.", keyFact: "Ladakh is India's largest UT by area; Lakshadweep is smallest." }
    }
  }
];

// 4. Rashtriya Chinh (राष्ट्रीय प्रतीक व चिह्न)
export const RASHTRIYA_CHINH: GkFullItem[] = [
  {
    id: 401,
    title: "राष्ट्रीय पशु (National Animal) - रॉयल बंगाल टाइगर (बाघ)",
    detail: "वैज्ञानिक नाम: पैंथेरा टाइग्रिस (Panthera tigris)। शक्ति, चपलता और अपार सामर्थ्य का प्रतीक। 1973 में 'प्रोजेक्ट टाइगर' शुरू करके इसे भारत का राष्ट्रीय पशु घोषित किया गया था।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=400&q=80",
    keyFact: "1973 से पहले भारत का राष्ट्रीय पशु 'शेर' (Lion) था, जिसे बदलकर बाघ किया गया।",
    translations: {
      en: { title: "National Animal: Royal Bengal Tiger", detail: "Scientific name: Panthera tigris. Represents grace, strength, agility and enormous power. Declared national animal in 1973.", keyFact: "Replaced the lion as national animal during the launch of Project Tiger in 1973." },
      ta: { title: "தேசிய விலங்கு: வங்காள புலி", detail: "அறிவியல் பெயர்: பாந்தெரா டைகிரிஸ். 1973 இல் தேசிய விலங்காக அறிவிக்கப்பட்டது.", keyFact: "1973 க்கு முன் சிங்கம் தேசிய விலங்காக இருந்தது." }
    }
  },
  {
    id: 402,
    title: "राष्ट्रीय पक्षी (National Bird) - भारतीय मोर (Peacock)",
    detail: "वैज्ञानिक नाम: पावो क्रिस्टेटस (Pavo cristatus)। सौंदर्य, गरिमा और रंगों का अद्भुत प्रतीक। 1 फरवरी 1963 को भारत का राष्ट्रीय पक्षी घोषित किया गया।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    keyFact: "भारतीय वन्यजीव संरक्षण अधिनियम 1972 के तहत मोर के शिकार पर पूर्ण प्रतिबंध है।",
    translations: {
      en: { title: "National Bird: Indian Peacock", detail: "Scientific name: Pavo cristatus. Declared India's national bird in 1963 for its rich cultural resonance and beauty.", keyFact: "Fully protected under Schedule I of Wildlife Protection Act 1972." }
    }
  },
  {
    id: 403,
    title: "राष्ट्रीय फूल (National Flower) - कमल (Lotus)",
    detail: "वैज्ञानिक नाम: नेलुम्बो न्यूसिफेरा (Nelumbo nucifera)। पवित्रता, सौंदर्य, ज्ञान और आध्यात्मिकता का प्रतीक। कीचड़ में खिलकर भी निर्मल रहने का जीवन संदेश देता है।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80",
    keyFact: "भारतीय दर्शन में मां सरस्वती और मां लक्ष्मी का पावन आसन कमल पुष्प ही है।",
    translations: {
      en: { title: "National Flower: Lotus", detail: "Scientific name: Nelumbo nucifera. Sacred flower symbolizing purity, non-attachment and triumph over adversity.", keyFact: "Traditional seat of Goddess Saraswati and Goddess Lakshmi." }
    }
  },
  {
    id: 404,
    title: "राष्ट्रीय वृक्ष (National Tree) - बरगद (Banyan Tree)",
    detail: "वैज्ञानिक नाम: फाइकस बेंगालेंसिस (Ficus benghalensis)। इसे 'वट वृक्ष' भी कहते हैं। इसकी अमरता और विशाल शाखाएं एकता व स्थिरता का प्रतीक हैं।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80",
    keyFact: "इसकी जटाएं जमीन में धंसकर नए तने बना लेती हैं, जिससे यह सैकड़ों वर्ष जीवित रहता है।",
    translations: {
      en: { title: "National Tree: Banyan Tree (Bargad)", detail: "Scientific name: Ficus benghalensis. Represents immortality, eternal life and extensive shelter.", keyFact: "Aerial roots grow into woody trunks, allowing trees to cover acres for centuries." }
    }
  },
  {
    id: 405,
    title: "राष्ट्रीय फल (National Fruit) - आम (Mango)",
    detail: "वैज्ञानिक नाम: मैंजीफेरा इंडिका (Mangifera indica)। फलों का राजा आम भारत का राष्ट्रीय फल है। उष्णकटिबंधीय स्वादिष्ट फल जो भारतीय संस्कृति से जुड़ा है।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
    keyFact: "अकबर ने बिहार के दरभंगा में एक लाख आम के पेड़ों का 'लखी बाग' लगवाया था।",
    translations: {
      en: { title: "National Fruit: Mango", detail: "Scientific name: Mangifera indica. King of fruits representing abundance, prosperity and flavor.", keyFact: "India produces over 40% of the world's total mango supply." }
    }
  },
  {
    id: 406,
    title: "राष्ट्रीय ध्वज (National Flag) - तिरंगा (Tiranga)",
    detail: "तीन समान चौड़ाई की पट्टियां: केसरिया (साहस व त्याग), श्वेत (सत्य व शांति) और हरा (समृद्धि व हरियाली)। अनुपात 3:2। केंद्र में नीले रंग का 24 तीलियों वाला अशोक चक्र।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=400&q=80",
    keyFact: "तिरंगे का डिजाइन पिंगली वेंकैया (Pingali Venkayya) ने तैयार किया था। 22 जुलाई 1947 को स्वीकृत।",
    translations: {
      en: { title: "National Flag: Tricolour (Tiranga)", detail: "Three horizontal bands: Saffron (courage), White (truth/peace), Green (prosperity). Ratio 3:2. Centered with 24-spoke Navy Blue Ashoka Chakra.", keyFact: "Designed by freedom fighter Pingali Venkayya; adopted on 22 July 1947." }
    }
  },
  {
    id: 407,
    title: "राष्ट्रगान व राष्ट्रगीत (Anthem & Song)",
    detail: "राष्ट्रगान: 'जन गण मन' (रवींद्रनाथ टैगोर द्वारा रचित, गायन समय 52 सेकंड)। राष्ट्रगीत: 'वंदे मातरम्' (बंकिमचंद्र चट्टोपाध्याय के उपन्यास 'आनंदमठ' से, 65 सेकंड)।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    keyFact: "24 जनवरी 1950 को संविधान सभा ने दोनों को आधिकारिक रूप से अंगीकृत किया था।",
    translations: {
      en: { title: "National Anthem & Song", detail: "National Anthem: Jana Gana Mana (composed by Rabindranath Tagore, 52 seconds). National Song: Vande Mataram (composed by Bankim Chandra Chattopadhyay).", keyFact: "Both officially adopted by the Constituent Assembly on 24 January 1950." }
    }
  },
  {
    id: 408,
    title: "राष्ट्रीय प्रतीक (State Emblem) व राष्ट्रीय मुद्रा",
    detail: "राष्ट्रीय प्रतीक: सारनाथ स्थित अशोक का सिंह स्तंभ (चार सिंह पीठ से पीठ सटाए)। नीचे देवनागरी में 'सत्यमेव जयते' (मुंडकोपनिषद से)। राष्ट्रीय मुद्रा: ₹ भारतीय रुपया (डिजाइन: डी. उदय कुमार)।",
    category: "Rashtriya Chinh",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80",
    keyFact: "26 जनवरी 1950 को राज्य प्रतीक अपनाया गया। 15 जुलाई 2010 को ₹ प्रतीक चिन्ह स्वीकृत हुआ।",
    translations: {
      en: { title: "State Emblem of India & Currency Symbol", detail: "Lion Capital of Ashoka at Sarnath with motto 'Satyameva Jayate' (Truth Alone Triumphs). Currency: Indian Rupee (₹).", keyFact: "Adopted on 26 January 1950; Rupee symbol created by D. Udaya Kumar in 2010." }
    }
  }
];

// 5. Mahan Vyakti (महान विभूतियां)
export const MAHAN_VYAKTI: GkFullItem[] = [
  {
    id: 501,
    title: "महात्मा गांधी - राष्ट्रपिता (Mahatma Gandhi)",
    detail: "जन्म: 2 अक्टूबर 1869 (पोरबंदर)। सत्य और अहिंसा के मार्ग पर चलकर भारत को स्वतंत्रता दिलाई। चंपारण, असहयोग, नमक सत्याग्रह (दांडी मार्च 1930) व भारत छोड़ो आंदोलन (1942) का नेतृत्व किया।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    keyFact: "रवींद्रनाथ टैगोर ने इन्हें 'महात्मा' की उपाधि दी और सुभाष चंद्र बोस ने 'राष्ट्रपिता' कहा। 2 अक्टूबर को 'अंतरराष्ट्रीय अहिंसा दिवस' मनाया जाता है।",
    translations: {
      en: { title: "Mahatma Gandhi - Father of the Nation", detail: "Pioneered Satyagraha and Non-violence (Ahimsa) to lead India to freedom from British colonial rule.", keyFact: "His birthday, 2 October, is celebrated worldwide as International Day of Non-Violence." }
    }
  },
  {
    id: 502,
    title: "डॉ. भीमराव रामजी आंबेडकर - संविधान निर्माता",
    detail: "जन्म: 14 अप्रैल 1891 (महू, मध्य प्रदेश)। प्रारूप समिति के अध्यक्ष, भारत के प्रथम कानून व न्याय मंत्री तथा भारतीय संविधान के मुख्य वास्तुकार (Father of Indian Constitution)।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    keyFact: "1990 में मरणोपरांत भारत के सर्वोच्च नागरिक सम्मान 'भारत रत्न' से सम्मानित किया गया।",
    translations: {
      en: { title: "Dr. B.R. Ambedkar - Architect of Constitution", detail: "Chairman of the Drafting Committee, independent India's first Law Minister, and social reformer.", keyFact: "Conferred with Bharat Ratna in 1990." }
    }
  },
  {
    id: 503,
    title: "पंडित जवाहरलाल नेहरू - प्रथम प्रधानमंत्री",
    detail: "जन्म: 14 नवंबर 1889 (प्रयागराज)। स्वतंत्र भारत के प्रथम प्रधानमंत्री (1947 से 1964 तक, सर्वाधिक 17 वर्ष)। आधुनिक भारत के निर्माता, IITs, IIMs, AIIMS और ISRO की नींव रखी।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    keyFact: "बच्चों में 'चाचा नेहरू' के नाम से लोकप्रिय। इनका जन्मदिन 14 नवंबर 'बाल दिवस' (Children's Day) के रूप में मनाया जाता है। प्रसिद्ध पुस्तक: 'डिस्कवरी ऑफ इंडिया'।",
    translations: {
      en: { title: "Pt. Jawaharlal Nehru - 1st Prime Minister", detail: "India's longest-serving Prime Minister (1947-1964). Laid the institutional foundation for modern science and industrial growth.", keyFact: "His birthday on 14 November is celebrated as National Children's Day." }
    }
  },
  {
    id: 504,
    title: "सरदार वल्लभभाई पटेल - लौह पुरुष (Iron Man)",
    detail: "जन्म: 31 अक्टूबर 1875 (नाडियाड, गुजरात)। स्वतंत्र भारत के प्रथम उप प्रधानमंत्री व गृह मंत्री। स्वतंत्रता के बाद 565 देशी रियासतों का भारत संघ में ऐतिहासिक एकीकरण किया।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    keyFact: "गुजरात में नर्मदा तट पर विश्व की सबसे ऊंची प्रतिमा 'स्टैच्यू ऑफ यूनिटी' (182 मीटर) समर्पित है। 31 अक्टूबर 'राष्ट्रीय एकता दिवस' है।",
    translations: {
      en: { title: "Sardar Vallabhbhai Patel - Iron Man of India", detail: "First Deputy PM and Home Minister. Unified 565 princely states into the Republic of India.", keyFact: "Honored with the world's tallest statue, Statue of Unity (182m); birthday observed as National Unity Day." }
    }
  },
  {
    id: 505,
    title: "नेताजी सुभाष चंद्र बोस (Netaji Subhash Chandra Bose)",
    detail: "जन्म: 23 जनवरी 1897 (कटक, ओडिशा)। 'आजाद हिंद फौज' (INA) का पुनर्गठन किया। नारा: 'तुम मुझे खून दो, मैं तुम्हें आजादी दूंगा!' और 'जय हिंद!'।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    keyFact: "इनके जन्मदिवस 23 जनवरी को भारत सरकार प्रतिवर्ष 'पराक्रम दिवस' (Parakram Diwas) के रूप में मनाती है।",
    translations: {
      en: { title: "Netaji Subhash Chandra Bose", detail: "Leader of the Indian National Army (Azad Hind Fauj). Gave the clarion calls 'Jai Hind' and 'Give me blood, I shall give you freedom!'.", keyFact: "His birthday on 23 January is celebrated as Parakram Diwas." }
    }
  },
  {
    id: 506,
    title: "भगत सिंह - शहीद-ए-आजम (Bhagat Singh)",
    detail: "जन्म: 28 सितंबर 1907 (बंगा, पंजाब)। हिंदुस्तान सोशलिस्ट रिपब्लिकन एसोसिएशन (HSRA) के प्रमुख क्रांतिकारी। नारा: 'इंकलाब जिंदाबाद!'। मात्र 23 वर्ष की आयु में 23 मार्च 1931 को हंसते-हंसते फांसी का फंदा चूम लिया।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    keyFact: "23 मार्च को सुखदेव और राजगुरु के साथ इनकी शहादत की स्मृति में 'शहीद दिवस' मनाया जाता है।",
    translations: {
      en: { title: "Shaheed Bhagat Singh", detail: "Iconic revolutionary freedom fighter who sacrificed his life for India at age 23 on 23 March 1931.", keyFact: "Martyrs' Day (Shaheed Diwas) is commemorated in his honor on 23 March." }
    }
  },
  {
    id: 507,
    title: "डॉ. एपीजे अब्दुल कलाम - मिसाइल मैन व जन-राष्ट्रपति",
    detail: "जन्म: 15 अक्टूबर 1931 (रामेश्वरम, तमिलनाडु)। भारत के 11वें राष्ट्रपति (2002-2007)। भारत के उपग्रह प्रक्षेपण यान (SLV-3) और अग्नि-पृथ्वी मिसाइलों के जनक।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    keyFact: "1997 में 'भारत रत्न' से सम्मानित। विख्यात पुस्तकें: 'विंग्स ऑफ फायर' और 'इग्नाइटेड माइंड्स'।",
    translations: {
      en: { title: "Dr. A.P.J. Abdul Kalam - Missile Man of India", detail: "11th President of India and visionary scientist who steered ISRO and DRDO's landmark missile programs.", keyFact: "Awarded Bharat Ratna in 1997; author of Wings of Fire." }
    }
  },
  {
    id: 508,
    title: "झांसी की रानी लक्ष्मीबाई (Rani Lakshmibai)",
    detail: "जन्म: 19 नवंबर 1828 (वाराणसी)। 1857 के प्रथम स्वतंत्रता संग्राम की अमर वीरांगना। अंग्रेजों की हड़प नीति (Doctrine of Lapse) को धत्ता बताकर अपनी झांसी की रक्षा में रणभूमि में वीरगति पाई।",
    category: "Mahaan Vyakti",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    keyFact: "ब्रिटिश सेनापति सर ह्यू रोज ने कहा था: 'विद्रोहियों में रानी अकेली ऐसी मर्द थी जो बहादुरी से लड़ी।'",
    translations: {
      en: { title: "Rani Lakshmibai of Jhansi", detail: "Heroine of the 1857 First War of Independence who fought fearlessly against British annexation.", keyFact: "Immortalized in Indian history as the epitome of courage and sacrifice." }
    }
  }
];

// 6. Itihaas ke Important Saal (इतिहास के प्रमुख वर्ष)
export const ITIHAAS_KE_SAAL: GkFullItem[] = [
  {
    id: 601,
    title: "326 ई.पू. - सिकंदर का भारत आक्रमण व झेलम युद्ध",
    detail: "मैसेडोनिया के राजा सिकंदर (Alexander) ने भारत पर आक्रमण किया। झेलम नदी के तट पर सिकंदर और राजा पोरस के बीच भीषण 'हाईडेस्पीज का युद्ध' लड़ा गया।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=400&q=80",
    keyFact: "पोरस की अद्भुत वीरता देखकर सिकंदर प्रभावित हुआ और उसका राज्य वापस लौटा दिया।",
    translations: {
      en: { title: "326 BCE: Alexander's Invasion & Battle of Hydaspes", detail: "Alexander the Great fought the legendary King Porus on the banks of Jhelum River.", keyFact: "Impressed by Porus's bravery, Alexander restored his kingdom." }
    }
  },
  {
    id: 602,
    title: "261 ई.पू. - कलिंग युद्ध व सम्राट अशोक का हृदय परिवर्तन",
    detail: "मौर्य सम्राट अशोक ने कलिंग (वर्तमान ओडिशा) पर विजय प्राप्त की। युद्ध में हुए नरसंहार और रक्तपात को देखकर अशोक ने युद्ध नीति का त्याग कर बौद्ध धर्म (धम्म) अपनाया।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
    keyFact: "अशोक के 13वें शिलालेख में कलिंग युद्ध और उसके हृदय परिवर्तन का ऐतिहासिक वर्णन मिलता है।",
    translations: {
      en: { title: "261 BCE: Kalinga War & Emperor Ashoka's Transformation", detail: "Devastated by the bloodshed in Kalinga, Emperor Ashoka renounced war and embraced Buddhism.", keyFact: "Recorded extensively in Major Rock Edict XIII." }
    }
  },
  {
    id: 603,
    title: "1192 ई. - तराइन का दूसरा युद्ध",
    detail: "तराइन के मैदान में पृथ्वीराज चौहान और मुहम्मद गौरी के बीच निर्णायक युद्ध हुआ, जिसमें गौरी की विजय हुई।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80",
    keyFact: "इस युद्ध के बाद भारत में दिल्ली सल्तनत और मुस्लिम शासन की नींव पड़ी।",
    translations: {
      en: { title: "1192 CE: Second Battle of Tarain", detail: "Decisive battle between Prithviraj Chauhan and Muhammad Ghori leading to the foundation of the Delhi Sultanate.", keyFact: "Major turning point in medieval Indian history." }
    }
  },
  {
    id: 604,
    title: "1526 ई. - पानीपत की पहली लड़ाई (मुगल साम्राज्य की स्थापना)",
    detail: "21 अप्रैल 1526 को काबुल के शासक बाबर और दिल्ली के सुल्तान इब्राहिम लोदी के बीच पानीपत में मुकाबला हुआ। बाबर ने तोपखाने और तुलुगमा पद्धति से जीत दर्ज की।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
    keyFact: "लोदी वंश और दिल्ली सल्तनत का अंत हुआ तथा भारत में शक्तिशाली 'मुगल साम्राज्य' की स्थापना हुई।",
    translations: {
      en: { title: "1526 CE: First Battle of Panipat", detail: "Babur defeated Ibrahim Lodi using advanced gunpowder artillery and cavalry tactics, founding the Mughal Empire.", keyFact: "Ended the Delhi Sultanate in India." }
    }
  },
  {
    id: 605,
    title: "1576 ई. - हल्दीघाटी का ऐतिहासिक युद्ध",
    detail: "18 जून 1576 को मेवाड़ के वीर शिरोमणि महाराणा प्रताप और अकबर की सेना (राजा मानसिंह के नेतृत्व) के बीच राजस्थान के हल्दीघाटी दर्रे में भीषण युद्ध हुआ।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=400&q=80",
    keyFact: "महाराणा प्रताप का स्वामिभक्त घोड़ा 'चेतक' अपनी वीरता के लिए इतिहास में अमर हुआ।",
    translations: {
      en: { title: "1576 CE: Battle of Haldighati", detail: "Legendary clash between Maharana Pratap of Mewar and Mughal forces led by Man Singh I.", keyFact: "Celebrated for the heroic loyalty of Maharana's warhorse Chetak." }
    }
  },
  {
    id: 606,
    title: "1757 ई. - प्लासी का युद्ध (ब्रिटिश सत्ता की नींव)",
    detail: "23 जून 1757 को बंगाल के भागीरथी नदी के तट पर प्लासी में रॉबर्ट क्लाइव की ईस्ट इंडिया कंपनी और बंगाल के नवाब सिराजुद्दौला के बीच युद्ध हुआ।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    keyFact: "मीर जाफर के विश्वासघात के कारण नवाब की पराजय हुई और अंग्रेजों का भारत में राजनीतिक वर्चस्व स्थापित हुआ।",
    translations: {
      en: { title: "1757 CE: Battle of Plassey", detail: "Robert Clive's British East India Company defeated Nawab Siraj-ud-Daulah through political conspiracy.", keyFact: "Established British administrative control over Bengal." }
    }
  },
  {
    id: 607,
    title: "1857 ई. - भारत का प्रथम स्वतंत्रता संग्राम",
    detail: "10 मई 1857 को मेरठ छावनी से क्रांति की शुरुआत हुई। मंगल पांडे ने बैरकपुर में चर्बी वाले कारतूसों के विरोध में पहला विद्रोह किया था।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    keyFact: "बहादुर शाह जफर, रानी लक्ष्मीबाई, तात्या टोपे, कुंवर सिंह व नाना साहेब ने नेतृत्व किया। इसके बाद ईस्ट इंडिया कंपनी का शासन समाप्त होकर ब्रिटिश क्राउन का सीधा शासन शुरू हुआ।",
    translations: {
      en: { title: "1857 CE: First War of Indian Independence", detail: "Uprising ignited by Mangal Pandey against the British East India Company across Northern and Central India.", keyFact: "Led to the British Crown directly taking over the administration of India in 1858." }
    }
  },
  {
    id: 608,
    title: "1919 ई. - जलियांवाला बाग हत्याकांड व रॉलेट एक्ट",
    detail: "13 अप्रैल 1919 (बैसाखी के दिन) अमृतसर के जलियांवाला बाग में शांतिपूर्ण सभा पर ब्रिगेडियर जनरल डायर ने निहत्थी भीड़ पर गोलियां चलवाईं, जिसमें सैकड़ों निर्दोष मारे गए।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    keyFact: "इसके विरोध में रवींद्रनाथ टैगोर ने ब्रिटिश उपाधि 'नाइटहुड' (Knighthood) वापस लौटा दी थी।",
    translations: {
      en: { title: "1919 CE: Jallianwala Bagh Massacre", detail: "General Dyer ordered troops to fire on peaceful unarmed demonstrators in Amritsar, killing hundreds.", keyFact: "Prompted Rabindranath Tagore to renounce his British Knighthood in protest." }
    }
  },
  {
    id: 609,
    title: "1947 ई. - 15 अगस्त को भारत की स्वतंत्रता",
    detail: "200 वर्षों के दमनकारी ब्रिटिश औपनिवेशिक शासन के बाद 15 अगस्त 1947 को भारत स्वतंत्र राष्ट्र बना। आधी रात को पंडित नेहरू ने ऐतिहासिक 'ट्रिस्ट विद डेस्टिनी' भाषण दिया।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=400&q=80",
    keyFact: "लाल किले पर पहली बार स्वतंत्र भारत का तिरंगा फहराया गया था।",
    translations: {
      en: { title: "1947 CE: Indian Independence on 15 August", detail: "India achieved independence from British colonial rule, celebrated annually on August 15.", keyFact: "Nehru delivered his immortal 'Tryst with Destiny' midnight address." }
    }
  },
  {
    id: 610,
    title: "1950 ई. - 26 जनवरी को संविधान लागू व गणतंत्र भारत",
    detail: "26 जनवरी 1950 को डॉ. राजेंद्र प्रसाद ने प्रथम राष्ट्रपति के रूप में शपथ ली और विश्व का सबसे बड़ा लिखित संविधान लागू हुआ। भारत एक संप्रभु लोकतांत्रिक गणराज्य बना।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=80",
    keyFact: "1930 के लाहौर अधिवेशन में लिए गए 'पूर्ण स्वराज' संकल्प की स्मृति में 26 जनवरी की तिथि चुनी गई थी।",
    translations: {
      en: { title: "1950 CE: Constitution of India in Effect (Republic Day)", detail: "The world's longest written constitution came into force, making India a sovereign democratic republic.", keyFact: "26 January commemorates the 1930 declaration of Purna Swaraj." }
    }
  },
  {
    id: 611,
    title: "2023 ई. - चंद्रयान-3 महामिशन (चंद्रमा के दक्षिणी ध्रुव पर तिरंगा)",
    detail: "23 अगस्त 2023 को भारत के इसरो (ISRO) ने विक्रम लैंडर को चंद्रमा के दक्षिणी ध्रुव पर सुरक्षित उतारकर इतिहास रच दिया। भारत ऐसा करने वाला दुनिया का पहला देश बना।",
    category: "Itihaas Saal",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=400&q=80",
    keyFact: "लैंडिंग स्थल का नाम 'शिव शक्ति बिंदु' (Shiv Shakti Point) रखा गया और 23 अगस्त को 'राष्ट्रीय अंतरिक्ष दिवस' घोषित किया गया।",
    translations: {
      en: { title: "2023 CE: Chandrayaan-3 Lands on Lunar South Pole", detail: "ISRO made history by becoming the first nation to soft-land a spacecraft near the lunar south pole.", keyFact: "Landing site named 'Shiv Shakti Point'; August 23 declared National Space Day." }
    }
  }
];

// Combined Mega GK Database with 60+ full items
export const COMPREHENSIVE_GK_LIST: GkFullItem[] = [
  ...BHARAT_KI_NADIYAN,
  ...NATIONAL_PARKS,
  ...RAJYA_AUR_RAJDHANI,
  ...RASHTRIYA_CHINH,
  ...MAHAN_VYAKTI,
  ...ITIHAAS_KE_SAAL
];
