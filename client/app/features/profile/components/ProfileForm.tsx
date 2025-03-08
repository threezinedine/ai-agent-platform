import React from 'react';
import Form from '@/app/components/Form';

export default function ProfileForm() {
	return (
		<Form
			testId="profile"
			name="Profile"
			inputs={[
				{
					type: 'text',
					title: 'username',
					testId: 'profile-username',
				},
			]}
		/>
	);
}
