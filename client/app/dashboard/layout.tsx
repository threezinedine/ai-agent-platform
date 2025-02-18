import React from 'react';
import { AuthLayout } from '@/app/features/navbar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthLayout>{children}</AuthLayout>;
}
