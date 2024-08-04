import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import {
	fetchCharacterById,
	fetchCharacters,
	fetchComicImageByUri,
	getApiBaseParams,
} from './marvelApi'

const mockEnv = {
	NODE_ENV: 'test' as 'development' | 'production' | 'test',
	NEXT_PUBLIC_BASE_URL: 'https://api.example.com',
	NEXT_PUBLIC_KEY: 'public_key',
	NEXT_PUBLIC_PRIVATE_KEY: 'private_key',
}

// Mock de la función createHash
vi.mock('@/contexts/CharactersContext/utils/hash', () => ({
	createHash: vi.fn(() => {
		console.log('createHash mock called')
		return 'mocked_hash'
	}),
}))

// Mock de fetch
const mockFetch = vi.fn()
global.fetch = mockFetch as unknown as typeof fetch

describe('API functions', () => {
	beforeEach(() => {
		vi.resetAllMocks()
		process.env = { ...mockEnv } as NodeJS.ProcessEnv
	})

	// afterAll(() => {
	//   vi.clearAllMocks()
	// })

	describe('getApiBaseParams', () => {
		it('should return base URL and encrypted params', () => {
			const result = getApiBaseParams()
			expect(result.BASE_URL).toBe('https://api.example.com')
			expect(result.encryptedParams.get('apikey')).toBe('public_key')
			const hash = result.encryptedParams.get('hash')
			expect(hash).toMatch(/^[a-f0-9]{32}$/)
			expect(result.encryptedParams.has('ts')).toBeTruthy()
		})

		it('should throw an error if environment variables are missing', () => {
			delete process.env.NEXT_PUBLIC_BASE_URL
			expect(() => getApiBaseParams()).toThrow('Missing environment variables')
		})
	})

	describe('fetchCharacters', () => {
		it('should fetch characters successfully', async () => {
			const mockResponse = {
				ok: true,
				json: vi.fn().mockResolvedValue({
					data: { results: [{ id: 1, name: 'Spider-Man' }] },
				}),
			}
			mockFetch.mockResolvedValue(mockResponse)
			const result = await fetchCharacters({ offset: 0, limit: 20 })
			expect(result.newCharacters).toEqual([{ id: 1, name: 'Spider-Man' }])
			expect(result.error).toBeNull()
		})

		it('should handle API key error', async () => {
			const mockResponse = { ok: false, status: 401 }
			mockFetch.mockResolvedValue(mockResponse)

			const result = await fetchCharacters({ offset: 0, limit: 20 })
			expect(result.newCharacters).toEqual([])
			expect(result.error).toEqual(new Error('Invalid API key'))
		})

		it('should handle network error', async () => {
			const mockResponse = { ok: false, status: 500 }
			mockFetch.mockResolvedValue(mockResponse).mockResolvedValue(mockResponse)

			const result = await fetchCharacters({ offset: 0, limit: 20 })
			expect(result.newCharacters).toEqual([])
			expect(result.error).toEqual(
				new Error('Network response of Characters was not ok')
			)
		})
	})

	describe('fetchCharacterById', () => {
		it('should fetch a character by id successfully', async () => {
			const mockResponse = {
				ok: true,
				json: vi.fn().mockResolvedValue({
					data: { results: [{ id: 1, name: 'Iron Man' }] },
				}),
			}
			mockFetch.mockResolvedValue(mockResponse).mockResolvedValue(mockResponse)

			const result = await fetchCharacterById(1)
			expect(result).toEqual({ id: 1, name: 'Iron Man' })
		})

		it('should throw an error if the network response is not ok', async () => {
			const mockResponse = { ok: false }
			mockFetch.mockResolvedValue(mockResponse).mockResolvedValue(mockResponse)

			await expect(fetchCharacterById(1)).rejects.toThrow(
				'Network response of Character was not ok'
			)
		})
	})

	describe('fetchComicImageByUri', () => {
		it('should fetch a comic image successfully', async () => {
			const mockResponse = {
				ok: true,
				json: vi.fn().mockResolvedValue({
					data: {
						results: [
							{
								thumbnail: {
									path: 'http://example.com/image',
									extension: 'jpg',
								},
							},
						],
					},
				}),
			}
			mockFetch.mockResolvedValue(mockResponse).mockResolvedValue(mockResponse)

			const result = await fetchComicImageByUri(
				'http://api.example.com/comics/1'
			)
			expect(result).toBe('http://example.com/image.jpg')
		})

		it('should throw an error if the network response is not ok', async () => {
			const mockResponse = { ok: false }
			mockFetch.mockResolvedValue(mockResponse).mockResolvedValue(mockResponse)

			await expect(
				fetchComicImageByUri('http://api.example.com/comics/1')
			).rejects.toThrow('Network response of Comics was not ok')
		})
	})
})
