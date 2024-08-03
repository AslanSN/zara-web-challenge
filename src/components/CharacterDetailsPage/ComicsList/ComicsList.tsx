import {
	ComicsImages,
	Image,
} from '@/contexts/CharactersContext/types/characterTypes'
import ComicCard from '../ComicCard/ComicCard'
import styles from './ComicsList.module.scss'
import { useCharacters } from '@/hooks/useCharacters'

const ComicsList = ({ comics }: { comics: ComicsImages | undefined }) => {
	const { isLoadingImages } = useCharacters()

	return (
		<div className={styles.comics_list}>
			<h1>Comics</h1>
			{(!comics && isLoadingImages) || !comics ? (
				<h3>Images are loading...</h3>
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
