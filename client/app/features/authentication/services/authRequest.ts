import HttpRequest, { Response } from '@/app/services/httpRequest';
import { LoginResponse, UserLoginInfo } from '../data/types';

export default class AuthenRequest {
	private httpRequest: HttpRequest;

	constructor(baseUrl: string) {
		this.httpRequest = new HttpRequest(baseUrl);
	}

	async login(
		username: string,
		password: string
	): Promise<Response<LoginResponse>> {
		return this.httpRequest.post<UserLoginInfo, LoginResponse>('/login', {
			username,
			password,
		});
	}
}
