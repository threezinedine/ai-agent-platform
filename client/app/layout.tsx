import '@/app/assets/globals.css';
import Toast from './features/toast';

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
