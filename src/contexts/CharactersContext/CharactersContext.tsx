"use client"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react'
import type { CharactersContextType } from './types'
import { charactersReducer } from './characterReducer'
import { fetchCharacters } from '@/services/marvelApi'
import { Character } from '@/types/types'
import {
	INITIAL_CHARACTERS_PER_PAGE,
	INITIAL_LIMIT,
	INITIAL_OFFSET,
} from './constants'

/**
 * ! CONTEXT
 * @description Context
 */
export const CharactersContext = createContext<
	CharactersContextType | undefined
>(undefined)

/**
 * ! Context Provider
 * @description Context Provider
 * @param param0
 * @returns
 */
export const CharactersContextProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [state, dispatch] = useReducer(charactersReducer, {
		allCharacters: [],
		filteredCharacters: [],
		selectedCharacter: null,
		isLoading: false,
		error: null,
		offset: INITIAL_OFFSET,
		hasMore: true,
		searchTerm: '',
		limit: INITIAL_LIMIT,
		charactersPerPage: INITIAL_CHARACTERS_PER_PAGE,
	})

	const fetchNextPage = useCallback(async (): Promise<void> => {
		if (state.isLoading || !state.hasMore) return

		dispatch({ type: 'FETCH_START' })

		try {
			const newCharacters = await fetchCharacters({
				offset: state.offset,
				limit: state.limit,
				nameStartsWith: state.searchTerm || undefined,
			})
			console.log("🚀 ~ file: CharactersContext.tsx:85 ~ fetchNextPage ~ newCharacters:", newCharacters)

			dispatch({ type: 'FETCH_SUCCESS', payload: newCharacters })

			if (newCharacters.length < state.charactersPerPage) {
				dispatch({ type: 'SET_HAS_MORE', payload: false })
			}
		} catch (error) {
			console.error('Error fetching characters:', error)
			dispatch({
				type: 'FETCH_ERROR',
				payload:
					error instanceof Error ? error.message : 'An unknown error occurred',
			})
		}
	}, [
		state.isLoading,
		state.hasMore,
		state.offset,
		state.limit,
		state.searchTerm,
		state.charactersPerPage,
	])

	const selectCharacter = useCallback((character: Character) => {

		dispatch({ type: 'SELECT_CHARACTER', payload: character })
	}, [])

	const clearSelection = useCallback(() => {
		dispatch({ type: 'CLEAR_SELECTION' })
	}, [])

	const searchCharacters = useCallback((term: string) => {
		dispatch({ type: 'SET_SEARCH_TERM', payload: term })
	}, [])

	useEffect(() => {
		if (state.allCharacters.length === 0) {
			fetchNextPage()
		}
	}, [fetchNextPage, state.allCharacters.length])

	const contextValue = useMemo(
		() => ({
			...state,
			fetchNextPage,
			selectCharacter,
			clearSelection,
			searchCharacters,
		}),
		[state, fetchNextPage, selectCharacter, clearSelection, searchCharacters]
	)

	return (
		<CharactersContext.Provider value={contextValue}>
			{children}
		</CharactersContext.Provider>
	)
}

/**
 * ! Context Hook
 * @returns {CharactersContextType}
 */
export const useCharactersContext = (): CharactersContextType => {
	const context = useContext(CharactersContext)
  
	if (context === undefined) {
    throw new Error(
      'useCharactersContext must be used within a CharactersContextProvider'
		)
	}
  
	return context
}
