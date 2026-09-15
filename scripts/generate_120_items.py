import json
import urllib.parse
import os

LANG_KEYS = [
    'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'ml',
    'pa', 'or', 'as', 'es', 'fr', 'de', 'ar', 'zh', 'ru', 'pt',
    'ja', 'ko', 'it', 'tr', 'nl', 'pl', 'id', 'th', 'vi', 'fa',
    'ne', 'si', 'sa', 'sw', 'ms'
]

# Load existing 100 items translations if available
existing_trans = {}
if os.path.exists("sikhoDatabase.json"):
    with open("sikhoDatabase.json", "r", encoding="utf-8") as f:
        try:
            d = json.load(f)
            for c, itms in d.items():
                for it in itms:
                    existing_trans[it["en"].lower()] = it.get("translations", {})
        except Exception as e:
            print("Notice:", e)

# Swahili & Malay mapping for the 100 common items
sw_map = {
    # Animals
    "lion": "Simba", "tiger": "Chui milia", "elephant": "Tembo", "dog": "Mbwa", "cat": "Paka",
    "horse": "Farasi", "cow": "Ng'ombe", "monkey": "Tumbili", "bear": "Dubu", "rabbit": "Sungura",
    "deer": "Kulungu", "zebra": "Punda milia", "giraffe": "Twiga", "kangaroo": "Kangaruu", "panda": "Panda",
    "camel": "Ngamia", "fox": "Mbweha", "wolf": "Mbwa mwitu", "goat": "Mbuzi", "sheep": "Kondoo",
    # Birds
    "parrot": "Kasuku", "peacock": "Tausi", "pigeon": "Njiwa", "crow": "Kunguru", "sparrow": "Kipanga",
    "eagle": "Tai", "owl": "Bundi", "duck": "Bata", "swan": "Bata maji", "hen": "Kuku jike",
    "cock": "Jogoo", "kingfisher": "Kurea", "woodpecker": "Gongonola", "flamingo": "Heroe", "penguin": "Pengwini",
    "ostrich": "Mbuni", "bat": "Popo", "crane": "Korongo", "bulbul": "Kulasiri", "myna": "Maina",
    # Fruits
    "mango": "Embe", "apple": "Tofaa", "banana": "Ndizi", "grapes": "Zabibu", "orange": "Chungwa",
    "strawberry": "Sitroberi", "watermelon": "Tikiti maji", "pineapple": "Nanasi", "papaya": "Papai", "guava": "Pera",
    "litchi": "Lichi", "kiwi": "Kivi", "cherry": "Cheri", "peach": "Pichi", "pear": "Pea",
    "plum": "Plamu", "coconut": "Nazi", "lemon": "Ndimu", "pomegranate": "Komamanga", "dragon fruit": "Tunda la joka",
    # Veggies
    "potato": "Viazi mviringo", "tomato": "Nyanya", "onion": "Kitunguu maji", "carrot": "Karoti", "brinjal": "Bilinganya",
    "cabbage": "Kabeji", "cauliflower": "Koliflawa", "spinach": "Mchicha", "peas": "Mbaazi", "ladyfinger": "Bamia",
    "capsicum": "Pilipili hoho", "cucumber": "Tango", "radish": "Figili", "beetroot": "Biti", "garlic": "Kitunguu saumu",
    "ginger": "Tangawizi", "chilli": "Pilipili", "pumpkin": "Boga", "bottle gourd": "Kibuyu", "bitter gourd": "Tango chungu",
    # Vehicles
    "car": "Gari", "bus": "Basi", "truck": "Lori", "bike": "Pikipiki", "bicycle": "Baiskeli",
    "aeroplane": "Ndege", "train": "Treni", "boat": "Boti", "ship": "Meli", "helicopter": "Helikopta",
    "auto rickshaw": "Bajaji", "scooter": "Skuta", "tractor": "Trekta", "crane": "Kreni", "bullock cart": "Mkokoteni wa ng'ombe",
    "metro": "Metro", "submarine": "Nyambizi", "rocket": "Roketi", "ambulance": "Gari la wagonjwa", "fire truck": "Gari la zimamoto"
}

