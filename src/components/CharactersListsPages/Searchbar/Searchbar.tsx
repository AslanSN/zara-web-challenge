import { useCharacters } from '@/hooks/useCharacters'
import styles from './Searchbar.module.scss'
import { ChangeEvent } from 'react'

const Searchbar = () => {
	const {searchCharacters, searchTerm, charactersDisplaying } = useCharacters()
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		searchCharacters(event.target.value)
	}
	
	return (
		<section className={styles.search_bar}>
			<input
				type='text'
				placeholder='SEARCH A CHARACTER'
				value={searchTerm}
				onChange={handleOnChange}
			/>
			<span>{charactersDisplaying}</span>
		</section>
	)
}

export default Searchbar
