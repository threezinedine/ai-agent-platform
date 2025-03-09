import { Meta, StoryObj } from '@storybook/react';

import UserAvatar from './UserAvatar';

const meta: Meta<typeof UserAvatar> = {
	component: UserAvatar,
};

export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
	args: {
		username: 'John Doe',
	},
};

export const WithImage: Story = {
	args: {
		username: 'John Doe',
		image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
	},
};