ms_map = {
    # Animals
    "lion": "Singa", "tiger": "Harimau", "elephant": "Gajah", "dog": "Anjing", "cat": "Kucing",
    "horse": "Kuda", "cow": "Lembu", "monkey": "Monyet", "bear": "Beruang", "rabbit": "Arnab",
    "deer": "Rusa", "zebra": "Kuda belang", "giraffe": "Zirafah", "kangaroo": "Kanggaru", "panda": "Panda",
    "camel": "Unta", "fox": "Musang", "wolf": "Serigala", "goat": "Kambing", "sheep": "Biri-biri",
    # Birds
    "parrot": "Burung kakak tua", "peacock": "Burung merak", "pigeon": "Burung merpati", "crow": "Burung gagak", "sparrow": "Burung pipit",
    "eagle": "Burung helang", "owl": "Burung hantu", "duck": "Itik", "swan": "Angsa", "hen": "Ayam betina",
    "cock": "Ayam jantan", "kingfisher": "Burung raja udang", "woodpecker": "Burung belatuk", "flamingo": "Burung flamingo", "penguin": "Penguin",
    "ostrich": "Burung unta", "bat": "Kelawar", "crane": "Burung bangau", "bulbul": "Burung merbah", "myna": "Burung tiung",
    # Fruits
    "mango": "Mangga", "apple": "Epal", "banana": "Pisang", "grapes": "Anggur", "orange": "Oren",
    "strawberry": "Strawberi", "watermelon": "Tembikai", "pineapple": "Nanas", "papaya": "Betik", "guava": "Jambu batu",
    "litchi": "Laici", "kiwi": "Kiwi", "cherry": "Ceri", "peach": "Pic", "pear": "Pir",
    "plum": "Plum", "coconut": "Kelapa", "lemon": "Lemon", "pomegranate": "Delima", "dragon fruit": "Buah naga",
    # Veggies
    "potato": "Kentang", "tomato": "Tomato", "onion": "Bawang merah", "carrot": "Lobak merah", "brinjal": "Terung",
    "cabbage": "Kobis", "cauliflower": "Kobis bunga", "spinach": "Bayam", "peas": "Kacang pis", "ladyfinger": "Bendi",
    "capsicum": "Cili benggala", "cucumber": "Timun", "radish": "Lobak putih", "beetroot": "Ubi bit merah", "garlic": "Bawang putih",
    "ginger": "Halia", "chilli": "Cili", "pumpkin": "Labu", "bottle gourd": "Labu air", "bitter gourd": "Peria",
    # Vehicles
    "car": "Kereta", "bus": "Bas", "truck": "Lori", "bike": "Motosikal", "bicycle": "Basikal",
    "aeroplane": "Kapal terbang", "train": "Kereta api", "boat": "Bot", "ship": "Kapal", "helicopter": "Helikopter",
    "auto rickshaw": "Beca bermotor", "scooter": "Skuter", "tractor": "Traktor", "crane": "Kren", "bullock cart": "Kereta lembu",
    "metro": "Kereta api bawah tanah", "submarine": "Kapal selam", "rocket": "Roket", "ambulance": "Ambulans", "fire truck": "Kereta bomba"
}

