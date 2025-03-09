import React from 'react';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer';
import clsx from 'clsx';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
