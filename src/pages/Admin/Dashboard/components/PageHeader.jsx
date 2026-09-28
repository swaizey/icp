import { FiCalendar, FiUser } from 'react-icons/fi'
import styles from './style.module.css'

function PageHeader({ user }) {
  const today = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())
  const name = user?.displayName || 'Admin'

  return <section className={styles.welcome}><div className={styles.welcomeAvatar}><FiUser /></div><div><h2>Welcome, <strong>{name}</strong></h2><p>Here&apos;s what&apos;s happening at Immaculate Conception Parish today.</p><small><FiCalendar style={{ marginRight: '6px', verticalAlign: 'middle' }} /> {today}</small></div><div className={styles.welcomeArt}>Together<br />in Christ</div></section>
}

export default PageHeader
