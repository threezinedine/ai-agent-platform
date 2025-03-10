from typing import Annotated
from fastapi import Depends, Header
from utils import LANGUE_EN


def get_language(
    language: str = Header(None),
) -> str:
    if language is None:
        return LANGUE_EN
    return language


LanguageDependency = Depends(get_language)
