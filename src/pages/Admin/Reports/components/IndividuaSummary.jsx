import { FiUsers, FiDroplet, FiCheckCircle, FiHeart, FiFolder } from 'react-icons/fi'
import styles from './styles.module.css'

function IndividuaSummary({ summary }) {
	const cards = [[FiUsers, 'Total Members', summary?.total_members ?? '-', 'All members', 'blue'], [FiDroplet, 'Active Members', summary?.active_members ?? '-', 'Current members', 'teal'], [FiCheckCircle, 'New Members', summary?.new_members ?? '-', 'This year', 'purple'], [FiHeart, 'Generated Reports', '-', 'Available reports', 'pink'], [FiFolder, 'Report Records', '-', 'Stored records', 'navy']]
	return <section className={styles.summary}>{cards.map(([Icon, label, value, note, color]) => <article className={styles[color]} key={label}><span><Icon /></span><div><b>{label}</b><strong>{value}</strong><small>{note}</small></div></article>)}</section>
}

export default IndividuaSummary
