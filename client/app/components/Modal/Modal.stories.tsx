import { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';
import Button from '@/app/components/Button';

const meta: Meta<typeof Modal> = {
	component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	args: {
		children: <div>Modal content</div>,
		actions: [
			{
				testId: 'modal-close',
				type: 'close',
				text: 'Close',
			},
		],
	},
};

export const NoClose: Story = {
	args: {
		children: <div>Modal content</div>,
		actions: [],
	},
};

export const CustomTrigger: Story = {
	args: {
		children: <div>Modal content</div>,
		actions: [
			{
				testId: 'modal-close',
				type: 'close',
				text: 'Close',
			},
		],
		trigger: (
			<Button
				text="Custom"
				variant="secondary"
			/>
		),
	},
};
