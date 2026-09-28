import { useState } from 'react'
import { FiEdit2, FiTrash2, FiUser, FiUserPlus, FiX } from 'react-icons/fi'
import styles from './styles.module.css'
import { api, apiErrorMessage } from '../../../../lib/api'

function CurrentUsersAndRole({ users = [], roles = [], onCreated }) {
  const [open, setOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [message, setMessage] = useState('')

  async function submit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    try {
      const userData = {
        displayName: form.get('displayName'),
        email: form.get('email'),
        role: form.get('role'),
        ...(editingUser ? { isActive: form.get('isActive') === 'true' } : { password: form.get('password') }),
      }
      if (editingUser) await api.patch(`/api/admin/users/${editingUser.id}`, userData)
      else await api.post('/api/admin/users', userData)
      setMessage(editingUser ? 'User updated.' : 'Admin user created. They can now sign in with this email and password.')
      formElement.reset()
      setOpen(false)
      setEditingUser(null)
      await onCreated()
    } catch (error) {
      setMessage(apiErrorMessage(error))
    }
  }

  function beginEdit(user) {
    setEditingUser(user)
    setOpen(true)
    setMessage('')
  }

  async function deleteUser(user) {
    if (!window.confirm(`Delete ${user.display_name}? This will permanently remove the user account.`)) return
    if (!window.confirm('Confirm again: permanently delete this user and revoke their access?')) return
    try {
      await api.delete(`/api/admin/users/${user.id}`)
      setMessage('User deleted.')
      await onCreated()
    } catch (error) {
      setMessage(apiErrorMessage(error))
    }
  }

  return (
    <section className={styles.usersSection}>
      <div className={styles.sectionHeader}>
        <h3>
          <span className={styles.titleIcon}><FiUser /></span>
          Current Users &amp; Roles
        </h3>
        <button type="button" className={styles.createUserButton} onClick={() => { setEditingUser(null); setOpen(!open) }}><FiUserPlus /> Create Admin User</button>
        <select className={styles.selectBox} defaultValue="all">
          <option value="all">Search by name, email or role...</option>
        </select>
      </div>

      {open && <form className={styles.createUserForm} onSubmit={submit}>
        <label><span>Full name</span><input name="displayName" type="text" placeholder="Parish administrator name" defaultValue={editingUser?.display_name || ''} required /></label>
        <label><span>Email address</span><input name="email" type="email" placeholder="admin@parish.org" defaultValue={editingUser?.email || ''} required /></label>
        {!editingUser && <label><span>Temporary password</span><input name="password" type="password" minLength="8" placeholder="At least 8 characters" required /></label>}
        <label><span>Role</span><select name="role" defaultValue={editingUser?.role || roles[0]?.name || ''} required>{roles.map((role) => <option key={role.name} value={role.name}>{role.name}</option>)}</select></label>
        {editingUser && <label><span>Status</span><select name="isActive" defaultValue={String(editingUser.is_active)}><option value="true">Active</option><option value="false">Inactive</option></select></label>}
        <div className={styles.editFormActions}><button type="submit" className={styles.primaryButton}>{editingUser ? 'Save Changes' : 'Create User'}</button>{editingUser && <button type="button" className={styles.secondaryButton} onClick={() => { setOpen(false); setEditingUser(null) }}><FiX /> Cancel</button>}</div>
      </form>}
      {message && <p className={styles.userMessage} role="status">{message}</p>}

      <div className={styles.userTableWrap}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>
                  <div className={styles.userIdentity}>
                    <strong>{user.display_name}</strong>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`${styles.statusPill} ${user.is_active ? styles.active : styles.inactive}`}>{user.is_active ? 'Active' : 'Inactive'}</span>
                </td>
                <td>{user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Never'}</td>
                <td>
                  <div className={styles.rowActions}>
                    <button type="button" className={styles.actionButton} aria-label={`Edit ${user.display_name}`} title="Edit user" onClick={() => beginEdit(user)}><FiEdit2 /></button>
                    <button type="button" className={`${styles.actionButton} ${styles.deleteAction}`} aria-label={`Delete ${user.display_name}`} title="Delete user" onClick={() => deleteUser(user)}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CurrentUsersAndRole
