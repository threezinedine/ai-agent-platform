import HttpRequest, { Response } from '@/app/services/httpRequest';
import { LoginResponse, UserLoginInfo } from '../data/types';
import { UserInfo } from '@/app/data/types';

export default class AuthenRequest {
	private httpRequest: HttpRequest = new HttpRequest(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
	);

	async login(
		username: string,
		password: string
	): Promise<Response<LoginResponse>> {
		return this.httpRequest.post<UserLoginInfo, LoginResponse>(
			'/users/login',
			{
				username,
				password,
			}
		);
	}

	async register(
		username: string,
		password: string
	): Promise<Response<LoginResponse>> {
		return this.httpRequest.post<UserLoginInfo, LoginResponse>(
			'/users/register',
			{
				username,
				password,
			}
		);
	}

	async verifyToken(token: string): Promise<Response<UserInfo>> {
		return this.httpRequest.get<UserInfo>(`/users/me`, token);
	}
}
