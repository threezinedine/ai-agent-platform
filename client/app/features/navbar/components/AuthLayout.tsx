'use client';

import React, { useEffect } from 'react';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer';
import clsx from 'clsx';
import { useAuth } from '@/app/features/authentication';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { state, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (state === 'error' && !isAuthenticated) {
			router.push('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, isAuthenticated]);

	return (
		<div>
			<AuthNavbar />
			<div
				className={clsx(
					'min-h-screen',
					'bg-gray-100',
					'dark:bg-gray-800'
				)}
			>
				{children}
			</div>
			<Footer />
		</div>
	);
}