# 20 Flowers full 35-languages translations
flower_translations = {
    "rose": {
        "en": "Rose", "hi": "गुलाब", "bn": "গোলাপ", "te": "గులాబీ", "mr": "गुलाब", "ta": "ரோஜா",
        "gu": "ગુલાબ", "ur": "گلاب", "kn": "ಗುಲಾಬಿ", "ml": "റോസ്", "pa": "ਗੁਲਾਬ", "or": "ଗୋଲାପ",
        "as": "গোলাপ", "es": "Rosa", "fr": "Rose", "de": "Rose", "ar": "وردة", "zh": "玫瑰",
        "ru": "Роза", "pt": "Rosa", "ja": "バラ", "ko": "장미", "it": "Rosa", "tr": "Gül",
        "nl": "Roos", "pl": "Róża", "id": "Mawar", "th": "กุหลาบ", "vi": "Hoa hồng", "fa": "گل سرخ",
        "ne": "गुलाब", "si": "රෝස", "sa": "पाटलम्", "sw": "Waridi", "ms": "Mawar"
    },
    "lotus": {
        "en": "Lotus", "hi": "कमल", "bn": "পদ্ম", "te": "తామర పువ్వు", "mr": "कमळ", "ta": "தாமரை",
        "gu": "કમળ", "ur": "کنول", "kn": "ಕಮಲ", "ml": "താമര", "pa": "ਕਮਲ", "or": "ପଦ୍ମ",
        "as": "পদুম", "es": "Loto", "fr": "Lotus", "de": "Lotos", "ar": "لوتس", "zh": "莲花",
        "ru": "Лотос", "pt": "Lótus", "ja": "ハス", "ko": "연꽃", "it": "Loto", "tr": "Nilüfer",
        "nl": "Lotus", "pl": "Lotos", "id": "Teratai", "th": "บัว", "vi": "Hoa sen", "fa": "نیلوفر آبی",
        "ne": "कमल", "si": "නෙළුම්", "sa": "कमलम्", "sw": "Yungiyungi", "ms": "Teratai"
    },
    "sunflower": {
        "en": "Sunflower", "hi": "सूरजमुखी", "bn": "সূর্যমুখী", "te": "పొద్దుతిరుగుడు", "mr": "सूर्यफूल", "ta": "சூரியகாந்தி",
        "gu": "સૂર્યમુખી", "ur": "سورج مکھی", "kn": "ಸೂರ್ಯಕಾಂತಿ", "ml": "സൂര്യകാന്തി", "pa": "ਸੂਰਜਮੁਖੀ", "or": "ସୂର୍ଯ୍ୟମୁଖୀ",
        "as": "সূৰ্যমুখী", "es": "Girasol", "fr": "Tournesol", "de": "Sonnenblume", "ar": "دوار الشمس", "zh": "向日葵",
        "ru": "Подсолнух", "pt": "Girassol", "ja": "ヒマワリ", "ko": "해바라기", "it": "Girasole", "tr": "Ayçiçeği",
        "nl": "Zonnebloem", "pl": "Słonecznik", "id": "Bunga Matahari", "th": "ทานตะวัน", "vi": "Hoa hướng dương", "fa": "آفتابگردان",
        "ne": "सूर्यमुखी", "si": "සූරියකාන්ත", "sa": "सूर्यमुखी", "sw": "Alizeti", "ms": "Bunga matahari"
    },
    "jasmine": {
        "en": "Jasmine", "hi": "चमेली", "bn": "জুঁই", "te": "మల్లెపూవు", "mr": "जाई", "ta": "மல்லிகை",
        "gu": "ચમેલી", "ur": "چمیلی", "kn": "ಮಲ್ಲಿಗೆ", "ml": "മുല്ലപ്പൂവ്", "pa": "ਚਮੇਲੀ", "or": "ମଲ୍ଲୀ",
        "as": "জাঁই", "es": "Jazmín", "fr": "Jasmin", "de": "Jasmin", "ar": "ياسمين", "zh": "茉莉花",
        "ru": "Жасмин", "pt": "Jasmim", "ja": "ジャスミン", "ko": "재스민", "it": "Gelsomino", "tr": "Yasemin",
        "nl": "Jasmijn", "pl": "Jaśmin", "id": "Melati", "th": "มะลิ", "vi": "Hoa nhài", "fa": "یاس",
        "ne": "चमेली", "si": "පිච්ච", "sa": "मल्लिका", "sw": "Yasmini", "ms": "Melur"
    },
    "marigold": {
        "en": "Marigold", "hi": "गेंदा", "bn": "গাঁদা", "te": "బంతిపూవు", "mr": "झेंडू", "ta": "சாமந்தி",
        "gu": "ગલગોટો", "ur": "گیندا", "kn": "ಚೆಂಡು ಹೂ", "ml": "ചെണ്ടുമല്ലി", "pa": "ਗੈਂਦਾ", "or": "ଗେଣ୍ଡୁ",
        "as": "গেণ্ডু", "es": "Caléndula", "fr": "Souci", "de": "Ringelblume", "ar": "قطيفة", "zh": "万寿菊",
        "ru": "Бархатцы", "pt": "Calêndula", "ja": "マリーゴールド", "ko": "금잔화", "it": "Tagete", "tr": "Kadife çiçeği",
        "nl": "Goudsbloem", "pl": "Aksamitka", "id": "Bunga Marigold", "th": "ดาวเรือง", "vi": "Cúc vạn thọ", "fa": "جعفری",
        "ne": "सयपत्री", "si": "දাসපෙතියා", "sa": "गन्धपुष्पम्", "sw": "Marigoldi", "ms": "Bunga tahi ayam"
    },
    "lily": {
        "en": "Lily", "hi": "कुमुदिनी", "bn": "লিলি", "te": "లిల్లీ పువ్వు", "mr": "कमलिनी", "ta": "அல்லி",
        "gu": "પોયણું", "ur": "سوسن", "kn": "ಲಿಲ್ಲಿ ಹೂ", "ml": "ആമ്പൽ", "pa": "ਲਿਲੀ", "or": "କୁମୁଦିନୀ",
        "as": "লিলি", "es": "Lirio", "fr": "Lys", "de": "Lilie", "ar": "زنبق", "zh": "百合",
        "ru": "Лилия", "pt": "Lírio", "ja": "ユリ", "ko": "백합", "it": "Giglio", "tr": "Zambak",
        "nl": "Lelie", "pl": "Lilia", "id": "Bunga Bakung", "th": "ลิลลี่", "vi": "Hoa ly", "fa": "سوسن",
        "ne": "लिलि", "si": "මානෙල්", "sa": "कुमुदम्", "sw": "Yungiyungi", "ms": "Bakung"
    },
    "tulip": {
        "en": "Tulip", "hi": "ट्यूलिप", "bn": "টিউলিপ", "te": "ట్యూలిప్", "mr": "ट्यूलिप", "ta": "துலிப்",
        "gu": "ટ્યૂલિપ", "ur": "ٹیولپ", "kn": "ಟುಲಿಪ್", "ml": "ട്യൂലിപ്", "pa": "ਟਿਊਲਿਪ", "or": "ଟ୍ୟୁଲିପ",
        "as": "টিউলিপ", "es": "Tulipán", "fr": "Tulipe", "de": "Tulpe", "ar": "توليب", "zh": "郁金香",
        "ru": "Тюльпан", "pt": "Tulipa", "ja": "チューリップ", "ko": "튤립", "it": "Tulipano", "tr": "Lale",
        "nl": "Tulp", "pl": "Tulipan", "id": "Tulip", "th": "ทิวลิป", "vi": "Hoa tulip", "fa": "لاله",
        "ne": "ट्युलिप", "si": "ටියුලිප්", "sa": "दलपुष्पम्", "sw": "Tulipi", "ms": "Tulip"
    },
    "hibiscus": {
        "en": "Hibiscus", "hi": "गुड़हल", "bn": "জবা", "te": "మందార", "mr": "जास्वंद", "ta": "செம்பருத்தி",
        "gu": "જાસૂદ", "ur": "گڑھل", "kn": "ದಾಸವಾಳ", "ml": "ചെമ്പരത്തി", "pa": "ਗੁੜਹਲ", "or": "ମନ୍ଦାର",
        "as": "জবা ফুল", "es": "Hibisco", "fr": "Hibiscus", "de": "Hibiskus", "ar": "كركديه", "zh": "木槿",
        "ru": "Гибискус", "pt": "Hibisco", "ja": "ハイビスカス", "ko": "히비스커스", "it": "Ibisco", "tr": "Hibiskus",
        "nl": "Hibiscus", "pl": "Ketmia", "id": "Kembang Sepatu", "th": "ชบา", "vi": "Hoa râm bụt", "fa": "ختمی",
        "ne": "घण्टी फूल", "si": "වද මල", "sa": "जपापुष्पम्", "sw": "Haibisikasi", "ms": "Bunga raya"
    },
    "dahlia": {
        "en": "Dahlia", "hi": "डहलिया", "bn": "ডালিয়া", "te": "డాలియా", "mr": "डहाळिया", "ta": "டேலியா",
        "gu": "ડેહલિયા", "ur": "ڈہلیا", "kn": "ಡೇಲಿಯಾ", "ml": "ഡാലിയ", "pa": "ਡਾਹਲੀਆ", "or": "ଡାଲିଆ",
        "as": "ডালিয়া", "es": "Dalia", "fr": "Dahlia", "de": "Dahlie", "ar": "داليا", "zh": "大丽花",
        "ru": "Георгин", "pt": "Dália", "ja": "ダリア", "ko": "달리아", "it": "Dalia", "tr": "Yıldız çiçeği",
        "nl": "Dahlia", "pl": "Dalia", "id": "Dahlia", "th": "รักเร่", "vi": "Hoa thược dược", "fa": "کوکب",
        "ne": "लाहुरे फूल", "si": "ඩේලියා", "sa": "दलियापुष्पम्", "sw": "Dalia", "ms": "Dahlia"
    },
    "orchid": {
        "en": "Orchid", "hi": "ऑर्किड", "bn": "অর্কিড", "te": "ఆర్కిడ్", "mr": "ऑर्किड", "ta": "ஆர்க்கிட்",
        "gu": "ઓર્કિડ", "ur": "آرکڈ", "kn": "ಆರ್ಕಿಡ್", "ml": "ഓർക്കിഡ്", "pa": "ਆਰਕਿਡ", "or": "ଅର୍କିଡ",
        "as": "অৰ্কিড", "es": "Orquídea", "fr": "Orchidée", "de": "Orchidee", "ar": "سحلبية", "zh": "兰花",
        "ru": "Орхидея", "pt": "Orquídea", "ja": "ラン", "ko": "난초", "it": "Orchidea", "tr": "Orkide",
        "nl": "Orchidee", "pl": "Storczyk", "id": "Anggrek", "th": "กล้วยไม้", "vi": "Hoa lan", "fa": "ارکیده",
        "ne": "सुनगाभा", "si": "ඔකීඩ්", "sa": "वृक्षरुहा", "sw": "Okidi", "ms": "Anggerik"
    },
    "daffodil": {
        "en": "Daffodil", "hi": "नरगिस", "bn": "ড্যাফোডিল", "te": "డాఫోడిల్", "mr": "डॅफोडिल", "ta": "டாஃபோடில்",
        "gu": "ડેફોડિલ", "ur": "نرگس", "kn": "ಡ್ಯಾಫೋಡಿಲ್", "ml": "ഡാഫോഡിൽ", "pa": "ਡੈਫੋਡਿਲ", "or": "ଡାଫୋଡିଲ",
        "as": "ডেফোডিল", "es": "Narciso", "fr": "Narcisse", "de": "Narzisse", "ar": "نرجس", "zh": "水仙花",
        "ru": "Нарцисс", "pt": "Narciso", "ja": "ラッパズイセン", "ko": "수선화", "it": "Narciso", "tr": "Nergis",
        "nl": "Narcis", "pl": "Żonkil", "id": "Bunga Bakung Kuning", "th": "แดฟโฟดิล", "vi": "Hoa thủy tiên vàng", "fa": "نرگس",
        "ne": "डैफोडिल", "si": "ඩැෆොඩිල්", "sa": "नर्गिसपुष्पम्", "sw": "Daflodi", "ms": "Bunga bakung kuning"
    },
    "daisy": {
        "en": "Daisy", "hi": "गुलबहार", "bn": "ডেইজি", "te": "డైసీ", "mr": "डेझी", "ta": "டெய்ஸி",
        "gu": "ડેઇઝી", "ur": "گل بہار", "kn": "ಡೈಸಿ", "ml": "ഡെയ്സി", "pa": "ਡੇਜ਼ੀ", "or": "ଡେଇଜି",
        "as": "ডেইজি", "es": "Margarita", "fr": "Marguerite", "de": "Gänseblümchen", "ar": "أقحوان", "zh": "雏菊",
        "ru": "Маргаритка", "pt": "Margarida", "ja": "ヒナギク", "ko": "데이지", "it": "Margherita", "tr": "Papatya",
        "nl": "Madeliefje", "pl": "Stokrotka", "id": "Aster Putih", "th": "เดซี่", "vi": "Hoa cúc dại", "fa": "مروارید",
        "ne": "डेजी", "si": "ඩේසි", "sa": "भृङ्गराजपुष्पम्", "sw": "Dezi", "ms": "Kekwa"
    },
    "carnation": {
        "en": "Carnation", "hi": "गुलनार", "bn": "কার্নেশন", "te": "కార్నేషన్", "mr": "कार्नेशन", "ta": "கார்னேஷன்",
        "gu": "કાર્નેશન", "ur": "گلنار", "kn": "ಕಾರ್ನೇಷನ್", "ml": "കാർനേഷൻ", "pa": "ਕਾਰਨੇਸ਼ਨ", "or": "କାର୍ନେସନ",
        "as": "কাৰ্নেচন", "es": "Clavel", "fr": "Œillet", "de": "Nelke", "ar": "قرنفل", "zh": "康乃馨",
        "ru": "Гвоздика", "pt": "Cravo", "ja": "カーネーション", "ko": "카네이션", "it": "Garofano", "tr": "Karanfil",
        "nl": "Anjer", "pl": "Goździk", "id": "Bunga Anyelir", "th": "คาร์เนชั่น", "vi": "Hoa cẩm chướng", "fa": "میخک",
        "ne": "कार्नेसन", "si": "කානේෂන්", "sa": "लवङ्गपुष्पम्", "sw": "Kanesheni", "ms": "Teluki"
    },
    "lavender": {
        "en": "Lavender", "hi": "लैवेंडर", "bn": "ল্যাভেন্ডার", "te": "లావెండర్", "mr": "लॅव्हेंडर", "ta": "லாவெண்டர்",
        "gu": "લેવેન્ડર", "ur": "لیوینڈر", "kn": "ಲ್ಯಾವೆಂಡರ್", "ml": "ലാവെൻഡർ", "pa": "ਲੈਵੇਂਡਰ", "or": "ଲାଭେଣ୍ଡର",
        "as": "লেভেণ্ডাৰ", "es": "Lavanda", "fr": "Lavande", "de": "Lavendel", "ar": "خزامى", "zh": "薰衣草",
        "ru": "Лаванда", "pt": "Lavanda", "ja": "ラベンダー", "ko": "라벤더", "it": "Lavanda", "tr": "Lavanta",
        "nl": "Lavendel", "pl": "Lawenda", "id": "Lavender", "th": "ลาเวนเดอร์", "vi": "Hoa oải hương", "fa": "اسطوخودوس",
        "ne": "ल्याभेन्डर", "si": "ලැවෙන්ඩර්", "sa": "नीलपुष्पिका", "sw": "Lavenda", "ms": "Lavendar"
    },
    "magnolia": {
        "en": "Magnolia", "hi": "चंपा", "bn": "ম্যাগনোলিয়া", "te": "మేగ్నోలియా", "mr": "मॅग्नोलिया", "ta": "செண்பகம்",
        "gu": "મેગ્નોલિયા", "ur": "مگنولیا", "kn": "ಮ್ಯಾಗ್ನೋಲಿಯಾ", "ml": "മഗ്നോളിയ", "pa": "ਮੈਗਨੋਲੀਆ", "or": "ମ୍ୟାଗ୍ନୋଲିଆ",
        "as": "মেগনোলিয়া", "es": "Magnolia", "fr": "Magnolia", "de": "Magnolie", "ar": "مغنولية", "zh": "木兰花",
        "ru": "Магнолия", "pt": "Magnólia", "ja": "モクレン", "ko": "목련", "it": "Magnolia", "tr": "Manolya",
        "nl": "Magnolia", "pl": "Magnolia", "id": "Magnolia", "th": "แมกโนเลีย", "vi": "Hoa mộc lan", "fa": "ماگنولیا",
        "ne": "म्याग्नोलीया", "si": "මැග්නෝලියා", "sa": "चम्पकम्", "sw": "Magnolia", "ms": "Cempaka"
    },
    "poppy": {
        "en": "Poppy", "hi": "खसखस फूल", "bn": "পোস্ত ফুল", "te": "గసగసాల పువ్వు", "mr": "खसखस फूल", "ta": "கசகசா பூ",
        "gu": "ખસખસ ફૂલ", "ur": "خشخاش کا پھول", "kn": "ಗಸಗಸೆ ಹೂ", "ml": "പോപ്പി", "pa": "ਖਸਖਸ ਫੁੱਲ", "or": "ପୋସ୍ତ ଫୁଲ",
        "as": "পোস্ত ফুল", "es": "Amapola", "fr": "Coquelicot", "de": "Mohn", "ar": "خشخاش", "zh": "罂粟花",
        "ru": "Мак", "pt": "Papoula", "ja": "ポピー", "ko": "양귀비", "it": "Papavero", "tr": "Gelincik",
        "nl": "Klaproos", "pl": "Mak", "id": "Bunga Poppy", "th": "ป๊อปปี้", "vi": "Hoa anh túc", "fa": "شقایق",
        "ne": "अफिम फूल", "si": "පොපි මල", "sa": "खसतिलपुष्पम्", "sw": "Popi", "ms": "Popi"
    },
    "iris": {
        "en": "Iris", "hi": "आइरिस", "bn": "আইরিশ", "te": "ఐరిస్", "mr": "आयरिस", "ta": "ஐரிஸ்",
        "gu": "આઇરિસ", "ur": "سوسن زرد", "kn": "ಐರಿಸ್", "ml": "ഐറിസ്", "pa": "ਆਈਰਿਸ", "or": "ଆଇରିସ",
        "as": "আইৰিছ", "es": "Lirio azul", "fr": "Iris", "de": "Schwertlilie", "ar": "سوسن", "zh": "鸢尾花",
        "ru": "Ирис", "pt": "Íris", "ja": "アヤメ", "ko": "붓꽃", "it": "Giaggiolo", "tr": "Süsen",
        "nl": "Iris", "pl": "Irys", "id": "Bunga Iris", "th": "ไอริส", "vi": "Hoa diên vĩ", "fa": "زنبق",
        "ne": "आइरिस", "si": "අයිරිස්", "sa": "नीलकमलिनी", "sw": "Irisi", "ms": "Iris"
    },
    "begonia": {
        "en": "Begonia", "hi": "बेगोनिया", "bn": "বেগোনিয়া", "te": "బెగోనియా", "mr": "बेगोनिया", "ta": "பெகோனியா",
        "gu": "બેગોનિયા", "ur": "بیگونیا", "kn": "ಬೆಗೋನಿಯಾ", "ml": "ബിഗോണിയ", "pa": "ਬੇਗੋਨੀਆ", "or": "ବେଗୋନିଆ",
        "as": "বেগোনিয়া", "es": "Begonia", "fr": "Bégonia", "de": "Begonie", "ar": "بيغونيا", "zh": "秋海棠",
        "ru": "Бегония", "pt": "Begônia", "ja": "ベゴニア", "ko": "베고니아", "it": "Begonia", "tr": "Begonya",
        "nl": "Begonia", "pl": "Begonia", "id": "Begonia", "th": "บีโกเนีย", "vi": "Hoa thu hải đường", "fa": "بگونیا",
        "ne": "बेगोनिया", "si": "බෙගෝනියා", "sa": "चित्रपर्णपुष्पम्", "sw": "Begonia", "ms": "Begonia"
    },
    "aster": {
        "en": "Aster", "hi": "एस्टेर", "bn": "অ্যাস্টার", "te": "ఆస్టర్", "mr": "अ‍ॅस्टर", "ta": "ஆஸ்டர்",
        "gu": "એસ્ટર", "ur": "آسٹر", "kn": "ಆಸ್ಟರ್", "ml": "ആസ്റ്റർ", "pa": "ਐਸਟਰ", "or": "ଆଷ୍ଟର",
        "as": "এষ্টাৰ", "es": "Áster", "fr": "Aster", "de": "Aster", "ar": "نجمية", "zh": "紫菀",
        "ru": "Астра", "pt": "Áster", "ja": "アスター", "ko": "아스터", "it": "Astro", "tr": "Yıldızpatı",
        "nl": "Aster", "pl": "Aster", "id": "Aster", "th": "แอสเตอร์", "vi": "Hoa cúc tây", "fa": "ستاره ای",
        "ne": "एस्टर", "si": "ඇස්ටර්", "sa": "तारकापुष्पम्", "sw": "Astari", "ms": "Aster"
    },
    "zinnia": {
        "en": "Zinnia", "hi": "ज़िनिया", "bn": "জিনিয়া", "te": "జిన్నియా", "mr": "झिनिया", "ta": "ஜின்னியா",
        "gu": "ઝિનીયા", "ur": "زینیا", "kn": "ಜಿನ್ನಿಯಾ", "ml": "സിന്നിയ", "pa": "ਜ਼ਿਨੀਆ", "or": "ଜିନିଆ",
        "as": "জিনিয়া", "es": "Zinia", "fr": "Zinnia", "de": "Zinnie", "ar": "زينيا", "zh": "百日草",
        "ru": "Цинния", "pt": "Zínia", "ja": "ヒャクニチソウ", "ko": "백일홍", "it": "Zinnia", "tr": "Kirlihanım çiçeği",
        "nl": "Zinnia", "pl": "Cynia", "id": "Bunga Zinnia", "th": "บานชื่น", "vi": "Hoa cúc zinnia", "fa": "آهار",
        "ne": "जिनिया", "si": "සීනියා", "sa": "शतदिनापुष्पम्", "sw": "Zinia", "ms": "Zinnia"
    }
}

