import { FiCalendar, FiArrowRight } from 'react-icons/fi'
import styles from './style.module.css'

function UpcomingEvents({ events = [] }) {
	return <section className={`${styles.panel} ${styles.events}`}><header><b><FiCalendar style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Upcoming Events</b><a href="#events">View Calendar <FiArrowRight /></a></header><ul>{events.slice(0, 4).map((event) => <li key={event.id}><b>{new Date(event.starts_at).toLocaleDateString([], { month: 'short' }).toUpperCase()}<br /><strong>{new Date(event.starts_at).getDate()}</strong></b><div><strong>{event.title}</strong><small>{new Date(event.starts_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}<br />{event.location}</small></div></li>)}</ul></section>
}

export default UpcomingEvents
