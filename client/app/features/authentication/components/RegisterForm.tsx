'use client';

import React from 'react';
import Form from '@/app/components/Form';
import clsx from 'clsx';
import AuthenRequest from '../services/authRequest';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
	const authenRequest = new AuthenRequest();
	const router = useRouter();

	async function handleSubmit(data: { [key: string]: string }) {
		const { username, password } = data;

		try {
			const response = await authenRequest.register(username, password);
			if (response.isSuccess()) {
			} else {
				console.error(response.getMessage());
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Form
			name="Register Form"
			testId="register-form"
			className={clsx('w-1/3')}
			submitFunc={handleSubmit}
			footer={
				<div>
					<p>
						Already have an account?
						<Button
							variant="link"
							text="Login"
							size="sm"
							onClick={() => router.push('/login')}
						/>
					</p>
				</div>
			}
			inputs={[
				{
					testId: 'username',
					title: 'Username',
					validators: [
						{
							validate: (value: string) => value.length > 0,
							message: 'Username is required',
						},
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
							validate: (value: string) => value.length > 0,
							message: 'Password is required',
						},
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
	);
}
