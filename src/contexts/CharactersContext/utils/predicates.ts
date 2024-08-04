export const isNotEmptyObject = (obj: object): boolean =>
	typeof obj === 'object' && Object.keys(obj).length > 0

export const isNotEmptyArray = (arr: any[]): boolean =>
	Array.isArray(arr) && arr.length > 0

export const isNotEmptySet = (set: Set<any>): boolean =>
	set instanceof Set && set.size > 0

