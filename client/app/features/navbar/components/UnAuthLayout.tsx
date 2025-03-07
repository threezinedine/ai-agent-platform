'use client';

import React from 'react';
import UnAuthNavbar from './UnAuthNavbar';
import { AuthenticatePage } from '@/app/features/authentication';
import AuthNavbar from './AuthNavbar';

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
					{children}
				</>
			}
		>
			<AuthNavbar />
			{children}
		</AuthenticatePage>
	);
}
