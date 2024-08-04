'use client'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import CharactersList from './CharactersList/CharactersList'
import Searchbar from './Searchbar/Searchbar'
import { useEffect } from 'react'
import styles from './HomePageContainer.module.scss'

export default function HomePageContainer() {
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
