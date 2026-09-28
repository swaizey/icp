import { FiFileText, FiBookOpen } from 'react-icons/fi'
import styles from './styles.module.css'

function PageHeader() {
	return <section className={styles.pageHeader}><div className={styles.headerIcon}><FiFileText /></div><div><h1>Reports</h1><p>View, filter and download detailed reports for your parish.</p></div><blockquote>“Good administration<br />builds a stronger parish<br />and a brighter future.”</blockquote><div className={styles.headerImage}><FiBookOpen /></div></section>
}

export default PageHeader
