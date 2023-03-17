import { BASE_URL } from '@/constants/index';
import { useHttpService } from '@/services/http-service';

export interface ILoginCreds {
	username: string;
	password: string;
}

export interface ILoginRespose {
	token: string;
	exp: number;
}

export interface ILandingShort {
	id: number;
	baseUrl: string;
	name: string;
	description: string;
}

const httpService = useHttpService();

export const useMainApiService = () => ({
	getLandings(): Promise<ILandingShort[]> {
		return httpService.get(`${BASE_URL}/site`);
	},

	updateLanding(file: File): void {
		httpService.put(`${BASE_URL}/site`, file);
	},

	createLanding(file: File): void {
		httpService.post(`${BASE_URL}/site`, file);
	},

	deleteLanding(name: string): void {
		httpService.delete(`${BASE_URL}/site/${name}`);
	},

	login(creds: ILoginCreds): Promise<ILoginRespose> {
		return httpService.post(`${BASE_URL}/auth/enter`, creds);
	},
});
