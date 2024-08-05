import { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import styles from './FavoriteButton.module.scss'

const FavoriteButton = ({
	character = undefined,
	isDisabled = false,
}: {
	character?: Character
	isDisabled?: boolean
}) => {
	const { favorites, setFavoriteCharacter, unsetFavoriteCharacter } =
		useCharacters()

	const isFavorite = useMemo(
		() => character && favorites.some(favorite => favorite.id === character.id),
		[character, favorites]
	)

	const handleFavorite = useCallback(() => {
		if (!character) return
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
			disabled={isDisabled}
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
