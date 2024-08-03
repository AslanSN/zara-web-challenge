import { type Image as ImageType } from '@/contexts/CharactersContext/types/characterTypes'
import Image from 'next/image'

const ComicCard = ({ comic }: { comic: ImageType }) => {
	return (
		<li key={comic.imageName}>
			{!comic.imagePath ? null : (
				<Image
					src={comic.imagePath}
					alt={comic.imageName}
					width={180}
					height={270}
				/>
			)}
			<p>{comic.imageName}</p>
		</li>
	)
}

export default ComicCard
