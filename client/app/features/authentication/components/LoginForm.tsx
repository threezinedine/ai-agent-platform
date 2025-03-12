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
import useAuth from '../hooks/authenticateHooks';

export default function LoginForm() {
	const authenRequest = new AuthenRequest();
	const router = useRouter();
	const { initialLoad } = useAuth();
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
					constants.REFRESH_TOKEN_KEY,
					response.getData()?.refreshToken
				);
				await initialLoad();
				router.push('/dashboard');
				ToastService.getInstance().addToastMessage({
					message: t('LOGIN_SUCCESSFULLY'),
					type: 'success',
				});
			} else {
				console.error(response.getMessage());
				ToastService.getInstance().addToastMessage({
					message: response.getMessage(),
					type: 'error',
				});
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
			submitText={t('SUBMIT')}
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
					placeholder: t('ENTER_THE_USERNAME'),
					validators: [
						{
							validate: (value: string) => value.length > 0,
							message: t('USERNAME_IS_REQUIRED'),
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
					],
				},
			]}
		/>
	);
}
