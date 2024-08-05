import { Metadata } from 'next'
import HomePageContainer from '@/components/CharactersListsPages/HomePageContainer'
import styles from './page.module.css'

export const metadata: Metadata = {
	title: 'Zara web challenge',
	description: 'A web challenge for Inditex enterprise',
}

export default function Home() {
	return (
		<main className={styles.main}>
			<HomePageContainer />
		</main>
	)
}
