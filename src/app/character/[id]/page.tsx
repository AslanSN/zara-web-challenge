'use client'

import CharacterDetailsLayout from '@/components/CharacterDetailsPage/CharacterDetailsLayout'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import { useEffect } from 'react'

/**
 * Renders a character details layout component based on the provided character ID.
 * Routes to the CharacterDetailsLayout component.
 * Generates "/character/:id" route
 *
 * @param {Object} params - An object containing the character ID.
 * @param {string} params.id - The ID of the character.
 * @return {JSX.Element} The rendered character details layout component.
 */
const Character = ({ params }: { params: { id: string } }): JSX.Element => {
	const { fetchCharacter, selectedCharacter, isLoading } = useCharacters()

	useEffect(() => {
		const loadCharacter = async () => {
			if (
				!isLoading &&
				(selectedCharacter === null ||
					selectedCharacter?.id !== Number(params.id))
			)
				await fetchCharacter(Number(params.id))
		}
		loadCharacter()
	}, [fetchCharacter, isLoading, params.id, selectedCharacter])

	return <CharacterDetailsLayout />
}

export default Character
