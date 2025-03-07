import axios, { AxiosError } from 'axios';

export class Response<T> {
	private status: number;
	private data: T | null;
	private message: string; // Only for error response

	constructor(status: number, data: T | null, message: string) {
		this.status = status;
		this.data = data;
		this.message = message;
	}

	public isSuccess(): boolean {
		return this.status >= 200 && this.status < 300;
	}

	public getData(): T | null {
		return this.data;
	}

	public getMessage(): string {
		return this.message;
	}
}

class HttpRequest {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async get<T>(url: string, token: string = ''): Promise<Response<T>> {
		const header = token ? { Authorization: token } : {};

		try {
			const response = await axios.get<T>(`${this.baseUrl}${url}`, {
				headers: header,
			});
			return new Response<T>(response.status, response.data, '');
		} catch (error: unknown) {
			if (!axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				return new Response<T>(
					axiosError.response ? axiosError.response.status : 500,
					null,
					axiosError.response
						? (axiosError.response.data as { message: string })
								.message
						: 'An error occurred'
				);
			} else {
				return new Response<T>(1000, null, 'Unknown error');
			}
		}
	}

	async getImage(url: string, token: string = ''): Promise<Response<string>> {
		url = `${this.baseUrl}${url}`;
		const header = token ? { Authorization: token } : {};

		try {
			const response = await axios.get(url, {
				headers: header,
				responseType: 'blob',
			});

			const reader = new FileReader();
			reader.readAsDataURL(response.data);
			const blob = response.data;
			const imageURL = URL.createObjectURL(blob);
			return new Promise((resolve) => {
				reader.onloadend = () => {
					resolve(
						new Response<string>(response.status, imageURL, '')
					);
				};
			});
		} catch (error: unknown) {
			if (!axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				return new Response<string>(
					axiosError.response ? axiosError.response.status : 500,
					null,
					axiosError.response
						? (axiosError.response.data as { message: string })
								.message
						: 'An error occurred'
				);
			} else {
				return new Response<string>(1000, null, 'Unknown error');
			}
		}
	}

	async post<K, T>(url: string, data: K): Promise<Response<T>> {
		const response = await axios.post<T>(`${this.baseUrl}${url}`, data);
		return new Response<T>(response.status, response.data, '');
	}
}

export default HttpRequest;
