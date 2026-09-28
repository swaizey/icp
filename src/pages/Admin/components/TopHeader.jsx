import { useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import { api, logout } from '../../../lib/api'
import styles from './styles.module.css'
import { FiBell, FiChevronDown, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi'

function TopHeader({ title = 'Parish Administration Panel', subtitle = 'Manage members, track engagement and grow our faith community.', user }) {
  const [pendingCount, setPendingCount] = useState(0)
  const displayName = user?.displayName || 'Admin'
  const role = user?.role || 'Parish Administrator'
  const isSignedIn = Boolean(localStorage.getItem('supabase.access_token') || localStorage.getItem('access_token'))

  useEffect(() => {
    let mounted = true

    api.get('/api/admin/registrations')
      .then((result) => {
        if (mounted) setPendingCount(result.data?.length || 0)
      })
      .catch(() => {
        if (mounted) setPendingCount(0)
      })

    return () => { mounted = false }
  }, [])

  return (
    <header className={styles.topHeader}>
      <img src={logo} alt="Immaculate Conception Parish" />
      <div className={styles.headerTitle}><h1>{title}</h1><p>{subtitle}</p></div>
      <div className={styles.headerAccount}>{isSignedIn ? <button className={styles.loginLink} type="button" onClick={() => logout()} title="Sign out"><FiLogOut /><span>Logout</span></button> : <a className={styles.loginLink} href="/admin/sign-in" title="Go to admin sign in"><FiLogIn /><span>Sign in</span></a>}{pendingCount > 0 && <span className={`${styles.notification} ${styles.notificationActive}`} title={`${pendingCount} pending registration${pendingCount === 1 ? '' : 's'}`}><FiBell /><b>{pendingCount > 99 ? '99+' : pendingCount}</b></span>}<span className={styles.avatar}><FiUser /></span><div><strong>{displayName}</strong><small>{role}</small></div><i><FiChevronDown /></i></div>
    </header>
  )
}

export default TopHeader
