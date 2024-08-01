import { useCharactersContext } from '@/contexts/CharactersContext'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import { useCallback, useMemo } from 'react'

export const useCharacters = () => {
	const context = useCharactersContext()

	const fetchNextPage = useCallback(async () => {
		if (
			context.isLoading ||
			!context.hasMore ||
			context.allCharacters.length !== 0
		)
			return
		await context.fetchNextPage()
	}, [context])

	const fetchCharacter = useCallback(
		async (id: number) => {
			await context.fetchCharacter(id)
		},
		[context]
	)
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
			characters: context.allCharacters,
			selectedCharacter: context.selectedCharacter,
			isLoading: context.isLoading,
			error: context.error,
			hasMore: context.hasMore,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			searchCharacters,
		}),
		[
			context.allCharacters,
			context.selectedCharacter,
			context.isLoading,
			context.error,
			context.hasMore,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			searchCharacters,
		]
	)

	return charactersValueMemoized
}
