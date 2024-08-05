import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCharacters } from './useCharacters'
import {
	CharactersContextProvider,
	useCharactersContext,
} from '../CharactersContext'
import { CharactersContextType } from '../types/characterContextTypes'
import { Character, Comics } from '../types/characterTypes'

vi.mock('../CharactersContext')

describe('useCharacters', () => {
	const mockContext = {
		isLoading: false,
		hasMore: true,
		allCharacters: [],
		fetchNextPage: vi.fn(),
		fetchCharacter: vi.fn(),
		selectCharacter: vi.fn(),
		clearSelection: vi.fn(),
		searchCharacters: vi.fn(),
		fetchCharacterImages: vi.fn(),
		toggleShowFavorites: vi.fn(),
		setFavoriteCharacter: vi.fn(),
		unsetFavoriteCharacter: vi.fn(),
	} as unknown as CharactersContextType

	beforeEach(() => {
		vi.resetAllMocks()
		vi.mocked(useCharactersContext).mockImplementation(() => mockContext)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should fetch next page when conditions are met', async () => {
		const { result } = renderHook(() => useCharactersContext(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchNextPage()
		})

		expect(mockContext.fetchNextPage).toHaveBeenCalled()
	})

	it('should not fetch next page when conditions are not met', async () => {
		mockContext.isLoading = true
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchNextPage()
		})

		expect(mockContext.fetchNextPage).not.toHaveBeenCalled()
	})

	it('should fetch character', async () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})

		await act(async () => {
			await result.current.fetchCharacter(1)
		})

		expect(mockContext.fetchCharacter).toHaveBeenCalledWith(1)
	})

	it('should select character', () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})
		const character: Character = { id: 1, name: 'Iron Man' } as Character

		act(() => {
			result.current.selectCharacter(character)
		})

		expect(mockContext.selectCharacter).toHaveBeenCalledWith(character)
	})

	it('should clear selection', () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.clearSelection()
		})

		expect(mockContext.clearSelection).toHaveBeenCalled()
	})

	it('should search characters', () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.searchCharacters('Iron')
		})

		expect(mockContext.searchCharacters).toHaveBeenCalledWith('Iron')
	})

	it('should fetch character images', async () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})
		const character: Character = {
			id: 1,
			name: 'Iron Man',
			comics: {} as Comics,
		} as Character

		await act(async () => {
			await result.current.fetchCharacterImages(character)
		})

		expect(mockContext.fetchCharacterImages).toHaveBeenCalledWith(character)
	})

	it('should toggle show favorites', () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})

		act(() => {
			result.current.toggleShowFavorites()
		})

		expect(mockContext.toggleShowFavorites).toHaveBeenCalled()
	})

	it('should set favorite character', () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})
		const character: Character = { id: 1, name: 'Iron Man' } as Character

		act(() => {
			result.current.setFavoriteCharacter(character)
		})

		expect(mockContext.setFavoriteCharacter).toHaveBeenCalledWith(character)
	})

	it('should unset favorite character', () => {
		const { result } = renderHook(() => useCharacters(), {
			wrapper: CharactersContextProvider,
		})
		const character: Character = { id: 1, name: 'Iron Man' } as Character

		act(() => {
			result.current.unsetFavoriteCharacter(character)
		})

		expect(mockContext.unsetFavoriteCharacter).toHaveBeenCalledWith(character)
	})
})
