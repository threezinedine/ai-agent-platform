import { create } from 'zustand';
import AvatarRequest from '../services/avatarRequest';

const avatarRequest = new AvatarRequest();

interface AvatarState {
	avatar: string;
	reloadAvatar: () => void;
}

export const useAvatar = create<AvatarState>((set) => ({
	avatar: '',
	reloadAvatar: async () => {
		const response = await avatarRequest.getAvatar();
		if (response.isSuccess()) {
			set({ avatar: response.getData() || '' });
		}
	},
}));
