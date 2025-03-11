import React from 'react';
import { LoadingComponentState } from './types';
import LoadingSpinner from './LoadingSpinner';
import clsx from 'clsx';

export default function LoadingComponent({
	state,
	error,
	loaded,
	loading = <LoadingSpinner size={20} />,
}: {
	state: LoadingComponentState;
	loading?: React.ReactNode;
	error: React.ReactNode;
	loaded: React.ReactNode;
}) {
	return (
		<div className={clsx('w-full', 'h-full')}>
			{state === 'loading' && (
				<div
					className={clsx(
						'w-full',
						'h-full',
						'flex',
						'justify-center',
						'items-center'
					)}
				>
					{loading}
				</div>
			)}
			{state === 'error' && error}
			{state === 'loaded' && loaded}
		</div>
	);
}
