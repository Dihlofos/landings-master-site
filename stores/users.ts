import { TOKEN_KEY } from '@/constants';
import { defineStore } from 'pinia';
import { setCookie, eraseCookie } from '@/utils/cookies';

import type { ILoginCreds, ISiteName, IUser, IUserUpdate } from '@/services/api/users';
import { Roles } from '@/services/api/users';
import { useUserApiService } from '@/services/api/users';

interface IUsersState {
	loading: boolean;
	users: IUser[];
	roles: Roles[];
	usersSites: Record<string, ISiteName[]>;
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

		async createUser(user: IUserUpdate): Promise<void> {
			const userApiService = useUserApiService();
			try {
				this.loading = true;
				await userApiService.createUser(user);
			} catch (e: unknown) {
				console.error('create user error', e);
			} finally {
				this.loading = false;
			}
		},

		async changeUserSites(targetName: string) {
			const targetUser = this.users.find(({ username }) => username === targetName);
			if (!targetUser) {
				throw Error('Ошибка, на нашли пользователя для обновления данных о сайте');
			}
			targetUser.sites = this.usersSites[targetName];
			await this.updateUser(targetUser);
		},

		async deleteUser(name: string) {
			const userApiService = useUserApiService();
			try {
				this.loading = true;
				await userApiService.deleteUser(name);
			} catch (e: unknown) {
				console.error('create user error', e);
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
