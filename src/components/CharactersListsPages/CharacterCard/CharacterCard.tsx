import Image from 'next/image'
import styles from './CharacterCard.module.scss'
import Link from 'next/link'
import { useCharacters } from '@/hooks/useCharacters'
import { Character } from '@/types/types'

interface CharacterCardProps {
	imageSrc: string
  name: string
  character: Character
}
const CharacterCard = ({ imageSrc, name, character }: CharacterCardProps) => {
  const {selectCharacter} = useCharacters()
  const handleOnClickLink = () => {
    selectCharacter(character)
  }
	return (
		<div className={styles.character_card}>
			<Link href={`/character/${character.id}`} onClick={handleOnClickLink}>
				<Image src={imageSrc} alt="Character image" width="190" height="190" />
				<p>{name}</p>
			</Link>
		</div>
	)
}

export default CharacterCard
