'use client';

import clsx from 'clsx';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
	const router = useRouter();

	return (
		<footer
			className={clsx(
				'max-w-7xl',
				'mx-auto',
				'px-4',
				'sm:px-6',
				'lg:px-8',
				'py-12'
			)}
		>
			<div
				className={clsx(
					'grid',
					'grid-cols-1',
					'md:grid-cols-2',
					'lg:grid-cols-4',
					'gap-8'
				)}
			>
				<div
					className={clsx(
						'col-span-1',
						'lg:col-span-1',
						'select-none'
					)}
				>
					<div
						className={clsx(
							'flex',
							'items-center',
							'mb-5',
							'flex-col'
						)}
					>
						<div
							className={clsx(
								'h-10',
								'w-10',
								'rounded-full',
								'bg-indigo-600',
								'flex',
								'flex-shrink-0',
								'items-center',
								'justify-center'
							)}
						>
							<span
								className={clsx(
									'text-white',
									'font-bold',
									'text-lg',
									'rounded-full'
								)}
							>
								N
							</span>
							<h2
								className={clsx(
									'ml-3',
									'text-xl',
									'font-bold',
									'text-gray-800',
									'dark:text-white'
								)}
							>
								NextBrand
							</h2>
						</div>
						<p
							className={clsx(
								'text-gray-600',
								'dark:text-gray-400',
								'mb-6',
								'mt-6'
							)}
						>
							Creating beautiful digital experiences with Next.js
							and React.
						</p>
						<div className={clsx('flex', 'space-x-4')}></div>
					</div>
				</div>
				<div className={clsx('col-span-1')}>
					<h3
						className={clsx(
							'text-sm',
							'font-semibold',
							'text-gray-900',
							'dark:text-white',
							'uppercase',
							'tracking-wider',
							'mb-4'
						)}
					>
						Quick Links
					</h3>
					<ul className={clsx('space-y-3')}>
						{[
							'Home',
							'About',
							'Services',
							'Portfolio',
							'Blog',
							'Contact',
						].map((item) => (
							<li key={item}>
								<div
									className={clsx(
										'text-gray-600',
										'dark:text-gray-400',
										'hover:text-indigo-500',
										'dark:hover:text-indigo-400',
										'transition-colors',
										'duration-300',
										'cursor-pointer'
									)}
									onClick={() =>
										router.push(`/${item.toLowerCase()}`)
									}
								>
									{item}
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className={clsx('col-span-1')}>
					<h3
						className={clsx(
							'text-sm',
							'font-semibold',
							'text-gray-900',
							'dark:text-white',
							'uppercase',
							'tracking-wider',
							'mb-4'
						)}
					>
						Contact Us
					</h3>
					<ul className={clsx('space-y-3')}>
						<li className={clsx('flex', 'items-start')}>
							{/* <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" /> */}
							<span
								className={clsx(
									'text-gray-600',
									'dark:text-gray-400'
								)}
							>
								123 Innovation Drive, Tech Valley, CA 94043
							</span>
						</li>
						<li className={clsx('flex', 'items-center')}>
							{/* <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" /> */}
							<span
								className={clsx(
									'text-gray-600',
									'dark:text-gray-400'
								)}
							>
								(+84) 337 922 756
							</span>
						</li>
						<li className={clsx('flex', 'items-center')}>
							{/* <Mail className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" /> */}
							<span
								className={clsx(
									'text-gray-600',
									'dark:text-gray-400'
								)}
							>
								threezinedine@gmail.com
							</span>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
