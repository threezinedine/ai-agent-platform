import HttpRequest from '@/app/services/httpRequest';

export default class NavbarRequest {
	private httpRequest: HttpRequest = new HttpRequest(
		`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
	);
}
