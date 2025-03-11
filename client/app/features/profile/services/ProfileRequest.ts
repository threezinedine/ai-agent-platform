import { UserInfo } from '@/app/data/types';
import HttpRequest, { Response } from '@/app/services/httpRequest';
import { UpdateUserInfo } from '../data/types';
import Storage from '@/app/utils/storage';
import { authenticateConstants } from '@/app/features/authentication';

export class ProfileRequest {
	private httpRequest: HttpRequest = new HttpRequest(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
	);

	async updateProfile(data: {
		[key: string]: string;
	}): Promise<Response<UserInfo>> {
		const updatedData: UpdateUserInfo = {
			fullName: data.fullName || '',
			email: data.email || '',
			phone: data.phone || '',
		};

		const token = await Storage.GetItem(
			authenticateConstants.ACCESS_TOKEN_KEY,
			''
		);

		return this.httpRequest.put<UpdateUserInfo, UserInfo>(
			'/users/me',
			updatedData,
			token
		);
	}

	async getProfile(): Promise<Response<UserInfo>> {
		const token = await Storage.GetItem(
			authenticateConstants.ACCESS_TOKEN_KEY,
			''
		);

		return this.httpRequest.get<UserInfo>('/users/me', token);
	}
}
