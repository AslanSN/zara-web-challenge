import Image from 'next/image'
import styles from './CharacterCard.module.scss'
import styled from 'styled-components'
import Link from 'next/link'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import FavoriteButton from '@/components/common/FavoriteButton/FavoriteButton'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import useWindowWidth from '../../common/hooks/useWindowWidth'
import { useMemo } from 'react'

interface CharacterCardProps {
	imageSrc: string
	name: string
	character: Character
}

const InfoText = styled.p<{ maxWidth: number }>`
	max-width: ${(props) => props.maxWidth}px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: start;
`

const CharacterCard = ({ imageSrc, name, character }: CharacterCardProps) => {
	const { selectCharacter } = useCharacters()
	const { windowWidth } = useWindowWidth()

	const imageWidth = useMemo(
		() => (windowWidth === 'big' ? 190 : 172),
		[windowWidth]
	)

	const handleOnClickLink = () => {
		selectCharacter(character)
	}

	return (
		<div className={`${styles.character_card} card`}>
			<Link href={`/character/${character.id}`} onClick={handleOnClickLink}>
				<Image
					src={imageSrc}
					alt="Character image"
					height={190}
					width={imageWidth}
				/>
			</Link>
			<div className={styles.info}>
				<InfoText maxWidth={imageWidth - 50}>{name}</InfoText>
				<FavoriteButton character={character} />
			</div>
		</div>
	)
}

export default CharacterCard
