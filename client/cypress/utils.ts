export function Random(length: number): string {
	const bank =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += bank[Math.floor(Math.random() * bank.length)];
	}

	return result;
}
