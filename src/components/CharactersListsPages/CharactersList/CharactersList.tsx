'use client'
import { useEffect } from 'react'
import CharacterCard from '../CharacterCard/CharacterCard'
import { useCharacters } from '@/hooks/useCharacters'
import styles from './CharactersList.module.scss'
const CharactersList = () => {
	const { characters, isLoading, error } = useCharacters()

	if (isLoading && characters.length === 0) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<section className={styles.character_list}>
			<ul>
				{characters.map((character) => (
					<li key={character.id}>
						<CharacterCard
							imageSrc={
								character.thumbnail.path + '.' + character.thumbnail.extension
							}
							name={character.name}
							character={character}
						/>
					</li>
				))}
			</ul>
		</section>
	)
}
export default CharactersList
