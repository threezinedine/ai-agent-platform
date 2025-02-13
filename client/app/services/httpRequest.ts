import axios from 'axios';

export class Response<T> {
	private status: number;
	private data: T;
	private message: string; // Only for error response

	constructor(status: number, data: T, message: string) {
		this.status = status;
		this.data = data;
		this.message = message;
	}

	public isSuccess(): boolean {
		return this.status >= 200 && this.status < 300;
	}

	public getData(): T {
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

	async get<T>(url: string): Promise<Response<T>> {
		const response = await axios.get<T>(`${this.baseUrl}${url}`);
		return new Response<T>(response.status, response.data, '');
	}

	async post<K, T>(url: string, data: K): Promise<Response<T>> {
		const response = await axios.post<T>(`${this.baseUrl}${url}`, data);
		return new Response<T>(response.status, response.data, '');
	}
}

export default HttpRequest;
