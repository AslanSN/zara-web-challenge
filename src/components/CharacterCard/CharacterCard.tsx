import Image from 'next/image'

interface CharacterCardProps {
	key: number
	// src: string,
	name: string
}
const CharacterCard = ({
	key,
	// src,
	name,
}: CharacterCardProps) => {
	return (
		<li key={key}>
			{/* <Image src="src" alt="Character image" width="250" height="300" /> */}
			<p>{name}</p>
		</li>
	)
}

export default CharacterCard
