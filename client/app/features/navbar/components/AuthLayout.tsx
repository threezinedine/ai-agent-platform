import React from 'react';
import AuthNavbar from './AuthNavbar';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<AuthNavbar />
			{children}
		</div>
	);
}
