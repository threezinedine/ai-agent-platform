import Storage from '@/app/utils/storage';
import { expect } from '@jest/globals';

describe('storage', () => {
	it('should set and get item', async () => {
		const key = 'key';
		const value = 'value';
		await Storage.SetItem(key, value);

		Storage.GetItem(key, '').then((item) => {
			expect(item).toBe(value);
		});
	});

	it('should set and get non-string item', async () => {
		const key = 'key';
		const value = { key: 'value' };

		await Storage.SetItem(key, value);

		Storage.GetItem(key, '').then((item) => {
			expect(item).toEqual(value);
		});
	});

	it('should return default value if item does not exist', () => {
		Storage.GetItem('test', 'default').then((item) => {
			expect(item).toBe('default');
		});
	});

	it('should remove the key from storage', async () => {
		const key = 'key';
		const value = 'value';

		await Storage.SetItem(key, value);
		await Storage.RemoveItem(key);

		Storage.GetItem(key, '').then((item) => {
			expect(item).toBe('');
		});
	});

	it('should clear the storage', async () => {
		await Storage.SetItem('key', 'value');
		await Storage.SetItem('key2', 'value2');
		await Storage.ClearStorage();

		Storage.GetItem('key', '').then((item) => {
			expect(item).toBe('');
		});

		Storage.GetItem('key2', '').then((item) => {
			expect(item).toBe('');
		});
	});
});
