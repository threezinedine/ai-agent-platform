import React from 'react';
import LoginNavbar from './LoginNavbar';
import Footer from './Footer';
import clsx from 'clsx';

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<LoginNavbar />
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
