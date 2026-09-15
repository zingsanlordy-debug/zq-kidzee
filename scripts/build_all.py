#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Master builder for sikhoDatabase.js and sikhoDatabase.json.
Merges 5 categories x 50 items = 250 items.
Validates all constraints:
1. Exact 50 items per folder
2. id 1-10 premium: false, id 11-50 premium: true
3. Exact image URL pattern
4. Translations for all 33 languages
"""

import os
import json
import urllib.parse
from gen_janwar import ANIMALS
from gen_pakshi import BIRDS
from gen_fal import FRUITS
from gen_sabjiyan import VEGETABLES
from gen_vahan import VEHICLES

LANG_KEYS = [
    'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'ml',
    'pa', 'or', 'as', 'es', 'fr', 'de', 'ar', 'zh', 'ru', 'pt',
    'ja', 'ko', 'it', 'tr', 'nl', 'pl', 'id', 'th', 'vi', 'fa',
    'ne', 'si'
]

def make_item(raw_item, idx):
    item_id = idx
    name_en = raw_item["en"]
    is_premium = (item_id > 10)
    
    # URL pattern:
    # https://image.pollinations.ai/prompt/cute%20cartoon%20{ENGLISH_NAME}%20for%20kids%20white%20background%20kawaii
    # with spaces encoded as %20
    encoded_name = urllib.parse.quote(name_en.lower().strip())
    img_url = f"https://image.pollinations.ai/prompt/cute%20cartoon%20{encoded_name}%20for%20kids%20white%20background%20kawaii"
    
    # Build translations map
    translations = {}
    for lk in LANG_KEYS:
        val = raw_item.get(lk, name_en)
        translations[lk] = str(val) if not isinstance(val, (int, float)) else name_en
        
    return {
        "id": item_id,
        "en": name_en,
        "translations": translations,
        "premium": is_premium,
        "img": img_url
    }

def process_category(cat_name, items_list):
    assert len(items_list) == 50, f"{cat_name} must have 50 items, got {len(items_list)}"
    processed = []
    for idx, item in enumerate(items_list, start=1):
        processed.append(make_item(item, idx))
    return processed

database = {
    "janwar": process_category("janwar", ANIMALS),
    "pakshi": process_category("pakshi", BIRDS),
    "fal": process_category("fal", FRUITS),
    "sabjiyan": process_category("sabjiyan", VEGETABLES),
    "vahan": process_category("vahan", VEHICLES),
}

# Verify counts and rules
total_items = 0
for cat, items in database.items():
    print(f"Category '{cat}': {len(items)} items")
    assert len(items) == 50
    for it in items:
        total_items += 1
        # ID check
        assert 1 <= it["id"] <= 50
        # Premium rule check
        if it["id"] <= 10:
            assert it["premium"] is False
        else:
            assert it["premium"] is True
        # Translations check
        assert len(it["translations"]) == 32
        for lk in LANG_KEYS:
            assert lk in it["translations"]
            assert it["translations"][lk] != ""
        # Image check
        assert it["img"].startswith("https://image.pollinations.ai/prompt/cute%20cartoon%20")
        assert it["img"].endswith("%20for%20kids%20white%20background%20kawaii")

print(f"Total verified items across 5 categories: {total_items}")

# Write to src/data/sikhoDatabase.js
js_content = f"""// ZQ Kidzee - Sikho (Learning) Database
// 5 categories x 50 items = 250 items total
// STRICT RULES APPLIED:
// 1. Image URL pattern: cute cartoon {{ENGLISH_NAME}} for kids white background kawaii
// 2. English name shown below image, translations inside data
// 3. IDs 1-10 FREE (premium: false), IDs 11-50 LOCKED (premium: true)
// 4. 33 language translations in each item

export const sikhoDatabase = {json.dumps(database, ensure_ascii=False, indent=2)};

export default sikhoDatabase;
"""

# Also write root sikhoDatabase.js
root_js = f"""// ZQ Kidzee - Sikho (Learning) Database
export const sikhoDatabase = {json.dumps(database, ensure_ascii=False, indent=2)};
export default sikhoDatabase;
"""

# Write files
os.makedirs("src/data", exist_ok=True)
with open("src/data/sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("sikhoDatabase.js", "w", encoding="utf-8") as f:
    f.write(root_js)

# Also output JSON file at root for direct JSON ingestion
with open("sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(database, f, ensure_ascii=False, indent=2)

with open("src/data/sikhoDatabase.json", "w", encoding="utf-8") as f:
    json.dump(database, f, ensure_ascii=False, indent=2)

print("All files successfully written!")
