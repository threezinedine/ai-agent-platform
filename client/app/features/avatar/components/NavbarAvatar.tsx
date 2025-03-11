'use client';

import React from 'react';
import { useAuth } from '@/app/features/authentication';
import UserAvatar from '@/app/components/UserAvatar';

export default function NavbarAvatar({ username }: { username: string }) {
	const { avatar } = useAuth();

	return (
		<UserAvatar
			testId={username}
			username={username || '?'}
			image={avatar}
		/>
	);
}
