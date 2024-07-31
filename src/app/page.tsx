import Searchbar from '@/components/Searchbar/Searchbar'
import styles from './page.module.css'
import CharactersList from '@/components/CharactersList/CharactersList'

export default function Home() {

	return (
		<main className={styles.main}>
			<Searchbar />
			<CharactersList />
		</main>
	)
}
