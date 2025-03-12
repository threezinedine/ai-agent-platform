'use client';

import '@/app/assets/globals.css';
import Toast from './features/toast';
import { useEffect } from 'react';
import { languageConstants, useLang } from '@/app/features/language';
import Storage from '@/app/utils/storage';
import { useAuth } from '@/app/features/authentication';
import LoadingComponent from './components/LoadingComponent';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { changeLanguage } = useLang();
	const { state, initialLoad } = useAuth();

	useEffect(() => {
		(async () => {
			const lang = await Storage.GetItem(
				languageConstants.LANGUAGE_KEY,
				languageConstants.LANGUAGE_EN
			);
			await initialLoad();
			changeLanguage(lang as languageConstants.Language);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html lang="en">
			<body>
				<LoadingComponent
					state={state}
					loaded={<div>{children}</div>}
					error={<div>{children}</div>}
				/>
				<Toast />
			</body>
		</html>
	);
}
