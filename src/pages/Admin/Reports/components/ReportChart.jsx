import { FiBarChart2, FiCircle } from 'react-icons/fi'
import styles from './styles.module.css'

function ReportChart({ trend = [] }) {
	const max = Math.max(...trend.map((item) => item.total_members || item.new_members || 0), 1)
	return <section className={styles.panel}><header><h2><FiBarChart2 style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Report Overview</h2><div><span className={styles.legendDark}><FiCircle style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Total Members</span><span className={styles.legendLight}><FiCircle style={{ marginRight: '6px', verticalAlign: 'middle' }} /> New Members</span></div></header><h3>Parish Membership Trend</h3><div className={styles.chart}><div className={styles.scale}><span>3,000</span><span>2,500</span><span>2,000</span><span>1,500</span><span>1,000</span><span>0</span></div><div className={styles.bars}>{trend.map((item) => <div key={item.month}><i style={{ height: `${((item.total_members || 0) / max) * 100}%` }} /><b style={{ height: `${((item.new_members || 0) / max) * 100}%` }} /><small>{new Date(item.month).toLocaleDateString([], { month: 'short' })}</small></div>)}</div></div></section>
}

export default ReportChart
