'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export function Logo() {
	const router = useRouter();

	function onClickLogo() {
		router.push('/');
	}

	return (
		<div
			data-testid="logo"
			onClick={onClickLogo}
		>
			Logo
		</div>
	);
}
