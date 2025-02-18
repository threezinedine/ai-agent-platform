'use client';

import React from 'react';
import { Logo } from './Logo';
import Link from 'next/link';

export default function UnAuthNavbar() {
	return (
		<div>
			<Logo />
			<Link
				href="/login"
				data-testid="login"
			>
				Login
			</Link>
			<Link
				href="/register"
				data-testid="register"
			>
				Register
			</Link>
		</div>
	);
}