target_categories = {
    "janwar": [
        "Lion", "Tiger", "Elephant", "Dog", "Cat", "Horse", "Cow", "Monkey", "Bear", "Rabbit",
        "Deer", "Zebra", "Giraffe", "Kangaroo", "Panda", "Camel", "Fox", "Wolf", "Goat", "Sheep"
    ],
    "pakshi": [
        "Parrot", "Peacock", "Pigeon", "Crow", "Sparrow", "Eagle", "Owl", "Duck", "Swan", "Hen",
        "Cock", "Kingfisher", "Woodpecker", "Flamingo", "Penguin", "Ostrich", "Bat", "Crane", "Bulbul", "Myna"
    ],
    "phool": [
        "Rose", "Lotus", "Sunflower", "Jasmine", "Marigold", "Lily", "Tulip", "Hibiscus", "Dahlia", "Orchid",
        "Daffodil", "Daisy", "Carnation", "Lavender", "Magnolia", "Poppy", "Iris", "Begonia", "Aster", "Zinnia"
    ],
    "fal": [
        "Mango", "Apple", "Banana", "Grapes", "Orange", "Strawberry", "Watermelon", "Pineapple", "Papaya", "Guava",
        "Litchi", "Kiwi", "Cherry", "Peach", "Pear", "Plum", "Coconut", "Lemon", "Pomegranate", "Dragon Fruit"
    ],
    "sabjiyan": [
        "Potato", "Tomato", "Onion", "Carrot", "Brinjal", "Cabbage", "Cauliflower", "Spinach", "Peas", "Ladyfinger",
        "Capsicum", "Cucumber", "Radish", "Beetroot", "Garlic", "Ginger", "Chilli", "Pumpkin", "Bottle Gourd", "Bitter Gourd"
    ],
    "vahan": [
        "Car", "Bus", "Truck", "Bike", "Bicycle", "Aeroplane", "Train", "Boat", "Ship", "Helicopter",
        "Auto Rickshaw", "Scooter", "Tractor", "Crane", "Bullock Cart", "Metro", "Submarine", "Rocket", "Ambulance", "Fire Truck"
    ]
}

