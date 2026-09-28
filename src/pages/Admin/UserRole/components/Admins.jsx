import { FiShield, FiUserCheck, FiUsers } from 'react-icons/fi'
import styles from './styles.module.css'

const palette = ['#0e6ad8', '#4ca4ee', '#83d4c4']
const roleIcons = {
  Administrator: FiUserCheck,
  Manager: FiShield,
  Staff: FiUsers,
}

function Admins({ roles = [], users = [] }) {
  return (
    <div className={styles.roleSummary}>
      {roles.map((role, index) => {
        const Icon = roleIcons[role.name] || FiUsers
        return (
          <article key={role.name} className={styles.roleCard}>
            <span className={styles.roleIcon} style={{ background: palette[index % palette.length] }}>
              <Icon />
            </span>
            <div>
              <h3>{role.name}</h3>
              <p className={styles.roleCount}>{users.filter((user) => user.role === role.name).length}</p>
              <p className={styles.roleMeta}>{role.description}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Admins
