'use client';

import React from 'react';
import clsx from 'clsx';
import LoginForm from '@/app/features/authentication/components/LoginForm';

export default function LoginPage() {
	return (
		<div className={clsx('flex', 'flex-col', 'items-center')}>
			<LoginForm />
		</div>
	);
}
