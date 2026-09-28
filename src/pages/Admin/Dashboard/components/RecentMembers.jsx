import { FiUsers, FiArrowRight } from 'react-icons/fi'
import ProtectedImage from '../../components/ProtectedImage'
import styles from './style.module.css'

function RecentMembers({ members = [] }) {
	return <section className={`${styles.panel} ${styles.recent}`}><header><b><FiUsers style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Recent Members</b><a href="/admin/members">View All <FiArrowRight /></a></header><table><thead><tr><th>Photo</th><th>Name</th><th>Member ID</th><th>Join Date</th><th>Status</th></tr></thead><tbody>{members.map((member) => <tr key={member.id}><td>{member.image_key ? <ProtectedImage imageKey={member.image_key} /> : '—'}</td><td>{[member.first_name, member.middle_name, member.surname].filter(Boolean).join(' ')}</td><td>{member.member_id}</td><td>{new Date(member.joined_at).toLocaleDateString()}</td><td><em>{member.status}</em></td></tr>)}</tbody></table></section>
}

export default RecentMembers
