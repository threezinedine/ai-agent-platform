/**
 * The object which can be watched by other object, the callbacks which are
 *      assinged to the signal will be called when the signal is triggered.
 * A signal can be attached to another signal, so when the parent signal is
 *      triggered, the child signal will be triggered too.
 */
export default class Signal {
	private callbacks: (() => void)[] = [];
	private signals: Signal[] = [];

	/**
	 * Add the callback to the signal.
	 * @param callback The callback which will be called when the signal is triggered.
	 * @param firstTrigger If the callback should be triggered when it is added (default is false).
	 */
	public add(callback: () => void, firstTrigger: boolean = false): void {
		this.callbacks.push(callback);

		if (firstTrigger) {
			callback();
		}
	}

	/**
	 * Remove the callback from the signal.
	 * @param callback The callback which will be removed from the signal.
	 */
	public remove(callback: () => void): void {
		this.callbacks = this.callbacks.filter((cb) => cb !== callback);
	}

	/**
	 * Attach the signal to another signal.
	 */
	public attach(signal: Signal): void {
		this.signals.push(signal);
	}

	/**
	 * Detach the signal from another signal.
	 */
	public detach(signal: Signal): void {
		this.signals = this.signals.filter((s) => s !== signal);
	}

	/**
	 * Trigger the signal.
	 */
	public trigger(): void {
		this.callbacks.forEach((cb) => cb());
		this.signals.forEach((s) => s.trigger());
	}
}
