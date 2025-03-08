import clsx from 'clsx';
import React, { useRef, useState } from 'react';

interface ModalAction {
	testId: string;
	type: 'close' | 'non-close';
	text: string;
	onClick?: () => void;
}

export default function Modal({
	onOpenModal,
	onCloseModal,
	children,
	trigger = null,
	actions = [
		{
			testId: 'modal-close',
			type: 'close',
			text: 'Close',
		},
	],
	testId = 'modal',
}: {
	onOpenModal?: () => void;
	onCloseModal?: () => void;
	children?: React.ReactNode;
	trigger?: React.ReactNode;
	actions?: ModalAction[];
	testId?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const modalContentRef = useRef<HTMLDivElement>(null);

	function handleOpen() {
		setIsOpen(true);

		if (onOpenModal) {
			onOpenModal();
		}
	}

	function handleClose() {
		setIsOpen(false);

		if (onCloseModal) {
			onCloseModal();
		}
	}

	function handleModalAction(action: ModalAction) {
		if (action.type === 'close') {
			handleClose();
		}

		if (action.onClick) {
			action.onClick();
		}
	}

	function handleClickOutside(event: React.MouseEvent<HTMLDivElement>) {
		if (
			modalContentRef.current &&
			!modalContentRef.current.contains(event.target as Node)
		) {
			return;
		}

		handleClose();
	}

	return (
		<div className={clsx('select-none', 'inline-block')}>
			<div
				data-testid={`${testId}-trigger`}
				onClick={handleOpen}
			>
				{trigger ? (
					trigger
				) : (
					<div
						className={clsx(
							'inline-block',
							'px-6',
							'py-3',
							'bg-indigo-600',
							'text-white',
							'rounded-lg',
							'font-medium',
							'cursor-pointer'
						)}
					>
						Button
					</div>
				)}
			</div>
			{isOpen && (
				<div
					data-testid={testId}
					onClick={handleClickOutside}
					className={clsx(
						'fixed',
						'inset-0',
						'flex',
						'z-50',
						'items-center',
						'justify-center',
						'p-5'
					)}
				>
					<div
						ref={modalContentRef}
						className={clsx(
							'absolute',
							'inset-0',
							'bg-black/50',
							'backdrop-blur-sm'
						)}
					></div>
					<div
						className={clsx(
							'relative',
							'z-10',
							'bg-white',
							'rounded-xl',
							'shadow-2xl',
							'max-w-md',
							'w-full',
							'transform',
							'transition-all',
							'animate-fadeIn'
						)}
					>
						<div
							className={clsx(
								'p-6',
								'bg-white',
								'dark:bg-gray-800',
								'rounded-t-xl'
							)}
						>
							<div
								className={clsx(
									'flex',
									'justify-center',
									'item-start',
									'mb-4'
								)}
							>
								{children}
							</div>
						</div>
						<div
							data-testid="modal-actions"
							className={clsx(
								'space-y-4',
								'bg-gray-50',
								'dark:bg-gray-700',
								'px-6',
								'py-4',
								'rounded-b-xl'
							)}
						>
							<div className={clsx('flex', 'justify-end')}>
								{actions.map((action) => (
									<div
										key={action.testId}
										data-testid={action.testId}
										className={clsx(
											'inline-block',
											'px-4',
											'py-2',
											action.type === 'close'
												? clsx(
														'border',
														'border-gray-300',
														'dark:border-gray-600',
														'hover:bg-gray-100',
														'dark:hover:bg-gray-600'
												  )
												: clsx(
														'bg-indigo-600',
														'text-white',
														'hover:bg-indigo-700',
														'rounded-lg'
												  ),
											'rounded-lg',
											'font-medium',
											'cursor-pointer'
										)}
										onClick={handleModalAction.bind(
											null,
											action
										)}
									>
										{action.text}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
