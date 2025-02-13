'use client';

import { useEffect, useState } from 'react';
import Storage from '@/app/utils/storage';

export default function useAuth() {
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		Storage.GetItem('token', '').then((token) => {
			if (token !== '') {
				setIsAuthorized(true);
			}
		});
	}, []);

	return isAuthorized;
}
