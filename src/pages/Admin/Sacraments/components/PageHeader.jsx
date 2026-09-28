import { FiBookOpen } from 'react-icons/fi'
import styles from './styles.module.css'

function PageHeader() {
	return <section className={styles.pageHeader}><div className={styles.headerIcon}><FiBookOpen /></div><div><h1>Sacraments Overview</h1><p>Celebrate the sacraments. Build a stronger faith community.</p></div><blockquote>“The sacraments are the<br />channels of God's grace.”<small>- Catechism of the Catholic Church</small></blockquote><div className={styles.headerImage} /></section>
}

export default PageHeader
