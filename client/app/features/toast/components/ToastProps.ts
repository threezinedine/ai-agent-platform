export interface ToastMessageProps {
	type: 'success' | 'error' | 'info' | 'warning';
	message: string;
	duration?: number;
}
