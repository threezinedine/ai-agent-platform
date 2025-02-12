import 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Form from '../Form';
import { describe, expect, it, jest } from '@jest/globals';

describe('Form Testing', () => {
	it('should render a form', () => {
		render(
			<Form
				name="Test Form"
				testId="test-form"
			/>
		);

		expect(screen.getByTestId('test-form')).toBeInstanceOf(HTMLDivElement);
		expect(screen.getByText('Test Form')).toBeInstanceOf(HTMLDivElement);
	});

	it('should render a form with given inputs', () => {
		render(
			<Form
				name="Test Form"
				testId="test-form"
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [],
					},
				]}
			/>
		);

		expect(screen.getByTestId('test-form')).toBeInstanceOf(HTMLDivElement);
		expect(screen.getByText('Test Form')).toBeInstanceOf(HTMLDivElement);
		expect(screen.getByTestId('test-input-1')).toBeInstanceOf(
			HTMLInputElement
		);
		expect(screen.getByText('Test Input 1')).toBeInstanceOf(
			HTMLLabelElement
		);
	});

	it('should call submit function when form is submitted', () => {
		const submitFunc = jest.fn();

		render(
			<Form
				name="Test Form"
				testId="test-form"
				submitFunc={submitFunc}
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [],
					},
				]}
			/>
		);

		screen.getByTestId('test-form-submit-btn').click();

		expect(submitFunc).toBeCalledTimes(1);
	});

	it('should not call submit when an input has not valid value', () => {
		const submitFunc = jest.fn();

		render(
			<Form
				name="Test Form"
				testId="test-form"
				submitFunc={submitFunc}
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [
							{
								validate: (value) => value.length > 5,
								message:
									'Input should be at least 5 characters long',
							},
						],
					},
				]}
			/>
		);

		screen.getByTestId('test-input-1').focus();
		screen.getByTestId('test-input-1').blur();

		act(() => screen.getByTestId('test-form-submit-btn').click());
		expect(submitFunc).toBeCalledTimes(0);
	});

	it('should not call submit function when an input is not valid', () => {
		const submitFunc = jest.fn();
		const errorMsg = 'Input should be at least 5 characters long';

		render(
			<Form
				name="Test Form"
				testId="test-form"
				submitFunc={submitFunc}
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [
							{
								validate: (value) => value.length > 5,
								message: errorMsg,
							},
						],
					},
				]}
			/>
		);

		act(() => screen.getByTestId('test-form-submit-btn').click());
		expect(screen.getByText(errorMsg)).toBeInstanceOf(HTMLDivElement);
		expect(submitFunc).toBeCalledTimes(0);
	});

	it('should not print error when the input has no validators', () => {
		render(
			<Form
				name="Test Form"
				testId="test-form"
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [],
					},
				]}
			/>
		);

		const testInput = screen.getByTestId('test-input-1');

		act(() => fireEvent.change(testInput, { target: { value: 'test' } }));
		act(() => testInput.blur());

		expect(
			screen.queryByText('Input should be at least 5 characters long')
		).toBeNull();
	});

	it('should not print error at the beginning', () => {
		const errorMsg = 'Input should be at least 5 characters long';

		render(
			<Form
				name="Test Form"
				testId="test-form"
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [
							{
								validate: (value) => value.length > 5,
								message: errorMsg,
							},
						],
					},
				]}
			/>
		);

		expect(screen.queryByText(errorMsg)).toBeNull();
	});

	it('should print error when the input is not valid', () => {
		const errorMsg = 'Input should be at least 5 characters long';

		render(
			<Form
				name="Test Form"
				testId="test-form"
				inputs={[
					{
						testId: 'test-input-1',
						title: 'Test Input 1',
						validators: [
							{
								validate: (value) => value.length > 5,
								message: errorMsg,
							},
						],
					},
				]}
			/>
		);

		const testInput = screen.getByTestId('test-input-1');

		act(() => fireEvent.change(testInput, { target: { value: 'test' } }));
		act(() => testInput.blur());

		expect(screen.getByText(errorMsg)).toBeInstanceOf(HTMLDivElement);
	});

	it('should show error when submit the form without enter required input', () => {
		const errorMsg = 'Surname is required';

		render(
			<Form
				name="Test Form"
				testId="test-form"
				submitFunc={() => {}}
				inputs={[
					{
						testId: 'surname',
						title: 'Surname',
						validators: [
							{
								validate: (value) => value.length > 0,
								message: errorMsg,
							},
						],
					},
				]}
			/>
		);

		act(() => screen.getByTestId('test-form-submit-btn').click());
		expect(screen.getByText(errorMsg)).toBeInstanceOf(HTMLDivElement);
	});
});
