export interface UserInfo {
	id: string;
	username: string;
	email: string;
	fullName: string;
}

export interface LoginResponse {
	token: string;
	user: UserInfo;
}

export interface UserLoginInfo {
	username: string;
	password: string;
}
