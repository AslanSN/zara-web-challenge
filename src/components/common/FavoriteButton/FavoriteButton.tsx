import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import { useCharacters } from '@/hooks/useCharacters'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'

const FavoriteButton = ({ character }: { character: Character }) => {
	const { favorites, setFavoriteCharacter, unsetFavoriteCharacter } =
		useCharacters()

	const isFavorite = useMemo(
		() => favorites.some((favorite) => favorite.id === character.id),
		[character.id, favorites]
	)

	const handleFavorite = useCallback(() => {
		console.log(
			'🚀 ~ file: FavoriteButton.tsx:15 ~ handleFavorite ~ isFavorite:',
			favorites
		)
		if (isFavorite) {
			unsetFavoriteCharacter(character)
		}
		setFavoriteCharacter(character)
	}, [character, favorites, isFavorite, setFavoriteCharacter, unsetFavoriteCharacter])
	const handleIconToShow = useMemo(
		() => (isFavorite ? '/Heart icon.svg' : '/whiteHeartIcon.svg'),
		[isFavorite]
	)
	return (
		<button type='button' onClick={handleFavorite}>
			<Image
				src={handleIconToShow}
				alt='Favorite icon'
				width={24}
				height={24}
			/>
		</button>
	)
}

export default FavoriteButton
