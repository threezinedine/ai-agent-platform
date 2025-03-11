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
			submitText={t('SUBMIT')}
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
					placeholder: t('ENTER_THE_USERNAME'),
					validators: [
						{
							validate: (value: string) => value.length > 0,
							message: t('USERNAME_IS_REQUIRED'),
						},
						{
							validate: (value: string) => value.length > 8,
							message: t(
								'USERNAME_MUST_BE_AT_LEAST_8_CHARACTERS_LONG'
							),
						},
					],
				},
				{
					testId: 'password',
					title: t('PASSWORD'),
					type: 'password',
					placeholder: t('ENTER_THE_PASSWORD'),
					validators: [
						{
							validate: (value: string) => value.length > 0,
							message: t('PASSWORD_IS_REQUIRED'),
						},
						{
							validate: (value: string) => value.length > 8,
							message: t(
								'PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG'
							),
						},
					],
				},
				{
					testId: 'confirm-password',
					title: t('CONFIRM_PASSWORD'),
					type: 'password',
					placeholder: t('ENTER_THE_CONFIRM_PASSWORD'),
					validators: [
						{
							validate: (value: string) => {
								const password = document.querySelector(
									'input[data-testid="password"]'
								) as HTMLInputElement;

								return password && value === password.value;
							},
							message: t('PASSWORD_DOES_NOT_MATCH'),
						},
					],
				},
			]}
		/>
	);
}
