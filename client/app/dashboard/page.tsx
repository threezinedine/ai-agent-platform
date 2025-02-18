'use client';

import React from 'react';
import AuthenticatePage from '@/app/features/authentication/components/AuthenticatePage';
import DashboardLoading from './loading';

function DashboardPage() {
	return <div>Dashboard Page</div>;
}

export default function Dashboard() {
	return (
		<AuthenticatePage loadingNode={<DashboardLoading />}>
			<DashboardPage />
		</AuthenticatePage>
	);
}
