import React from 'react';
import { UnAuthLayout } from '@/app/features/navbar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <UnAuthLayout>{children}</UnAuthLayout>;
}
