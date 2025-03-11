'use client';

import React, { useEffect } from 'react';
import { useLang } from '@/app/features/language';

export default function DashboardPage() {
	const { t } = useLang();

	useEffect(() => {
		document.title = t('DASHBOARD');
	});

	return <div>Dashboard Page</div>;
}
