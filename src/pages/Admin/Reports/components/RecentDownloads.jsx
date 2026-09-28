import { FiDownload, FiArrowRight, FiFileText } from 'react-icons/fi'
import styles from './styles.module.css'

const downloads = [['Membership Summary Report', 'Sep 16, 2026 - 09:42 AM'], ['Sacrament Register Report', 'Sep 14, 2026 - 04:15 PM'], ['Groups & Ministries Report', 'Sep 12, 2026 - 10:20 AM']]

function RecentDownloads() {
	return <section className={styles.panel}><header><h2><FiDownload style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Recent Downloads</h2></header><ul className={styles.downloads}>{downloads.map(([name, date]) => <li key={name}><span><FiFileText /></span><div><b>{name}</b><small>{date}</small></div><a href="#download"><FiDownload style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Download Again</a></li>)}</ul><a className={styles.viewAll} href="#downloads">View All Downloads <FiArrowRight /></a></section>
}

export default RecentDownloads
