'use client'

import CharacterDetailsLayout from '@/components/CharacterDetailsPage/CharacterDetailsLayout'
import { useCharacters } from '@/hooks/useCharacters'
import { useEffect } from 'react'

const Character = ({ params }: { params: { id: string } }) => {
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
