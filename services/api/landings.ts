import { BASE_URL } from '@/constants/index';
import { useHttpService } from '@/services/http-service';

export interface ILandingShort {
	id: number;
	baseUrl: string;
	name: string;
	description: string;
}

const httpService = useHttpService();

export const useLandingsApiService = () => ({
	getLandings(): Promise<ILandingShort[]> {
		return httpService.get(`${BASE_URL}/site`);
	},

	updateLanding(file: File): Promise<void> {
		return httpService.put(`${BASE_URL}/site`, file);
	},

	createLanding(file: File): Promise<void> {
		return httpService.post(`${BASE_URL}/site`, file);
	},

	deleteLanding(name: string): Promise<void> {
		return httpService.delete(`${BASE_URL}/site/${name}`);
	},
});
