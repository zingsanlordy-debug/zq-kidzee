import json

with open("sikhoDatabase.json", "r") as f:
    old_db = json.load(f)

existing = {}
for cat, items in old_db.items():
    for it in items:
        existing[it["en"].lower()] = it

target_categories = {
    "janwar": ["Lion", "Tiger", "Elephant", "Dog", "Cat", "Horse", "Cow", "Monkey", "Bear", "Rabbit", "Deer", "Zebra", "Giraffe", "Kangaroo", "Panda", "Camel", "Fox", "Wolf", "Goat", "Sheep"],
    "pakshi": ["Parrot", "Peacock", "Pigeon", "Crow", "Sparrow", "Eagle", "Owl", "Duck", "Swan", "Hen", "Cock", "Kingfisher", "Woodpecker", "Flamingo", "Penguin", "Ostrich", "Bat", "Crane", "Bulbul", "Myna"],
    "fal": ["Mango", "Apple", "Banana", "Grapes", "Orange", "Strawberry", "Watermelon", "Pineapple", "Papaya", "Guava", "Litchi", "Kiwi", "Cherry", "Peach", "Pear", "Plum", "Coconut", "Lemon", "Pomegranate", "Dragon Fruit"],
    "sabjiyan": ["Potato", "Tomato", "Onion", "Carrot", "Brinjal", "Cabbage", "Cauliflower", "Spinach", "Peas", "Ladyfinger", "Capsicum", "Cucumber", "Radish", "Beetroot", "Garlic", "Ginger", "Chilli", "Pumpkin", "Bottle Gourd", "Bitter Gourd"],
    "vahan": ["Car", "Bus", "Truck", "Bike", "Bicycle", "Aeroplane", "Train", "Boat", "Ship", "Helicopter", "Auto Rickshaw", "Scooter", "Tractor", "Crane", "Bullock Cart", "Metro", "Submarine", "Rocket", "Ambulance", "Fire Truck"]
}

missing = []
found = []
for cat, names in target_categories.items():
    print(f"Checking {cat}: {len(names)} items")
    for name in names:
        nl = name.lower()
        if nl in existing:
            found.append(name)
        else:
            missing.append((cat, name))

print("Found:", len(found))
print("Missing from old db:", missing)
