import React from 'react';
import { ToastMessageProps } from './ToastProps';

export default function ToastMessage({ type, message }: ToastMessageProps) {
	return (
		<div className={`toast-message toast-message--${type}`}>{message}</div>
	);
}
