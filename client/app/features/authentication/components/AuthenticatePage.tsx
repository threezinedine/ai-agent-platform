'use client';

import React, { useEffect } from 'react';
import useAuth from '@/app/features/authentication/hooks/Authorize';
import { useRouter } from 'next/navigation';

interface AuthenticatePageProps {
	children: React.ReactNode;
}

export default function AuthenticatePage({ children }: AuthenticatePageProps) {
	const router = useRouter();
	const isAuthorized = useAuth();

	useEffect(() => {
		if (!isAuthorized) {
			router.push('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthorized]);

	return <>{children}</>;
}
