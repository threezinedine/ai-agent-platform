import React from 'react';
import FormProps, { Validator } from './FormProps';
import clsx from 'clsx';

interface InputData {
	value: string;
	error: string | null;
}

type InputDataDict = { [key: string]: InputData };

export default function Form({
	testId,
	name,
	submitFunc,
	inputs = [],
	className = '',
	submitHidden = false,
}: FormProps) {
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
				value: '',
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
			className={clsx('select-none', className)}
		>
			<div
				className={clsx(
					'text-slate-500',
					'text-lg',
					'font-semibold',
					'mb-5',
					'text-center'
				)}
			>
				{name}
			</div>
			<div>
				{inputs.map((input) => (
					<div key={input.testId}>
						<label
							htmlFor={input.testId}
							className={clsx(
								'text-slate-500',
								'text-sm',
								'mt-2',
								'block'
							)}
						>
							{input.title || input.testId}
						</label>
						<input
							data-testid={input.testId}
							id={input.testId}
							type={input.type || 'text'}
							value={inputData[input.testId].value}
							className={clsx(
								'border',
								'border-gray-300',
								'italic',
								'text-slate-400',
								'placeholder-slate-200',
								'focus:outline-none',
								'focus:ring-2',
								'focus:ring-blue-200',
								'px-2',
								'py-1',
								'mt-1',
								'rounded-md',
								'w-full'
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
				<div
					data-testid={`${testId}-submit-btn`}
					className={clsx(
						'bg-blue-500',
						'cursor-pointer',
						'hover:bg-blue-600',
						'p-2',
						'rounded-md',
						'text-white',
						'text-sm',
						'mt-5',
						'text-center'
					)}
					onClick={handleSubmit}
				>
					Submit
				</div>
			)}
		</div>
	);
}
