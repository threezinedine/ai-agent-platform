'use client';

import React from 'react';
import UnAuthNavbar from './UnAuthNavbar';
import { useAuth } from '@/app/features/authentication';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer';
import clsx from 'clsx';

export default function UnAuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated } = useAuth();

	return (
		<>
			{isAuthenticated ? (
				<>
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
				</>
			) : (
				<>
					<UnAuthNavbar />
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
				</>
			)}
		</>
	);
}
