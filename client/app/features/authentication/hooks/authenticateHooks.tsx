'use client';

import Storage from '@/app/utils/storage';
import AuthenRequest from '../services/authRequest';
import { UserInfo } from '@/app/data/types';
import * as constants from '../data/constants';
import { create } from 'zustand';
import { LoadingComponentState } from '@/app/components/LoadingComponent';

interface ProfileState {
	authState: LoadingComponentState;
	isAuthenticated?: boolean;
	useLogout?: boolean;
	userInfo: UserInfo;
	avatar: string;
	reloadAvatar: () => void;
	reloadUserInfo: () => void;
	initialLoad: () => void;
	logout: () => void;
}

const authenRequest = new AuthenRequest();

const useAuth = create<ProfileState>((set) => ({
	authState: 'loading',
	isAuthenticated: false,
	userInfo: {
		id: '',
		username: '',
		email: '',
		fullName: '',
	},
	avatar: '',
	useLogout: false,
	reloadAvatar: async () => {
		set({ authState: 'loading' });
		const response = await authenRequest.getAvatar();
		if (response.isSuccess()) {
			set({
				avatar: response.getData() || '',
				authState: 'loaded',
				isAuthenticated: true,
			});
		} else {
			set({ authState: 'error', isAuthenticated: false });
		}
	},
	reloadUserInfo: async () => {
		set({ authState: 'loading' });

		const repsonse = await authenRequest.verifyToken();

		if (repsonse.isSuccess()) {
			set({
				userInfo: repsonse.getData() as UserInfo,
				authState: 'loaded',
				isAuthenticated: true,
			});
		} else {
			set({ authState: 'error', isAuthenticated: false });
		}
	},
	logout: async () => {
		set({ authState: 'loading', useLogout: true });
		await Storage.RemoveItem(constants.ACCESS_TOKEN_KEY);
		set({
			authState: 'loaded',
			isAuthenticated: false,
		});
	},
	initialLoad: async () => {
		set({ authState: 'loading', useLogout: false });

		const verifyResponse = await authenRequest.verifyToken();
		const avatarResponse = await authenRequest.getAvatar();
		if (verifyResponse.isSuccess() && avatarResponse.isSuccess()) {
			console.log(verifyResponse.getData(), avatarResponse.getData());
			set({
				isAuthenticated: true,
				userInfo: verifyResponse.getData() as UserInfo,
				avatar: avatarResponse.getData() || '',
				authState: 'loaded',
			});
		} else {
			set({ authState: 'error', isAuthenticated: false });
		}
	},
}));

export default useAuth;
