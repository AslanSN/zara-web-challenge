'use client'
import { useCharacters } from '@/hooks/useCharacters'
import CharactersList from './CharactersList/CharactersList'
import Searchbar from './Searchbar/Searchbar'
import { useEffect } from 'react'

export default function HomePageContainer() {
	const { fetchNextPage } = useCharacters()
	useEffect(() => {
		fetchNextPage()
	}, [fetchNextPage])

	return (
		<>
			<Searchbar />
			<CharactersList />
		</>
	)
}
