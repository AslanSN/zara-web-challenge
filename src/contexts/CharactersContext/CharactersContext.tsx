'use client'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react'
import type {
	CharactersContextType,
	CharactersState,
} from './types/characterContextTypes'
import { charactersReducer } from './characterReducer'
import {
	fetchCharacterById,
	fetchCharacters,
	fetchComicImageByUri,
} from '@/services/marvelApi'
import { Character } from './types/characterTypes'

/**
 * ! CONTEXT
 * @description Context
 */
export const CharactersContext = createContext<
	CharactersContextType | undefined
>(undefined)

export const initialCharactersContextState: CharactersState = {
	allCharacters: [],
	filteredCharacters: [],
	favorites: [],
	selectedCharacter: null,
	isLoading: false,
	error: null,
	offset: 0,
	hasMore: true,
	limit: 10,
	searchTerm: '',
	maxCharacters: 50,
}

/**
 * ! Context Provider
 * @description Context Provider
 * @param param0
 * @returns
 */
export const CharactersContextProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [state, dispatch] = useReducer(
		charactersReducer,
		initialCharactersContextState
	)

	const fetchNextPage = useCallback(async (): Promise<void> => {
		if (state.isLoading || !state.hasMore) return

		dispatch({ type: 'FETCH_START' })
		try {
			const { newCharacters, error } = await fetchCharacters({
				offset: state.offset,
				limit: state.limit,
				nameStartsWith: state.searchTerm || undefined,
			})
			if (error) {
				dispatch({
					type: 'FETCH_ERROR',
					payload:
						error instanceof Error ? error.message : 'Network response not ok',
				})
				return
			}
			dispatch({ type: 'FETCH_SUCCESS', payload: newCharacters })
			if (newCharacters.length < state.maxCharacters) {
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
		state.maxCharacters,
	])

	const fetchCharacter = useCallback(
		async (id: number): Promise<void> => {
			if (state.isLoading) return
			dispatch({ type: 'FETCH_START' })

			const filteredCharacter = state.allCharacters.find(
				(character) => character.id === id
			)
			if (filteredCharacter) {
				console.log("🚀 ~ file: CharactersContext.tsx:106 ~ filteredCharacter.comics.items?.[0]?.imagePath:", filteredCharacter.comics.items?.[0]?.imagePath)
				dispatch({ type: 'SELECT_CHARACTER', payload: filteredCharacter })
				return
			}

			// If character is not in allCharacters, fetch it
			try {
				const characterData = await fetchCharacterById(id)
				if (characterData === null) return

				const comicsWithImagePaths = await Promise.all(
					characterData.comics.items.map(async ({ resourceURI }, index) => {
						const comicImage = await fetchComicImageByUri(resourceURI)
						return { ...characterData.comics.items[index], imagePath: comicImage }
					})
				)

				const updatedCharacterData = {
					...characterData,
					comics: {
						...characterData.comics,
						items: comicsWithImagePaths,
					},
				}

				dispatch({ type: 'SELECT_CHARACTER', payload: updatedCharacterData })
			} catch (error: unknown) {
				let errorMessage: string
				if (error instanceof Error) {
					errorMessage = error.message
				} else {
					errorMessage = 'An unknown error occurred'
				}
				dispatch({
					type: 'FETCH_ERROR',
					payload: errorMessage,
				})
			}
		},
		[state.allCharacters, state.isLoading]
	)

	const selectCharacter = useCallback((character: Character) => {
		if (!character) return
		dispatch({ type: 'SELECT_CHARACTER', payload: character })
	}, [])

	const clearSelection = useCallback(() => {
		dispatch({ type: 'CLEAR_SELECTION' })
	}, [])

	const searchCharacters = useCallback((term: string) => {
		dispatch({ type: 'SET_SEARCH_TERM', payload: term })
	}, [])

	const contextValue = useMemo(
		() => ({
			...state,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			searchCharacters,
		}),
		[
			state,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			searchCharacters,
		]
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
