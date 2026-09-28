import { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import TopHeader from '../components/TopHeader'
import Admins from './components/Admins'
import PageHeader from './components/PageHeader'
import RoleAndPermission from './components/RoleAndPermission'
import CurrentUsersAndRole from './components/CurrentUsersAndRole'
import styles from './components/styles.module.css'
import { api, apiErrorMessage } from '../../../lib/api'

function UserRole() {
  const [navOpen, setNavOpen] = useState(false)
  const [data, setData] = useState({ roles: [], users: [] })
  const [error, setError] = useState('')
  function loadRoles() { return api.get('/api/admin/roles').then(setData).catch((requestError) => setError(apiErrorMessage(requestError))) }
  useEffect(() => { loadRoles() }, [])

  return (
    <div className={styles.adminPage}>
      <TopHeader title="User Roles & Permissions" subtitle="Manage access levels and protect the parish system." />
      <button
        className={`${styles.mobileNavButton} ${navOpen ? styles.mobileNavButtonHidden : ''}`}
        type="button"
        aria-expanded={navOpen}
        aria-controls="admin-navigation"
        onClick={() => setNavOpen(!navOpen)}
      >
        ☰ <span>Menu</span>
      </button>

      <div className={styles.adminBody}>
        <SideNav isOpen={navOpen} onClose={() => setNavOpen(false)} activeLabel="User Roles" />
        <button
          className={`${styles.navBackdrop} ${navOpen ? styles.navBackdropVisible : ''}`}
          type="button"
          aria-label="Close admin navigation"
          onClick={() => setNavOpen(false)}
        />

        <main className={styles.userRoleMain}>
          <PageHeader />
          {error && <p>{error}</p>}
          <Admins roles={data.roles} users={data.users} />
          <RoleAndPermission roles={data.roles} onCreated={loadRoles} />
          <CurrentUsersAndRole users={data.users} roles={data.roles} onCreated={loadRoles} />
        </main>
      </div>
    </div>
  )
}

export default UserRole
