import { IUser } from '@/services/api/users';
export function addBlankElement(arr: any[]): any[] {
	const newBlankEl = Object.entries(arr[0])
		.filter(([key]) => key !== 'id')
		.reduce(
			(accum, [key]) => ({
				[key]: '',
				...accum,
			}),
			{},
		);
	return [...arr, newBlankEl];
}

export function createUserSites(users: IUser[]): Record<string, string[]> {
	return users.reduce(
		(accum, { sites, username }) => ({
			...accum,
			[username]: sites.map(site => site.name),
		}),
		{},
	);
}
