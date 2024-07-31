import { Character } from '@/types/types'

export interface CharactersState {
	allCharacters: Character[]
	filteredCharacters: Character[]
	selectedCharacter: Character | null
	isLoading: boolean
	error: string | null
	limit: number
	offset: number
	hasMore: boolean
	searchTerm: string
	charactersPerPage: number
}

export type CharactersAction =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: Character[] }
	| { type: 'FETCH_ERROR'; payload: string }
	| { type: 'SELECT_CHARACTER'; payload: Character }
	| { type: 'CLEAR_SELECTION' }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| { type: 'SET_HAS_MORE'; payload: boolean }

export interface CharactersContextType extends CharactersState {
	fetchNextPage: () => Promise<void>
	selectCharacter: (character: Character) => void
	clearSelection: () => void
	searchCharacters: (term: string) => void
}
