import { Meta, StoryObj } from '@storybook/react';

import ToggleMenu from './ToggleMenu';
import ToggleItem from './ToggleItem';
import UserAvatar from '@/app/components/UserAvatar';
import ToggleMenuSeparator from './ToggleMenuSeparator';

const meta: Meta<typeof ToggleMenu> = {
	component: ToggleMenu,
};

export default meta;

type Story = StoryObj<typeof ToggleMenu>;

export const Default: Story = {
	args: {
		children: (
			<>
				<ToggleItem>Working</ToggleItem>
				<ToggleItem>Not Working</ToggleItem>
			</>
		),
	},
};

export const CustomTrigger: Story = {
	args: {
		children: (
			<>
				<ToggleItem>Working</ToggleItem>
				<ToggleItem>Not Working</ToggleItem>
				<ToggleMenuSeparator />
				<ToggleItem>Other Item</ToggleItem>
			</>
		),
		triggerNode: (
			<UserAvatar
				username="John Doe"
				image="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
			/>
		),
	},
};
