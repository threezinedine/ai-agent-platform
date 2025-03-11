import { expect } from '@jest/globals';
import { formatString } from '@/app/utils/string_utils';

describe('formatString', () => {
	it('should replace the template with the params', () => {
		const template = 'Hello, ${name}';
		const params = { name: 'world' };

		expect(formatString(template, params)).toBe('Hello, world');
	});
});
