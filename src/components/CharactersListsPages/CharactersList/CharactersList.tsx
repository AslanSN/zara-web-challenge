'use client'

import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import { useEffect, useMemo } from 'react'
import {
	isNotEmptyArray,
	isNotEmptySet,
} from '@/contexts/CharactersContext/utils/predicates'
import styled from 'styled-components'
import useDebounce from '@/components/common/hooks/useDebounce'
import styles from './CharactersList.module.scss'
import CharacterCard from '../CharacterCard/CharacterCard'

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
		fetchNextPage,
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
	const hasNotFoundFilteredCharacters = useMemo(
		() => hasSearchTerm && !isNotEmptySet(filteredCharacters) && !isLoading,
		[filteredCharacters, hasSearchTerm, isLoading]
	)
	const debouncedHasNotFoundFilteredCharacters = useDebounce(
		hasNotFoundFilteredCharacters,
		500
	)
	useEffect(() => {
		if (debouncedHasNotFoundFilteredCharacters) {
			fetchNextPage()
		}
	}, [debouncedHasNotFoundFilteredCharacters, fetchNextPage])

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<section className={styles.character_list}>
			{showFavorites && !isNotEmptyArray(favorites) && (
				<MessageTitle>You should add some favorites first</MessageTitle>
			)}
			{hasNotFoundFilteredCharacters && (
				<MessageTitle>No characters found</MessageTitle>
			)}
			<ul>
				{mustShowSkelleton
					? [...Array(limit)].map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<li key={index}>
								<CharacterCard />
							</li>
						))
					: charactersToDisplay.map(character => (
							<li key={character.id}>
								<CharacterCard character={character} />
							</li>
						))}
			</ul>
		</section>
	)
}
export default CharactersList
