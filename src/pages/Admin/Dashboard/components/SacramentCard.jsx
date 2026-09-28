import styles from './style.module.css'

function SacramentCard() {
	return <section className={styles.panel}><header><b>✚ Sacraments This Year</b><a href="#sacraments">View Report →</a></header><div className={styles.donutLayout}><div className={styles.donut}><strong>287</strong><small>Total</small></div><ul>{[['Baptism', '102'], ['Confirmation', '68'], ['First Communion', '61'], ['Marriage', '36'], ['Others', '20']].map(([name, count]) => <li key={name}><span />{name}<b>{count}</b></li>)}</ul></div></section>
}

export default SacramentCard
