import Image from 'next/image'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { useCharacters } from '@/contexts/CharactersContext/hooks/useCharacters'
import { isNotEmptyObject } from '../../../contexts/CharactersContext/utils/predicates'

const Navbar = () => {
	const {
		toggleShowFavorites,
		setShowFavorites,
		setHideFavorites,
		selectedCharacter,
		favorites,
	} = useCharacters()

	return (
		<nav className={styles.navbar}>
			<ul>
				<li key='marvelLogo' className={styles.marvel_logo}>
					<Link href='/' onClick={setHideFavorites} >
						<Image
							src='/Marvel logo.svg'
							alt='Marvel logo'
							width={130}
							height={52}
						/>
					</Link>
				</li>
				<li key='heartIcon' className={styles.heart_icon}>
					<div>
						{selectedCharacter && isNotEmptyObject(selectedCharacter) ? (
							<Link href='/' type='button' onClick={setShowFavorites}>
								<Image
									src='/Heart icon.svg'
									alt='Heart icon for favorites'
									width={24}
									height={24}
								/>
							</Link>
						) : (
							<button type='button' onClick={toggleShowFavorites}>
								<Image
									src='/Heart icon.svg'
									alt='Heart icon for favorites'
									width={24}
									height={24}
								/>
							</button>
						)}
						<span>{favorites.length}</span>
					</div>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
