import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import { useEffect } from 'react'
import styled from 'styled-components'
import CharacterHeader from './CharacterHeader/CharacterHeader'
import ComicsList from './ComicsList/ComicsList'
import styles from './CharacterDetailsLayout.module.scss'

const MessageForUser = styled.h1`
	width: 100%;
	text-align: center;
`

const CharacterDetailsLayout = () => {
	const {
		selectedCharacter,
		comicsImages,
		isLoading,
		error,
		fetchCharacterImages,
	} = useCharacters()

	useEffect(() => {
		if (!selectedCharacter) return

		const hasAlreadyImagePath = comicsImages.some(
			comic => comic.id === selectedCharacter.id
		)

		if (hasAlreadyImagePath) return

		fetchCharacterImages(selectedCharacter)
	}, [comicsImages, fetchCharacterImages, selectedCharacter])

	if (isLoading) return <MessageForUser>Loading...</MessageForUser>
	if (!selectedCharacter)
		return <MessageForUser>No character selected</MessageForUser>
	if (error)
		return <MessageForUser>We had an error, try again later</MessageForUser>

	const characterPath = selectedCharacter
		? `${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`
		: ''
	const characterComics = comicsImages.find(
		comic => comic.id === selectedCharacter.id
	)

	return (
		<div className={styles.container}>
			<section className={styles.character_header_container}>
				<CharacterHeader
					name={selectedCharacter.name}
					imageSrc={characterPath}
					description={selectedCharacter.description}
					character={selectedCharacter}
				/>
			</section>
			<section className={styles.comics}>
				<ComicsList comics={characterComics} />
			</section>
		</div>
	)
}

export default CharacterDetailsLayout
