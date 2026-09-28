import { useState } from 'react'
import { FiPlus, FiUsers } from 'react-icons/fi'
import styles from './styles.module.css'
import { api, apiErrorMessage } from '../../../../lib/api'

const permissionRows = [
  ['Dashboard', true, true, true],
  ['Members', true, true, false],
  ['Mass Schedule', true, true, false],
  ['Sacraments', true, false, false],
  ['Groups & Ministries', true, true, false],
  ['Events', true, true, false],
  ['Finance & Donations', true, true, false],
  ['Reports', true, true, false],
  ['Settings', true, false, false],
  ['User Management', true, false, false],
  ['Backup & Restore', true, false, false],
  ['Notifications', true, true, false],
  ['Appearance', true, false, false],
  ['Security', true, false, false],
]

const permissionOptions = [
  ['Dashboard', 'dashboard.read'],
  ['Members', 'members.read'],
  ['Mass Schedule', 'schedule.read'],
  ['Sacraments', 'sacraments.read'],
  ['Groups & Ministries', 'groups.read'],
  ['Events', 'events.write'],
  ['Finance & Donations', 'finance.read'],
  ['Reports', 'reports.read'],
  ['Settings', 'settings.write'],
  ['User Management', 'users.write'],
  ['Backup & Restore', 'backup.read'],
  ['Notifications', 'notifications.read'],
  ['Appearance', 'appearance.write'],
  ['Security', 'security.read'],
]

function RoleAndPermission({ roles = [], onCreated }) {
  const [message, setMessage] = useState('')
  async function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const permissions = [...form.querySelectorAll('input[name="permissions"]:checked')].map((input) => input.value)
    try { await api.post('/api/admin/roles', { name: form.get('name'), description: form.get('description'), permissions }); setMessage('Role saved.'); event.currentTarget.reset(); await onCreated() } catch (error) { setMessage(apiErrorMessage(error)) }
  }
  return (
    <div className={styles.roleContent}>
      <section className={styles.permissionPanel}>
        <div className={styles.sectionTitle}>
          <span className={styles.titleIcon}><FiUsers /></span>
          <h3>Roles &amp; Permissions</h3>
        </div>

        <div className={styles.permissionTable}>
          <table>
            <thead>
              <tr>
                <th>Module / Feature</th>
                {roles.map((role) => (
                  <th key={role.name}>{role.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionRows.map(([module, ...access]) => (
                <tr key={module}>
                  <td>{module}</td>
                  {roles.map((role) => (
                    <td className={styles.checkCell} key={`${module}-${role.name}`}>
                      <input type="checkbox" checked={role.role_permissions?.some((permission) => permission.permission_key === module.toLowerCase().replaceAll(' ', '-')) || access[roles.findIndex((item) => item.name === role.name)] || false} readOnly />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className={styles.createPanel}>
        <div className={styles.createHeader}>
          <span className={styles.miniIcon}><FiPlus /></span>
          <h3>Create New Role</h3>
        </div>

        <form onSubmit={submit}>
        <div className={styles.formField}>
          <label htmlFor="roleName">Role Name</label>
          <input id="roleName" name="name" type="text" placeholder="Enter role name" required />
        </div>

        <div className={styles.formField}>
          <label htmlFor="roleDescription">Description</label>
          <textarea id="roleDescription" name="description" placeholder="Brief description of this role" />
        </div>

        <div className={styles.formField}>
          <label>Permissions</label>
          <div className={styles.permissionsList}>
            {permissionOptions.map(([label, key]) => (
              <label key={key} className={styles.permissionItem}>
                <input type="checkbox" name="permissions" value={key} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="reset" className={styles.secondaryButton}>Cancel</button>
          <button type="submit" className={styles.primaryButton}>Save Role</button>
        </div>
        {message && <p>{message}</p>}
        </form>
      </aside>
    </div>
  )
}

export default RoleAndPermission
