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
// eslint-disable-next-line import/no-cycle
import { charactersReducer } from './charactersReducer'
import { Character } from './types/characterTypes'
import {
	fetchCharacters,
	fetchCharacterById,
	fetchComicImageByUri,
} from './services/marvelApi'

/**
 * ! CONTEXT
 * @description ContextCreator
 */
export const CharactersContext = createContext<
	CharactersContextType | undefined
>(undefined)

export const initialCharactersContextState: CharactersState = {
	allCharacters: [],
	filteredCharacters: new Set([]),
	favorites: [],
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
 * A React functional component that provides a context for managing characters and their related data.
 *
 * @param {React.ReactNode} children - The child components that will have access to the characters context.
 * @return {JSX.Element} The CharactersContextProvider component.
 */
export const CharactersContextProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [state, dispatch] = useReducer(
		charactersReducer,
		initialCharactersContextState
	)

	const fetchNextPage = useCallback(async (): Promise<void> => {
		const hasNotEmptySearchTerm = state.searchTerm !== ''
		if (state.isLoading || (!state.hasMore && !hasNotEmptySearchTerm)) return

		dispatch({ type: 'FETCH_START' })
		try {
			const { newCharacters, error } = await fetchCharacters({
				limit: hasNotEmptySearchTerm ? 20 : state.limit,
				offset: hasNotEmptySearchTerm ? 0 : state.offset,
				nameStartsWith: hasNotEmptySearchTerm ? state.searchTerm : undefined,
			})

			if (error) {
				dispatch({
					type: 'FETCH_ERROR',
					payload:
						error instanceof Error ? error.message : 'Network response not ok',
				})
				return
			}

			if (state.searchTerm !== '') {
				dispatch({
					type: 'SET_CHARACTERS_DISPLAYING',
					payload: newCharacters.length,
				})
				dispatch({
					type: 'SET_FILTERED_CHARACTERS',
					payload: new Set(newCharacters),
				})
				return
			}

			dispatch({ type: 'FETCH_SUCCESS', payload: newCharacters })
		} catch (error) {
			dispatch({
				type: 'FETCH_ERROR',
				payload:
					error instanceof Error ? error.message : 'An unknown error occurred',
			})
		}
	}, [
		state.searchTerm,
		state.isLoading,
		state.hasMore,
		state.limit,
		state.offset,
	])

	const fetchCharacterImages = useCallback(
		async (selectedCharacter: Character): Promise<void> => {
			if (state.isLoadingImages) return

			dispatch({ type: 'FETCH_CHARACTER_IMAGES_START' })
			const { items: comics } = selectedCharacter.comics

			try {
				const limitedComics = comics.slice(0, 20)
				const comicsWithImagePaths = await Promise.all(
					limitedComics.map(async ({ resourceURI, name }) => {
						const secureResourceURI = resourceURI.replace('http://', 'https://')
						const comicImage = await fetchComicImageByUri(secureResourceURI)
						const regex = /^(.*?)\s*\((\d{4})\)\s*(#\d+)(?:\s*(.*))?$/

						const match = name.match(regex)
						if (!match) {
							return {
								imageName: name,
								imagePath: comicImage,
								imageYear: '',
							}
						}
						const [_, nameWithoutYear, year, number] = match
						const newName = `${nameWithoutYear} ${number}`
						return {
							imageName: newName,
							imagePath: comicImage,
							imageYear: year,
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
	}, [])

	const setHideFavorites = useCallback(() => {
		dispatch({ type: 'SET_HIDE_FAVORITES' })
	}, [])

	const setFavoriteCharacter = useCallback((character: Character) => {
		dispatch({ type: 'SET_FAVORITE_CHARACTER', payload: character })
	}, [])

	const unsetFavoriteCharacter = useCallback((character: Character) => {
		dispatch({ type: 'UNSET_FAVORITE_CHARACTER', payload: character })
	}, [])

	const setCharactersDisplaying = useCallback(
		(charactersDisplaying: number) => {
			if (charactersDisplaying <= 0) return
			dispatch({
				type: 'SET_CHARACTERS_DISPLAYING',
				payload: charactersDisplaying,
			})
		},
		[]
	)

	const setFavorites = useCallback(
		(favorites: Character[]) =>
			favorites.length > 0 &&
			dispatch({ type: 'SET_FAVORITES', payload: favorites }),
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
			setHideFavorites,
			setFavorites,
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
			setHideFavorites,
			setFavorites,
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
 * Retrieves the CharactersContext and throws an error if it is undefined.
 *
 * @return {CharactersContextType} The CharactersContext
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
