import React from 'react';
import { Logo } from './Logo';

export default function AuthNavbar() {
	return (
		<div>
			<Logo />
			<div data-testid="user">user</div>
		</div>
	);
}
