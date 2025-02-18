import React from 'react';
import UnAuthNavbar from './UnAuthNavbar';

export default function UnAuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<UnAuthNavbar />
			{children}
		</div>
	);
}
