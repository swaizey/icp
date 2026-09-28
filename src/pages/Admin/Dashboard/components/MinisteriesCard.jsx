import { FiMusic, FiBookOpen, FiShield, FiUsers, FiHeart, FiStar, FiArrowRight } from 'react-icons/fi'
import styles from './style.module.css'

const ministryIcons = {
  Choir: FiMusic,
  Lectors: FiBookOpen,
  'Altar Servers': FiShield,
  'Youth Ministry': FiUsers,
  'Women Fellowship': FiHeart,
  'Prayer Group': FiStar,
}

function MinisteriesCard({ groups = [] }) {
  return <section className={styles.panel}><header><b><FiUsers style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Ministries Activity</b><a href="/admin/sacraments">View All <FiArrowRight /></a></header><ul className={styles.ministryList}>{groups.slice(0, 6).map((group) => {
    const name = group.group_name || group.name
    const Icon = ministryIcons[name] || FiUsers
    const memberCount = group.member_count ?? 0
    return <li key={name}><span><Icon /></span><b>{name}</b><strong>{memberCount}</strong><em>{memberCount === 1 ? 'member' : 'members'}</em></li>
  })}{groups.length === 0 && <li><b>No ministry members recorded yet.</b></li>}</ul></section>
}

export default MinisteriesCard
