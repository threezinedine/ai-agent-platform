import HttpRequest, { Response } from '@/app/services/httpRequest';
import Storage from '@/app/utils/storage';
import { authenticateConstants } from '@/app/features/authentication';

export default class AvatarRequest {
	private httpRequest: HttpRequest = new HttpRequest(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
	);

	async getAvatar(): Promise<Response<string>> {
		const token: string = await Storage.GetItem(
			authenticateConstants.ACCESS_TOKEN_KEY,
			''
		);

		return this.httpRequest.getImage('/users/avatar', token);
	}

	async updateAvatar(file: File): Promise<Response<string>> {
		const token: string = await Storage.GetItem(
			authenticateConstants.ACCESS_TOKEN_KEY,
			''
		);

		const formData = new FormData();
		formData.append('avatar', file);

		return this.httpRequest.putForm('/users/avatar', formData, token);
	}
}
