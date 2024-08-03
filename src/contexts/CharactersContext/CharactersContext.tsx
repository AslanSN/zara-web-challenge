import {
	createContext,
	useCallback,
	useContext,
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
	filteredCharacters: new Set([]),
	favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
	charactersDisplaying: 0,
	showFavorites: false,
	selectedCharacter: null,
	isLoadingImages: false,
	comicsImages: [],
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
		state.maxCharacters,
	])

	const fetchCharacterImages = useCallback(
		async (selectedCharacter: Character): Promise<void> => {
			if (state.isLoadingImages) return

			dispatch({ type: 'FETCH_CHARACTER_IMAGES_START' })
			const { items: comics } = selectedCharacter.comics

			try {
				const comicsWithImagePaths = await Promise.all(
					comics.map(async ({ resourceURI, name }) => {
						const comicImage = await fetchComicImageByUri(resourceURI)
						return {
							imageName: name,
							imagePath: comicImage,
						}
					})
				)

				const updatedComicsImages = {
					id: selectedCharacter.id,
					images: comicsWithImagePaths,
				}

				dispatch({
					type: 'FETCH_CHARACTER_IMAGES_SUCCESS',
					payload: updatedComicsImages,
				})
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
		[state.isLoadingImages]
	)

	const fetchCharacter = useCallback(
		async (id: number): Promise<void> => {
			if (state.isLoading) return
			dispatch({ type: 'FETCH_START' })

			try {
				const characterData: Character = await fetchCharacterById(id)
				if (characterData === null) return

				dispatch({ type: 'SELECT_CHARACTER', payload: characterData })
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
		[state.isLoading]
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

	const toggleShowFavorites = useCallback(() => {
		dispatch({ type: 'TOGGLE_SHOW_FAVORITES' })
	}, [])

	const setShowFavorites = useCallback(() => {
		dispatch({ type: 'SET_SHOW_FAVORITES' })
		clearSelection()
	}, [clearSelection])

	const setFavoriteCharacter = useCallback((character: Character) => {
		dispatch({ type: 'SET_FAVORITE_CHARACTER', payload: character })
	}, [])

	const unsetFavoriteCharacter = useCallback((character: Character) => {
		dispatch({ type: 'UNSET_FAVORITE_CHARACTER', payload: character })
	}, [])

	const setCharactersDisplaying = useCallback(
		(charactersDisplaying: number) => {
			dispatch({
				type: 'SET_CHARACTERS_DISPLAYING',
				payload: charactersDisplaying,
			})
		},
		[]
	)

	const contextValue = useMemo(
		() => ({
			...state,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			fetchCharacterImages,
			searchCharacters,
			toggleShowFavorites,
			setShowFavorites,
			setFavoriteCharacter,
			unsetFavoriteCharacter,
			setCharactersDisplaying,
		}),
		[
			state,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			fetchCharacterImages,
			searchCharacters,
			toggleShowFavorites,
			setShowFavorites,
			setFavoriteCharacter,
			unsetFavoriteCharacter,
			setCharactersDisplaying,
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
