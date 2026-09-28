import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopHeader from '../components/TopHeader'
import MassShedule from './components/MassShedule'
import PageHeader from './components/PageHeader'
import ParishEvents from './components/ParishEvents'
import styles from './components/styles.module.css'
import { api, apiErrorMessage } from '../../../lib/api'

function MassSchedule() {
	const [navOpen, setNavOpen] = useState(false)
	const [schedule, setSchedule] = useState({ masses: [], events: [] })
	const [error, setError] = useState('')

	function loadSchedule() {
		return api.get('/api/admin/schedule').then(setSchedule).catch((requestError) => setError(apiErrorMessage(requestError)))
	}

	useEffect(() => { loadSchedule() }, [])

	return <div className={styles.adminPage}><TopHeader title="Mass Schedule & Events" subtitle="Join us for Mass and be part of our parish activities." /><button className={`${styles.mobileNavButton} ${navOpen ? styles.mobileNavButtonHidden : ''}`} type="button" aria-expanded={navOpen} aria-controls="admin-navigation" onClick={() => setNavOpen(!navOpen)}>☰ <span>Menu</span></button><div className={styles.adminBody}><SideNav isOpen={navOpen} onClose={() => setNavOpen(false)} activeLabel="Mass Schedule" /><button className={`${styles.navBackdrop} ${navOpen ? styles.navBackdropVisible : ''}`} type="button" aria-label="Close admin navigation" onClick={() => setNavOpen(false)} /><main className={styles.scheduleMain}><PageHeader />{error && <p>{error}</p>}<div className={styles.scheduleGrid}><MassShedule masses={schedule.masses} onCreated={loadSchedule} /><ParishEvents events={schedule.events} onCreated={loadSchedule} /></div></main></div></div>
}

export default MassSchedule
