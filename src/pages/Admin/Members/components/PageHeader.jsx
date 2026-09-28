import { FiUsers, FiHeart } from 'react-icons/fi'
import styles from './styles.module.css'

function PageHeader() {
	return <section className={styles.pageHeader}><div className={styles.pageHeaderIcon}><FiUsers /></div><div><h2>Members</h2><p>View, manage and keep track of all parish members.</p></div><span className={styles.headerPhoto}><FiHeart /></span></section>
}

export default PageHeader
