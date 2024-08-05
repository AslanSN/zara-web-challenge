export const isNotEmptyObject = (obj: object): boolean =>
	typeof obj === 'object' && Object.keys(obj).length > 0

export const isNotEmptyArray = (arr: unknown[]): boolean =>
	Array.isArray(arr) && arr.length > 0

export const isNotEmptySet = (set: Set<unknown>): boolean =>
	set instanceof Set && set.size > 0
