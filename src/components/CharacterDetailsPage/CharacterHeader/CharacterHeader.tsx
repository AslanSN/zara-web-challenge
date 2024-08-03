import Image from 'next/image'
import styles from './CharacterHeader.module.scss'
import FavoriteButton from '@/components/common/FavoriteButton/FavoriteButton'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
const CharacterHeader = ({
	name,
	imageSrc,
	description,
	character,
}: {
	name: string
	imageSrc: string
	description: string
	character: Character
}) => {
	return (
		<section className={styles.character_header}>
			<div className={styles.container}>
				<Image src={imageSrc} alt={name} width={320} height={320} />
				<div className={styles.info}>
					<div className={styles.title}>
						<h1>{name}</h1>
						<FavoriteButton character={character} />
					</div>
					<p>
						{description === ''
							? 'This character has no description'
							: description}
					</p>
				</div>
			</div>
		</section>
	)
}

export default CharacterHeader
