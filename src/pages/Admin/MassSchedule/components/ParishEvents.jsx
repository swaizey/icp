import { useState } from 'react'
import { FiCalendar, FiClock, FiMapPin, FiPlus, FiChevronRight } from 'react-icons/fi'
import styles from './styles.module.css'

import { api, apiErrorMessage } from '../../../../lib/api'

function ParishEvents({ events = [], onCreated }) {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

	async function submit(event) {
		event.preventDefault()
		const formElement = event.currentTarget
		const form = new FormData(formElement)
		try {
			await api.post('/api/admin/schedule/events', { title: form.get('title'), startsAt: new Date(form.get('startsAt')).toISOString(), location: form.get('location'), tag: form.get('tag'), description: form.get('description') })
			setMessage('Event saved.')
			formElement.reset()
			setOpen(false)
			await onCreated()
		} catch (error) { setMessage(apiErrorMessage(error)) }
	}

	return <section className={styles.panel}><header className={styles.sectionHeader}><h2><FiCalendar style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Parish Events</h2><button type="button" onClick={() => setOpen(!open)}><FiPlus style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Add Event</button></header>{open && <form onSubmit={submit} style={{ display: 'grid', gap: 6, padding: '0 10px 10px' }}><input name="title" placeholder="Event title" required /><input name="startsAt" type="datetime-local" required /><input name="location" placeholder="Location" required /><input name="tag" placeholder="Category" required /><input name="description" placeholder="Description" /><button type="submit">Save Event</button></form>}{message && <p style={{ padding: '0 10px' }}>{message}</p>}<div className={styles.eventCards}>{events.map((item) => <article key={item.id}><strong><small>{new Date(item.starts_at).toLocaleDateString([], { month: 'short' }).toUpperCase()}</small>{new Date(item.starts_at).getDate()}<em>{new Date(item.starts_at).toLocaleDateString([], { weekday: 'short' })}</em></strong><div><mark>{item.tag}</mark><b>{item.title}</b><small><FiClock style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {new Date(item.starts_at).toLocaleString()}<br /><FiMapPin style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {item.location}</small><span>{item.description}</span></div><i>Upcoming</i><a href="#event"><FiChevronRight /></a></article>)}</div><div className={styles.addEvent}><span><FiCalendar /></span><div><b>Want to add a new event?</b><small>Create and manage parish events, meetings and activities.</small></div><button type="button" onClick={() => setOpen(true)}><FiPlus style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Add Event</button></div></section>
}

export default ParishEvents
