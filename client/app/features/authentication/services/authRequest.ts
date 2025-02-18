import HttpRequest, { Response } from '@/app/services/httpRequest';
import { LoginResponse, UserLoginInfo } from '../data/types';

export default class AuthenRequest {
	private httpRequest: HttpRequest = new HttpRequest(
		'http://localhost:8000/api/v1'
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

	async verifyToken(token: string): Promise<Response<LoginResponse>> {
		return this.httpRequest.get<LoginResponse>(`/users/me`, token);
	}
}
