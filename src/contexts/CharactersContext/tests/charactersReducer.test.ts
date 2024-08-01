import { describe, it, expect } from 'vitest'
import { charactersReducer } from '../characterReducer'
import { CharactersAction } from '../types/characterContextTypes'
import { mockedCharacter } from './helpers'
import { Character } from '../types/characterTypes'
import { initialCharactersContextState } from '../CharactersContext'

describe('charactersReducer', () => {
	it('should handle FETCH_START', () => {
		const action: CharactersAction = { type: 'FETCH_START' }
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.isLoading).toBe(true)
	})

	it('should handle FETCH_SUCCESS', () => {
		const action: CharactersAction = {
			type: 'FETCH_SUCCESS',
			payload: [mockedCharacter],
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.allCharacters).toEqual([mockedCharacter])
		expect(newState.isLoading).toBeFalsy()
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

	it('should handle SELECT_CHARACTER', () => {
		const action: CharactersAction = {
			type: 'SELECT_CHARACTER',
			payload: mockedCharacter,
		}
		const newState = charactersReducer(initialCharactersContextState, action)

		expect(newState.selectedCharacter).toEqual(mockedCharacter)
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

	it('should handle SET_SEARCH_TERM', () => {
		const editedState = {
			...initialCharactersContextState,
			allCharacters: [mockedCharacter],
		}

		const action: CharactersAction = {
			type: 'SET_SEARCH_TERM',
			payload: 'A',
		}
		const newState = charactersReducer(editedState, action)
		expect(newState.searchTerm).toBe('A')
		expect(newState.filteredCharacters).toHaveLength(1)
		expect(newState.filteredCharacters[0]).toEqual(mockedCharacter)
	})

	it('should handle SET_HAS_MORE', () => {
		const action: CharactersAction = {
			type: 'SET_HAS_MORE',
			payload: false,
		}
		const newState = charactersReducer(initialCharactersContextState, action)
		expect(newState.hasMore).toBe(false)
	})
})
