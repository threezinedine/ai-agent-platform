'use client';

import React from 'react';
import Form from '@/app/components/Form';
import clsx from 'clsx';
import AuthenRequest from '../services/authRequest';
import Storage from '@/app/utils/storage';
import { useRouter } from 'next/navigation';
import { ToastService } from '@/app/features/toast';
import Button from '@/app/components/Button';

export default function LoginForm() {
	const authenRequest = new AuthenRequest();
	const router = useRouter();

	async function handleSubmit(data: { [key: string]: string }) {
		const { username, password } = data;

		try {
			const response = await authenRequest.login(username, password);
			if (response.isSuccess()) {
				Storage.SetItem('token', response.getData()?.token);
				router.push('/dashboard');
				ToastService.getInstance().addToastMessage({
					message: 'Login successfully',
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
			name="Login Form"
			testId="login-form"
			className={clsx('w-1/3')}
			submitFunc={handleSubmit}
			footer={
				<div>
					Do not have an account?
					<Button
						variant="link"
						text="Register"
						size="sm"
						onClick={() => router.push('/register')}
					/>
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
					],
				},
			]}
		/>
	);
}
