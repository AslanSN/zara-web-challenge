'use client'
import CharacterCard from '../CharacterCard/CharacterCard'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import styles from './CharactersList.module.scss'
import { useEffect, useMemo } from 'react'
import {
	isNotEmptyArray,
	isNotEmptySet,
} from '@/contexts/CharactersContext/utils/predicates'
import styled from 'styled-components'

const MessageTitle = styled.h3`
	margin: 0 0 1.5rem 0;
`

const CharactersList = () => {
	const {
		allCharacters,
		isLoading,
		error,
		favorites,
		limit,
		searchTerm,
		filteredCharacters,
		showFavorites,
		setCharactersDisplaying,
	} = useCharacters()

	const hasSearchTerm = useMemo(() => searchTerm !== '', [searchTerm])
	const { hasToDisplayFavorites, hasToDisplayFilteredCharacters } = useMemo(
		() => ({
			hasToDisplayFavorites:
				showFavorites && isNotEmptyArray(favorites) && !hasSearchTerm,
			hasToDisplayFilteredCharacters:
				hasSearchTerm && isNotEmptySet(filteredCharacters),
		}),
		[favorites, filteredCharacters, hasSearchTerm, showFavorites]
	)
	const charactersToDisplay = useMemo(() => {
		if (hasToDisplayFavorites) {
			return favorites
		}

		if (hasToDisplayFilteredCharacters) {
			return Array.from(filteredCharacters)
		}
		return allCharacters
	}, [
		allCharacters,
		favorites,
		filteredCharacters,
		hasToDisplayFavorites,
		hasToDisplayFilteredCharacters,
	])

	useEffect(() => {
		setCharactersDisplaying(charactersToDisplay.length)
	}, [charactersToDisplay.length, setCharactersDisplaying])

	const mustShowSkelleton = useMemo(
		() => isLoading && allCharacters.length === 0,
		[allCharacters.length, isLoading]
	)

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<section className={styles.character_list}>
			{showFavorites && !isNotEmptyArray(favorites) && (
				<MessageTitle>You should add some favorites first</MessageTitle>
			)}
			{hasSearchTerm && !isNotEmptySet(filteredCharacters) && (
				<MessageTitle>No characters found</MessageTitle>
			)}
			<ul>
				{mustShowSkelleton ? (
					[...Array(limit)].map((_, index) => (
					<li key={index}>
						<CharacterCard/>
					</li>	
					))
					
					
				) : (
					charactersToDisplay.map((character) => (
						<li key={character.id}>
							<CharacterCard
								character={character}
							/>
						</li>
					))
				)}
			</ul>
		</section>
	)
}
export default CharactersList
