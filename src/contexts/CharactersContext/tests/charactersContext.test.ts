import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import {
	CharactersContextProvider,
	initialCharactersContextState,
	useCharactersContext,
} from '../CharactersContext'
import { mockedCharacter } from './helpers'
import {
	fetchCharacterById,
	fetchCharacters,
	fetchComicImageByUri,
} from '../services/marvelApi'
import { Character } from '../types/characterTypes'
import { afterEach } from 'node:test'

vi.mock('../services/marvelApi.ts')

describe('CharactersContext', () => {
	beforeEach(() => {
		vi.resetAllMocks()
	})
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should provide initial state', () => {
		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		expect(result.current).toEqual(
			expect.objectContaining(initialCharactersContextState)
		)
	})

	it('should fetch next page of characters', async () => {
		vi.mocked(fetchCharacters).mockResolvedValue({
			newCharacters: [mockedCharacter],
			error: null,
		})

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchNextPage()
		})

		expect(result.current.allCharacters).toEqual([mockedCharacter])
		expect(result.current.isLoading).toBeFalsy()
	})

	it('should handle fetch error', async () => {
		const errorMessage = 'Network error'
		vi.mocked(fetchCharacters).mockResolvedValue({
			newCharacters: [],
			error: new Error(errorMessage),
		})

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchNextPage()
		})

		expect(result.current.error).toBe(errorMessage)
		expect(result.current.isLoading).toBeFalsy()
	})

	it('should fetch character by id', async () => {
		const mockCharacter = { id: 1, name: 'Iron Man' } as Character
		vi.mocked(fetchCharacterById).mockResolvedValue(mockCharacter)

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchCharacter(1)
		})

		expect(result.current.selectedCharacter).toEqual(mockCharacter)
		expect(result.current.isLoading).toBeFalsy()
	})

	it('should fetch character images', async () => {
		const mockCharacter = {
			id: 1,
			name: 'Iron Man',
			comics: {
				items: [
					{
						resourceURI: 'http://example.com/comic/1',
						name: 'Iron Man (2020) #1 (Standard)',
					},
				],
			},
		} as Character
		const mockComicImage = 'http://example.com/image.jpg'
		vi.mocked(fetchComicImageByUri).mockResolvedValue(mockComicImage)

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchCharacterImages(mockCharacter)
		})

		expect(result.current.comicsImages).toEqual([
			{
				id: 1,
				images: [
					{
						imageName: 'Iron Man #1',
						imagePath: mockComicImage,
						imageYear: '2020',
					},
				],
			},
		])
		expect(result.current.isLoadingImages).toBeFalsy()
	})

	it('should select a character', () => {
		const mockCharacter = { id: 1, name: 'Iron Man' } as Character

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.selectCharacter(mockCharacter)
		})

		expect(result.current.selectedCharacter).toEqual(mockCharacter)
	})

	it('should clear selection', () => {
		const mockCharacter = { id: 1, name: 'Iron Man' } as Character

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.selectCharacter(mockCharacter)
		})

		expect(result.current.selectedCharacter).toEqual(mockCharacter)

		act(() => {
			result.current.clearSelection()
		})

		expect(result.current.selectedCharacter).toBeNull()
	})

	it('should search characters', async () => {
		const mockCharacters = [
			{ id: 1, name: 'Iron Man' },
			{ id: 2, name: 'Spider-Man' },
			{ id: 3, name: 'Black Widow' },
		] as Character[]

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,

		})

		await act(async () => {
			result.current.setCharactersDisplaying(mockCharacters.length)

			vi.mocked(fetchCharacters).mockResolvedValue({
				newCharacters: mockCharacters,
				error: null,
			})

			await result.current.fetchNextPage()
		})

		await act(async () => {
			result.current.searchCharacters('man')
		})

		expect(result.current.searchTerm).toBe('man')
		expect(result.current.allCharacters).toEqual(mockCharacters)

		const filteredCharacters = result.current.allCharacters.filter(
			(character) => character.name.toLowerCase().includes('man')
		)
		expect(filteredCharacters.length).toBe(2)
		expect(result.current.filteredCharacters.size).toBe(
			filteredCharacters.length
		)
	})

	it('should toggle show favorites', () => {
		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.toggleShowFavorites()
		})

		expect(result.current.showFavorites).toBeTruthy()

		act(() => {
			result.current.toggleShowFavorites()
		})

		expect(result.current.showFavorites).toBeFalsy()
	})

	it('should set and unset favorite character', () => {
		const mockCharacter = { id: 1, name: 'Iron Man' } as Character

		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.setFavoriteCharacter(mockCharacter)
		})

		expect(result.current.favorites).toContain(mockCharacter)

		act(() => {
			result.current.unsetFavoriteCharacter(mockCharacter)
		})

		expect(result.current.favorites).not.toContain(mockCharacter)
	})

	it('should set characters displaying', () => {
		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.setCharactersDisplaying(20)
		})

		expect(result.current.charactersDisplaying).toBe(20)
	})
})
