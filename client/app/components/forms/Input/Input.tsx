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
		<div>
			<div>{title ? title : 'Input'}</div>
			<input
				data-testid={dataTestId}
				onChange={onChange}
			/>
			{error && <div>{error}</div>}
		</div>
	);
}
