'use client';

import React from 'react';
import Form from '@/app/components/Form';
import clsx from 'clsx';

export default function RegisterPage() {
	return (
		<div className={clsx('flex', 'flex-col', 'items-center')}>
			<div>Register Page</div>
			<Form
				testId="register-form"
				name="Register Form"
				className="w-1/3"
				inputs={[
					{
						testId: 'username',
						title: 'Username',
						validators: [
							{
								validate: (value: string) => value.length > 8,
								message:
									'Username must be at least 8 characters long',
							},
						],
					},
				]}
			/>
		</div>
	);
}
