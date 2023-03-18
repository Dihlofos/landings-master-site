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

export const useUserApiService = () => ({
	login(creds: ILoginCreds): Promise<ILoginRespose> {
		return httpService.post(`${BASE_URL}/auth/enter`, creds);
	},
});
