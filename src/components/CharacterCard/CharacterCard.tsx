import Image from 'next/image'
import styles from './CharacterCard.module.scss'

interface CharacterCardProps {
	src: string
	name: string
}
const CharacterCard = ({ src, name }: CharacterCardProps) => {
	return (
		<div className={styles.character_card}>
			<Image src={src} alt='Character image' width='190' height='190' />
			<p>{name}</p>
		</div>
	)
}

export default CharacterCard
