'use client';

import React from 'react';
import Input from '@/app/components/forms/Form/Input';

export default function RegisterPage() {
	return (
		<div>
			<div>Register Page</div>
			<Input
				dataTestId="username"
				validators={[
					{
						validate: (value) => value.length > 8,
						message:
							'Username should be at least 8 characters long',
					},
				]}
			/>
		</div>
	);
}
