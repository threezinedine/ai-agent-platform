'use client';

import React, { useEffect } from 'react';
import { useLang } from '@/app/features/language';
import clsx from 'clsx';
import LoginForm from '@/app/features/authentication/components/LoginForm';

export default function LoginPage() {
	const { t } = useLang();

	useEffect(() => {
		document.title = t('LOGIN');
	});

	return (
		<div className={clsx('flex', 'flex-col', 'items-center')}>
			<LoginForm />
		</div>
	);
}
