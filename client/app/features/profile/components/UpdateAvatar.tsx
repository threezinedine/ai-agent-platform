import React from 'react';
import { useLang } from '@/app/features/language';
import Modal from '@/app/components/Modal';
import UserAvatar from '@/app/components/UserAvatar';
import FontAwesomeIcon from '@/app/components/FontAwesomeIcon';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function UpdateAvatar() {
	const { t } = useLang();

	return (
		<Modal
			trigger={
				<UserAvatar
					username="Thao"
					size="6xl"
					hoverIcon={
						<FontAwesomeIcon
							icon={faCamera}
							width={30}
							height={30}
						/>
					}
				/>
			}
			actions={[
				{
					testId: 'update-avatar',
					text: t('UPDATE'),
					type: 'close',
				},
			]}
		>
			<div>{t('UPDATE_AVATAR')}</div>
		</Modal>
	);
}
