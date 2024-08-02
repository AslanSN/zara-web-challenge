import Image from 'next/image'
import styles from './CharacterCard.module.scss'
import Link from 'next/link'
import { useCharacters } from '@/hooks/useCharacters'
import FavoriteButton from '@/components/common/FavoriteButton/FavoriteButton'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'

interface CharacterCardProps {
	imageSrc: string
	name: string
	character: Character
}
const CharacterCard = ({ imageSrc, name, character }: CharacterCardProps) => {
	const { selectCharacter } = useCharacters()

	const handleOnClickLink = () => {
		selectCharacter(character)
	}

	return (
		<div className={styles.character_card}>
			<Link href={`/character/${character.id}`} onClick={handleOnClickLink}>
				<Image src={imageSrc} alt='Character image' width='190' height='190' />
			</Link>
				<div className={styles.info}>
					<p>{name}</p>
					<FavoriteButton character={character} />
				</div>
		</div>
	)
}

export default CharacterCard
