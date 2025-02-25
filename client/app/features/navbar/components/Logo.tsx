'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

export function Logo({ width = 60 }: { width?: number }) {
	const router = useRouter();

	function onClickLogo() {
		router.push('/home');
	}

	return (
		<div
			data-testid="logo"
			onClick={onClickLogo}
			className={clsx('cursor-pointer', 'text-white')}
		>
			<Image
				src="/b-logo.svg"
				alt="Logo"
				width={width}
				height={width}
				style={{ filter: 'invert(100)' }}
			/>
		</div>
	);
}
