'use client';

import React, { useEffect } from 'react';
import { useLang } from '@/app/features/language';

export default function Home() {
	const { t } = useLang();

	useEffect(() => {
		document.title = t('HOME');
	});

	<div>HOME</div>;
}
