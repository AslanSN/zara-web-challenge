import { Metadata } from 'next'
import HomePageContainer from '@/components/CharactersListsPages/HomePageContainer'
import styles from './page.module.css'

export const metadata: Metadata = {
	title: 'Zara Marvelous challenge',
	description: 'A web challenge for Inditex enterprise',
}

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component, root of the app "/".
 */ export default function Home(): JSX.Element {
	return (
		<main className={styles.main}>
			<HomePageContainer />
		</main>
	)
}
