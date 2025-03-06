'use client';

import React, { useContext } from 'react';
import { Logo } from './Logo';
import { AuthenticatePage, AuthContext } from '@/app/features/authentication';
import { Button } from '@/app/components/Button/Button';
import { useRouter } from 'next/navigation';
import { ToastService } from '@/app/features/toast';
import clsx from 'clsx';

function AuthNavbar() {
	const { user, logout } = useContext(AuthContext);
	const router = useRouter();

	function onLogout() {
		logout();
		router.push('/');
		ToastService.getInstance().addToastMessage({
			message: 'Logged out successfully',
			type: 'success',
			duration: 10000,
		});
	}

	return (
		<div
			className={clsx(
				'flex',
				'items-center',
				'justify-between',
				'w-full',
				'p-4'
			)}
		>
			<Logo />
			<div data-testid={user?.username}>{user?.username}</div>
			<Button
				onClick={onLogout}
				testId="logout"
				text="Log out"
			/>
		</div>
	);
}

export default function AuthenticatedNavbar() {
	return (
		<AuthenticatePage>
			<AuthNavbar />
		</AuthenticatePage>
	);
}
