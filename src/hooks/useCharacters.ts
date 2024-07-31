import { useCharactersContext } from '@/contexts/CharactersContext'
import { Character } from '@/types/types'
import { useCallback, useMemo } from 'react'

export const useCharacters = () => {
	const context = useCharactersContext()

	const fetchNextPage = useCallback(async () => {
		if (context.isLoading || !context.hasMore) return
		await context.fetchNextPage()
	}, [context])

	const selectCharacter = useCallback(
		(character: Character) => {
			context.selectCharacter(character)
		},
		[context]
	)

	const clearSelection = useCallback(() => {
		context.clearSelection()
	}, [context])

	const searchCharacters = useCallback(
		(term: string) => {
			context.searchCharacters(term)
		},
		[context]
	)

	const charactersValueMemoized = useMemo(
		() => ({
			characters: context.filteredCharacters,
			selectedCharacter: context.selectedCharacter,
			isLoading: context.isLoading,
			error: context.error,
			hasMore: context.hasMore,
			fetchNextPage,
			selectCharacter,
			clearSelection,
			searchCharacters,
		}),
		[
			context.filteredCharacters,
			context.selectedCharacter,
			context.isLoading,
			context.error,
			context.hasMore,
			fetchNextPage,
			selectCharacter,
			clearSelection,
			searchCharacters,
		]
	)

	return charactersValueMemoized
}
