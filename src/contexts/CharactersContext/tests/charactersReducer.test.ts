import { describe, it, expect } from 'vitest'
import { charactersReducer } from '../characterReducer'
import { CharactersAction } from '../types/characterContextTypes'
import { mockedCharacter } from './helpers'
import { initialCharactersContextState } from '../CharactersContext'
import { Character } from '../types/characterTypes'

describe('charactersReducer', () => {
	it('should handle FETCH_START', () => {
		const action: CharactersAction = { type: 'FETCH_START' }
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.isLoading).toBeTruthy()
		expect(newState.error).toBeNull()
	})

	it('should handle FETCH_SUCCESS', () => {
		const action: CharactersAction = {
			type: 'FETCH_SUCCESS',
			payload: [mockedCharacter],
		}
		const newState = charactersReducer(
			{ ...initialCharactersContextState, isLoading: true, error: 'true' },
			action
		)

		expect(newState.allCharacters).toContain(mockedCharacter)
		expect(newState.isLoading).toBeFalsy()
		expect(newState.offset).toBe(newState.allCharacters.length)
		expect(newState.error).toBeNull()
	})

	it('should handle FETCH_ERROR', () => {
		const action: CharactersAction = {
			type: 'FETCH_ERROR',
			payload: 'An error occurred',
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.error).toBe('An error occurred')
		expect(newState.isLoading).toBeFalsy()
	})

	it('should handle SET_FAVORITE_CHARACTER', () => {
		const action: CharactersAction = {
			type: 'SET_FAVORITE_CHARACTER',
			payload: mockedCharacter,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.favorites).toContain(mockedCharacter)
	})

	it('should handle UNSET_FAVORITE_CHARACTER', () => {
		const stateWithFavorite = {
			...initialCharactersContextState,
			favorites: [mockedCharacter],
		}
		const action: CharactersAction = {
			type: 'UNSET_FAVORITE_CHARACTER',
			payload: mockedCharacter,
		}
		const newState = charactersReducer(stateWithFavorite, action)

		expect(newState.favorites).not.toContain(mockedCharacter)
	})

	it('should handle SELECT_CHARACTER', () => {
		const action: CharactersAction = {
			type: 'SELECT_CHARACTER',
			payload: mockedCharacter,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.selectedCharacter).toEqual(mockedCharacter)
	})

	describe('TOGGLE_SHOW_FAVORITES', () => {
		it('should handle TOGGLE_SHOW_FAVORITES when showing all characters', () => {
			const stateShowingAll = {
				...initialCharactersContextState,
				showFavorites: false,
			}
			const action: CharactersAction = { type: 'TOGGLE_SHOW_FAVORITES' }
			const newState = charactersReducer(stateShowingAll, action)

			expect(newState.showFavorites).toBeTruthy()
			expect(newState.searchTerm).toBe('')
			expect(newState.filteredCharacters.size).toBe(0)
		})

		it('should handle TOGGLE_SHOW_FAVORITES when showing favorites', () => {
			const stateShowingFavorites = {
				...initialCharactersContextState,
				showFavorites: true,
			}
			const action: CharactersAction = { type: 'TOGGLE_SHOW_FAVORITES' }
			const newState = charactersReducer(stateShowingFavorites, action)

			expect(newState.showFavorites).toBeFalsy()
			expect(newState.searchTerm).toBe('')
			expect(newState.filteredCharacters).toEqual(
				new Set(initialCharactersContextState.allCharacters)
			)
		})
	})

	it('should handle SET_SHOW_FAVORITES', () => {
		const action: CharactersAction = { type: 'SET_SHOW_FAVORITES' }
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.showFavorites).toBeTruthy()
		expect(newState.searchTerm).toBe('')
		expect(newState.filteredCharacters.size).toBe(0)
		expect(newState.selectedCharacter).toBeNull()
	})

	it('should handle SET_HIDE_FAVORITES', () => {
		const action: CharactersAction = { type: 'SET_HIDE_FAVORITES' }
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.showFavorites).toBeFalsy()
		expect(newState.searchTerm).toBe('')
		expect(newState.filteredCharacters).toEqual(
			new Set(initialCharactersContextState.allCharacters)
		)
		expect(newState.selectedCharacter).toBeNull()
	})

	it('should handle SELECT_CHARACTER', () => {
		const action: CharactersAction = {
			type: 'SELECT_CHARACTER',
			payload: mockedCharacter,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.selectedCharacter).toEqual(mockedCharacter)
		expect(newState.isLoading).toBeFalsy()
	})

	it('should handle FETCH_CHARACTER_IMAGES_START', () => {
		const action: CharactersAction = { type: 'FETCH_CHARACTER_IMAGES_START' }
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.isLoadingImages).toBeTruthy()
	})

	it('should handle FETCH_CHARACTER_IMAGES_SUCCESS', () => {
		const comicImages = {
			id: 1,
			images: [
				{ imageName: 'Comic 1', imagePath: 'path/to/image', imageYear: '2021' },
			],
		}

		const action: CharactersAction = {
			type: 'FETCH_CHARACTER_IMAGES_SUCCESS',
			payload: comicImages,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.isLoadingImages).toBeFalsy()
		expect(newState.comicsImages).toContain(comicImages)
	})

	it('should handle CLEAR_SELECTION', () => {
		const editedState = {
			...initialCharactersContextState,
			selectedCharacter: mockedCharacter,
		}
		const action: CharactersAction = { type: 'CLEAR_SELECTION' }
		const newState = charactersReducer(editedState, action)

		expect(newState.selectedCharacter).toBeNull()
	})

	describe('SET_SEARCH_TERM', () => {
		it('should handle SET_SEARCH_TERM when showing all characters', () => {
			const characters: Character[] = [
				{ id: 1, name: 'Iron Man' },
				{ id: 2, name: 'Spider-Man' },
				{ id: 3, name: 'Black Widow' },
			] as Character[]
			const stateWithCharacters = {
				...initialCharactersContextState,
				allCharacters: characters,
			}
			const action: CharactersAction = {
				type: 'SET_SEARCH_TERM',
				payload: 'man',
			}
			const newState = charactersReducer(stateWithCharacters, action)

			expect(newState.searchTerm).toBe('man')
			expect(newState.filteredCharacters.size).toBe(2)
			expect(Array.from(newState.filteredCharacters)).toEqual(
				expect.arrayContaining([characters[0], characters[1]])
			)
		})

		it('should handle SET_SEARCH_TERM when showing favorites', () => {
			const favorites: Character[] = [
				{ id: 1, name: 'Iron Man' },
				{ id: 2, name: 'Spider-Man' },
				{ id: 3, name: 'Black Widow' },
			] as Character[]
			const stateWithFavorites = {
				...initialCharactersContextState,
				favorites,
				showFavorites: true,
			}

			const action: CharactersAction = {
				type: 'SET_SEARCH_TERM',
				payload: 'man',
			}
			const newState = charactersReducer(stateWithFavorites, action)

			expect(newState.searchTerm).toBe('man')
			expect(newState.filteredCharacters.size).toBe(2)
			expect(Array.from(newState.filteredCharacters)).toEqual(
				expect.arrayContaining([favorites[0], favorites[1]])
			)
		})
	})

	it('should handle SET_FAVORITES', () => {
		const favorites: Character[] = [
			mockedCharacter,
			{ id: 2, name: 'Thor' },
		] as Character[]

		const action: CharactersAction = {
			type: 'SET_FAVORITES',
			payload: favorites,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.favorites).toHaveLength(2)
		expect(newState.favorites).toEqual(favorites)
	})

	it('should handle SET_HAS_MORE', () => {
		const action: CharactersAction = {
			type: 'SET_HAS_MORE',
			payload: false,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.hasMore).toBeFalsy()
	})

	it('should handle SET_CHARACTERS_DISPLAYING', () => {
		const action: CharactersAction = {
			type: 'SET_CHARACTERS_DISPLAYING',
			payload: 20,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.charactersDisplaying).toBe(20)
	})
})
