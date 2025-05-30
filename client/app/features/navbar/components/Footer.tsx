'use client';

import clsx from 'clsx';
import React from 'react';
import FontAwesomeIcon from '@/app/components/FontAwesomeIcon';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Tooltip from '@/app/components/Tooltip';
import { useLang } from '@/app/features/language';

export default function Footer() {
	const { t } = useLang();
	const sitesInfo = [
		{
			name: 'Github',
			icon: <FontAwesomeIcon icon={faGithub} />,
			description: t('VIEW_SOURCE_CODE_ON_GITHUB'),
			link: 'https://github.com/threezinedine/ai-agent-platform',
		},
		{
			name: 'Youtube',
			icon: <FontAwesomeIcon icon={faYoutube} />,
			description: t('WATCH_LATEST_VIDEO_ON_YOUTUBE'),
			link: 'https://www.youtube.com/@thaonguyenthe2933',
		},
	];

	return (
		<footer
			className={clsx(
				'w-full',
				'py-6',
				'mt-auto',
				'border-t',
				'border-gray-200',
				'dark:border-gray-800',
				'select-none'
			)}
		>
			<div className={clsx('container', 'mx-auto')}>
				<div
					className={clsx(
						'flex',
						'flex-col',
						'md:flex-row',
						'items-center',
						'justify-between',
						'gap-4'
					)}
				>
					{/* Site Info */}
					<div
						className={clsx('text-center', 'md:text-left', 'px-8')}
					>
						<h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
							{t('AI_AGENT_PLATFORM')}
						</h3>
						<p
							className={clsx(
								'mt-1',
								'text-sm',
								'text-gray-600',
								'dark:text-gray-400'
							)}
						>
							{t('AI_AGENT_PLATFORM_DESCRIPTION')}
						</p>
					</div>

					{/* Contact Links */}
					<div
						className={clsx(
							'flex',
							'items-center',
							'gap-4',
							'mt-4',
							'md:mt-0',
							'px-8'
						)}
					>
						{sitesInfo.map((siteInfo, index) => (
							<Tooltip
								key={index}
								tooltip={<div>{siteInfo.description}</div>}
								position="left"
								offset={0}
							>
								<a
									href={siteInfo.link}
									aria-label={siteInfo.name}
									className={clsx(
										'p-2',
										'rounded-md',
										'text-gray-600',
										'dark:text-gray-400',
										'hover:text-gray-900',
										'dark:hover:text-gray-100',
										'hover:bg-gray-100',
										'dark:hover:bg-gray-800',
										'transition-colors',
										'duration-200'
									)}
									target="_blank"
									rel="noopener noreferrer"
								>
									{siteInfo.icon}
								</a>
							</Tooltip>
						))}
					</div>
				</div>

				{/* Copyright */}
				<div
					className={clsx(
						'mt-6',
						'pt-4',
						'border-t',
						'border-gray-100',
						'dark:border-gray-800',
						'text-center',
						'text-xs',
						'text-gray-500',
						'dark:text-gray-400'
					)}
				>
					© 2025 {t('AI_AGENT_PLATFORM')}. {t('ALL_RIGHTS_RESERVED')}
				</div>
			</div>
		</footer>
	);
}
