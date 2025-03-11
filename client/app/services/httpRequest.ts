import axios, { AxiosError } from 'axios';
import { languageConstants } from '@/app/features/language';

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
	private static language: languageConstants.Language =
		languageConstants.LANGUAGE_EN;

	static setLanguage(language: languageConstants.Language): void {
		HttpRequest.language = language;
	}

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async get<T>(url: string, token: string = ''): Promise<Response<T>> {
		const header = token
			? { Authorization: token, language: HttpRequest.language }
			: { language: HttpRequest.language };

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
						: HttpRequest.language == languageConstants.LANGUAGE_EN
						? 'Unknown error 1'
						: 'Lỗi không xác định'
				);
			} else {
				return new Response<T>(
					1000,
					null,
					HttpRequest.language == languageConstants.LANGUAGE_EN
						? 'Unknown error 2'
						: 'Lỗi không xác định'
				);
			}
		}
	}

	async getImage(url: string, token: string = ''): Promise<Response<string>> {
		url = `${this.baseUrl}${url}`;
		const header = token
			? { Authorization: token, language: HttpRequest.language }
			: { language: HttpRequest.language };

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

	async putForm(
		url: string,
		form: FormData,
		token: string = ''
	): Promise<Response<string>> {
		const header = token
			? {
					Authorization: token,
					language: HttpRequest.language,
					'Content-Type': 'multipart/form-data',
			  }
			: {
					language: HttpRequest.language,
					'Content-Type': 'multipart/form-data',
			  };

		try {
			const reponse = await axios.put<string>(
				`${this.baseUrl}${url}`,
				form,
				{
					withCredentials: true,
					headers: header,
				}
			);

			return new Response<string>(reponse.status, reponse.data, '');
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
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

	async post<K, T>(
		url: string,
		data: K,
		token: string = ''
	): Promise<Response<T>> {
		const header = token
			? { Authorization: token, language: HttpRequest.language }
			: { language: HttpRequest.language };

		try {
			const response = await axios.post<T>(
				`${this.baseUrl}${url}`,
				data,
				{
					headers: header,
				}
			);
			return new Response<T>(response.status, response.data, '');
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				return new Response<T>(
					axiosError.response ? axiosError.response.status : 500,
					null,
					axiosError.response
						? (axiosError.response.data as { detail: string })
								.detail
						: HttpRequest.language == languageConstants.LANGUAGE_EN
						? 'Unknown error 3'
						: 'Lỗi không xác định'
				);
			} else {
				return new Response<T>(
					1000,
					null,
					HttpRequest.language == languageConstants.LANGUAGE_EN
						? 'Unknown error 4'
						: 'Lỗi không xác định'
				);
			}
		}
	}
}

export default HttpRequest;
