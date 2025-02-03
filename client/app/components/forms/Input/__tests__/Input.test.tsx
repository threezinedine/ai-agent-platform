import 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../Input';
import { describe, expect, it } from '@jest/globals';

describe('Input', () => {
	const minLength5ErrorMessage = 'Input should be at least 5 characters long';

	function RenderInputWithMinLength5() {
		render(
			<Input
				dataTestId="test-input"
				validators={[
					{
						validate: (value) => value.length > 5,
						message: minLength5ErrorMessage,
					},
				]}
			/>
		);
	}

	it('should render an input element', () => {
		render(
			<Input
				title="Test Input"
				dataTestId="test-input"
			/>
		);

		expect(screen.getByTestId('test-input')).toBeInstanceOf(
			HTMLInputElement
		);
		expect(screen.getByText('Test Input')).toBeInstanceOf(HTMLDivElement);
	});

	it('should render input with title default Input when no title is provided', () => {
		render(<Input dataTestId="test-input" />);

		expect(screen.getByText('Input')).toBeInstanceOf(HTMLDivElement);
	});

	it('should display error when input is invalid', () => {
		RenderInputWithMinLength5();

		const input = screen.getByTestId('test-input');
		fireEvent.change(input, { target: { value: 'test' } });
		fireEvent.blur(input);

		expect(
			screen.getByText('Input should be at least 5 characters long')
		).toBeInstanceOf(HTMLDivElement);
	});

	it('should not display error when input is valid', () => {
		RenderInputWithMinLength5();

		const input = screen.getByTestId('test-input');
		fireEvent.change(input, { target: { value: 'testinput' } });
		fireEvent.blur(input);

		expect(
			screen.queryByText('Input should be at least 5 characters long')
		).toBeNull();
	});

	it('should remove error when input is valid after being invalid', () => {
		RenderInputWithMinLength5();

		const input = screen.getByTestId('test-input');
		fireEvent.change(input, { target: { value: 'test' } });
		fireEvent.blur(input);
		fireEvent.change(input, { target: { value: 'testinput' } });
		fireEvent.blur(input);

		expect(
			screen.queryByText('Input should be at least 5 characters long')
		).toBeNull();
	});
});
