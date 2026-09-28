import { FiChevronUp, FiChevronLeft, FiChevronRight, FiMoreVertical, FiEdit2, FiCircle } from 'react-icons/fi'
import styles from './styles.module.css'

const headings = ['Photo', 'Name', 'Member ID', 'Phone', 'Email', 'Family', 'Ministry', 'Status', 'Actions']

function MembersTable({ members }) {
	return <section className={styles.tableWrap}><table><thead><tr>{headings.map(heading => <th key={heading}>{heading}{heading !== 'Photo' && heading !== 'Actions' && <span><FiChevronUp /></span>}</th>)}</tr></thead><tbody>{members.map((member) => { const name = [member.first_name, member.middle_name, member.surname].filter(Boolean).join(' '); return <tr key={member.id}><td><input type="checkbox" /></td><td className={styles.person}><span>{member.image_url ? <img src={member.image_url} alt="" /> : <FiCircle />}</span><div><strong>{name}</strong><small>{member.member_type}</small></div></td><td>{member.member_id}</td><td>{member.phone}</td><td>{member.email}</td><td>{member.family_name}</td><td>{member.group_name || '-'}</td><td><span className={member.status === 'Active' ? styles.active : styles.inactive}>{member.status}</span></td><td className={styles.actions}><FiCircle /> | <FiEdit2 /> | <FiMoreVertical /></td></tr> })}</tbody></table><footer><b>Showing {members.length} loaded members</b><div><FiChevronLeft /> <strong>1</strong> <FiChevronRight /></div></footer></section>
}

export default MembersTable
