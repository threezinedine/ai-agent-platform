import { ToastMessageProps } from '../components/ToastProps';

export default class ToastService {
	private static toastInstance: ToastService;

	private toastMessages: ToastMessageProps[] = [];
	private onChangedCallback: () => void;

	private constructor() {
		this.onChangedCallback = () => {};
	}

	public static getInstance(): ToastService {
		if (!ToastService.toastInstance) {
			ToastService.toastInstance = new ToastService();
		}

		return ToastService.toastInstance;
	}

	public setOnChangedCallback(callback: () => void) {
		this.onChangedCallback = callback;
	}

	public getToastMessages() {
		return this.toastMessages;
	}

	public addToastMessage(message: ToastMessageProps) {
		if (this.toastMessages.includes(message)) {
			return;
		}

		this.toastMessages.push(message);
		this.onChangedCallback();

		new Promise<void>((resolve) => {
			setTimeout(() => resolve(), message.duration || 5000);
		}).then(() => {
			if (this.toastMessages.includes(message)) {
				this.toastMessages.splice(
					this.toastMessages.indexOf(message),
					1
				);
				this.onChangedCallback();
			}
		});
	}
}
