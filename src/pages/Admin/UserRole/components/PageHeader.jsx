import { FiUsers, FiStar } from 'react-icons/fi'
import styles from './styles.module.css'

function PageHeader() {
  return (
    <header className={styles.userHeader}>
      <span className={styles.userHeaderIcon}><FiUsers /></span>
      <div>
        <h2>User Roles &amp; Permissions</h2>
        <p>Define roles, manage access levels, and keep your parish data secure.</p>
      </div>
      <span className={styles.headerPhoto}><FiStar /></span>
    </header>
  )
}

export default PageHeader
