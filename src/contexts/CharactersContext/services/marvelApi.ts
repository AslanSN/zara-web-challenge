import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import { createHash } from '@/contexts/CharactersContext/utils/hash'

interface FetchCharactersParams {
	offset: number
	limit: number
	nameStartsWith?: string
}

export const getApiBaseParams = () => {
	const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
	const NEXT_PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY
	const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY

	if (!NEXT_PUBLIC_BASE_URL || !NEXT_PUBLIC_KEY || !NEXT_PUBLIC_PRIVATE_KEY) {
		throw new Error('Missing environment variables')
	}

	const ts = Date.now().toString()
	const hash = createHash(ts, NEXT_PUBLIC_PRIVATE_KEY, NEXT_PUBLIC_KEY)

	const encryptedParams = new URLSearchParams({
		ts,
		apikey: NEXT_PUBLIC_KEY,
		hash,
	})

	return { BASE_URL: NEXT_PUBLIC_BASE_URL, encryptedParams: encryptedParams }
}

export const fetchCharacters = async ({
	offset = 0,
	limit = 50,
	nameStartsWith,
}: FetchCharactersParams): Promise<{
	newCharacters: Character[]
	error: Error | null
}> => {
	const { BASE_URL, encryptedParams } = getApiBaseParams()

	const url = new URL(BASE_URL)
	url.searchParams.append('offset', offset.toString())
	url.searchParams.append('limit', limit.toString())

	if (nameStartsWith) {
		url.searchParams.append('nameStartsWith', nameStartsWith)
	}

	encryptedParams.forEach((value, key) => url.searchParams.append(key, value))

	const response = await fetch(url.toString())
	if (!response.ok) {
		if (response.status === 401) {
			return { newCharacters: [], error: new Error('Invalid API key') }
		}
		return {
			newCharacters: [],
			error: new Error('Network response of Characters was not ok'),
		}
	}

	const data = await response.json()

	return { newCharacters: data.data.results, error: null }
}

export const fetchCharacterById = async (id: number): Promise<Character> => {
	const { BASE_URL, encryptedParams } = getApiBaseParams()

	const url = new URL(`${BASE_URL}/${id}`)
	encryptedParams.forEach((value, key) => url.searchParams.append(key, value))

	const response = await fetch(url.toString())
	if (!response.ok) {
		throw new Error('Network response of Character was not ok')
	}

	const data = await response.json()

	return data.data.results[0]
}

export const fetchComicImageByUri = async (uri: string): Promise<string> => {
	const { encryptedParams } = getApiBaseParams()
	const comicUrl = new URL(uri)

	encryptedParams.forEach((value, key) =>
		comicUrl.searchParams.append(key, value)
	)

	const response = await fetch(comicUrl.toString())
	if (!response.ok) {
		throw new Error('Network response of Comics was not ok')
	}

	const data = await response.json()
	const [{ thumbnail }] = data.data.results
	const comicImage = thumbnail.path + '.' + thumbnail.extension
	return comicImage
}
