import Image from 'next/image'
import styles from './Navbar.module.scss'
import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<ul>
				<li key={'marvelLogo'}>
					<Link href="/">
						<Image
							src="/Marvel logo.svg"
							alt="Marvel logo"
							width={100}
							height={50}
						/>
					</Link>
				</li>
				<li key="heartIcon">
					<div>
						<Image
							src="/Heart icon.svg"
							alt="Marvel logo"
							width={24}
							height={24}
						/>
						<span>0</span>
					</div>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar
