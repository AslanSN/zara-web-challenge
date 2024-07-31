import { Character } from '@/types/types'
import { createHash } from '@/utils/hash'

interface FetchCharactersParams {
	offset: number
	limit: number
	nameStartsWith?: string
}

export const fetchCharacters = async ({
	offset = 0,
	limit = 50,
	nameStartsWith,
}: FetchCharactersParams): Promise<Character[]> => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
	const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY
	const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY

	if (!BASE_URL || !PUBLIC_KEY || !PRIVATE_KEY) {
		throw new Error('Missing environment variables')
	}

	const ts = Date.now().toString()
	const hash = createHash(ts, PRIVATE_KEY, PUBLIC_KEY)
	const url = `${BASE_URL}?limit=${limit}&offset=${offset}${
		nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : ''
	}&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

	const response = await fetch(url)
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}

	const data = await response.json()

	return data.data.results
}
