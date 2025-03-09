import { Meta, StoryObj } from '@storybook/react';

import Form from './Form';

const meta: Meta<typeof Form> = {
	component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
	args: {
		testId: 'test-form',
		name: 'Test Form',
		className: 'w-1/2',
		description: 'This is a test form',
		footer: <div>This is footer</div>,
		submitFunc: () => {},
		inputs: [
			{
				testId: 'surname',
				title: 'Surname',
				required: true,
				validators: [
					{
						validate: (value: string) => value.length > 0,
						message: 'Surname is required',
					},
				],
			},
			{
				testId: 'lastname',
				title: 'Lastname',
				required: true,
				placeholder: 'Enter your lastname',
				validators: [
					{
						validate: (value: string) => value.length > 0,
						message: 'Lastname is required',
					},
				],
			},
			{
				testId: 'readonly',
				title: 'Readonly',
				disabled: true,
				defaultValue: 'Readonly value',
			},
		],
	},
};
