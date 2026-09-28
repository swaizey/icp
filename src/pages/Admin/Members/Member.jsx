import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopHeader from '../components/TopHeader'
import PageHeader from './components/PageHeader'
import MembersSum from './components/MembersSum'
import MembersController from './components/MembersController'
import MembersTable from './components/MembersTable'
import PendingList from './components/PendingList'
import styles from './components/styles.module.css'
import { api, apiErrorMessage } from '../../../lib/api'

function Member() {
	const [navOpen, setNavOpen] = useState(false)
	const [members, setMembers] = useState([])
	const [pending, setPending] = useState([])
	const [overview, setOverview] = useState(null)
	const [filters, setFilters] = useState({ q: '', status: 'all', ministry: 'all' })
	const [error, setError] = useState('')
	const [actionLoadingId, setActionLoadingId] = useState(null)

	const loadData = async () => {
		try {
			const [memberResult, dashboard, registrationResult] = await Promise.all([
				api.get(`/api/admin/members?limit=100&q=${encodeURIComponent(filters.q)}&status=${filters.status}&ministry=${filters.ministry}`),
				api.get('/api/admin/dashboard'),
				api.get('/api/admin/registrations'),
			])
			setMembers(memberResult.data || [])
			setOverview(dashboard)
			setPending(registrationResult.data || [])
			setError('')
		} catch (requestError) {
			setError(apiErrorMessage(requestError))
		}
	}

	useEffect(() => {
		let active = true
		const run = async () => {
			try {
				const [memberResult, dashboard, registrationResult] = await Promise.all([
					api.get(`/api/admin/members?limit=100&q=${encodeURIComponent(filters.q)}&status=${filters.status}&ministry=${filters.ministry}`),
					api.get('/api/admin/dashboard'),
					api.get('/api/admin/registrations'),
				])
				if (!active) return
				setMembers(memberResult.data || [])
				setOverview(dashboard)
				setPending(registrationResult.data || [])
				setError('')
			} catch (requestError) {
				if (active) setError(apiErrorMessage(requestError))
			}
		}
		run()
		return () => { active = false }
	}, [filters])

	const handleApprove = async (id) => {
		setActionLoadingId(id)
		try {
			await api.patch(`/api/admin/registrations/${id}/approve`, {})
			await loadData()
		} catch (requestError) {
			setError(apiErrorMessage(requestError))
		} finally {
			setActionLoadingId(null)
		}
	}

	const handleSetPending = async (id) => {
		setActionLoadingId(id)
		try {
			await api.patch(`/api/admin/registrations/${id}/pending`, {})
			await loadData()
		} catch (requestError) {
			setError(apiErrorMessage(requestError))
		} finally {
			setActionLoadingId(null)
		}
	}

	const handleDelete = async (id) => {
		setActionLoadingId(id)
		try {
			await api.delete(`/api/admin/registrations/${id}`)
			await loadData()
		} catch (requestError) {
			setError(apiErrorMessage(requestError))
		} finally {
			setActionLoadingId(null)
		}
	}

	return <div className={styles.adminPage}><TopHeader /><button className={`${styles.mobileNavButton} ${navOpen ? styles.mobileNavButtonHidden : ''}`} type="button" aria-expanded={navOpen} aria-controls="admin-navigation" onClick={() => setNavOpen(!navOpen)}>☰ <span>Menu</span></button><div className={styles.adminBody}><SideNav isOpen={navOpen} onClose={() => setNavOpen(false)} activeLabel="Members" /><button className={`${styles.navBackdrop} ${navOpen ? styles.navBackdropVisible : ''}`} type="button" aria-label="Close admin navigation" onClick={() => setNavOpen(false)} /><main className={styles.membersMain}><PageHeader />{error && <p>{error}</p>}<MembersSum overview={overview} /><MembersController filters={filters} onChange={setFilters} /><PendingList registrations={pending} loadingId={actionLoadingId} onApprove={handleApprove} onSetPending={handleSetPending} onDelete={handleDelete} /><MembersTable members={members} /></main></div></div>
}

export default Member
