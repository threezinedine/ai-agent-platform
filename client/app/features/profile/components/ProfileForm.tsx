'use client';

import React, { useRef } from 'react';
import Form from '@/app/components/Form';
import { useLang } from '@/app/features/language';
import clsx from 'clsx';
import Button from '@/app/components/Button';
import { useAuth } from '@/app/features/authentication';
import LoadingComponent from '@/app/components/LoadingComponent';

export default function ProfileForm() {
	const { t } = useLang();
	const formRef = useRef(null);
	const { authState, userInfo } = useAuth();

	function handleSubmit(data: { [key: string]: string }) {
		console.log(data);
	}

	return (
		<LoadingComponent
			state={authState}
			error={<div>{t('ERROR')}</div>}
			loaded={
				<>
					<div className={clsx('p-2')}>
						<Form
							ref={formRef}
							submitFunc={handleSubmit}
							name={t('PROFILE')}
							testId="profile-form"
							submitHidden
							shadowDisabled
							inputs={[
								{
									type: 'text',
									title: t('USERNAME'),
									testId: 'username',
									placeholder: t('ENTER_THE_USERNAME'),
									defaultValue: userInfo.username,
									disabled: true,
								},
								{
									type: 'email',
									title: t('EMAIL'),
									testId: 'email',
									placeholder: t('ENTER_THE_EMAIL'),
									defaultValue: userInfo.email,
								},
								{
									type: 'text',
									title: t('FULL_NAME'),
									testId: 'full-name',
									placeholder: t('ENTER_THE_FULL_NAME'),
									defaultValue: userInfo.fullName,
								},
							]}
						/>
					</div>
					<div className={clsx('pt-5')}>
						<div className={clsx('flex', 'justify-end', 'gap-3')}>
							<Button
								text={t('CANCEL')}
								variant="subtle"
							/>
							<Button
								text={t('SUBMIT')}
								variant="primary"
							/>
						</div>
					</div>
				</>
			}
		/>
	);
}
