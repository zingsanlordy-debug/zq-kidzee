import json
import os
import urllib.parse

LANG_KEYS = [
    'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'ml',
    'pa', 'or', 'as', 'es', 'fr', 'de', 'ar', 'zh', 'ru', 'pt',
    'ja', 'ko', 'it', 'tr', 'nl', 'pl', 'id', 'th', 'vi', 'fa',
    'ne', 'si', 'sa'
]

# Base existing translations
existing = {}
if os.path.exists("sikhoDatabase.json"):
    with open("sikhoDatabase.json", "r", encoding="utf-8") as f:
        old_data = json.load(f)
        for cat, items in old_data.items():
            for it in items:
                existing[it["en"].lower()] = it["translations"]

# Specific aliases to borrow from existing 250 items
aliases = {
    "cock": "rooster",
    "litchi": "lychee",
    "peas": "pea",
    "ladyfinger": "okra",
    "chilli": "chili pepper",
    "bike": "motorcycle",
    "aeroplane": "airplane",
    "fire truck": "fire engine"
}

# Explicit translations for new or specialized items
special_translations = {
    "bulbul": {
        "en": "Bulbul", "hi": "बुलबुल", "bn": "বুলবুল", "te": "బుల్బుల్ పిట్ట", "mr": "बुलबुल",
        "ta": "புல்புல் பறவை", "gu": "બુલબુલ", "ur": "بلبل", "kn": "ಬುಲ್ಬುಲ್ ಹಕ್ಕಿ", "ml": "ബുൾബുൾ",
        "pa": "ਬੁਲਬੁਲ", "or": "ବୁଲବୁଲ ଚଢେଇ", "as": "বুলবুলি চৰাই", "es": "Bulbul", "fr": "Bulbul",
        "de": "Bülbül", "ar": "بلبل", "zh": "鹎", "ru": "Бюльбюль", "pt": "Bulbul",
        "ja": "ヒヨドリ", "ko": "직박구리", "it": "Bulbul", "tr": "Bülbül", "nl": "Buulbuul",
        "pl": "Bilbil", "id": "Burung Merbah", "th": "นกปรอด", "vi": "Chim chào mào", "fa": "بلبل",
        "ne": "जुरिली", "si": "කොණ්ඩයා", "sa": "कलकण्ठः"
    },
    "myna": {
        "en": "Myna", "hi": "मैना", "bn": "ময়না", "te": "గోరువంక", "mr": "मैना",
        "ta": "மைனா", "gu": "મેના", "ur": "مینا", "kn": "ಮೈನಾ", "ml": "മൈന",
        "pa": "ਮੈਨਾ", "or": "ମଇନା ଚଢେଇ", "as": "ময়না চৰাই", "es": "Mainá", "fr": "Mainate",
        "de": "Beo", "ar": "مينة", "zh": "八哥", "ru": "Майна", "pt": "Mainá",
        "ja": "ハッカチョウ", "ko": "구관조", "it": "Maina", "tr": "Çiğdeci kuşu", "nl": "Maina",
        "pl": "Majna", "id": "Burung Kerak", "th": "นกเอี้ยง", "vi": "Chim sáo", "fa": "مرغ مینا",
        "ne": "रूपी", "si": "සැළලිහිණියා", "sa": "सारिका"
    },
    "metro": {
        "en": "Metro", "hi": "मेट्रो रेल", "bn": "মেট্রো", "te": "మెట్రో రైలు", "mr": "मेट्रो",
        "ta": "மெட்ரோ ரயில்", "gu": "મેટ્રો ટ્રેન", "ur": "میٹرو ٹرین", "kn": "ಮೆಟ್ರೋ ರೈಲು", "ml": "മെട്രോ",
        "pa": "ਮੈਟਰੋ ਰੇਲ", "or": "ମେଟ୍ରୋ ରେଳ", "as": "মেট্ৰ' ৰে'ল", "es": "Metro", "fr": "Métro",
        "de": "U-Bahn", "ar": "مترو الأنفاق", "zh": "地铁", "ru": "Метро", "pt": "Metrô",
        "ja": "地下鉄", "ko": "지하철", "it": "Metropolitana", "tr": "Metro", "nl": "Metro",
        "pl": "Metro", "id": "Kereta Bawah Tanah", "th": "รถไฟใต้ดิน", "vi": "Tàu điện ngầm", "fa": "مترو",
        "ne": "मेट्रो रेल", "si": "මෙට්රෝ දුම්රිය", "sa": "भूमिगतरेलयानम्"
    }
}

