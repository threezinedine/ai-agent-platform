import React from 'react';
import FormProps from './FormProps';

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
}: FormProps) {
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
		if (!submitFunc) {
			return;
		}

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
			submitFunc();
		}
	}

	function onInputChange(testId: string, value: string) {
		const newInputDataDict = JSON.parse(JSON.stringify(inputData));

		newInputDataDict[testId].value = value;

		for (const validator of newInputDataDict[testId].validators) {
			if (!validator.validate(value)) {
				newInputDataDict[testId].error = validator.message;
			}
		}

		setInputData(newInputDataDict);
	}

	return (
		<div data-testid={testId}>
			<div>{name}</div>
			<div>
				{inputs.map((input) => (
					<div key={input.testId}>
						<label htmlFor={input.testId}>
							{input.title || input.testId}
						</label>
						<input
							data-testid={input.testId}
							id={input.testId}
							value={inputData[input.testId].value}
							onChange={(e) =>
								onInputChange(input.testId, e.target.value)
							}
						/>
					</div>
				))}
			</div>
			<div
				data-testid={`${testId}-submit-btn`}
				onClick={handleSubmit}
			>
				Submit
			</div>
		</div>
	);
}
