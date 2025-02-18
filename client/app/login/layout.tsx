import React from 'react';
import { LoginLayout } from '@/app/features/navbar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <LoginLayout>{children}</LoginLayout>;
}
