import React from 'react';
import Input from './Input';

const inputStory = {
	title: 'Input',
	component: Input,
};

export default inputStory;

export const Default = () => <Input dataTestId="test-input" />;
export const WithTitle = () => (
	<Input
		title="Test Input"
		dataTestId="test-input"
	/>
);
export const MustBeAtLeast5Characters = () => (
	<Input
		title="Test Input"
		dataTestId="test-input"
		validators={[
			{
				validate: (value) => value.length >= 5,
				message: 'Input should be at least 5 characters long',
			},
		]}
	/>
);
