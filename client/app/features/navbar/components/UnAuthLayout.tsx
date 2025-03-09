'use client';

import React from 'react';
import UnAuthNavbar from './UnAuthNavbar';
import { AuthenticatePage } from '@/app/features/authentication';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer';
import clsx from 'clsx';

export default function UnAuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthenticatePage
			unauthorizedNode={
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
			}
		>
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
		</AuthenticatePage>
	);
}
