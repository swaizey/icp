import { useState } from 'react'
import { FiUsers, FiBookOpen, FiShield, FiHeart, FiStar, FiChevronRight, FiArrowRight, FiPlus } from 'react-icons/fi'
import styles from './styles.module.css'
import { api, apiErrorMessage } from '../../../../lib/api'

const groupIcons = {
	Choir: FiUsers,
	Lectors: FiBookOpen,
	'Altar Servers': FiShield,
	'Youth Ministry': FiUsers,
	'Women Fellowship': FiHeart,
	'Prayer Group': FiStar,
	'Legion of Mary': FiStar,
	'Catechism (CCD)': FiBookOpen,
}

function GroupMinisteriesCard({ groups = [], onCreated }) {
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	async function submit(event) {
		event.preventDefault()
		const form = new FormData(event.currentTarget)
		try { await api.post('/api/admin/groups', { name: form.get('name'), description: form.get('description'), leaderName: form.get('leaderName') }); setMessage('Group saved.'); setOpen(false); event.currentTarget.reset(); await onCreated() } catch (error) { setMessage(apiErrorMessage(error)) }
	}
	return <section className={styles.panel}><header><h2><FiUsers style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Groups & Ministries <em>Total Groups {groups.length}</em></h2><button type="button" onClick={() => setOpen(!open)}><FiPlus /></button></header>{open && <form onSubmit={submit} style={{ display: 'grid', gap: 6, padding: '0 10px 10px' }}><input name="name" placeholder="Group name" required /><input name="leaderName" placeholder="Leader name" /><input name="description" placeholder="Description" /><button type="submit">Save Group</button></form>}{message && <p style={{ padding: '0 10px' }}>{message}</p>}<div className={styles.tableHead}>Group / Ministry <span>Members</span></div><ul className={styles.groupList}>{groups.map((group) => { const Icon = groupIcons[group.name] || FiUsers; return <li key={group.id}><span><Icon /></span><b>{group.name}</b><strong>-</strong><i><FiChevronRight /></i></li> })}</ul><a className={styles.viewAll} href="#groups">View All Groups <FiArrowRight /></a></section>
}

export default GroupMinisteriesCard
