'use client';

import React from 'react';
import Form from '@/app/components/Form';
import clsx from 'clsx';
import AuthenRequest from '../services/authRequest';
import Storage from '@/app/utils/storage';
import { useRouter } from 'next/navigation';
import { ToastService } from '@/app/features/toast';
import Button from '@/app/components/Button';
import * as constants from '../data/constants';
import { useLang } from '@/app/features/language';

export default function LoginForm() {
	const authenRequest = new AuthenRequest();
	const router = useRouter();
	const { t } = useLang();

	async function handleSubmit(data: { [key: string]: string }) {
		const { username, password } = data;

		try {
			const response = await authenRequest.login(username, password);
			if (response.isSuccess()) {
				Storage.SetItem(
					constants.ACCESS_TOKEN_KEY,
					response.getData()?.accessToken
				);
				Storage.SetItem(
					'refreshToken',
					response.getData()?.refreshToken
				);
				router.push('/dashboard');
				ToastService.getInstance().addToastMessage({
					message: t('LOGIN_SUCCESSFULLY'),
					type: 'success',
				});
			} else {
				console.error(response.getMessage());
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Form
			name={t('LOGIN')}
			testId="login-form"
			className={clsx('w-1/3')}
			submitFunc={handleSubmit}
			footer={
				<div>
					{t('DO_NOT_HAVE_AN_ACCOUNT')}{' '}
					<Button
						variant="link"
						text={t('REGISTER')}
						size="sm"
						onClick={() => router.push('/register')}
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
					],
				},
			]}
		/>
	);
}
