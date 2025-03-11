'use client';

import React from 'react';
import { useAvatar } from '../contexts/AvatarContexts';
import UserAvatar from '@/app/components/UserAvatar';

export default function NavbarAvatar({ username }: { username: string }) {
	const { avatar } = useAvatar();

	return (
		<UserAvatar
			testId={username}
			username={username || '?'}
			image={avatar}
		/>
	);
}
