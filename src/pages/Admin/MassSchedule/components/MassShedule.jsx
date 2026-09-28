import { useState } from 'react'
import { FiCalendar, FiMapPin, FiClock, FiArrowRight, FiPlus, FiTrash2 } from 'react-icons/fi'
import styles from './styles.module.css'

import { api, apiErrorMessage } from '../../../../lib/api'

function MassShedule({ masses = [], onCreated }) {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')

	async function submit(event) {
		event.preventDefault()
		const formElement = event.currentTarget
		const form = new FormData(formElement)
		try {
			await api.post('/api/admin/schedule/masses', { startsAt: new Date(form.get('startsAt')).toISOString(), title: form.get('title'), description: form.get('description'), location: form.get('location'), isRecurring: form.get('isRecurring') === 'on' })
			setMessage('Mass schedule saved.')
			formElement.reset()
			setOpen(false)
			await onCreated()
		} catch (error) { setMessage(apiErrorMessage(error)) }
	}

	async function removeMass(mass) {
		if (!window.confirm(`Delete "${mass.title}" from the mass schedule?`)) return
		try {
			await api.delete(`/api/admin/schedule/masses/${mass.id}`)
			setMessage('Mass schedule deleted.')
			await onCreated()
		} catch (error) { setMessage(apiErrorMessage(error)) }
	}

	return <section className={styles.panel}><header className={styles.sectionHeader}><h2><FiCalendar style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Mass Schedule</h2><button type="button" onClick={() => setOpen(!open)}><FiPlus style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Add Mass</button></header>{open && <form onSubmit={submit} style={{ display: 'grid', gap: 6, padding: '0 10px 10px' }}><input name="title" placeholder="Mass title" required /><input name="startsAt" type="datetime-local" required /><input name="location" placeholder="Location" required /><input name="description" placeholder="Description" /><label><input name="isRecurring" type="checkbox" /> Recurring</label><button type="submit">Save Mass</button></form>}{message && <p style={{ padding: '0 10px' }}>{message}</p>}<div className={styles.massList}>{masses.map((mass) => <article key={mass.id}><strong>{new Date(mass.starts_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</strong><div><b>{mass.title}</b><small>{mass.description}</small><span><FiMapPin style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {mass.location}</span></div><button type="button" aria-label={`Delete ${mass.title}`} title="Delete mass" onClick={() => removeMass(mass)}><FiTrash2 /> <span>Delete</span></button></article>)}</div><div className={styles.confession}><strong><FiClock /></strong><div><b>Confession Times</b><small>Saturday: 4:00 PM - 5:30 PM | Sunday: 9:00 AM - 12:00 PM</small></div><button type="button">View All Masses <FiArrowRight /></button></div></section>
}

export default MassShedule