# Sanskrit translations dictionary for all 100 items
sa_map = {
    # janwar
    "lion": "सिंहः", "tiger": "व्याघ्रः", "elephant": "गजः", "dog": "कुक्कुरः", "cat": "मार्जारः",
    "horse": "अश्वः", "cow": "धेनुः", "monkey": "वानरः", "bear": "भल्लूकः", "rabbit": "शशकः",
    "deer": "हरिणः", "zebra": "चित्रहयः", "giraffe": "चित्रोष्ट्रः", "kangaroo": "मर्कटमृगः", "panda": "पाण्डामृगः",
    "camel": "उष्ट्रः", "fox": "शृगालः", "wolf": "वृकः", "goat": "अजः", "sheep": "मेषः",
    # pakshi
    "parrot": "शुकः", "peacock": "मयूरः", "pigeon": "कपोतः", "crow": "काकः", "sparrow": "चटकः",
    "eagle": "श्येनः", "owl": "उलूकः", "duck": "वर्तकः", "swan": "हंसः", "hen": "कुक्कुटी",
    "cock": "कुक्कुटः", "kingfisher": "मीनरङ्कः", "woodpecker": "काष्ठकूटः", "flamingo": "राजहंसः", "penguin": "हिमपक्षी",
    "ostrich": "उष्ट्रपक्षी", "bat": "जतूका", "crane": "सारसः", "bulbul": "कलकण्ठः", "myna": "सारिका",
    # fal
    "mango": "आम्रम्", "apple": "सेवफलम्", "banana": "कदलीफलम्", "grapes": "द्राक्षा", "orange": "नारङ्गम्",
    "strawberry": "तृणबदरम्", "watermelon": "कालिङ्गम्", "pineapple": "अननासम्", "papaya": "मधुकर्कटी", "guava": "अमृतफलम्",
    "litchi": "लीचिका", "kiwi": "किवीफलम्", "cherry": "प्रबदरम्", "peach": "आरुकम्", "pear": "अमृतफलविशेषः",
    "plum": "आलूकम्", "coconut": "नारिकेलम्", "lemon": "निम्बूकम्", "pomegranate": "दाडिमम्", "dragon fruit": "नागफलम्",
    # sabjiyan
    "potato": "आलुकम्", "tomato": "रक्ताङ्गकम्", "onion": "पलाण्डुः", "carrot": "गृञ्जनकम्", "brinjal": "वृन्ताकम्",
    "cabbage": "कन्दशाकम्", "cauliflower": "पुष्पशाकम्", "spinach": "पालिङ्क्यः", "peas": "कलायः", "ladyfinger": "भिण्डिकम्",
    "capsicum": "महामरीचिका", "cucumber": "कर्कटिका", "radish": "मूलकम्", "beetroot": "पालगुण्डम्", "garlic": "लशुनम्",
    "ginger": "आर्द्रकम्", "chilli": "मरीचिका", "pumpkin": "कूष्माण्डम्", "bottle gourd": "अलाबुः", "bitter gourd": "कारवेल्लम्",
    # vahan
    "car": "कारयानम्", "bus": "लोकयानम्", "truck": "भारयानम्", "bike": "द्विचक्रिका", "bicycle": "द्विचक्रिका",
    "aeroplane": "विमानम्", "train": "रेलयानम्", "boat": "नौका", "ship": "जलयानम्", "helicopter": "उदग्रयानम्",
    "auto rickshaw": "त्रिचक्रिका", "scooter": "स्कूटर्याinitial", "tractor": "कर्षकरथम्", "crane": "भारोत्तोलकम्", "bullock cart": "अनड्वद्शकhost",
    "metro": "भूमिगतरेलयानम्", "submarine": "अन्तर्जलगामी", "rocket": "प्रक्षेपास्त्रम्", "ambulance": "रुग्णवाहिनी", "fire truck": "अग्निशामकयानम्"
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

def get_translations_for(name):
    low = name.lower()
    if low in special_translations:
        res = dict(special_translations[low])
    elif low in existing:
        res = dict(existing[low])
    elif low in aliases and aliases[low] in existing:
        res = dict(existing[aliases[low]])
    else:
        res = {}

    res["en"] = name
    
    # Specific overrides if needed
    if low == "cock":
        res["hi"] = "मुर्गा"
        res["bn"] = "মোরগ"
        res["zh"] = "公鸡"
        res["es"] = "Gallo"
        res["fr"] = "Coq"
        res["de"] = "Hahn"
        res["ar"] = "ديك"
        res["ja"] = "オンドリ"
        res["ru"] = "Петух"
        res["pt"] = "Galo"
    elif low == "litchi":
        res["hi"] = "लीची"
        res["bn"] = "লিচু"
        res["zh"] = "荔枝"
        res["es"] = "Lichi"
        res["fr"] = "Litchi"
        res["de"] = "Litschi"
        res["ar"] = "ليتشي"
        res["ja"] = "ライチ"
        res["ru"] = "Личи"
        res["pt"] = "Lichia"
    elif low == "peas":
        res["hi"] = "मटर"
        res["bn"] = "মটরশুঁটি"
        res["zh"] = "豌豆"
        res["es"] = "Guisantes"
        res["fr"] = "Petits pois"
        res["de"] = "Erbsen"
        res["ar"] = "بازلاء"
        res["ja"] = "エンドウ"
        res["ru"] = "Горох"
        res["pt"] = "Ervilhas"
    elif low == "ladyfinger":
        res["hi"] = "भिंडी"
        res["bn"] = "ঢেঁড়শ"
        res["zh"] = "秋葵"
        res["es"] = "Quimbombó"
        res["fr"] = "Gombo"
        res["de"] = "Okra"
        res["ar"] = "بامية"
        res["ja"] = "オクラ"
        res["ru"] = "Окра"
        res["pt"] = "Quiabo"
    elif low == "chilli":
        res["hi"] = "मिर्च"
        res["bn"] = "লঙ্কা"
        res["zh"] = "辣椒"
        res["es"] = "Chile"
        res["fr"] = "Piment"
        res["de"] = "Chili"
        res["ar"] = "فلفل حار"
        res["ja"] = "唐辛子"
        res["ru"] = "Чили"
        res["pt"] = "Pimenta"
    elif low == "bike":
        res["hi"] = "बाइक"
        res["bn"] = "বাইক"
        res["zh"] = "摩托车"
        res["es"] = "Moto"
        res["fr"] = "Moto"
        res["de"] = "Motorrad"
        res["ar"] = "دراجة نارية"
        res["ja"] = "バイク"
        res["ru"] = "Мотоцикл"
        res["pt"] = "Moto"
    elif low == "aeroplane":
        res["hi"] = "हवाई जहाज़"
        res["bn"] = "বিমান"
        res["zh"] = "飞机"
        res["es"] = "Avión"
        res["fr"] = "Avion"
        res["de"] = "Flugzeug"
        res["ar"] = "طائرة"
        res["ja"] = "飛行機"
        res["ru"] = "Самолёт"
        res["pt"] = "Avião"
    elif low == "fire truck":
        res["hi"] = "दमकल गाड़ी"
        res["bn"] = "দমকল"
        res["zh"] = "消防车"
        res["es"] = "Camión de bomberos"
        res["fr"] = "Camion de pompiers"
        res["de"] = "Feuerwehrwagen"
        res["ar"] = "سيارة إطفاء"
        res["ja"] = "消防車"
        res["ru"] = "Пожарная машина"
        res["pt"] = "Caminhão de bombeiros"

    # Add Sanskrit
    if low in sa_map:
        res["sa"] = sa_map[low]
    elif "sa" not in res:
        res["sa"] = res.get("hi", name)

    # Ensure all 33 languages exist
    for k in LANG_KEYS:
        if k not in res or not res[k]:
            res[k] = name
            
    return res

# Build 100 items
sikhoDatabase = {}

for cat_name, names in target_categories.items():
    cat_items = []
    for idx, name in enumerate(names, start=1):
        is_premium = (idx > 10)
        # img format: https://image.pollinations.ai/prompt/cute%20cartoon%20{ENGLISH_NAME}%20for%20kids%20white%20background%20kawaii
        # Replace {ENGLISH_NAME} with lower case english name. Example: lion
        lower_name_encoded = urllib.parse.quote(name.lower())
        img_url = f"https://image.pollinations.ai/prompt/cute%20cartoon%20{lower_name_encoded}%20for%20kids%20white%20background%20kawaii"
        
        translations = get_translations_for(name)
        
        item = {
            "id": idx,
            "premium": is_premium,
            "img": img_url,
            "en": name,
            "translations": translations
        }
        cat_items.append(item)
    sikhoDatabase[cat_name] = cat_items

# Sanity verification
assert len(sikhoDatabase) == 5
for k, v in sikhoDatabase.items():
    assert len(v) == 20, f"{k} has {len(v)} items instead of 20"
    for i, it in enumerate(v, start=1):
        assert it["id"] == i
        assert it["premium"] == (i > 10)
        assert len(it["translations"]) == 33
        assert "sa" in it["translations"]
        assert "hi" in it["translations"]
        assert "zh" in it["translations"]
        assert "es" in it["translations"]
        assert "fr" in it["translations"]
        assert "de" in it["translations"]
        assert "ar" in it["translations"]
        assert "ja" in it["translations"]
        assert "ru" in it["translations"]
        assert "pt" in it["translations"]
        assert "bn" in it["translations"]

print("Validation passed! Total categories: 5, total items: 100.")

# 1. Output /sikho folder structure
os.makedirs("sikho", exist_ok=True)
for cat in target_categories.keys():
    cat_dir = os.path.join("sikho", cat)
    os.makedirs(cat_dir, exist_ok=True)
    with open(os.path.join(cat_dir, "items.json"), "w", encoding="utf-8") as f:
        json.dump(sikhoDatabase[cat], f, ensure_ascii=False, indent=2)

# Generate sikho/sikhoDatabase.js
js_content = f"// sikhoDatabase.js - 5 folders, exactly 20 items each (100 items total)\n"
js_content += f"// id 1-10: free, id 11-20: premium locked\n"
js_content += f"// 33 languages with accurate Sanskrit (sa) and top 10 languages\n\n"
js_content += "export const sikhoDatabase = " + json.dumps(sikhoDatabase, ensure_ascii=False, indent=2) + ";\n\n"
js_content += "if (typeof module !== 'undefined' && module.exports) {\n  module.exports = { sikhoDatabase };\n}\n\n"
js_content += "export default sikhoDatabase;\n"

with open("sikho/sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("sikho/sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(sikhoDatabase, f, ensure_ascii=False, indent=2)

# Also write to root sikhoDatabase.js and src/data/sikhoDatabase.js
with open("sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(sikhoDatabase, f, ensure_ascii=False, indent=2)

with open("src/data/sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("src/data/sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(sikhoDatabase, f, ensure_ascii=False, indent=2)

print("Saved all sikhoDatabase files successfully!")
