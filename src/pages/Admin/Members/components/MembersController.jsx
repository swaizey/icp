import { FiSearch, FiPlus } from 'react-icons/fi'
import styles from './styles.module.css'

const ministryOptions = [
	'All Ministries',
	'Choir',
	'7am Mass Choir (St. Cecilia Choir)',
	'9am Mass Choir (St. Gregory Choir)',
	'Lectors',
	'CYON',
	'CMO',
	'CWO',
	'St. Vincent de Paul',
	'Sacred Heart',
	'Altar Boys',
	'Legion of Mary',
	'Legion of Mary - Presidium 1',
	'Legion of Mary - Presidium 2',
	'Legion of Mary - Presidium 3',
	'Not sure yet',
]

function MembersController({ filters, onChange }) {
	return <section className={styles.controller}><label className={styles.search}><span><FiSearch /></span><input value={filters.q} onChange={(event) => onChange({ ...filters, q: event.target.value })} placeholder="Search by name, phone, email or member ID..." /></label><label>Membership Status<select value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value })}><option value="all">All Members</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></label><label>Ministry<select value={filters.ministry} onChange={(event) => onChange({ ...filters, ministry: event.target.value })}>{ministryOptions.map((option) => <option key={option} value={option === 'All Ministries' ? 'all' : option}>{option}</option>)}</select></label><label>Family<select defaultValue="all"><option value="all">All Families</option></select></label><button type="button"><FiPlus style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Add Member</button></section>
}

export default MembersController
