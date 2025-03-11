'use client';

import React from 'react';
import LoadingComponent from '@/app/components/LoadingComponent';
import useAuth from '../hooks/authenticateHooks';

interface AuthenticatePageProps {
	children: React.ReactNode;
	unauthorizedNode?: React.ReactNode;
}

export default function AuthenticatePage({
	children,
	unauthorizedNode = null,
}: AuthenticatePageProps) {
	const { state, isAuthenticated } = useAuth();

	return (
		<LoadingComponent
			state={state}
			loaded={isAuthenticated ? children : unauthorizedNode}
		/>
	);
}
