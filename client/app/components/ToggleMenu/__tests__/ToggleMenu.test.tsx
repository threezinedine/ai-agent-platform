import 'react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleMenu from '../ToggleMenu';
import ToggleItem from '../ToggleItem';

describe('Toggle Menu Testing', () => {
	it('should not render any the menu items at the start', () => {
		render(
			<ToggleMenu testId="test-toggle-menu">
				<ToggleItem testId="hello-item">Hello</ToggleItem>
				<ToggleItem testId="testing-item">Testing</ToggleItem>
			</ToggleMenu>
		);

		expect(screen.queryByTestId('hello-item')).toBeNull();
		expect(screen.queryByTestId('testing-item')).toBeNull();
		expect(screen.getByTestId('test-toggle-menu-trigger')).toBeInstanceOf(
			HTMLElement
		);
	});

	it('should render all the menu items when the button is clicked', () => {
		render(
			<ToggleMenu testId="test-toggle-menu">
				<ToggleItem testId="hello-item">Hello</ToggleItem>
				<ToggleItem testId="testing-item">Testing</ToggleItem>
			</ToggleMenu>
		);

		fireEvent.click(screen.getByTestId('test-toggle-menu-trigger'));

		expect(screen.getByTestId('hello-item')).toBeInstanceOf(HTMLElement);
		expect(screen.getByTestId('testing-item')).toBeInstanceOf(HTMLElement);
	});

	it('should call onClick when the toggle item is clicked', () => {
		const onClickFn = jest.fn();

		render(
			<ToggleMenu testId="test-toggle-menu">
				<ToggleItem
					testId="hello-item"
					onClick={onClickFn}
				>
					Hello
				</ToggleItem>
				<ToggleItem testId="testing-item">Testing</ToggleItem>
			</ToggleMenu>
		);

		fireEvent.click(screen.getByTestId('test-toggle-menu-trigger'));
		fireEvent.click(screen.getByTestId('hello-item'));

		expect(onClickFn).toHaveBeenCalledTimes(1);
	});
});
