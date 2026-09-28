import styles from './components.module.css'
import { useState } from 'react'
import { FiHome, FiInfo, FiCalendar, FiUsers, FiMail, FiMenu } from 'react-icons/fi'
import logo from '../../assets/logo.png'

const links = [
	[<FiHome key="home" />, 'Home'],
	[<FiInfo key="about" />, 'About Us'],
	[<FiCalendar key="events" />, 'Events'],
	[<FiUsers key="members" />, 'Members'],
	[<FiMail key="contact" />, 'Contact'],
]

function Nav() {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<header className={styles.navbar}>
			<a className={styles.brand} href="/" aria-label="ICP home">
				<img className={styles.brandLogo} src={logo} alt="Immaculate Conception Parish" />
			</a>
			<button className={styles.menuButton} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
				<FiMenu />
			</button>
			<nav className={`${styles.navLinks} ${menuOpen ? styles.menuOpen : ''}`} id="main-navigation" aria-label="Main navigation">
				{links.map(([icon, label], index) => <a onClick={() => setMenuOpen(false)} className={index === 0 ? styles.activeLink : ''} href={index === 0 ? '/' : `#${label.toLowerCase().replace(' ', '-')}`} key={label}><span>{icon}</span>{label}</a>)}
				<a className={styles.registerLink} href="/register" onClick={() => setMenuOpen(false)}>Register</a>
			</nav>
		</header>
	)
}

export default Nav
