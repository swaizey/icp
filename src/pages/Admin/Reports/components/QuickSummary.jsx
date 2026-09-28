import { FiUsers, FiDroplet, FiCheckCircle, FiHeart, FiBarChart2 } from 'react-icons/fi'
import styles from './styles.module.css'

const items = [
	[FiUsers, 'New Members', '156'],
	[FiDroplet, 'Baptism', '48'],
	[FiCheckCircle, 'Confirmations', '42'],
	[FiHeart, 'Marriages', '28'],
]

function QuickSummary() {
	return <section className={styles.panel}><header><h2><FiBarChart2 style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Quick Summary</h2></header><ul className={styles.quickList}>{items.map(([Icon, name, value]) => <li key={name}><span><Icon /></span><b>{name} <small>(This Year)</small></b><strong>{value}</strong></li>)}</ul></section>
}

export default QuickSummary
