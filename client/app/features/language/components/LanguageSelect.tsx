'use client';

import React, { useEffect } from 'react';
import { ToggleItem, ToggleMenu } from '@/app/components/ToggleMenu';
import Image from 'next/image';
import clsx from 'clsx';
import Tooltip from '@/app/components/Tooltip';
import Storage from '@/app/utils/storage';
import { ToastService } from '@/app/features/toast';
import * as languageConstants from '../data/constants';
import useLang from '../contexts/LanguageContext';

export default function LanguageSelect() {
	const [language, setLanguage] = React.useState(
		languageConstants.LANGUAGE_EN
	);
	const { t, lang, changeLanguage } = useLang();

	useEffect(() => {
		setLanguage(lang);
	}, [lang]);

	const handleLanguageChange = async (lang: string) => {
		await Storage.SetItem(languageConstants.LANGUAGE_KEY, lang);
		ToastService.getInstance().addToastMessage({
			message: `Language changed to "${
				lang == languageConstants.LANGUAGE_EN ? 'English' : 'Vietnamese'
			}"`,
			type: 'success',
			duration: 3000,
		});
		setLanguage(lang);
		changeLanguage(lang as languageConstants.Language);
	};

	return (
		<ToggleMenu
			testId="language-selection"
			triggerNode={
				<Tooltip
					tooltip={<div>{t('CHANGE_LANGUAGE')}</div>}
					position="bottom"
				>
					<div
						data-testid={`language-selection-${language}-flag`}
						className={clsx(
							'flex',
							'items-center',
							'cursor-pointer',
							'hover:opacity-80'
						)}
					>
						{language == languageConstants.LANGUAGE_EN ? (
							<Image
								src="./us.svg"
								alt="English"
								width={32}
								height={32}
							/>
						) : (
							<Image
								src="./vn.svg"
								alt="Vietnamese"
								width={32}
								height={32}
							/>
						)}
					</div>
				</Tooltip>
			}
			menuOnRight
		>
			<ToggleItem onClick={() => handleLanguageChange('en')}>
				<div className={clsx('flex', 'items-center')}>
					<Image
						src="./us.svg"
						alt="American"
						width={16}
						height={16}
					/>
					<span className={clsx('ml-4')}>English</span>
				</div>
			</ToggleItem>
			<ToggleItem
				testId="language-selection-vi"
				onClick={() => handleLanguageChange('vi')}
			>
				<div className={clsx('flex', 'items-center')}>
					<Image
						src="./vn.svg"
						alt="Vietnamese"
						width={16}
						height={16}
					/>
					<span className={clsx('ml-4')}>Vietnamese</span>
				</div>
			</ToggleItem>
		</ToggleMenu>
	);
}
