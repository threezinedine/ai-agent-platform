import { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Button> = {
	component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		testId: 'test-button',
		variant: 'primary',
		text: 'Test Button',
	},
};

export const Success: Story = {
	args: {
		...Default.args,
		variant: 'success',
	},
};

export const Warning: Story = {
	args: {
		...Default.args,
		variant: 'warning',
	},
};

export const Danger: Story = {
	args: {
		...Default.args,
		variant: 'danger',
	},
};

export const Secondary: Story = {
	args: {
		...Default.args,
		variant: 'secondary',
	},
};

export const Outline: Story = {
	args: {
		...Default.args,
		variant: 'outline',
	},
};

export const Subtle: Story = {
	args: {
		...Default.args,
		variant: 'subtle',
	},
};

export const Ghost: Story = {
	args: {
		...Default.args,
		variant: 'ghost',
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const RoundedNone: Story = {
	args: {
		...Default.args,
		rounded: 'none',
	},
};

export const RoundedSmall: Story = {
	args: {
		...Default.args,
		rounded: 'sm',
	},
};

export const RoundedMedium: Story = {
	args: {
		...Default.args,
		rounded: 'md',
	},
};

export const RoundedLarge: Story = {
	args: {
		...Default.args,
		rounded: 'lg',
	},
};

export const RoundedFull: Story = {
	args: {
		...Default.args,
		rounded: 'full',
	},
};

export const Small: Story = {
	args: {
		...Default.args,
		size: 'sm',
	},
};

export const Large: Story = {
	args: {
		...Default.args,
		size: 'lg',
	},
};

export const FullWidth: Story = {
	args: {
		...Default.args,
		fullWidth: true,
	},
};

export const WithLeftIcon: Story = {
	args: {
		...Default.args,
		icon: <FontAwesomeIcon icon={faCheck} />,
		iconPosition: 'left',
	},
};

export const WithRightIcon: Story = {
	args: {
		...Default.args,
		icon: <FontAwesomeIcon icon={faCheck} />,
		iconPosition: 'right',
	},
};
