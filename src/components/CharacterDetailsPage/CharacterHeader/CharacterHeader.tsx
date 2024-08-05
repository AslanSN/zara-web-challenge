import Image from 'next/image'
import FavoriteButton from '@/components/common/FavoriteButton/FavoriteButton'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import { useMemo } from 'react'
import useWindowWidth from '@/components/common/hooks/useWindowWidth'
import styles from './CharacterHeader.module.scss'

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
	const { windowWidth } = useWindowWidth({ smallScreenBreakPoint: 600 })
	const [imageWidth, imageHeight] = useMemo(() => {
		if (windowWidth === 'big') return [320, 320]

		return windowWidth === 'medium' ? [278, 278] : [393, 398]
	}, [windowWidth])

	return (
		<div className={styles.character_header}>
			<Image
				src={imageSrc}
				alt={name}
				width={imageWidth}
				height={imageHeight}
			/>
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
	)
}

export default CharacterHeader
