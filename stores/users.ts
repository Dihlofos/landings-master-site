import { TOKEN_KEY } from '@/constants';
import { defineStore } from 'pinia';
import { setCookie, eraseCookie } from '@/utils/cookies';

import type { ILoginCreds, IUser } from '@/services/api/users';
import { Roles } from '@/services/api/users';
import { useUserApiService } from '@/services/api/users';

interface IUsersState {
	loading: boolean;
	users: IUser[];
	roles: Roles[];
	usersSites: Record<string, string[]>;
}

const useUsersStore = defineStore({
	id: 'users',

	state: (): IUsersState => ({
		loading: false,
		users: [],
		roles: [Roles.ADMIN, Roles.MODERATOR, Roles.SITE, Roles.USER],
		usersSites: {},
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
				console.error('login error: ', e);
			} finally {
				this.loading = false;
			}
		},

		async fetchUsers(): Promise<void> {
			const userApiService = useUserApiService();
			try {
				this.loading = true;
				this.users = await userApiService.fetchUsers();
				this.usersSites = createUserSites(this.users);
			} catch (e: unknown) {
				console.error('pageData loading error', e);
			} finally {
				this.loading = false;
			}
		},

		async updateUser(user: IUser): Promise<void> {
			const userApiService = useUserApiService();
			try {
				this.loading = true;
				await userApiService.updateUser(user);
			} catch (e: unknown) {
				console.error('update user error', e);
			} finally {
				this.loading = false;
			}
		},

		exit() {
			eraseCookie('token');
		},
	},
});

export default useUsersStore;
