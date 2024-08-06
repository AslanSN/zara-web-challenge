import { useCallback, useMemo } from 'react'
import { useCharactersContext } from '../CharactersContext'
import { Character } from '../types/characterTypes'
import { CharactersContextType } from '../types/characterContextTypes'

/**
 * Returns a memoized object containing the characters value and functions to interact with it.
 *
 * @return {Object} An object with the following properties:
 *   - `state`: The current state of the characters context.
 *   - `characters`: The current state of the characters context.
 *   - `fetchNextPage`: A function to fetch the next page of characters.
 *   - `fetchCharacter`: A function to fetch a specific character.
 *   - `selectCharacter`: A function to select a character.
 *   - `clearSelection`: A function to clear the selected character.
 *   - `searchCharacters`: A function to search for characters.
 *   - `fetchCharacterImages`: A function to fetch the images of a character.
 *   - `setFavoriteCharacter`: A function to set a character as a favorite.
 *   - `unsetFavoriteCharacter`: A function to unset a character as a favorite.
 *   - `toggleShowFavorites`: A function to toggle the visibility of favorites.
 */
export const useCharacters = (): CharactersContextType => {
	const context = useCharactersContext()

	const fetchNextPage = useCallback(async () => {
		if (context.isLoading || !context.hasMore) return

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
