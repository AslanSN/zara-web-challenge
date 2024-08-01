import { useCharacters } from '@/hooks/useCharacters'
import CharacterHeader from './CharacterHeader/CharacterHeader'
import ComicsList from './ComicsList/ComicsList'
import styles from './CharacterDetailsLayout.module.scss'
const CharacterDetailsLayout = () => {
	const { selectedCharacter, isLoading, error } = useCharacters()
	if (isLoading) return <h1>Loading...</h1>

	if (!selectedCharacter) return <h1>No character selected</h1>

	if (error) return <h1>{error}</h1>

	return (
		<div className={styles.container}>
			<CharacterHeader
				name={selectedCharacter.name}
				imageSrc={
					selectedCharacter.thumbnail.path +
					'.' +
					selectedCharacter.thumbnail.extension
				}
				description={selectedCharacter.description}
			/>
			<section className={styles.comics}>

			<ComicsList comics={selectedCharacter.comics} />
			</section>
		</div>
	)
}

export default CharacterDetailsLayout
