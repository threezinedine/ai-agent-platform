'use client';

import React, { useEffect } from 'react';
import ProfilePageComponent from '@/app/features/profile';
import { useLang } from '@/app/features/language';

export default function ProfilePage() {
	const { t } = useLang();
	useEffect(() => {
		document.title = t('PROFILE');
	});

	return <ProfilePageComponent />;
}
