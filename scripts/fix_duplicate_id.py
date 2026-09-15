import re

files = [
    "scripts/gen_janwar.py",
    "scripts/gen_pakshi.py",
    "scripts/gen_fal.py",
    "scripts/gen_sabjiyan.py",
    "scripts/gen_vahan.py"
]

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace leading {"id": <number> with {"num": <number>
    # Notice the pattern: {"id": 1, "en":
    new_content = re.sub(r'\{"id":\s*(\d+),\s*"en":', r'{"num": \1, "en":', content)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    
    print(f"Fixed {filepath}")
