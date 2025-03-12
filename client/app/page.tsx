'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/features/authentication';

export default function Home() {
	const router = useRouter();
	const { state } = useAuth();

	useEffect(() => {
		if (state === 'loaded') {
			router.push('/home');
		}
	}, [state, router]);

	return <div>Navigating</div>;
}
