import { ComicsItem } from '@/contexts/CharactersContext/types/characterTypes'
import Image from 'next/image'

const ComicCard = ({ comic }: { comic: ComicsItem }) => {
	return (
		<li key={comic.name}>
			<Image src={comic.imagePath} alt={comic.name} width={180} height={270} />
			<p>{comic.name}</p>
		</li>
	)
}

export default ComicCard
