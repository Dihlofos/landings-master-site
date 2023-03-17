import { TOKEN_KEY } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { getCookie } from '@/utils/cookies';

export default defineNuxtRouteMiddleware(to => {
	if (process.server) return;
	const token = getCookie(TOKEN_KEY);

	if (!token && to.path !== ROUTES.Login) {
		return navigateTo(ROUTES.Login);
	}

	if (token && to.path === ROUTES.Login) {
		return navigateTo(ROUTES.Admin);
	}
});
