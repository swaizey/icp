import { FiBarChart2, FiArrowRight } from 'react-icons/fi'
import styles from './style.module.css'

function ChartCards({ trend = [] }) {
	const max = Math.max(...trend.map((item) => item.total_members || 0), 1)
	return <section className={styles.panel}><header><b><FiBarChart2 style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Membership Overview</b><a href="#members">View Report <FiArrowRight /></a></header><div className={styles.chart}><div className={styles.yAxis}><span>3,000</span><span>2,500</span><span>2,000</span><span>1,500</span><span>1,000</span><span>0</span></div><div className={styles.bars}>{trend.map((item) => <div key={item.month}><i style={{ height: `${((item.total_members || 0) / max) * 100}%` }} /><small>{new Date(item.month).toLocaleDateString([], { month: 'short' })}</small></div>)}</div></div></section>
}

export default ChartCards
