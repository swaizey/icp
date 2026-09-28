import { FiCalendar, FiHeart, FiUsers } from 'react-icons/fi'
import styles from './styles.module.css'

function PageHeader() {
	return <section className={styles.pageHeader}><div className={styles.headerImage} /><div className={styles.headerContent}><h1>Mass Schedule & Events</h1><h2>Worship, Grow, and Serve Together</h2><div className={styles.headerLinks}><span><FiCalendar style={{ marginRight: '6px', verticalAlign: 'middle' }} /><b>Attend Mass</b><small>Give thanks</small></span><span><FiUsers style={{ marginRight: '6px', verticalAlign: 'middle' }} /><b>Join Events</b><small>Build community</small></span><span><FiHeart style={{ marginRight: '6px', verticalAlign: 'middle' }} /><b>Serve Christ</b><small>Make a difference</small></span></div></div><blockquote>“For where two or three<br />are gathered in my name,<br />there am I among them.”<small>Matthew 18:20</small></blockquote></section>
}

export default PageHeader
