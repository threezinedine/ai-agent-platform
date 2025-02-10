'use client';

import React, { useState } from 'react';

/**
 * The struction stores all the needed information for checking the user's enter
 * 		value is statisfied the condition or not.
 */
interface InputValidator {
	validate: (value: string) => boolean;
	message: string;
}

interface InputProps {
	title?: string;
	dataTestId: string;
	validators?: InputValidator[];
}

export default function Input({ title, dataTestId, validators }: InputProps) {
	const [error, setError] = useState<string | null>(null);

	function onChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (!validators) {
			return;
		}

		const value = event.target.value;

		for (const validator of validators) {
			if (!validator.validate(value)) {
				setError(validator.message);
				return;
			}
		}

		setError(null);
	}

	return (
		<div className="w-full max-w-sm">
			<label
				className="block text-sm font-medium text-gray-700"
				htmlFor={dataTestId}
			>
				{title ? title : 'Input'}
			</label>
			<div className="mt-1 relative">
				<input
					className="block w-full rounded-md border border-red-500 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm outline-none"
					id={dataTestId}
					data-testid={dataTestId}
					onChange={onChange}
				/>
			</div>
			{error && <div className="mt-2 text-sm text-red-600">{error}</div>}
		</div>
	);
}
