from fastapi import Header


def get_language(
    lang: str = Header("en"),
) -> str:
    return lang


LanguageDependency = get_language
