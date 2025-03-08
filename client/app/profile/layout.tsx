import React from 'react';
import { AuthLayout } from '@/app/features/navbar';

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthLayout>{children}</AuthLayout>;
}
