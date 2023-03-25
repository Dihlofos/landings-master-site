export enum ROUTES {
	Landings = '/landings',
	Users = '/users',
	Login = '/login',
}

export const RouteLabel: Record<string, string> = {
	[ROUTES.Landings]: 'Сайты',
	[ROUTES.Users]: 'Пользователи',
	[ROUTES.Login]: 'Авторизация',
};
