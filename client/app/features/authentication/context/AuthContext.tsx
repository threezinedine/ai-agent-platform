import React from 'react';
import { UserInfo } from '../data/types';

interface AuthContextProps {
	isAuthenticated: boolean;
	user?: UserInfo | null | undefined;
	logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
	isAuthenticated: false,
	logout: () => {},
});
