import { INITIAL_CHARACTERS_PER_PAGE, INITIAL_OFFSET } from './constants'
import { CharactersAction, CharactersState } from './types'

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
				offset: state.offset + INITIAL_CHARACTERS_PER_PAGE,
			}
		case 'FETCH_ERROR':
			return { ...state, isLoading: false, error: action.payload }
		case 'SELECT_CHARACTER':
			return { ...state, selectedCharacter: action.payload }
		case 'CLEAR_SELECTION':
			return { ...state, selectedCharacter: null }
		case 'SET_SEARCH_TERM':
			return {
				...state,
				searchTerm: action.payload,
				filteredCharacters: state.allCharacters.filter((char) =>
					char.name.toLowerCase().startsWith(action.payload.toLowerCase())
				),
				offset: INITIAL_OFFSET,
				hasMore: true,
			}
		case 'SET_HAS_MORE':
			return { ...state, hasMore: action.payload }
		default:
			return state
	}
}
