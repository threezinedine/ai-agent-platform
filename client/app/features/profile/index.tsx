'use client';

import clsx from 'clsx';
import Form from '@/app/components/Form';
import SocialLink from './components/SocialLink';
import FontAwesomeIcon from '@/app/components/FontAwesomeIcon';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useRef } from 'react';
import Button from '@/app/components/Button';
import { useLang } from '../language';
import UpdateAvatar from './components/UpdateAvatar';

export default function ProfilePageComponent() {
	const formRef = useRef(null);
	const { t } = useLang();

	return (
		<div
			className={clsx(
				'min-h-screen',
				'bg-gray-50',
				'dark:bg-gray-900',
				'py-12',
				'px-4',
				'sm:px-6',
				'lg:px-8',
				'select-none'
			)}
		>
			<div className={clsx('max-w-6xl', 'mx-auto', 'select-none')}>
				<div className={clsx('text-center', 'mb-10')}>
					<h1
						className={clsx(
							'text-3xl',
							'font-bold',
							'text-gray-900',
							'dark:text-white'
						)}
					>
						{t('EDIT_PROFILE')}
					</h1>
					<p
						className={clsx(
							'mt-2',
							'text-gray-600',
							'dark:text-gray-400'
						)}
					>
						{t('EDIT_PROFILE_DESCRIPTION')}
					</p>
				</div>
			</div>
			<div
				className={clsx(
					'bg-white',
					'dark:bg-gray-800',
					'rounded-xl',
					'shadow-lg',
					'overflow-hidden',
					'flex'
				)}
			>
				<div
					className={clsx(
						'md:w-1/3',
						'border-r',
						'border-gray-200',
						'dark:border-gray-700'
					)}
				>
					<div
						className={clsx(
							'p-2',
							'flex',
							'justify-center',
							'my-8'
						)}
					>
						<UpdateAvatar />
					</div>
					<div className={clsx('p-2')}>
						<h3
							className={clsx(
								'text-lg',
								'font-medium',
								'text-gray-900',
								'dark:text-white',
								'mb-4',
								'text-center'
							)}
						>
							{t('PLATFORM_LINKS')}
						</h3>
						<div className={clsx('space-y-4')}>
							<SocialLink
								icon={<FontAwesomeIcon icon={faGithub} />}
								name="github"
								label="GitHub"
							/>
						</div>
					</div>
				</div>
				<div className={clsx('md:w-2/3', 'p-8')}>
					<div className={clsx('p-8')}>
						<Form
							ref={formRef}
							testId="profile"
							shadowDisabled
							name={t('PROFILE')}
							inputs={[
								{
									type: 'text',
									title: t('USERNAME'),
									testId: 'profile-username',
									placeholder: t('ENTER_THE_USERNAME'),
								},
								{
									type: 'email',
									title: t('EMAIL'),
									testId: 'profile-email',
									placeholder: t('ENTER_THE_EMAIL'),
								},
							]}
							submitHidden
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
				</div>
			</div>
		</div>
	);
}
