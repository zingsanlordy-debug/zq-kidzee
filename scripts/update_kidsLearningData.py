import json

with open("src/data/sikhoDatabase.json", "r", encoding="utf-8") as f:
    db = json.load(f)

category_map = {
    "janwar": ("animals", "🦁", "जानवर (Animals)", "Wild & Domestic Animals", "from-amber-500 to-orange-600"),
    "pakshi": ("birds", "🦜", "पक्षी (Birds)", "Colorful Birds", "from-sky-500 to-blue-600"),
    "phool": ("flowers", "🌸", "फूल (Flowers)", "Fragrant Flowers", "from-rose-500 to-pink-600"),
    "fal": ("fruits", "🍎", "फल (Fruits)", "Sweet & Juicy Fruits", "from-red-500 to-orange-500"),
    "sabjiyan": ("vegetables", "🥦", "सब्जियां (Vegetables)", "Healthy Vegetables", "from-emerald-500 to-green-600"),
    "vahan": ("vehicles", "🚗", "वाहन (Vehicles)", "Cars, Planes & Trains", "from-indigo-500 to-violet-600"),
}

items_ts = []

for cat_key, items in db.items():
    frontend_cat, emoji, title, eng_title, color = category_map[cat_key]
    for it in items:
        item_id = f"{frontend_cat[:3]}_{it['id']}"
        name = it["en"]
        hindi_name = it["translations"].get("hi", name)
        prem = it["premium"]
        img = it["img"]
        sound_phrase = f"This is {name}."
        
        items_ts.append({
            "id": item_id,
            "numId": it["id"],
            "name": name,
            "hindiName": hindi_name,
            "category": frontend_cat,
            "emoji": emoji,
            "image": img,
            "premium": prem,
            "soundPhrase": sound_phrase,
            "translations": it["translations"]
        })

file_content = f"""// ZQ Kidzee Learning Data - 6 Categories with 20 Items Each (120 Items Total)
// Built from sikhoDatabase.js
// 10 FREE (id 1-10), 10 PREMIUM (id 11-20)

import {{ sikhoDatabase }} from './sikhoDatabase';

export {{ sikhoDatabase }};

export interface LearningItem {{
  id: string;
  numId: number;
  name: string;
  hindiName: string;
  category: 'animals' | 'birds' | 'flowers' | 'fruits' | 'vegetables' | 'vehicles';
  emoji: string;
  image: string;
  premium: boolean;
  soundPhrase: string;
  translations: Record<string, string>;
}}

export interface LearningCategoryMeta {{
  id: 'animals' | 'birds' | 'flowers' | 'fruits' | 'vegetables' | 'vehicles';
  title: string;
  englishTitle: string;
  emoji: string;
  color: string;
  count: number;
}}

export const LEARNING_CATEGORIES: LearningCategoryMeta[] = [
  {{ id: 'animals', title: 'जानवर (Animals)', englishTitle: 'Wild & Domestic Animals', emoji: '🦁', color: 'from-amber-500 to-orange-600', count: 20 }},
  {{ id: 'birds', title: 'पक्षी (Birds)', englishTitle: 'Colorful Birds', emoji: '🦜', color: 'from-sky-500 to-blue-600', count: 20 }},
  {{ id: 'flowers', title: 'फूल (Flowers)', englishTitle: 'Fragrant Flowers', emoji: '🌸', color: 'from-rose-500 to-pink-600', count: 20 }},
  {{ id: 'fruits', title: 'फल (Fruits)', englishTitle: 'Sweet & Juicy Fruits', emoji: '🍎', color: 'from-red-500 to-orange-500', count: 20 }},
  {{ id: 'vegetables', title: 'सब्जियां (Vegetables)', englishTitle: 'Healthy Vegetables', emoji: '🥦', color: 'from-emerald-500 to-green-600', count: 20 }},
  {{ id: 'vehicles', title: 'वाहन (Vehicles)', englishTitle: 'Cars, Planes & Trains', emoji: '🚗', color: 'from-indigo-500 to-violet-600', count: 20 }},
];

export const LEARNING_ITEMS: LearningItem[] = {json.dumps(items_ts, ensure_ascii=False, indent=2)};
"""

with open("src/data/kidsLearningData.ts", "w", encoding="utf-8") as f:
    f.write(file_content)

print(f"Generated src/data/kidsLearningData.ts with {len(items_ts)} items")
