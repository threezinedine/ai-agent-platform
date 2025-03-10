import { create } from 'zustand';
import * as languageConstants from '../data/constants';
import t, { LanguageService } from '../services/LanguageServices';

export type Translation = (key: string) => string;

interface LanguageState {
	lang: languageConstants.Language;
	changeLanguage: (lang: languageConstants.Language) => Promise<void>;
	t: Translation;
}

const useLang = create<LanguageState>((set) => ({
	lang: languageConstants.LANGUAGE_EN,
	changeLanguage: async (lang: languageConstants.Language) => {
		await LanguageService.getInstance().changeLanguage(lang);
		set({ lang });
	},
	t: (key: string) => t(key),
}));

export default useLang;
