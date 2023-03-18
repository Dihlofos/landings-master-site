import { defineStore } from 'pinia';

import type { ILandingShort } from '@/services/api/landings';
import { useLandingsApiService } from '@/services/api/landings';

interface ILandingState {
	landings: ILandingShort[];
	loading: boolean;
}

const useLandingsStore = defineStore({
	id: 'landings',

	state: (): ILandingState => ({
		landings: [],
		loading: false,
	}),

	actions: {
		// Fetchers.
		async fetchLandings(): Promise<void> {
			const landingApiService = useLandingsApiService();
			try {
				this.loading = true;
				this.landings = await landingApiService.getLandings();
			} catch (e: unknown) {
				console.error('fetchLandings error: ', e);
			} finally {
				this.loading = false;
			}
		},

		async updateLanding(file: File): Promise<void> {
			const landingApiService = useLandingsApiService();
			try {
				this.loading = true;
				await landingApiService.updateLanding(file);
			} catch (e: unknown) {
				console.error('updateLanding error:', e);
			} finally {
				this.loading = false;
			}
		},

		async createLanding(file: File): Promise<void> {
			const landingApiService = useLandingsApiService();
			try {
				this.loading = true;
				await landingApiService.createLanding(file);
			} catch (e: unknown) {
				console.error('createLanding error:', e);
			} finally {
				this.loading = false;
			}
		},

		async deleteLanding(name: string): Promise<void> {
			const landingApiService = useLandingsApiService();
			try {
				this.loading = true;
				await landingApiService.deleteLanding(name);
			} catch (e: unknown) {
				console.error('deleteLanding error', e);
			} finally {
				this.loading = false;
			}
		},
	},
});

export default useLandingsStore;
