#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full dataset generator for ZQ Kidzee's sikhoDatabase.js
5 folders x 50 items = 250 items.
"""

import json
import urllib.parse
import os

# 33 languages specified by user:
# en, hi, bn, te, mr, ta, gu, ur, kn, ml, pa, or, as, es, fr, de, ar, zh, ru, pt, ja, ko, it, tr, nl, pl, id, th, vi, fa, ne, si
LANGUAGES = [
    'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'ml',
    'pa', 'or', 'as', 'es', 'fr', 'de', 'ar', 'zh', 'ru', 'pt',
    'ja', 'ko', 'it', 'tr', 'nl', 'pl', 'id', 'th', 'vi', 'fa',
    'ne', 'si'
]

def make_img_url(english_name):
    # Pattern: cute cartoon {ENGLISH_NAME} for kids white background kawaii
    # URL encoded
    # The prompt explicitly specifies:
    # "https://image.pollinations.ai/prompt/cute%20cartoon%20{ENGLISH_NAME}%20for%20kids%20white%20background%20kawaii"
    # Replace {ENGLISH_NAME} with the English name. Example for Lion: cute cartoon lion...
    clean_name = english_name.lower().strip()
    encoded_name = urllib.parse.quote(clean_name)
    return f"https://image.pollinations.ai/prompt/cute%20cartoon%20{encoded_name}%20for%20kids%20white%20background%20kawaii"

print("Helper ready")
