import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TOKEN_KEY } from '@/constants';
import { getCookie } from '@/utils/cookies';

declare module 'axios' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface AxiosRequestConfig {
		customErrorHandling?: boolean;
	}
}

export const HEADERS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

export const REQUEST_TIMEOUT = 60000;

const instance: AxiosInstance = axios.create({ headers: HEADERS, timeout: REQUEST_TIMEOUT });

instance.interceptors.request.use(
	config => {
		if (process.client) {
			const token = getCookie(TOKEN_KEY);

			if (token) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${token}`,
				};
			}
		}

		return config;
	},
	error => {
		return Promise.reject(error.response);
	},
);

instance.interceptors.response.use(
	response => {
		return Promise.resolve(response.data);
	},
	error => {
		return Promise.reject(error.response);
	},
);

export const useHttpService = () => ({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(url: string, config?: AxiosRequestConfig): Promise<any> {
		return instance.get(url, config);
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
		return instance.post(url, data, config);
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
		return instance.put(url, data, config);
	},

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	delete(url: string, data?: any): Promise<any> {
		return instance.delete(url, data);
	},
});
