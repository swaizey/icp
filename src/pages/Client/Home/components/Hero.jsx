import styles from './components.module.css'
import heroImage from '../../../../assets/images/Home/Hero.png'

function Hero() {
	return (
		<section className={styles.hero} style={{ '--hero-image': `url(${heroImage})` }}>
			<div className={styles.heroCopy}>
				<div className={styles.script}>Welcome to</div>
				<h1>Immaculate Conception Parish</h1>
				<p>A place of worship, hope and love. We are a faith community<br className={styles.desktopBreak} /> rooted in Christ, united in prayer, and committed to serving<br className={styles.desktopBreak} /> God and one another.</p>
				<a href="#about" className={styles.heroButton}>Learn More About Us <span>›</span></a>
			</div>
			<div className={styles.verse}><q>Let us go<br />to the house of the Lord.</q><small>– Psalm 122:1</small></div>
		</section>
	)
}

export default Hero
