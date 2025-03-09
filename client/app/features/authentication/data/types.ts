export interface UserInfo {
	id: string;
	username: string;
	email: string;
	fullName: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	user: UserInfo;
}

export interface UserLoginInfo {
	username: string;
	password: string;
}
