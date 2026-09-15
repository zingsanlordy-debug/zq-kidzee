import json

# Check existing translations we already have in sikhoDatabase.json
with open("sikhoDatabase.json", "r") as f:
    old_db = json.load(f)

existing = {}
for cat, items in old_db.items():
    for it in items:
        existing[it["en"].lower()] = it["translations"]

print("Found existing translated items:", len(existing))
