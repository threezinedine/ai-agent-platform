import 'react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest } from '@jest/globals';
import { Button } from '../Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button Testing', () => {
	it('renders button without label', () => {
		render(<Button />);

		expect(screen.getByText('Button')).toBeInstanceOf(HTMLDivElement);
	});

	it('should call the onClick function if clicked', () => {
		const onClickFn = jest.fn();
		render(<Button onClick={onClickFn} />);
		fireEvent.click(screen.getByText('Button'));
		expect(onClickFn).toHaveBeenCalledTimes(1);
	});

	it('should not call the onClick function if clicked in disable mode', () => {
		const onClickFn = jest.fn();
		render(
			<Button
				onClick={onClickFn}
				disabled
			/>
		);

		fireEvent.click(screen.getByText('Button'));
		expect(onClickFn).toHaveBeenCalledTimes(0);
	});
});
