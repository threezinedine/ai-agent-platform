import { UserInfo } from '@/app/data/types';

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	user: UserInfo;
}

export interface UserLoginInfo {
	username: string;
	password: string;
}
