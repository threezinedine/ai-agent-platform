import React from 'react';
import LoginNavbar from './LoginNavbar';

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<LoginNavbar />
			{children}
		</div>
	);
}
