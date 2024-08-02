import {
	CharactersAction,
	CharactersState,
} from './types/characterContextTypes'
import { initialCharactersContextState } from './CharactersContext'

export const charactersReducer = (
	state: CharactersState,
	action: CharactersAction
): CharactersState => {
	switch (action.type) {
		case 'FETCH_START':
			return { ...state, isLoading: true, error: null }
		case 'FETCH_SUCCESS':
			return {
				...state,
				allCharacters: [...state.allCharacters, ...action.payload],
				filteredCharacters: state.searchTerm
					? action.payload
					: [...state.filteredCharacters, ...action.payload],
				isLoading: false,
				offset: state.offset + initialCharactersContextState.offset,
			}
		case 'FETCH_ERROR':
			return { ...state, isLoading: false, error: action.payload }
		case 'SET_FAVORITE_CHARACTER':
			return { ...state, favorites: [...state.favorites, action.payload] }
		case 'UNSET_FAVORITE_CHARACTER':
			return {
				...state,
				favorites: state.favorites.filter(
					(favorite) => favorite.id !== action.payload.id
				),
			}
		case 'TOGGLE_SHOW_FAVORITES':
			return {
				...state,
				showFavorites: !state.showFavorites,
				filteredCharacters: state.showFavorites
					? state.favorites
					: state.allCharacters,
			}
		case 'SELECT_CHARACTER':
			action.payload
			return {
				...state,
				selectedCharacter: action.payload,
				isLoading: false,
			}
		case 'CLEAR_SELECTION':
			return { ...state, selectedCharacter: null }
		case 'SET_SEARCH_TERM':
			return {
				...state,
				searchTerm: action.payload,
				filteredCharacters: state.allCharacters.filter((character) =>
					character.name.toLowerCase().startsWith(action.payload.toLowerCase())
				),

				offset: initialCharactersContextState.offset,
				hasMore: true,
			}
		case 'SET_HAS_MORE':
			return { ...state, hasMore: action.payload }
		default:
			return state
	}
}
