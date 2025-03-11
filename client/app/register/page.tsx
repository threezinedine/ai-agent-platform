'use client';

import React, { useEffect } from 'react';
import RegisterForm from '@/app/features/authentication/components/RegisterForm';
import { useLang } from '@/app/features/language';

export default function RegisterPage() {
	const { t } = useLang();

	useEffect(() => {
		document.title = t('REGISTER');
	});

	return <RegisterForm />;
}
