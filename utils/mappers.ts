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
