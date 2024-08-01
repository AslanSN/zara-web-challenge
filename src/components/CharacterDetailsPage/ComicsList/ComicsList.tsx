import {
	Comics,
	ComicsItem,
} from '@/contexts/CharactersContext/types/characterTypes'
import ComicCard from '../ComicCard/ComicCard'
import styles from './ComicsList.module.scss'

const ComicsList = ({ comics }: { comics: Comics }) => {
	return (
		<div className={styles.comics_list}>
			<h1>Comics</h1>
			<ul>

			{comics.items.map((comic: ComicsItem) => (
				<ComicCard key={comic.name} comic={comic} />
			))}
			</ul>
		</div>
	)
}

export default ComicsList
