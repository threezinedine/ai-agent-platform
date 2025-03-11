import React from 'react';
import { LoadingComponentState } from './types';

export default function LoadingComponent({
	state,
	loading,
	error,
	loaded,
}: {
	state: LoadingComponentState;
	loading: React.ReactNode;
	error: React.ReactNode;
	loaded: React.ReactNode;
}) {
	return (
		<>
			{state === 'loading' && loading}
			{state === 'error' && error}
			{state === 'loaded' && loaded}
		</>
	);
}
