import Image from 'next/image'
import styles from './CharacterHeader.module.scss'
const CharacterHeader = ({
	name,
	imageSrc,
	description,
}: {
	name: string
	imageSrc: string
	description: string
	}) => {
	
	return (
		<section className={styles.character_header}>
			<div className={styles.container}>
				<Image src={imageSrc} alt={name} width={320} height={320} />
				<div className={styles.info}>
					<div className={styles.title}>
						<h1>{name}</h1>
						<button onClick={() => console.log('add to favorites')}>
							<Image
								src='/whiteHeartIcon.svg'
								alt={name}
								width={24}
								height={22}
							/>
						</button>
					</div>
					<p>
						{description === ''
							? 'This character has no description'
							: description}
					</p>
				</div>
			</div>
		</section>
	)
}

export default CharacterHeader
