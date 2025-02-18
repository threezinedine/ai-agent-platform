'use client';

import React, { useEffect } from 'react';
import useAuth from '@/app/features/authentication/hooks/Authorize';
import { useRouter } from 'next/navigation';

interface AuthenticatePageProps {
	children: React.ReactNode;
	loadingNode: React.ReactNode;
}

export default function AuthenticatePage({
	children,
	loadingNode,
}: AuthenticatePageProps) {
	const router = useRouter();
	const { isAuthorized, loading } = useAuth();

	useEffect(() => {
		(async () => {
			if (loading) {
				return;
			}

			if (!isAuthorized) {
				router.push('/login');
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return <div>{loading ? loadingNode : children}</div>;
}
