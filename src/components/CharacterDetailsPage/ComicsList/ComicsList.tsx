import {
	ComicsImages,
	Image,
} from '@/contexts/CharactersContext/types/characterTypes'
import ComicCard from '../ComicCard/ComicCard'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import styles from './ComicsList.module.scss'

const ComicsList = ({ comics }: { comics: ComicsImages | undefined }) => {
	const { isLoadingImages } = useCharacters()
	return (
		<div className={styles.comics_list}>
			<h1>Comics</h1>
			{(!comics && isLoadingImages) || !comics ? (
				<h3>Loading comics...</h3>
			) : (
				<ul>
					{comics.images.map((comic: Image) => (
						<ComicCard key={comic.imageName} comic={comic} />
					))}
				</ul>
			)}
		</div>
	)
}

export default ComicsList
