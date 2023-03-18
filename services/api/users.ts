import { BASE_URL } from '@/constants/index';
import { useHttpService } from '@/services/http-service';

export enum Roles {
	MODERATOR = 'MODERATOR',
	ADMIN = 'ADMIN',
	USER = 'USER',
	SITE = 'SITE',
}

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

export interface ISiteName {
	id: number;
	name: string;
}

export interface IUser {
	id: number;
	email: string;
	enabled: true;
	firstname: string;
	username: string;
	role: Roles;
	sites: ISiteName[];
}

const httpService = useHttpService();

export const useUserApiService = () => ({
	login(creds: ILoginCreds): Promise<ILoginRespose> {
		return httpService.post(`${BASE_URL}/auth/enter`, creds);
	},

	fetchUsers(): Promise<IUser[]> {
		return httpService.get(`${BASE_URL}/user`);
	},

	fetchUserByName(nameToFetch: string): Promise<IUser> {
		return httpService.get(`${BASE_URL}/user/${nameToFetch}`);
	},

	createUser(newUser: IUser): Promise<void> {
		return httpService.post(`${BASE_URL}/user`, newUser);
	},

	updateUser(updatedUser: IUser): Promise<void> {
		return httpService.put(`${BASE_URL}/user`, updatedUser);
	},

	deleteUser(nameToDelete: string): Promise<void> {
		return httpService.delete(`${BASE_URL}/user/${nameToDelete}`);
	},
});
