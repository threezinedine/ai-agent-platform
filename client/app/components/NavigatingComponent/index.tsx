'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NavigatingComponent({ to }: { to: string }) {
	const router = useRouter();

	useEffect(() => {
		router.push(to);
	}, [to, router]);

	return <div></div>;
}
