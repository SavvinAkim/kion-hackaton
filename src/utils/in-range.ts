export const inRange = (range: [number, number], number: number): boolean =>
	number > range[0] && number < range[1]
