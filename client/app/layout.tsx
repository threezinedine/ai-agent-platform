'use client';

import '@/app/assets/globals.css';
import Toast from './features/toast';
import { useEffect } from 'react';
import { languageConstants, useLang } from '@/app/features/language';
import Storage from '@/app/utils/storage';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { changeLanguage } = useLang();

	useEffect(() => {
		(async () => {
			const lang = await Storage.GetItem(
				languageConstants.LANGUAGE_KEY,
				languageConstants.LANGUAGE_EN
			);
			changeLanguage(lang as languageConstants.Language);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html lang="en">
			<body>
				<div>{children}</div>
				<Toast />
			</body>
		</html>
	);
}
