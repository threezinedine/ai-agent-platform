'use client';

import React, { useEffect } from 'react';
import useAuth from '@/app/features/authentication/hooks/Authorize';
import { useRouter } from 'next/navigation';
import LoadingPage from './LoadingPage';
import { AuthContext } from '../context/AuthContext';
import Storage from '@/app/utils/storage';

interface AuthenticatePageProps {
	children: React.ReactNode;
	loadingNode?: React.ReactNode;
	unauthorizedNode?: React.ReactNode;
}

export default function AuthenticatePage({
	children,
	loadingNode,
	unauthorizedNode,
}: AuthenticatePageProps) {
	const router = useRouter();
	const { isAuthorized, loading, user } = useAuth();

	useEffect(() => {
		(async () => {
			if (loading) {
				return;
			}

			if (!isAuthorized) {
				if (unauthorizedNode == null || unauthorizedNode == undefined) {
					router.push('/login');
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	function onLogout() {
		Storage.RemoveItem('token');
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthorized,
				logout: onLogout,
				user: user,
			}}
		>
			{loading && loadingNode && loadingNode}
			{loading && !loadingNode && <LoadingPage />}
			{!loading && isAuthorized && children}
			{!loading && !isAuthorized && unauthorizedNode}
		</AuthContext.Provider>
	);
}
