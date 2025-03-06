import React from 'react';
import { ToastMessageProps } from './ToastProps';
import clsx from 'clsx';
import ToastService from '../services/ToastServices';

export default function ToastMessage({ type, message }: ToastMessageProps) {
	const toastTypesColor = {
		success: {
			background: 'bg-green-50 dark:bg-green-900',
			border: 'border-green-500 dark:border-green-600',
			icon: '✓',
			iconBackground: 'bg-green-500 dark:bg-green-600',
			text: 'text-green-800 dark:text-green-100',
		},
		error: {
			background: 'bg-red-50 dark:bg-red-900',
			border: 'border-red-500 dark:border-red-600',
			icon: '✕',
			iconBackground: 'bg-red-500 dark:bg-red-600',
			text: 'text-red-800 dark:text-red-100',
		},
		warning: {
			background: 'bg-yellow-50 dark:bg-yellow-900',
			border: 'border-yellow-500 dark:border-yellow-600',
			icon: '!',
			iconBackground: 'bg-yellow-500 dark:bg-yellow-600',
			text: 'text-yellow-800 dark:text-yellow-100',
		},
		info: {
			background: 'bg-blue-50 dark:bg-blue-900',
			border: 'border-blue-500 dark:border-blue-600',
			icon: 'i',
			iconBackground: 'bg-blue-500 dark:bg-blue-600',
			text: 'text-blue-800 dark:text-blue-100',
		},
	};

	function handleCloseClick() {
		ToastService.getInstance().removeToastMessage(message);
	}

	const styles = toastTypesColor[type];

	return (
		<div
			className={clsx(
				'flex',
				'select-none',
				'items-center',
				'w-full',
				'p-4',
				'rounded-md',
				'border',
				'mb-2',
				'shadow-md',
				styles.background,
				styles.border,
				`toast-message--${type}`
			)}
		>
			<div
				className={clsx(
					'inline-flex',
					'items-center',
					'justify-center',
					'flex-shrink-0',
					'h-6',
					'w-6',
					'rounded-full',
					styles.iconBackground,
					'text-white'
				)}
			>
				<span className={clsx('text-sm', 'font-semibold')}>
					{styles.icon}
				</span>
			</div>
			<div
				className={clsx('ml-3', 'text-sm', 'font-normal', styles.text)}
			>
				{message}
			</div>
			<div
				className={clsx(
					'ml-auto',
					'-mx-1.5',
					'-my-1.5',
					'rounded-full',
					'focus:ring-2',
					'focus:ring-gray-300',
					'p-1.5',
					'inline-flex',
					'h-8',
					'w-8',
					styles.text,
					'hover:bg-gray-100',
					'dark:hover:bg-gray-800',
					'cursor-pointer'
				)}
				onClick={handleCloseClick}
			>
				<svg
					className="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
			</div>
		</div>
	);
}
