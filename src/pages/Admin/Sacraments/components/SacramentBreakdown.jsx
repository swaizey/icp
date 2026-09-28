import { FiBookOpen, FiDroplet, FiCheckCircle, FiHeart } from 'react-icons/fi'
import styles from './styles.module.css'

function SacramentBreakdown({ breakdown = [] }) {
	const labels = { 'first-communion': ['Communion', FiBookOpen, 'blue'], baptism: ['Baptism', FiDroplet, 'teal'], confirmation: ['Confirmation', FiCheckCircle, 'purple'], marriage: ['Marriage', FiHeart, 'pink'] }
	return <section className={styles.panel}><header><h2><FiBookOpen style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Sacrament Breakdown</h2></header><table className={styles.breakdown}><thead><tr><th>Sacrament</th><th>Total</th><th>This Month</th><th>Last Month</th></tr></thead><tbody>{breakdown.map((item) => { const [name, Icon, color] = labels[item.sacrament_id] || [item.sacrament_id, FiBookOpen, 'blue']; return <tr key={item.sacrament_id}><td><span className={styles[color]}><Icon /></span><b>{name}</b></td><td>{item.total}</td><td className={styles.positive}>{item.this_month}</td><td>{item.last_month}</td></tr> })}</tbody></table></section>
}

export default SacramentBreakdown
