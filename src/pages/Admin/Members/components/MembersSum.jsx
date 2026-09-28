import { FiUsers, FiHome, FiUser, FiUserCheck } from 'react-icons/fi'
import styles from './styles.module.css'

function MembersSum({ overview }) {
	const summary = [
		[FiUsers, 'Total Members', overview?.total_members ?? '-', 'Registered parishioners', 'blue'],
		[FiHome, 'Active Families', overview?.active_families ?? '-', 'Families in the parish', 'green'],
		[FiUser, 'Male Members', overview?.male_members ?? '-', 'Current total', 'cyan'],
		[FiUserCheck, 'Female Members', overview?.female_members ?? '-', 'Current total', 'pink'],
	]
	return <section className={styles.summary}>{summary.map(([Icon, label, value, note, color]) => <article className={styles[color]} key={label}><span><Icon /></span><div><b>{label}</b><strong>{value}</strong><small>{note}</small></div></article>)}</section>
}

export default MembersSum
