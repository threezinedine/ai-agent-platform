import * as languageConstants from '../data/constants';
import usLocale from '../data/locales/us';
import vnLocale from '../data/locales/vn';

class LanguageService {
	private lang: languageConstants.Language = languageConstants.LANGUAGE_EN;
	private locale: { [key: string]: string } = {};

	private static instance: LanguageService;

	static getInstance() {
		if (!LanguageService.instance) {
			LanguageService.instance = new LanguageService();
		}

		return LanguageService.instance;
	}

	constructor(
		lang: languageConstants.Language = languageConstants.LANGUAGE_EN
	) {
		this.lang = lang;
		this.updateLang();
	}

	private updateLang() {
		if (this.lang === languageConstants.LANGUAGE_EN) {
			this.locale = usLocale;
		} else {
			this.locale = vnLocale;
		}
	}

	async changeLanguage(lang: languageConstants.Language) {
		this.lang = lang;
		this.updateLang();
		await localStorage.setItem(languageConstants.LANGUAGE_KEY, lang);
	}

	translate(key: string) {
		if (!this.locale) {
			return key;
		}
		return this.locale[key] || key;
	}
}

export default function t(key: string) {
	return LanguageService.getInstance().translate(key);
}

export { LanguageService };
