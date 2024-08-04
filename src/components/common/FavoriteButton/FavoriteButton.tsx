import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import styles from './FavoriteButton.module.scss'
const FavoriteButton = ({ character }: { character: Character }) => {
	const { favorites, setFavoriteCharacter, unsetFavoriteCharacter } =
		useCharacters()

	const isFavorite = useMemo(
		() => favorites.some((favorite) => favorite.id === character.id),
		[character.id, favorites]
	)

	const handleFavorite = useCallback(() => {
		if (isFavorite) {
			unsetFavoriteCharacter(character)
			return
		}
		setFavoriteCharacter(character)
	}, [character, isFavorite, setFavoriteCharacter, unsetFavoriteCharacter])
	const handleIconToShow = useMemo(
		() => (isFavorite ? '/Heart icon.svg' : '/whiteHeartIcon.svg'),
		[isFavorite]
	)
	return (
		<button
			type="button"
			className={styles.favorite_button}
			onClick={handleFavorite}
		>
			<Image
				src={handleIconToShow}
				alt="Favorite icon"
				width={24}
				height={24}
				priority
			/>
		</button>
	)
}

export default FavoriteButton
