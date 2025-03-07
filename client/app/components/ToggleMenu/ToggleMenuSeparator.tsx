import clsx from 'clsx';
import React from 'react';

export default function ToggleMenuSeparator() {
	return (
		<div
			className={clsx(
				'border-t',
				'border-gray-100',
				'dark:border-gray-700',
				'my-1'
			)}
		></div>
	);
}
