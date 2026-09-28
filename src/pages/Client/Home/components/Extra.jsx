import styles from './components.module.css'
import heroImage from '../../../../assets/images/Home/Hero.png'
import { FiHeart, FiTrendingUp, FiUsers, FiTool } from 'react-icons/fi'

function Extra() {
	const values = [
		{ icon: <FiHeart />, title: 'Worship', text: 'Together in prayer' },
		{ icon: <FiTrendingUp />, title: 'Grow', text: 'In faith and love' },
		{ icon: <FiUsers />, title: 'Serve', text: 'Our community' },
		{ icon: <FiTool />, title: 'Build', text: 'A better tomorrow' },
	]

	return <section className={styles.extra} id="about"><div className={styles.extraImage} style={{ backgroundImage: `url(${heroImage})` }} /><div className={styles.extraCopy}><small>OUR PARISH</small><h2>A Parish for Everyone</h2><p>Immaculate Conception Parish is a welcoming Catholic community where people of all ages come together to worship, grow in faith, serve others and build a better tomorrow.</p></div><div className={styles.values}>{values.map(({ icon, title, text }) => <div key={title}><b>{icon}</b><strong>{title}</strong><small>{text}</small></div>)}</div></section>
}

export default Extra
