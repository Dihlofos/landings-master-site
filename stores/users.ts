import { TOKEN_KEY } from '@/constants';
import { defineStore } from 'pinia';
import { setCookie } from '@/utils/cookies';

import type { ILoginCreds } from '@/services/api/users';
import { useUserApiService } from '@/services/api/users';

interface IUsersState {
	loading: boolean;
}

const useUsersStore = defineStore({
	id: 'users',

	state: (): IUsersState => ({
		loading: false,
	}),

	actions: {
		// Fetchers.
		async login(creds: ILoginCreds): Promise<void> {
			const userApiService = useUserApiService();
			try {
				this.loading = true;
				const { token, exp } = await userApiService.login(creds);
				setCookie(TOKEN_KEY, token, exp);
			} catch (e: unknown) {
				console.error('pageData loading error', e);
			} finally {
				this.loading = false;
			}
		},
	},
});

export default useUsersStore;
