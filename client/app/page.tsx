'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/features/authentication';

export default function Home() {
	const router = useRouter();
	const { authState } = useAuth();

	useEffect(() => {
		if (authState === 'loaded') {
			router.push('/home');
		}
	}, [authState, router]);

	return <div>Navigating</div>;
}
