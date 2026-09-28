import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopHeader from '../components/TopHeader'
import IndividuaSummary from './components/IndividuaSummary'
import PageHeader from './components/PageHeader'
import QuickAction from './components/QuickAction'
import QuickSummary from './components/QuickSummary'
import ReportChart from './components/ReportChart'
import ReportConroller from './components/ReportConroller'
import RecentDownloads from './components/RecentDownloads'
import RecentReports from './components/RecentReports'
import styles from './components/styles.module.css'
import { api, apiErrorMessage } from '../../../lib/api'

function Reports() {
	const [navOpen, setNavOpen] = useState(false)
	const [data, setData] = useState({ summary: null, trend: [], recent: [] })
	const [error, setError] = useState('')
	useEffect(() => { api.get('/api/admin/reports').then(setData).catch((requestError) => setError(apiErrorMessage(requestError))) }, [])

	return <div className={styles.adminPage}><TopHeader title="Reports" subtitle="Generate and view parish reports for better decision making." /><button className={`${styles.mobileNavButton} ${navOpen ? styles.mobileNavButtonHidden : ''}`} type="button" aria-expanded={navOpen} aria-controls="admin-navigation" onClick={() => setNavOpen(!navOpen)}>☰ <span>Menu</span></button><div className={styles.adminBody}><SideNav isOpen={navOpen} onClose={() => setNavOpen(false)} activeLabel="Reports" /><button className={`${styles.navBackdrop} ${navOpen ? styles.navBackdropVisible : ''}`} type="button" aria-label="Close admin navigation" onClick={() => setNavOpen(false)} /><main className={styles.reportsMain}><PageHeader />{error && <p>{error}</p>}<ReportConroller /><IndividuaSummary summary={data.summary} /><div className={styles.reportGrid}><ReportChart trend={data.trend} /><QuickSummary summary={data.summary} /><QuickAction /></div><div className={styles.bottomGrid}><RecentReports reports={data.recent} /><RecentDownloads /></div></main></div></div>
}

export default Reports
