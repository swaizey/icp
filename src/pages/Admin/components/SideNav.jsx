import styles from './styles.module.css'
import {
	FiHome,
	FiUsers,
	FiCalendar,
	FiBookOpen,
	FiBarChart2,
	FiSettings,
} from 'react-icons/fi'

const navigation = [
	[<FiHome key="dashboard" />, 'Dashboard', '/admin/dashboard'],
	[<FiUsers key="members" />, 'Members', '/admin/members'],
	[<FiCalendar key="schedule" />, 'Mass Schedule', '/admin/mass-schedule'],
	[<FiBookOpen key="sacraments" />, 'Sacraments', '/admin/sacraments'],
	[<FiBarChart2 key="reports" />, 'Reports', '/admin/reports'],
	[<FiSettings key="roles" />, 'User Roles', '/admin/user-roles'],
]

function SideNav({ isOpen, onClose, activeLabel = 'Members' }) {
	return (
		<aside className={`${styles.sideNav} ${isOpen ? styles.sideNavOpen : ''}`} id="admin-navigation">
			<button className={styles.sideNavClose} type="button" aria-label="Close admin navigation" onClick={onClose}>×</button>
			<nav aria-label="Admin navigation">
				{navigation.map(([icon, label, href]) => (
					<a className={label === activeLabel ? styles.current : ''} href={href} key={label} onClick={onClose}>
						<span>{icon}</span><b>{label}</b>
					</a>
				))}
			</nav>
			<blockquote>“Behold, I am the handmaid of the Lord; let it be done to me according to your word.”<small>Luke 1:38</small></blockquote>
		</aside>
	)
}

export default SideNav
