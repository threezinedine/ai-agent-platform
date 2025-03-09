import { Meta, StoryObj } from '@storybook/react';

import Tooltip from '.';
import Button from '../Button';

const meta: Meta<typeof Tooltip> = {
	component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	args: {
		children: <Button text="Hover me" />,
		tooltip: <div>This is the button</div>,
		position: 'bottom',
	},
};

export const Light: Story = {
	args: {
		children: <Button text="Hover me" />,
		tooltip: <div>This is the button</div>,
		position: 'bottom',
		theme: 'light',
	},
};

export const ShadowLarge: Story = {
	args: {
		children: <Button text="Hover me" />,
		tooltip: <div>This is the button</div>,
		position: 'bottom',
		shadow: 'lg',
		theme: 'amber',
	},
};

export const Delayed: Story = {
	args: {
		children: <Button text="Hover me" />,
		tooltip: <div>This is the button</div>,
		position: 'bottom',
		delay: 1000,
	},
};

export const SlideAnimation: Story = {
	args: {
		children: <Button text="Hover me" />,
		tooltip: <div>This is the button</div>,
		position: 'bottom',
		animation: 'slide',
	},
};

export const Offset: Story = {
	args: {
		children: <Button text="Hover me" />,
		tooltip: <div>This is the button</div>,
		position: 'bottom',
		offset: 16,
	},
};
