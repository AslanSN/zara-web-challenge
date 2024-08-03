'use client'
import CharacterCard from '../CharacterCard/CharacterCard'
import { useCharacters } from '@/hooks/useCharacters'
import styles from './CharactersList.module.scss'
import { useMemo } from 'react'
import { isNotEmptyArray, isNotEmptySet } from '@/utils/predicates'
const CharactersList = () => {
	const {
		allCharacters,
		isLoading,
		error,
		favorites,
		searchTerm,
		filteredCharacters,
		showFavorites,
		setCharactersDisplaying,
	} = useCharacters()

	const hasSearchTerm = useMemo(() => searchTerm !== '', [searchTerm])
	const charactersToDisplay = useMemo(() => {
		if (showFavorites && isNotEmptyArray(favorites) && !hasSearchTerm) {
			setCharactersDisplaying(favorites.length)
			return favorites
		}
		
		if (hasSearchTerm && isNotEmptySet(filteredCharacters)) {
			setCharactersDisplaying(filteredCharacters.size)
			return Array.from(filteredCharacters)
		}

		setCharactersDisplaying(allCharacters.length)
		return allCharacters
	}, [
		allCharacters,
		favorites,
		filteredCharacters,
		hasSearchTerm,
		setCharactersDisplaying,
		showFavorites,
	])

	if (isLoading && allCharacters.length === 0) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<section className={styles.character_list}>
			{showFavorites && !isNotEmptyArray(favorites) && (
				<h3>You should add some favorites first</h3>
			)}
			{hasSearchTerm && !isNotEmptySet(filteredCharacters) && (
				<h3>No characters found</h3>
			)}
			<ul>
				{charactersToDisplay.map((character) => (
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
