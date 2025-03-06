'use client';

import React, { useEffect } from 'react';
import ToastMessage from './ToastMessage';
import { useRouter } from 'next/navigation';
import ToastService from '../services/ToastServices';
import clsx from 'clsx';

export default function Toast() {
	const router = useRouter();

	function onToastMessageCountChange() {
		router.refresh();
	}

	useEffect(() => {
		ToastService.getInstance().setOnChangedCallback(
			onToastMessageCountChange
		);
	});

	return (
		<div
			className={clsx(
				'fixed',
				'bottom-5',
				'right-5',
				'max-w-sm',
				'z-50',
				'w-full'
			)}
		>
			{ToastService.getInstance()
				.getToastMessages()
				.map((message, index) => (
					<ToastMessage
						key={index}
						{...message}
					/>
				))}
		</div>
	);
}
