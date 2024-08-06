'use client'

import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import { useEffect } from 'react'
import CharactersList from './CharactersList/CharactersList'
import Searchbar from './Searchbar/Searchbar'
import styles from './HomePageContainer.module.scss'

/**
 * Renders the HomePageContainer component.
 *
 * @return {JSX.Element} The rendered HomePageContainer component.
 */
export default function HomePageContainer(): JSX.Element {
	const { fetchNextPage, setFavorites, showFavorites } = useCharacters()
	useEffect(() => {
		fetchNextPage()
	}, [fetchNextPage])

	useEffect(() => {
		const storedFavorites = localStorage.getItem('favorites')
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites))
		}
	}, [setFavorites])

	return (
		<section className={styles.home_page_container}>
			{showFavorites && <h2 className={styles.favorites_title}>Favorites</h2>}
			<Searchbar />
			<CharactersList />
		</section>
	)
}
