'use client';

import Storage from '@/app/utils/storage';
import AuthenRequest from '../services/authRequest';
import { UserInfo } from '@/app/data/types';
import * as constants from '../data/constants';
import { create } from 'zustand';
import { LoadingComponentState } from '@/app/components/LoadingComponent';

interface ProfileState {
	state: LoadingComponentState;
	isAuthenticated?: boolean;
	userInfo: UserInfo;
	avatar: string;
	reloadAvatar: () => void;
	logout: () => void;
	reloadUserInfo: () => void;
	initialLoad: () => void;
}

const authenRequest = new AuthenRequest();

const useAuth = create<ProfileState>((set) => ({
	state: 'loading',
	isAuthenticated: false,
	userInfo: {
		id: '',
		username: '',
		email: '',
		fullName: '',
	},
	avatar: '',
	reloadAvatar: async () => {
		set({ state: 'loading' });
		const response = await authenRequest.getAvatar();
		if (response.isSuccess()) {
			set({
				avatar: response.getData() || '',
				state: 'loaded',
				isAuthenticated: true,
			});
		} else {
			set({ state: 'error', isAuthenticated: false });
		}
	},
	reloadUserInfo: async () => {
		set({ state: 'loading' });

		const repsonse = await authenRequest.verifyToken();

		if (repsonse.isSuccess()) {
			set({
				userInfo: repsonse.getData() as UserInfo,
				state: 'loaded',
				isAuthenticated: true,
			});
		} else {
			set({ state: 'error', isAuthenticated: false });
		}
	},
	logout: async () => {
		set({ state: 'loading' });
		await Storage.RemoveItem(constants.ACCESS_TOKEN_KEY);
		set({ state: 'loaded', isAuthenticated: false });
	},
	initialLoad: async () => {
		set({ state: 'loading' });

		const verifyResponse = await authenRequest.verifyToken();
		const avatarResponse = await authenRequest.getAvatar();
		if (verifyResponse.isSuccess() && avatarResponse.isSuccess()) {
			console.log(verifyResponse.getData(), avatarResponse.getData());
			set({
				isAuthenticated: true,
				userInfo: verifyResponse.getData() as UserInfo,
				avatar: avatarResponse.getData() || '',
				state: 'loaded',
			});
		} else {
			set({ state: 'error', isAuthenticated: false });
		}
	},
}));

export default useAuth;
