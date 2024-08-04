import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import styles from './Searchbar.module.scss'
import { ChangeEvent } from 'react'
import Image from 'next/image'

const SubtitleText = () => {
	const { isLoading, charactersDisplaying, limit, showFavorites } =
		useCharacters()
	if (isLoading && charactersDisplaying === 0) {
		return showFavorites ? (
			<span>Loading favorites...</span>
		) : (
			<span>looking for {limit} characters...</span>
		)
	}

	return (
		<span>{`${charactersDisplaying}	${
			charactersDisplaying === 1 ? 'result' : 'results'
		}`}</span>
	)
}

const Searchbar = () => {
	const { searchCharacters, searchTerm } = useCharacters()
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		searchCharacters(event.target.value)
	}

	return (
		<section className={styles.search_bar}>
			<div className={styles.input_container}>
				<Image src="/searchIcon.svg" alt="Search icon" width={12} height={12} />
				<input
					type="text"
					placeholder="search a character..."
					value={searchTerm}
					onChange={handleOnChange}
				/>
			</div>

			<SubtitleText />
		</section>
	)
}

export default Searchbar
