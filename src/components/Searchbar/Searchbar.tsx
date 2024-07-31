import styles from './Searchbar.module.scss'

const Searchbar = () => {
	return (
		<section className={styles.search_bar}>
			<input type='text' placeholder='SEARCH A CHARACTER' />
      <span>
        Number of Items
      </span>
		</section>
	)
}

export default Searchbar
