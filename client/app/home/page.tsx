'use client';

import React from 'react';
import { ToastService } from '@/app/features/toast';
import Button from '@/app/components/Button';
import clsx from 'clsx';
import {
	ToggleItem,
	ToggleMenu,
	ToggleMenuSeparator,
} from '@/app/components/ToggleMenu';
import Modal from '@/app/components/Modal';

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
				variant="success"
				className={clsx('mx-2')}
			/>
			<Button
				onClick={ShowInfo}
				text="Show Info"
				variant="primary"
				className={clsx('mx-2')}
			/>

			<Button
				onClick={ShowWarning}
				text="Show Warning"
				variant="warning"
				className={clsx('mx-2')}
			/>

			<Button
				onClick={ShowError}
				text="Show Error"
				variant="danger"
				className={clsx('mx-2')}
			/>

			<ToggleMenu className={clsx('mr-5')}>
				<ToggleItem>Testing</ToggleItem>
				<ToggleItem>Testing 2</ToggleItem>
				<ToggleMenuSeparator />
				<ToggleItem>Testing 3</ToggleItem>
			</ToggleMenu>

			<Modal>
				<div>Modal Content</div>
			</Modal>
		</div>
	);
}
