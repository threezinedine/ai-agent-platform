import HttpRequest, { Response } from '@/app/services/httpRequest';
import Storage from '@/app/utils/storage';

export default class NavbarRequest {
	private httpRequest: HttpRequest = new HttpRequest(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
	);

	async getAvatar(): Promise<Response<string>> {
		const token: string = await Storage.GetItem('token', '');

		return this.httpRequest.getImage('/users/avatar', token);
	}
}
