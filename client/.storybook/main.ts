import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: [
		// '../stories/**/*.mdx',
		'../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	staticDirs: ['..\\public'],
};
export default config;
