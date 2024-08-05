import {
	ComicsImages,
	Image,
} from '@/contexts/CharactersContext/types/characterTypes'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import { isNotEmptyArray } from '@/contexts/CharactersContext/utils/predicates'
import { useMemo } from 'react'
import ComicCard from '../ComicCard/ComicCard'
import styles from './ComicsList.module.scss'

const ComicsList = ({ comics }: { comics: ComicsImages | undefined }) => {
	const { isLoadingImages } = useCharacters()
	const showPlaceholder = (isLoadingImages && !comics) || !comics
	const hasImages = useMemo(
		() => comics && isNotEmptyArray(comics?.images),
		[comics]
	)
	return (
		<div className={styles.comics_list}>
			<h1>Comics</h1>
			{!hasImages && !showPlaceholder && (
				<h2 style={{ overflowX: 'hidden' }}>No comics found</h2>
			)}

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
