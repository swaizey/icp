import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopHeader from '../components/TopHeader'
import GroupMinisteriesCard from './components/GroupMinisteriesCard'
import GroupSummary from './components/GroupSummary'
import Ministers from './components/Ministers'
import NumbersOfReceievd from './components/NumbersOfReceievd'
import PageHeader from './components/PageHeader'
import SacramentBreakdown from './components/SacramentBreakdown'
import SacramentChart from './components/SacramentChart'
import styles from './components/styles.module.css'
import { api, apiErrorMessage } from '../../../lib/api'

function Sacraments() {
	const [navOpen, setNavOpen] = useState(false)
	const [data, setData] = useState({ summary: [], breakdown: [], groups: [], ministers: [] })
	const [groups, setGroups] = useState([])
	const [error, setError] = useState('')
	function loadData() {
		return Promise.all([api.get('/api/admin/sacraments'), api.get('/api/admin/groups')]).then(([sacramentData, groupData]) => { setData(sacramentData); setGroups(groupData) }).catch((requestError) => setError(apiErrorMessage(requestError)))
	}
	useEffect(() => { loadData() }, [])

	return <div className={styles.adminPage}><TopHeader title="Sacraments, Groups & Ministries" subtitle="Track sacraments, manage groups and ministers, and view parish statistics." /><button className={`${styles.mobileNavButton} ${navOpen ? styles.mobileNavButtonHidden : ''}`} type="button" aria-expanded={navOpen} aria-controls="admin-navigation" onClick={() => setNavOpen(!navOpen)}>☰ <span>Menu</span></button><div className={styles.adminBody}><SideNav isOpen={navOpen} onClose={() => setNavOpen(false)} activeLabel="Sacraments" /><button className={`${styles.navBackdrop} ${navOpen ? styles.navBackdropVisible : ''}`} type="button" aria-label="Close admin navigation" onClick={() => setNavOpen(false)} /><main className={styles.sacramentMain}><PageHeader />{error && <p>{error}</p>}<NumbersOfReceievd summary={data.summary} /><div className={styles.contentGrid}><div><SacramentChart breakdown={data.breakdown} /><SacramentBreakdown breakdown={data.breakdown} /></div><div className={styles.rightGrid}><GroupMinisteriesCard groups={groups} onCreated={loadData} /><Ministers ministers={data.ministers} /><GroupSummary groups={groups} /></div></div></main></div></div>
}

export default Sacraments
