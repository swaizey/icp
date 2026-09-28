import { useEffect, useState } from 'react'
import styles from './components.module.css'
import { FiCalendar, FiInfo, FiClock, FiChevronRight, FiBookOpen, FiGift } from 'react-icons/fi'
import { api } from '../../../../lib/api'

const cards = [
	{ icon: <FiGift />, title: 'Baptism', subtitle: 'Welcome to the family of God', body: <><b>Baptism Days</b><span>1st Saturday of every month<br />(After 9:00 AM Mass)</span><p className={styles.note}><FiInfo /> &nbsp; Parents are required to complete the registration form and attend a pre-baptism class.</p></>, action: 'Baptism Registration' },
	{ icon: <FiClock />, title: 'Parish Office Hours', subtitle: 'We are here to serve you', body: <><b>Monday – Friday</b><span>9:00 AM – 5:00 PM</span><b>Saturday</b><span>9:00 AM – 1:00 PM</span><b>Sunday</b><span>After Mass (by appointment)</span></>, action: 'Contact Us' },
]

function Schedule() {
	const [masses, setMasses] = useState([])
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		api.get('/api/schedule').then((data) => {
			setMasses(data.masses || [])
			setEvents(data.events || [])
		}).catch(() => {
			setMasses([])
			setEvents([])
		}).finally(() => setLoading(false))
	}, [])

	const massDays = masses.reduce((days, mass) => {
		const date = new Date(mass.starts_at)
		const day = date.toLocaleDateString([], { weekday: 'long' })
		if (!days[day]) days[day] = []
		days[day].push(mass)
		return days
	}, {})
	const massCard = { icon: <FiBookOpen />, title: 'Mass Schedule', subtitle: 'Join us in prayer' }

	return <section className={styles.schedule}><article className={styles.scheduleCard}><header><strong>{massCard.icon}</strong><div><h2>{massCard.title}</h2><p>{massCard.subtitle}</p></div></header><div className={styles.cardBody}>{loading && <span>Loading mass schedule...</span>}{!loading && Object.entries(massDays).map(([day, dayMasses]) => <div key={day}><b>{day}</b>{dayMasses.map((mass) => <span key={mass.id}>{new Date(mass.starts_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} &nbsp;|&nbsp; {mass.title}</span>)}</div>)}{!loading && masses.length === 0 && <span>Mass schedule will be updated soon.</span>}</div><a className={styles.cardAction} href="/admin/mass-schedule">View Full Mass Schedule<span><FiChevronRight /></span></a></article>{cards.map((card) => <article className={styles.scheduleCard} key={card.title}><header><strong>{card.icon}</strong><div><h2>{card.title}</h2><p>{card.subtitle}</p></div></header><div className={styles.cardBody}>{card.body}</div><a className={styles.cardAction} href="#contact">{card.action}<span><FiChevronRight /></span></a></article>)}<article className={`${styles.scheduleCard} ${styles.events}`}><header><strong><FiCalendar /></strong><div><h2>Coming Events</h2><p>Be part of our parish life</p></div></header><div className={styles.eventList}>{loading && <span>Loading events...</span>}{!loading && events.slice(0, 4).map((event) => <a href="#events" key={event.id}><b><small>{new Date(event.starts_at).toLocaleDateString([], { month: 'short' }).toUpperCase()}</small>{new Date(event.starts_at).getDate()}</b><span>{event.title}<em>{new Date(event.starts_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}<br />{event.location}</em></span><i><FiChevronRight /></i></a>)}{!loading && events.length === 0 && <span>No upcoming events have been published.</span>}</div><a className={styles.cardAction} href="#events">View All Events<span><FiChevronRight /></span></a></article></section>
}

export default Schedule
