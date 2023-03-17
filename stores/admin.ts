import { TOKEN_KEY } from '@/constants';
import { defineStore } from 'pinia';
import { setCookie } from '@/utils/cookies';

import { ILandingShort, ILoginCreds } from '@/services/api/main';
import { useMainApiService } from '@/services/api/main';

interface IAdminState {
	landings: ILandingShort[];
	loading: boolean;
}

const useLandingsStore = defineStore({
	id: 'admin',

	state: (): IAdminState => ({
		landings: [],
		loading: false,
	}),

	actions: {
		// Fetchers.
		async fetchLandings() {
			const mainApiService = useMainApiService();
			try {
				this.loading = true;
				this.landings = await mainApiService.getLandings();
			} catch (e: unknown) {
				console.error('fetchLandings error: ', e);
			} finally {
				this.loading = false;
			}
		},

		async updateLanding(file: File) {
			const mainApiService = useMainApiService();
			try {
				this.loading = true;
				mainApiService.updateLanding(file);
			} catch (e: unknown) {
				console.error('updateLanding error:', e);
			} finally {
				this.loading = false;
			}
		},

		async createLanding(file: File) {
			const mainApiService = useMainApiService();
			try {
				this.loading = true;
				mainApiService.createLanding(file);
			} catch (e: unknown) {
				console.error('createLanding error:', e);
			} finally {
				this.loading = false;
			}
		},

		async deleteLanding(name: string) {
			const mainApiService = useMainApiService();
			try {
				this.loading = true;
				mainApiService.deleteLanding(name);
			} catch (e: unknown) {
				console.error('deleteLanding error', e);
			} finally {
				this.loading = false;
			}
		},

		async login(creds: ILoginCreds): Promise<void> {
			const mainApiService = useMainApiService();
			try {
				this.loading = true;
				const { token, exp } = await mainApiService.login(creds);
				setCookie(TOKEN_KEY, token, exp);
			} catch (e: unknown) {
				console.error('pageData loading error', e);
			} finally {
				this.loading = false;
			}
		},
	},
});

export default useLandingsStore;
