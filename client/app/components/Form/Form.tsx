import React, { forwardRef, useImperativeHandle } from 'react';
import FormProps, { Validator } from './FormProps';
import clsx from 'clsx';
import Button from '@/app/components/Button';

interface InputData {
	value: string;
	error: string | null;
}

type InputDataDict = { [key: string]: InputData };

const Form = forwardRef(
	(
		{
			testId,
			name,
			submitFunc,
			inputs = [],
			className = '',
			description = null,
			footer = null,
			submitHidden = false,
			shadowDisabled = false,
		}: FormProps,
		ref: React.Ref<{ submit: () => void }>
	) => {
		const validatorDict = inputs.reduce((acc, input) => {
			if (!input.validators) {
				return acc;
			}

			acc[input.testId] = input.validators;

			return acc;
		}, {} as { [key: string]: Validator[] });

		const [inputData, setInputData] = React.useState<InputDataDict>(
			inputs.reduce((acc, input) => {
				acc[input.testId] = {
					value: input.defaultValue || '',
					error: null,
				};

				return acc;
			}, {} as InputDataDict)
		);

		function handleSubmit() {
			const newInputDataDict = JSON.parse(JSON.stringify(inputData));
			let hasError = false;

			for (const inputProp of inputs) {
				if (!inputProp.validators) {
					continue;
				}
				for (const validator of inputProp.validators) {
					if (
						!validator.validate(
							newInputDataDict[inputProp.testId].value
						)
					) {
						newInputDataDict[inputProp.testId].error =
							validator.message;
						hasError = true;
					}
				}
			}

			if (hasError) {
				setInputData(newInputDataDict);
			} else {
				if (!submitFunc) {
					return;
				}

				submitFunc(
					Object.keys(inputData).reduce((acc, key) => {
						acc[key] = inputData[key].value;
						return acc;
					}, {} as { [key: string]: string })
				);
			}
		}

		useImperativeHandle(ref, () => ({
			submit: () => handleSubmit(),
		}));

		function onInputChange(testId: string, value: string) {
			const newInputDataDict = JSON.parse(JSON.stringify(inputData));

			newInputDataDict[testId].value = value;

			if (!validatorDict[testId]) {
				setInputData(newInputDataDict);
				return;
			}

			for (const validator of validatorDict[testId]) {
				if (!validator.validate(value)) {
					newInputDataDict[testId].error = validator.message;
					setInputData(newInputDataDict);
					return;
				}
			}

			newInputDataDict[testId].error = null;
			setInputData(newInputDataDict);
		}

		return (
			<div
				data-testid={testId}
				className={clsx(
					'select-none',
					'w-full',
					'max-w-md',
					'mx-auto',
					'p-6',
					'md:p-8',
					'bg-white',
					'dark:bg-gray-800',
					'rounded-2xl',
					{ 'shadow-lg': !shadowDisabled },
					'transition-all',
					'duration-300',
					className
				)}
			>
				<div className={clsx('mb-8')}>
					<h2
						className={clsx(
							'text-2xl',
							'font-bold',
							'text-gray-800',
							'dark:text-white',
							'mb-2',
							'text-center'
						)}
					>
						{name}
					</h2>
					{description && (
						<div
							className={clsx(
								'text-gray-600',
								'dark:text-gray-300',
								'text-center'
							)}
						>
							{description}
						</div>
					)}
				</div>
				<div className={clsx('space-y-6')}>
					{inputs.map((input) => (
						<div
							key={input.testId}
							className={clsx('space-y-2')}
						>
							<label
								htmlFor={input.testId}
								className={clsx(
									'block',
									'text-sm',
									'font-medium',
									'text-gray-700',
									'dark:text-gray-300',
									'mt-2'
								)}
							>
								{input.title || input.testId}
								{input.required && (
									<span
										className={clsx('ml-1', 'text-red-300')}
									>
										*
									</span>
								)}
							</label>
							<input
								data-testid={input.testId}
								id={input.testId}
								type={input.type || 'text'}
								value={inputData[input.testId].value}
								className={clsx(
									'w-full',
									'px-4',
									'py-3',
									'rounded-lg',
									'border',
									inputData[input.testId].error
										? clsx(
												'border-red-500',
												'dark:border-red-400',
												'bg-red-50',
												'dark:bg-red-900/10'
										  )
										: clsx(
												'border-gray-300',
												'dark:border-gray-600',
												'bg-white',
												'dark:bg-gray-700'
										  ),
									'focus:outline-none',
									'focus:ring-2',
									'focus:border-transparent',
									inputData[input.testId].error
										? clsx(
												'focus:ring-red-500/50',
												'dark:focus:ring-red-500/50'
										  )
										: clsx(
												'focus:ring-indigo-500/50',
												'dark:focus:ring-indigo-500/50'
										  ),
									'transition-all',
									'duration-300',
									'text-gray-900',
									'dark:text-white',
									'placeholder-gray-400',
									'dark:placeholder-gray-500',
									input.disabled
										? clsx(
												'bg-gray-100',
												'dark:bg-gray-800',
												'cursor-not-allowed'
										  )
										: clsx()
								)}
								placeholder={
									input.placeholder || 'Enter this field'
								}
								onChange={(e) =>
									onInputChange(input.testId, e.target.value)
								}
								onBlur={() =>
									onInputChange(
										input.testId,
										inputData[input.testId].value
									)
								}
								readOnly={input.disabled ? true : undefined}
							/>
							{inputData[input.testId].error && (
								<div
									className={clsx(
										'text-red-500',
										'text-sm',
										'mt-1'
									)}
								>
									{inputData[input.testId].error}
								</div>
							)}
						</div>
					))}
				</div>
				{!submitHidden && (
					<Button
						testId={`${testId}-submit-btn`}
						text="Submit"
						onClick={handleSubmit}
						variant="secondary"
						className={clsx('mt-5')}
						fullWidth
					/>
				)}
				{footer && (
					<div
						className={clsx(
							'mt-4',
							'text-center',
							'text-xs',
							'text-gray-500',
							'dark:text-gray-400'
						)}
					>
						{footer}
					</div>
				)}
			</div>
		);
	}
);

Form.displayName = 'Form';

export default Form;
