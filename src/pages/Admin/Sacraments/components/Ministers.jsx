import { FiUsers, FiChevronRight } from 'react-icons/fi'
import styles from './styles.module.css'

function Ministers({ ministers = [] }) {
	return <section className={styles.panel}><header><h2><FiUsers style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Ministries <em>Total {ministers.length}</em></h2></header><div className={styles.tableHead}>Ministry <span>Count</span></div><ul className={styles.ministerList}>{ministers.map((item) => <li key={item.ministry}><span>{item.ministry}</span><b>{item.count}</b></li>)}</ul><a className={styles.viewAll} href="#ministers">View All Ministers <FiChevronRight /></a></section>
}

export default Ministers
