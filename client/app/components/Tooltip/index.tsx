import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

export default function Tooltip({
	children,
	tooltip,
	position = 'top',
	theme = 'dark',
	shadow = 'md',
	animation = 'fade',
	delay = 300,
	offset = 8,
}: {
	children: React.ReactNode;
	offset?: number;
	position?: 'top' | 'bottom' | 'left' | 'right';
	theme?:
		| 'dark'
		| 'light'
		| 'blue'
		| 'green'
		| 'red'
		| 'purple'
		| 'amber'
		| 'teal'
		| 'gradient';
	tooltip: React.ReactNode;
	shadow?: 'sm' | 'md' | 'lg' | 'xl';
	animation?: 'fade' | 'scale' | 'slide';
	delay?: number;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	const targetRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);

	function handleMouseEnter() {
		setIsHovered(true);
	}

	function handleMouseLeave() {
		setIsHovered(false);
	}

	const themeStyles = {
		dark: clsx('bg-gray-800', 'text-white', 'dark:bg-gray-900'),
		light: clsx(
			'bg-white',
			'text-gray-800',
			'border',
			'border-gray-200',
			'dark:bg-gray-800',
			'dark:text-white',
			'dark:border-gray-700'
		),
		blue: clsx('bg-blue-600', 'text-white', 'dark:bg-blue-700'),
		green: clsx('bg-green-600', 'text-white', 'dark:bg-green-700'),
		red: clsx('bg-red-600', 'text-white', 'dark:bg-red-700'),
		purple: clsx('bg-purple-600', 'text-white', 'dark:bg-purple-700'),
		amber: clsx('bg-amber-500', 'text-white', 'dark:bg-amber-600'),
		teal: clsx('bg-teal-500', 'text-white', 'dark:bg-teal-600'),
		gradient: clsx(
			'bg-gradient-to-r',
			'from-blue-700',
			'to-purple-700',
			'text-white'
		),
	};

	const shadowStyles = {
		sm: clsx('shadow-sm'),
		md: clsx('shadow-md'),
		lg: clsx('shadow-lg'),
		xl: clsx('shadow-xl'),
	};

	const animationStyles = {
		fade: clsx('transition-opacity', 'duration-200'),
		scale: clsx('transition-all', 'duration-200', 'transform'),
		slide: clsx('transition-all', 'duration-200'),
	};

	const animationEnters = {
		fade: clsx('opacity-0'),
		scale: clsx('opacity-0', 'scale-95'),
		slide: clsx('opacity-0', 'translate-y-2'),
	};

	useEffect(() => {
		let timeoutId;

		if (isHovered) {
			timeoutId = setTimeout(() => {
				setIsVisible(true);
			}, delay);
		} else {
			timeoutId = setTimeout(() => {
				setIsVisible(false);
			}, 100);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isHovered, delay]);

	useEffect(() => {
		if (isVisible && targetRef.current && tooltipRef.current) {
			updatePosition();
			window.addEventListener('resize', updatePosition);
			window.addEventListener('scroll', updatePosition);

			return () => {
				window.removeEventListener('resize', updatePosition);
				window.removeEventListener('scroll', updatePosition);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible, position]);

	const updatePosition = () => {
		const targetRect = targetRef.current?.getBoundingClientRect();
		const tooltipRect = tooltipRef.current?.getBoundingClientRect();
		const scrollX =
			window.pageXOffset || document.documentElement.scrollLeft;
		const scrollY =
			window.pageYOffset || document.documentElement.scrollTop;

		let x = 0;
		let y = 0;

		if (!targetRect || !tooltipRect) {
			return;
		}

		// Calculate position
		switch (position) {
			case 'top':
				x =
					targetRect.left +
					targetRect.width / 2 -
					tooltipRect.width / 2 +
					scrollX;
				y = targetRect.top - tooltipRect.height - offset + scrollY;
				break;
			case 'bottom':
				x =
					targetRect.left +
					targetRect.width / 2 -
					tooltipRect.width / 2 +
					scrollX;
				y = targetRect.bottom + offset + scrollY;
				break;
			case 'left':
				x = targetRect.left - tooltipRect.width - offset + scrollX;
				y =
					targetRect.top +
					targetRect.height / 2 -
					tooltipRect.height / 2 +
					scrollY;
				break;
			case 'right':
				x = targetRect.right + offset + scrollX;
				y =
					targetRect.top +
					targetRect.height / 2 -
					tooltipRect.height / 2 +
					scrollY;
				break;
		}

		// Ensure tooltip stays within viewport
		const padding = 10;
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Check horizontal bounds
		if (x < padding) {
			x = padding;
		} else if (x + tooltipRect.width > viewportWidth - padding) {
			x = viewportWidth - tooltipRect.width - padding;
		}

		// Check vertical bounds
		if (y < padding) {
			y = padding;
		} else if (y + tooltipRect.height > viewportHeight - padding) {
			y = viewportHeight - tooltipRect.height - padding;
		}

		setTooltipPosition({ x, y });
	};

	return (
		<div
			className={clsx('relative', 'inline-block')}
			ref={targetRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleMouseEnter}
			onBlur={handleMouseLeave}
		>
			{children}

			{isVisible && isHovered && (
				<div
					ref={tooltipRef}
					className={clsx(
						'fixed',
						'z-50',
						'max-w-xs',
						'px-3',
						'py-2',
						'rounded-lg',
						themeStyles[theme],
						shadowStyles[shadow],
						animationStyles[animation],
						isVisible ? 'opacity-100' : animationEnters[animation]
					)}
					style={{
						left: `${tooltipPosition.x}px`,
						top: `${tooltipPosition.y}px`,
						backdropFilter:
							theme === 'light' ? 'blur(8px)' : undefined,
						boxShadow:
							theme === 'light'
								? '0 4px 6px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)'
								: undefined,
					}}
				>
					{tooltip}
				</div>
			)}
		</div>
	);
}
