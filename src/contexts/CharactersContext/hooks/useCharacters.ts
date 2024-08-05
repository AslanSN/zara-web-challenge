import { useCallback, useMemo } from 'react'
import { useCharactersContext } from '../CharactersContext'
import { Character } from '../types/characterTypes'

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

	const fetchCharacterImages = useCallback(
		async (character: Character) => {
			await context.fetchCharacterImages(character)
		},
		[context]
	)

	const toggleShowFavorites = useCallback(() => {
		context.toggleShowFavorites()
	}, [context])

	const setFavoriteCharacter = useCallback(
		(character: Character) => {
			context.setFavoriteCharacter(character)
		},
		[context]
	)

	const unsetFavoriteCharacter = useCallback(
		(character: Character) => {
			context.unsetFavoriteCharacter(character)
		},
		[context]
	)
	const charactersValueMemoized = useMemo(
		() => ({
			...context,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			searchCharacters,
			fetchCharacterImages,
			setFavoriteCharacter,
			unsetFavoriteCharacter,
			toggleShowFavorites,
		}),
		[
			context,
			fetchNextPage,
			fetchCharacter,
			selectCharacter,
			clearSelection,
			searchCharacters,
			fetchCharacterImages,
			setFavoriteCharacter,
			unsetFavoriteCharacter,
			toggleShowFavorites,
		]
	)

	return charactersValueMemoized
}
