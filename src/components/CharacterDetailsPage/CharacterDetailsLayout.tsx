import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import CharacterHeader from './CharacterHeader/CharacterHeader'
import ComicsList from './ComicsList/ComicsList'
import styles from './CharacterDetailsLayout.module.scss'
import { useEffect } from 'react'
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
			(comic) => comic.id === selectedCharacter.id
		)

		if (hasAlreadyImagePath) return

		fetchCharacterImages(selectedCharacter)
	}, [comicsImages, fetchCharacterImages, selectedCharacter])

	if (isLoading) return <h1>Loading...</h1>
	if (!selectedCharacter) return <h1>No character selected</h1>
	if (error) return <h1>{error}</h1>

	const characterPath = selectedCharacter
		? `${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`
		: ''
	const characterComics = comicsImages.find(
		(comic) => comic.id === selectedCharacter.id
	)

	return (
		<div className={styles.container}>
			<CharacterHeader
				name={selectedCharacter.name}
				imageSrc={characterPath}
				description={selectedCharacter.description}
				character={selectedCharacter}
			/>
			<section className={styles.comics}>
				<ComicsList comics={characterComics} />
			</section>
		</div>
	)
}

export default CharacterDetailsLayout
