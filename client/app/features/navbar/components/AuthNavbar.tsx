'use client';

import React, { useContext } from 'react';
import { AuthenticatePage, AuthContext } from '@/app/features/authentication';
import { useRouter } from 'next/navigation';
import { ToastService } from '@/app/features/toast';
import NavbarCommon from './NavbarCommon';
import {
	ToggleMenu,
	ToggleItem,
	ToggleMenuSeparator,
} from '@/app/components/ToggleMenu';
import UserAvatar from '@/app/components/UserAvatar';

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
		<NavbarCommon>
			<ToggleMenu
				testId="user-menu"
				menuOnRight
				triggerNode={
					<UserAvatar
						testId={user?.username}
						username={user?.username || '?'}
					/>
				}
			>
				<ToggleItem onClick={() => router.push('/dashboard')}>
					Dashboard
				</ToggleItem>
				<ToggleMenuSeparator />
				<ToggleItem
					onClick={onLogout}
					testId="logout"
					className="text-red-500"
				>
					Logout
				</ToggleItem>
			</ToggleMenu>
		</NavbarCommon>
	);
}

export default function AuthenticatedNavbar() {
	return (
		<AuthenticatePage>
			<AuthNavbar />
		</AuthenticatePage>
	);
}
