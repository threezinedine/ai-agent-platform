class Storage {
	static GetItem<T>(key: string, defaultValue: T): Promise<T> {
		const item = localStorage.getItem(key);

		if (!item) {
			return Promise.resolve(defaultValue);
		}
		if (typeof defaultValue === 'string') {
			return Promise.resolve(item as T);
		}
		return Promise.resolve(JSON.parse(item));
	}

	static SetItem<T>(key: string, value: T): Promise<void> {
		localStorage.setItem(key, JSON.stringify(value));
		return Promise.resolve();
	}

	static RemoveItem(key: string): Promise<void> {
		localStorage.removeItem(key);
		return Promise.resolve();
	}

	static ClearStorage(): Promise<void> {
		localStorage.clear();

		return Promise.resolve();
	}
}

export default Storage;
