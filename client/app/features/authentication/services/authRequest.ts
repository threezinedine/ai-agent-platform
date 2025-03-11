import HttpRequest, { Response } from '@/app/services/httpRequest';
import { LoginResponse, UserLoginInfo } from '../data/types';
import { UserInfo } from '@/app/data/types';
import Storage from '@/app/utils/storage';
import * as authenticateConstants from '../data/constants';

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

	async verifyToken(): Promise<Response<UserInfo>> {
		const token = await Storage.GetItem(
			authenticateConstants.ACCESS_TOKEN_KEY,
			''
		);

		if (!token) {
			return new Response<UserInfo>(401, null, 'Unauthorized');
		}

		return this.httpRequest.get<UserInfo>(`/users/me`, token);
	}

	async getAvatar(): Promise<Response<string>> {
		const token: string = await Storage.GetItem(
			authenticateConstants.ACCESS_TOKEN_KEY,
			''
		);

		return this.httpRequest.getImage('/users/avatar', token);
	}
}
