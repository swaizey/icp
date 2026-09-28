import { FiBarChart2, FiChevronDown } from 'react-icons/fi'
import styles from './styles.module.css'

function SacramentChart({ breakdown = [] }) {
	const values = [['Communicants', 'first-communion', 'blue'], ['Baptised', 'baptism', 'teal'], ['Confirmed', 'confirmation', 'purple'], ['Married', 'marriage', 'pink']]
	const max = Math.max(...breakdown.map((item) => item.total || 0), 1)
	return <section className={styles.panel}><header><h2><FiBarChart2 style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Sacrament Statistics</h2><button type="button"><FiChevronDown style={{ marginRight: '6px', verticalAlign: 'middle' }} /> This Year</button></header><div className={styles.barChart}><div className={styles.chartScale}><span>2,000</span><span>1,600</span><span>1,200</span><span>800</span><span>400</span><span>0</span></div><div className={styles.chartBars}>{values.map(([name, id, color]) => { const item = breakdown.find((entry) => entry.sacrament_id === id); return <div key={name}><b>{item?.total ?? 0}</b><i className={styles[color]} style={{ height: `${((item?.total || 0) / max) * 100}%` }} /><small>{name}</small></div> })}</div></div></section>
}

export default SacramentChart
