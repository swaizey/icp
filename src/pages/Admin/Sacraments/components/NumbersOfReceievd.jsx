import { FiUsers, FiDroplet, FiCheckCircle, FiHeart, FiArrowRight } from 'react-icons/fi'
import styles from './styles.module.css'

function NumbersOfReceievd({ summary = [] }) {
	const values = { 'first-communion': ['Total Communicants', FiUsers, 'blue'], baptism: ['Total Baptised', FiDroplet, 'teal'], confirmation: ['Total Confirmed', FiCheckCircle, 'purple'], marriage: ['Total Married', FiHeart, 'pink'] }
	return <section className={styles.summary}>{Object.entries(values).map(([id, [label, Icon, color]]) => { const item = summary.find((entry) => entry.sacrament_id === id); return <article className={styles[color]} key={id}><span><Icon /></span><div><b>{label}</b><strong>{item?.total ?? 0}</strong><small>Recorded sacrament</small><a href="#list">View List <FiArrowRight /></a></div></article> })}</section>
}

export default NumbersOfReceievd
