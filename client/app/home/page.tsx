'use client';

import React, { useEffect } from 'react';
import { useLang } from '@/app/features/language';
import LoadingSpinner from '@/app/components/LoadingComponent/LoadingSpinner';
import clsx from 'clsx';

export default function Home() {
	const { t } = useLang();

	useEffect(() => {
		document.title = t('HOME');
	});

	return (
		<div className={clsx('h-10')}>
			<LoadingSpinner />
		</div>
	);
}
