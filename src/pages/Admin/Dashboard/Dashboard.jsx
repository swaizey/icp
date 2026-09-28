import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopHeader from '../components/TopHeader'
import ChartCards from './components/ChartCards'
import MinisteriesCard from './components/MinisteriesCard'
import PageHeader from './components/PageHeader'
import ParishOverview from './components/ParishOverview'
import QuickActionCard from './components/QuickActionCard'
import RecentMembers from './components/RecentMembers'
import SacramentCard from './components/SacramentCard'
import UpcomingEvents from './components/UpcomingEvents'
import styles from './components/style.module.css'
import { api, apiErrorMessage } from '../../../lib/api'

function Dashboard() {
  const [navOpen, setNavOpen] = useState(false)
  const [overview, setOverview] = useState(null)
  const [schedule, setSchedule] = useState({ masses: [], events: [] })
  const [recentMembers, setRecentMembers] = useState([])
  const [sacramentData, setSacramentData] = useState({ summary: [], groups: [] })
  const [trend, setTrend] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState('')

  const loadDashboard = () => Promise.all([
    api.get('/api/admin/dashboard'),
    api.get('/api/admin/schedule'),
    api.get('/api/admin/members?limit=5'),
    api.get('/api/admin/sacraments'),
    api.get('/api/admin/reports'),
    api.get('/api/admin/me'),
  ]).then(([dashboardData, scheduleData, memberData, sacramentResult, reportData, userData]) => {
    setOverview(dashboardData)
    setSchedule(scheduleData)
    setRecentMembers(memberData.data || [])
    setSacramentData(sacramentResult)
    setTrend(reportData.trend || [])
    setCurrentUser(userData)
  }).catch((requestError) => setError(apiErrorMessage(requestError)))

  useEffect(() => { loadDashboard() }, [])

  const upcomingEvents = schedule.events.filter((event) => new Date(event.starts_at).getTime() >= Date.now())
  const menuClass = styles.mobileNavButton + (navOpen ? ' ' + styles.mobileNavButtonHidden : '')
  const backdropClass = styles.navBackdrop + (navOpen ? ' ' + styles.navBackdropVisible : '')

  return <div className={styles.adminPage}><TopHeader title="Parish Administration Dashboard" subtitle="Manage people • Track activities • Grow our faith community" user={currentUser} /><button className={menuClass} type="button" aria-expanded={navOpen} aria-controls="admin-navigation" onClick={() => setNavOpen(!navOpen)}>☰ <span>Menu</span></button><div className={styles.adminBody}><SideNav isOpen={navOpen} onClose={() => setNavOpen(false)} activeLabel="Dashboard" /><button className={backdropClass} type="button" aria-label="Close admin navigation" onClick={() => setNavOpen(false)} /><main className={styles.dashboardMain}><PageHeader user={currentUser} />{error && <p>{error}</p>}<ParishOverview overview={overview} /><div className={styles.dashboardGrid}><ChartCards trend={trend} /><SacramentCard summary={sacramentData.summary} /><MinisteriesCard groups={sacramentData.groups} /></div><div className={styles.dashboardGrid}><RecentMembers members={recentMembers} /><UpcomingEvents events={upcomingEvents} /><QuickActionCard onCreated={loadDashboard} /></div></main></div></div>
}

export default Dashboard
