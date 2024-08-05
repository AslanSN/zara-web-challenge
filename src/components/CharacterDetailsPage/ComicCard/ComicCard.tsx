import { type Image as ImageType } from '@/contexts/CharactersContext/types/characterTypes'
import Image from 'next/image'
import styles from './ComicCard.module.scss'
import { useMemo } from 'react'
import useWindowWidth from '@/components/common/hooks/useWindowWidth'
import ImagePlaceholder from '@/components/common/CharacterCardPlaceholder'

const ComicCard = ({ comic }: { comic?: ImageType }) => {
	const { windowWidth } = useWindowWidth()
	const [imageWidth, imageHeight] = useMemo(
		() =>
			windowWidth === 'big'
				? [180, 270]
				: windowWidth === 'medium'
				? [170, 254]
				: [164, 246],
		[windowWidth]
	)

	return comic ? (
		<li key={comic.imageName} className={`${styles.comic_card} card`}>
			{!comic.imagePath ? null : (
				<Image
					src={comic.imagePath}
					alt={comic.imageName}
					width={imageWidth}
					height={imageHeight}
				/>
			)}
			<footer>
				<h4>{comic.imageName}</h4>
				<p>{comic.imageYear}</p>
			</footer>
		</li>
	) : (
		<li className={`${styles.comic_card} card`}>
			<ImagePlaceholder width={imageWidth} height={imageHeight} />
			<footer>
				<h4>Comic name</h4>
				<p>Year</p>
			</footer>
		</li>
	)
}

export default ComicCard
