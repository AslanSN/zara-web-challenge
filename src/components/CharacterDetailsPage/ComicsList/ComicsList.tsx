import {
	ComicsImages,
	Image,
} from '@/contexts/CharactersContext/types/characterTypes'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import ComicCard from '../ComicCard/ComicCard'
import styles from './ComicsList.module.scss'

const ComicsList = ({ comics }: { comics: ComicsImages | undefined }) => {
	const { isLoadingImages } = useCharacters()
	const showPlaceholder = (isLoadingImages && !comics) || !comics

	return (
		<div className={styles.comics_list}>
			<h1>Comics</h1>
			<ul>
				{showPlaceholder
					? [...Array(5)].map(index => <ComicCard key={index} />)
					: comics.images.map((comic: Image) => (
							<ComicCard key={comic.imageName} comic={comic} />
						))}
			</ul>
		</div>
	)
}

export default ComicsList