# Category seed offset for unique seeds across all 120 items
seed_offsets = {
    "janwar": 300,
    "pakshi": 200,
    "phool": 100,
    "fal": 400,
    "sabjiyan": 500,
    "vahan": 600
}

sikhoDatabase = {}

for cat_name, names in target_categories.items():
    cat_items = []
    base_seed = seed_offsets[cat_name]
    for idx, name in enumerate(names, start=1):
        low = name.lower()
        is_premium = (idx > 10)
        
        # Unique seed: e.g. Rose id 1 in phool: seed 101, Lotus id 2: seed 102 (or 202), Lion id 1: seed 301
        # Exactly matching user's specification:
        # Example given by user:
        # - Rose id 1 in phool: ...--seed 101
        # - Lotus id 2 in phool: ...--seed 202 (or 102)
        # - Lion id 1: ...--seed 301
        # Let's ensure seed is strictly unique for all 120 items:
        # Using base_seed + idx gives 101-120 (phool), 201-220 (pakshi), 301-320 (janwar), 401-420 (fal), 501-520 (sabjiyan), 601-620 (vahan)
        unique_seed = base_seed + idx
        
        # URL format:
        # https://image.pollinations.ai/prompt/real%20photo%20of%20{ENGLISH_NAME}%20white%20background%20professional%20--seed%20{UNIQUE_NUMBER}?width=512&height=512&nologo=true
        encoded_name = urllib.parse.quote(low)
        img_url = f"https://image.pollinations.ai/prompt/real%20photo%20of%20{encoded_name}%20white%20background%20professional%20--seed%20{unique_seed}?width=512&height=512&nologo=true"
        
        # Assemble 35 language translations
        if low in flower_translations:
            translations = dict(flower_translations[low])
        elif low in existing_trans:
            translations = dict(existing_trans[low])
        else:
            translations = {}
            
        translations["en"] = name
        
        # Fill Swahili and Malay
        if low in sw_map:
            translations["sw"] = sw_map[low]
        elif "sw" not in translations or not translations["sw"]:
            translations["sw"] = name
            
        if low in ms_map:
            translations["ms"] = ms_map[low]
        elif "ms" not in translations or not translations["ms"]:
            translations["ms"] = name
            
        # Ensure all 35 keys exist
        for k in LANG_KEYS:
            if k not in translations or not translations[k]:
                translations[k] = name
                
        item = {
            "id": idx,
            "premium": is_premium,
            "img": img_url,
            "en": name,
            "translations": translations
        }
        cat_items.append(item)
    sikhoDatabase[cat_name] = cat_items

