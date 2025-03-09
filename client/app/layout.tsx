import '@/app/assets/globals.css';
import Toast from './features/toast';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'AI Agent Platform',
	description: 'An open-source project for building AI agents',
	icons: {
		icon: '/favicon.ico', // Place this file in the public directory
		shortcut: '/b-logo.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div>{children}</div>
				<Toast />
			</body>
		</html>
	);
}
