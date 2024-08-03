import Image from 'next/image'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { useCharacters } from '@/hooks/useCharacters'
import { isNotEmptyObject } from '../../../utils/predicates'

const Navbar = () => {
	const {
		toggleShowFavorites,
		setShowFavorites,
		selectedCharacter,
		clearSelection,
	} = useCharacters()
	
	return (
		<nav className={styles.navbar}>
			<ul>
				<li key={'marvelLogo'}>
					<Link href='/' onClick={clearSelection}>
						<Image
							src='/Marvel logo.svg'
							alt='Marvel logo'
							width={100}
							height={50}
						/>
					</Link>
				</li>
				<li key='heartIcon'>
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
						<span>0</span>
					</div>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
