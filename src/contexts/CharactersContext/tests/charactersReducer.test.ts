import { describe, it, expect } from 'vitest'
import { charactersReducer } from '../characterReducer'
import {
	INITIAL_CHARACTERS_PER_PAGE,
	INITIAL_LIMIT,
	INITIAL_OFFSET,
} from '../constants'
import { CharactersAction } from '../characterContextTypes'
import { mockedCharacter } from './helpers'
import { Character } from '../../../types/types'

describe('charactersReducer', () => {
	const initialState = {
		allCharacters: [],
		filteredCharacters: [],
		favorites: [],
		selectedCharacter: null,
		isLoading: false,
		error: null,
		limit: INITIAL_LIMIT,
		offset: INITIAL_OFFSET,
		hasMore: true,
		searchTerm: '',
		charactersPerPage: INITIAL_CHARACTERS_PER_PAGE,
	}
	it('should handle FETCH_START', () => {
		const action: CharactersAction = { type: 'FETCH_START' }
		const newState = charactersReducer(initialState, action)

		expect(newState.isLoading).toBe(true)
	})

	it('should handle FETCH_SUCCESS', () => {
		const action: CharactersAction = {
			type: 'FETCH_SUCCESS',
			payload: [mockedCharacter],
		}
		const newState = charactersReducer(initialState, action)

		expect(newState.allCharacters).toEqual([mockedCharacter])
		expect(newState.isLoading).toBeFalsy()
		expect(newState.error).toBeNull()
	})

	it('should handle FETCH_ERROR', () => {
		const action: CharactersAction = {
			type: 'FETCH_ERROR',
			payload: 'An error occurred',
		}
		const newState = charactersReducer(initialState, action)

		expect(newState.error).toBe('An error occurred')
		expect(newState.isLoading).toBeFalsy()
	})

	it('should handle SELECT_CHARACTER', () => {
		const action: CharactersAction = {
			type: 'SELECT_CHARACTER',
			payload: mockedCharacter,
		}
		const newState = charactersReducer(initialState, action)

		expect(newState.selectedCharacter).toEqual(mockedCharacter)
	})

	it('should handle CLEAR_SELECTION', () => {
		const editedState = {
			...initialState,
			selectedCharacter: mockedCharacter,
		}
		const action: CharactersAction = { type: 'CLEAR_SELECTION' }
		const newState = charactersReducer(editedState, action)

		expect(newState.selectedCharacter).toBeNull()
	})

	it('should handle SET_SEARCH_TERM', () => {
		const editedState = {
			...initialState,
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
		const newState = charactersReducer(initialState, action)
		expect(newState.hasMore).toBe(false)
	})
})
