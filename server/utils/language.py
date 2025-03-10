import json
import os
from typing import Optional, Dict


LANGUE_VI = "vi"
LANGUE_EN = "en"


class LanguageService:
    vi_data: Optional[Dict[str, str]] = None
    en_data: Optional[Dict[str, str]] = None

    @staticmethod
    def Load(base: str):
        with open(
            os.path.join(base, "assets/langs/vn.json"),
            "r",
            encoding="utf-8",
        ) as f:
            LanguageService.vi_data = json.load(f)

        with open(
            os.path.join(base, "assets/langs/us.json"),
            "r",
            encoding="utf-8",
        ) as f:
            LanguageService.en_data = json.load(f)

    @staticmethod
    def Get(key: str, lang: str = LANGUE_EN) -> str:
        if lang == LANGUE_VI:
            return LanguageService.vi_data[key]
        else:
            return LanguageService.en_data[key]
