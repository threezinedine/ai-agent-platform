'use client';

import React, { useEffect } from 'react';
import ToastMessage from './ToastMessage';
import { useRouter } from 'next/navigation';
import ToastService from '../services/ToastServices';

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
		<div className="toast">
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
