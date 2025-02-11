import Signal from '../signal';
import { jest, expect } from '@jest/globals';

describe('Signal Testing', () => {
	it('should add a callback to the signal and trigger it', () => {
		const signal = new Signal();
		const callback = jest.fn();

		signal.add(callback);

		signal.trigger();

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should trigger the callback when it is added with firstTrigger set to true', () => {
		const signal = new Signal();
		const callback = jest.fn();

		signal.add(callback, true);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should trigger the attached signal when the parent signal is triggered', () => {
		const parentSignal = new Signal();
		const childSignal = new Signal();
		const callback = jest.fn();

		parentSignal.attach(childSignal);
		childSignal.add(callback);

		parentSignal.trigger();

		expect(callback).toHaveBeenCalledTimes(1);
	});
});
