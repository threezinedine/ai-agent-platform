import { create } from 'zustand';
import { UserInfo } from '@/app/data/types';
import { ProfileRequest } from '../services/ProfileRequest';
import { LoadingComponentState } from '@/app/components/LoadingComponent';

interface ProfileState {
	state: LoadingComponentState;
	userInfo: UserInfo;
	reloadUserInfo: () => void;
}

const profileRequest = new ProfileRequest();

const useProfile = create<ProfileState>((set) => ({
	state: 'loading',
	userInfo: {
		id: '',
		username: '',
		email: '',
		fullName: '',
	},
	reloadUserInfo: async () => {
		set({ state: 'loading' });
		const repsonse = await profileRequest.getProfile();

		if (repsonse.isSuccess()) {
			set({ userInfo: repsonse.getData() as UserInfo, state: 'loaded' });
		} else {
			set({ state: 'error' });
		}
	},
}));

export default useProfile;
