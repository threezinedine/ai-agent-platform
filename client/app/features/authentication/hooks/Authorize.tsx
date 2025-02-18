'use client';

import { useEffect, useState } from 'react';
import Storage from '@/app/utils/storage';
import AuthenRequest from '../services/authRequest';

export default function useAuth() {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [loading, setLoading] = useState(true);
	const authenRequest = new AuthenRequest();

	useEffect(() => {
		(async () => {
			const token = await Storage.GetItem('token', '');
			if (token !== '') {
				setIsAuthorized(true);
			}
			const response = await authenRequest.verifyToken(token);

			if (!response.isSuccess()) {
				setIsAuthorized(false);
			}

			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { isAuthorized, loading };
}
