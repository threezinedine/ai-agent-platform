'use client';

import React from 'react';
import Form from '@/app/components/Form';
import clsx from 'clsx';
import AuthenRequest from '../services/authRequest';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import { useLang } from '@/app/features/language';

export default function RegisterForm() {
	const authenRequest = new AuthenRequest();
	const router = useRouter();
	const { t } = useLang();

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
			name={t('REGISTER')}
			testId="register-form"
			className={clsx('w-1/3')}
			submitFunc={handleSubmit}
			footer={
				<div>
					{t('ALREADY_HAVE_AN_ACCOUNT')}{' '}
					<Button
						variant="link"
						text={t('LOGIN')}
						size="sm"
						onClick={() => router.push('/login')}
					/>
				</div>
			}
			inputs={[
				{
					testId: 'username',
					title: t('USERNAME'),
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
					title: t('PASSWORD'),
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
					title: t('CONFIRM_PASSWORD'),
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
