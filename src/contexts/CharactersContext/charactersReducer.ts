import {
	CharactersAction,
	CharactersState,
} from './types/characterContextTypes'
// eslint-disable-next-line import/no-cycle
import { initialCharactersContextState } from './CharactersContext'
import { Character } from './types/characterTypes'

/**
 * Reduces the state of the characters context based on the given action.
 *
 * @param {CharactersState} state - The current state of the characters context.
 * @param {CharactersAction} action - The action to be performed on the state.
 * @return {CharactersState} The updated state of the characters context.
 */
export const charactersReducer = (
	state: CharactersState,
	action: CharactersAction
): CharactersState => {
	const filterCharacters = () => {
		if (state.filteredCharacters.size > 0) {
			const charactersFavoritesAndFiltered = state.favorites.reduce(
				(acc, character) => {
					if (state.filteredCharacters.has(character)) {
						acc.push(character)
					}
					return acc
				},
				[] as Character[]
			)
			return new Set(charactersFavoritesAndFiltered)
		}
		return new Set(state.favorites)
	}

	const filterFunction = (character: Character, payload: string) =>
		character.name.toLocaleLowerCase().includes(payload.toLocaleLowerCase())

	switch (action.type) {
		case 'FETCH_START':
			return { ...state, isLoading: true, error: null }

		case 'FETCH_SUCCESS': {
			const updatedCharacters = [...state.allCharacters, ...action.payload]
			return {
				...state,
				allCharacters: updatedCharacters,
				isLoading: false,
				offset: updatedCharacters.length,
				error: null,
				hasMore: updatedCharacters.length < state.maxCharacters,
			}
		}

		case 'FETCH_ERROR':
			return { ...state, isLoading: false, error: action.payload }

		case 'SET_FAVORITE_CHARACTER': {
			const newFavorites = [...state.favorites, action.payload]
			localStorage.setItem('favorites', JSON.stringify(newFavorites))
			return { ...state, favorites: newFavorites }
		}
		case 'UNSET_FAVORITE_CHARACTER': {
			const updatedFavorites = state.favorites.filter(
				favorite => favorite.id !== action.payload.id
			)
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
			return {
				...state,
				favorites: updatedFavorites,
			}
		}

		case 'TOGGLE_SHOW_FAVORITES':
			return {
				...state,
				showFavorites: !state.showFavorites,
				searchTerm: '',
				filteredCharacters: state.showFavorites
					? filterCharacters()
					: new Set(state.allCharacters),
			}

		case 'SET_SHOW_FAVORITES':
			return {
				...state,
				showFavorites: true,
				searchTerm: '',
				filteredCharacters: filterCharacters(),
				selectedCharacter: null,
			}

		case 'SET_HIDE_FAVORITES':
			return {
				...state,
				showFavorites: false,
				searchTerm: '',
				filteredCharacters: new Set(state.allCharacters),
				selectedCharacter: null,
			}

		case 'SELECT_CHARACTER':
			return {
				...state,
				selectedCharacter: action.payload,
				isLoading: false,
			}

		case 'FETCH_CHARACTER_IMAGES_START':
			return {
				...state,
				isLoadingImages: true,
			}

		case 'FETCH_CHARACTER_IMAGES_SUCCESS':
			return {
				...state,
				isLoadingImages: false,
				comicsImages: [...state.comicsImages, action.payload],
			}

		case 'CLEAR_SELECTION':
			return { ...state, selectedCharacter: null }

		case 'SET_SEARCH_TERM': {
			const filteredCharacters = (): Character[] => {
				if (state.showFavorites) {
					return state.favorites.filter(character =>
						filterFunction(character, action.payload)
					)
				}
				return state.allCharacters.filter(character =>
					filterFunction(character, action.payload)
				)
			}

			return {
				...state,
				searchTerm: action.payload.toLocaleLowerCase(),
				filteredCharacters: new Set(filteredCharacters()),
				offset: initialCharactersContextState.offset,
			}
		}
		case 'SET_FILTERED_CHARACTERS': {
			return {
				...state,
				filteredCharacters: new Set(action.payload),
				isLoading: false,
				error: null,
			}
		}
		case 'SET_FAVORITES':
			return { ...state, favorites: action.payload }
		case 'SET_HAS_MORE':
			return { ...state, hasMore: action.payload }
		case 'SET_CHARACTERS_DISPLAYING':
			return { ...state, charactersDisplaying: action.payload }
		default:
			return state
	}
}
