import styles from './components.module.css'

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerBrand}><span className={styles.footerMark}>✝<small>AM</small></span><b>ICP</b><small>IMMACULATE CONCEPTION PARISH</small></div>
			<div className={styles.footerNav}><a href="/">Home</a><a href="#about">About Us</a><a href="#events">Events</a><a href="#members">Members</a><a href="#contact">Contact</a></div>
			<p>“With Mary, we become a light to the world.”</p>
		</footer>
	)
}

export default Footer
