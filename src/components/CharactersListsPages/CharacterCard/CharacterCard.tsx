import Image from 'next/image'
import styles from './CharacterCard.module.scss'
import styled from 'styled-components'
import Link from 'next/link'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import FavoriteButton from '@/components/common/FavoriteButton/FavoriteButton'
import { Character } from '@/contexts/CharactersContext/types/characterTypes'
import useWindowWidth from '../../common/hooks/useWindowWidth'
import { useMemo } from 'react'
import ImagePlaceholder from '../../common/CharacterCardPlaceholder'
import { isNotEmptyObject } from '@/contexts/CharactersContext/utils/predicates'

interface CharacterCardProps {
	character?: Character
}

const InfoText = styled.p<{ $maxWidth: number }>`
	max-width: ${(props) => props.$maxWidth}px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: start;
`

const CharacterCard = ({ character }: CharacterCardProps) => {
	const { selectCharacter } = useCharacters()
	const { windowWidth } = useWindowWidth()

	const imageWidth = useMemo(
		() => (windowWidth === 'big' ? 190 : 172),
		[windowWidth]
	)
	const imageHeight = useMemo(() => 190, [])

	const handleOnClickLink = () => {
		if (!character) return
		selectCharacter(character)
	}

	return (
		<div className={`${styles.character_card} card`}>
			<Link
				href={character ? `/character/${character.id}` : '/'}
				onClick={handleOnClickLink}
			>
				{character && isNotEmptyObject(character.thumbnail) ? (
					<Image
						src={character.thumbnail.path + '.' + character.thumbnail.extension}
						alt={'image'}
						height={imageHeight}
						width={imageWidth}
					/>
				) : (
					<ImagePlaceholder width={imageWidth} height={imageHeight} />
				)}
			</Link>
			<div className={styles.info}>
				<InfoText $maxWidth={imageWidth - 50}>
					{character?.name ?? 'name'}
				</InfoText>
				{character ? (
					<FavoriteButton character={character} />
				) : (
					<FavoriteButton isDisabled />
				)}
			</div>
		</div>
	)
}

export default CharacterCard
