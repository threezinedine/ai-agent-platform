'use client';

import React from 'react';
import UserAvatar from '@/app/components/UserAvatar';
import { useAuth } from '@/app/features/authentication';
import FontAwesomeIcon from '@/app/components/FontAwesomeIcon';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import AvatarRequest from '../services/avatarRequest';
import { ToastService } from '@/app/features/toast';
import { useLang } from '@/app/features/language';

export default function UpdateAvatar() {
	const { t } = useLang();
	const { avatar, reloadAvatar } = useAuth();
	const avatarRequest = new AvatarRequest();

	async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const response = await avatarRequest.updateAvatar(file);

			if (response.isSuccess()) {
				await reloadAvatar();
				ToastService.getInstance().addToastMessage({
					message: t('AVATAR_UPDATED_SUCCESSFULLY'),
					type: 'success',
					duration: 1000,
				});
			} else {
				ToastService.getInstance().addToastMessage({
					message: response.getMessage(),
					type: 'error',
					duration: 1000,
				});
			}
		}
	}

	return (
		<UserAvatar
			username="Thao"
			size="6xl"
			image={avatar}
			hoverIcon={
				<div onClick={() => document.getElementById('avatar')?.click()}>
					<FontAwesomeIcon
						icon={faCamera}
						width={30}
						height={30}
					/>
					<input
						type="file"
						accept="image/*"
						className={clsx('hidden')}
						id="avatar"
						onChange={handleAvatarChange}
					/>
				</div>
			}
		/>
	);
}
