'use client';

import React from 'react';
import { ToastService } from '@/app/features/toast';
import { Button } from '@/app/components/Button/Button';
import clsx from 'clsx';

export default function Home() {
	function ShowSuccess() {
		ToastService.getInstance().addToastMessage({
			type: 'success',
			message: 'This is a success message',
		});
	}

	function ShowInfo() {
		ToastService.getInstance().addToastMessage({
			type: 'info',
			message: 'This is an info message',
		});
	}

	function ShowWarning() {
		ToastService.getInstance().addToastMessage({
			type: 'warning',
			message: 'This is a warning message',
		});
	}

	function ShowError() {
		ToastService.getInstance().addToastMessage({
			type: 'error',
			message: 'This is an error message',
		});
	}

	return (
		<div>
			<Button
				onClick={ShowSuccess}
				text="Show Success"
				className={clsx('bg-green-500', 'hover:bg-green-600')}
			/>
			<Button
				onClick={ShowInfo}
				text="Show Info"
				className={clsx('bg-blue-500', 'hover:bg-blue-600')}
			/>

			<Button
				onClick={ShowWarning}
				text="Show Warning"
				className={clsx('bg-yellow-500', 'hover:bg-yellow-600')}
			/>

			<Button
				onClick={ShowError}
				text="Show Error"
				className={clsx('bg-red-500', 'hover:bg-red-600')}
			/>
		</div>
	);
}
