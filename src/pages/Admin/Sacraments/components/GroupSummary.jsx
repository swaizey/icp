import { FiUsers, FiBookOpen, FiShield, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from './styles.module.css'

const rowIcons = {
	Choir: FiUsers,
	Lectors: FiBookOpen,
	'Altar Servers': FiShield,
	'Youth Ministry': FiUsers,
	'Women Fellowship': FiHeart,
}

function GroupSummary({ groups = [] }) {
	return <section className={styles.panel}><header><h2><FiUsers style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Groups Summary</h2><a href="#groups">View All Groups <FiChevronRight /></a></header><div className={styles.tableHead}>Group / Ministry <span>Leader Members</span></div><ul className={styles.summaryList}>{groups.slice(0, 5).map((group) => { const Icon = rowIcons[group.name] || FiUsers; return <li key={group.id}><span><Icon /></span><b>{group.name}</b><small>{group.leader_name || 'No leader assigned'}</small><strong>-</strong></li> })}</ul><footer><button type="button"><FiChevronLeft /></button><b>1</b><button type="button"><FiChevronRight /></button></footer></section>
}

export default GroupSummary
