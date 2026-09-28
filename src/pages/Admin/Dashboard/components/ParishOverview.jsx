import { FiUsers, FiHome, FiUserCheck, FiCalendar, FiArrowRight } from 'react-icons/fi'
import styles from './style.module.css'

function ParishOverview({ overview }) {
	const cards = [
		[FiUsers, 'Total Members', overview?.total_members ?? '-', 'Current active members', 'blue', 'View Members'],
		[FiHome, 'Active Families', overview?.active_families ?? '-', 'Families in the parish', 'green', 'View Families'],
		[FiUserCheck, 'Male / Female', `${overview?.male_members ?? '-'} / ${overview?.female_members ?? '-'}`, 'Current breakdown', 'purple', 'View Breakdown'],
		[FiCalendar, 'Upcoming Events', overview?.upcoming_events ?? '-', 'Next 7 days', 'orange', 'View Events'],
	]
	return <section className={styles.overview}>{cards.map(([Icon, label, value, note, color, link]) => <article key={label} className={styles[color]}><span><Icon /></span><div><b>{label}</b><strong>{value}</strong><small>{note}</small><a href={`#${label.toLowerCase().replaceAll(' ', '-')}`}>{link} <FiArrowRight /></a></div></article>)}</section>
}

export default ParishOverview
