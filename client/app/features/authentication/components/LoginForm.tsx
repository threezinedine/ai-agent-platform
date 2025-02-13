'use client';

import React from 'react';
import Form from '@/app/components/Form';
import clsx from 'clsx';
import AuthenRequest from '../services/authRequest';
import Storage from '@/app/utils/storage';

export default function LoginForm() {
	const authenRequest = new AuthenRequest('http://localhost:8000');

	async function handleSubmit(data: { [key: string]: string }) {
		const { username, password } = data;

		try {
			const response = await authenRequest.login(username, password);
			if (response.isSuccess()) {
				Storage.SetItem('token', response.getData().token);
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
