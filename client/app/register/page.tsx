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
					{
						testId: 'password',
						title: 'Password',
						type: 'password',
						validators: [
							{
								validate: (value: string) => value.length > 8,
								message:
									'Password must be at least 8 characters long',
							},
						],
					},
					{
						testId: 'confirm-password',
						title: 'Confirm Password',
						type: 'password',
						validators: [
							{
								validate: (value: string) => {
									const password = document.querySelector(
										'input[data-testid="password"]'
									) as HTMLInputElement;

									return password && value === password.value;
								},
								message: 'Passwords do not match',
							},
						],
					},
				]}
			/>
		</div>
	);
}