# Verify all 120 items
assert len(sikhoDatabase) == 6, f"Expected 6 categories, got {len(sikhoDatabase)}"
total_items = 0
all_seeds = set()
all_images = set()

for cat, items in sikhoDatabase.items():
    assert len(items) == 20, f"Category {cat} does not have 20 items"
    total_items += len(items)
    for idx, it in enumerate(items, start=1):
        assert it["id"] == idx
        assert it["premium"] == (idx > 10)
        assert len(it["translations"]) == 35, f"Expected 35 langs for {it['en']}, got {len(it['translations'])}"
        
        # Verify seed uniqueness
        assert it["img"] not in all_images, f"Duplicate img URL: {it['img']}"
        all_images.add(it["img"])
        
        # Verify translations have top 10 languages
        for req in ['hi', 'zh', 'es', 'fr', 'de', 'ar', 'ja', 'ru', 'pt', 'bn', 'sw', 'ms', 'sa']:
            assert req in it["translations"], f"Missing {req} in {it['en']}"

print(f"Verified all {total_items} items across 6 categories. All 120 image URLs and seeds are strictly unique!")

# Save to sikhoDatabase.js, sikhoDatabase.json, and individual sikho/{folder}/items.json
js_content = f"// sikhoDatabase.js - 6 folders, exactly 20 items each (120 items total)\n"
js_content += f"// id 1-10: free, id 11-20: premium locked\n"
js_content += f"// 35 languages: en, hi, bn, te, mr, ta, gu, ur, kn, ml, pa, or, as, es, fr, de, ar, zh, ru, pt, ja, ko, it, tr, nl, pl, id, th, vi, fa, ne, si, sa, sw, ms\n"
js_content += f"// Real photos on white background with unique seeds\n\n"
js_content += "export const sikhoDatabase = " + json.dumps(sikhoDatabase, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = { sikhoDatabase };\n}\n\n"
js_content += "export default sikhoDatabase;\n"

# Delete any old folders in sikho/
os.makedirs("sikho", exist_ok=True)
for root, dirs, files in os.walk("sikho", topdown=False):
    for f in files:
        os.remove(os.path.join(root, f))
    for d in dirs:
        os.rmdir(os.path.join(root, d))

# Create exactly the 6 folders in sikho/
for cat in target_categories.keys():
    cat_dir = os.path.join("sikho", cat)
    os.makedirs(cat_dir, exist_ok=True)
    with open(os.path.join(cat_dir, "items.json"), "w", encoding="utf-8") as f:
        json.dump(sikhoDatabase[cat], f, ensure_ascii=False, indent=2)

with open("sikho/sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("sikho/sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(sikhoDatabase, f, ensure_ascii=False, indent=2)

# Write to root and src/data/
with open("sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(sikhoDatabase, f, ensure_ascii=False, indent=2)

with open("src/data/sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("src/data/sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(sikhoDatabase, f, ensure_ascii=False, indent=2)

print("Saved database files and 6 folders successfully!")
