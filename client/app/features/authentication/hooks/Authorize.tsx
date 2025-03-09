'use client';

import { useEffect, useState } from 'react';
import Storage from '@/app/utils/storage';
import AuthenRequest from '../services/authRequest';
import { UserInfo } from '../data/types';

export default function useAuth() {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [user, setUser] = useState<UserInfo | null | undefined>(null);
	const [loading, setLoading] = useState(true);
	const authenRequest = new AuthenRequest();

	useEffect(() => {
		(async () => {
			const token = await Storage.GetItem('accessToken', '');
			if (token !== '') {
				setIsAuthorized(true);
			}
			const response = await authenRequest.verifyToken(token);

			if (!response.isSuccess()) {
				setIsAuthorized(false);
			} else {
				setUser(response.getData());
			}

			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { isAuthorized, loading, user };
}
