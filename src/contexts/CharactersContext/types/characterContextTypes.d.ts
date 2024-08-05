/* eslint-disable no-unused-vars */
import { Character, ComicsImages } from './characterTypes'

export interface CharactersState {
	allCharacters: Character[]
	filteredCharacters: Set<Character>
	favorites: Character[]
	charactersDisplaying: number
	showFavorites: boolean
	selectedCharacter: Character | null
	isLoadingImages: boolean
	comicsImages: ComicsImages[]
	isLoading: boolean
	error: string | null
	limit: number
	offset: number
	hasMore: boolean
	searchTerm: string
	maxCharacters: number
}

export type CharactersAction =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: Character[] }
	| { type: 'FETCH_ERROR'; payload: string }
	| { type: 'SELECT_CHARACTER'; payload: Character }
	| { type: 'FETCH_CHARACTER_IMAGES_START' }
	| { type: 'FETCH_CHARACTER_IMAGES_SUCCESS'; payload: ComicsImages }
	| { type: 'SET_FAVORITES'; payload: Character[] }
	| { type: 'TOGGLE_SHOW_FAVORITES' }
	| { type: 'SET_SHOW_FAVORITES' }
	| { type: 'SET_HIDE_FAVORITES' }
	| { type: 'SET_FAVORITE_CHARACTER'; payload: Character }
	| { type: 'UNSET_FAVORITE_CHARACTER'; payload: Character }
	| { type: 'CLEAR_SELECTION' }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| { type: 'SET_HAS_MORE'; payload: boolean }
	| { type: 'SET_CHARACTERS_DISPLAYING'; payload: number }

export interface CharactersContextType extends CharactersState {
	fetchNextPage: () => Promise<void>
	fetchCharacter: (id: number) => Promise<void>
	selectCharacter: (character: Character) => void
	toggleShowFavorites: () => void
	setFavorites: (favorites: Character[]) => void
	setShowFavorites: () => void
	setHideFavorites: () => void
	setFavoriteCharacter: (character: Character) => void
	unsetFavoriteCharacter: (character: Character) => void
	fetchCharacterImages: (character: Character) => Promise<void>
	clearSelection: () => void
	searchCharacters: (term: string) => void
	setCharactersDisplaying: (charactersDisplaying: number) => void
}
