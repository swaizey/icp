import { useState } from 'react'
import { FiUserPlus, FiUsers, FiCalendar, FiPlus, FiDollarSign, FiBookOpen, FiFileText } from 'react-icons/fi'
import { api, apiErrorMessage } from '../../../../lib/api'
import styles from './style.module.css'

const actionIcons = {
  'Add Member': FiUserPlus,
  'Add Group': FiUsers,
  'Schedule Mass': FiCalendar,
  'Add Event': FiPlus,
  'Record Donation': FiDollarSign,
  'Add Sacrament': FiBookOpen,
  'Generate Report': FiFileText,
}

function QuickActionCard({ onCreated }) {
  const [groupFormOpen, setGroupFormOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  async function createGroup(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setSaving(true)
    setMessage('')
    try {
      await api.post('/api/admin/groups', { name: form.get('name'), subgroup: form.get('subgroup') })
      await onCreated?.()
      event.currentTarget.reset()
      setGroupFormOpen(false)
      setMessage('Group created successfully.')
    } catch (error) {
      setMessage(apiErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  return <section className={`${styles.panel} ${styles.quick}`}><header><b><FiPlus style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Quick Actions</b></header><div>{[['Add Member'], ['Add Group'], ['Schedule Mass'], ['Add Event'], ['Record Donation'], ['Add Sacrament'], ['Generate Report']].map(([label]) => {
    const Icon = actionIcons[label]
    if (label === 'Add Group') return <button type="button" key={label} onClick={() => { setGroupFormOpen(true); setMessage('') }}><strong><Icon /></strong><span>{label}</span></button>
    return <a href={`#${label.toLowerCase().replaceAll(' ', '-')}`} key={label}><strong><Icon /></strong><span>{label}</span></a>
  })}</div>{groupFormOpen && <form className={styles.groupForm} onSubmit={createGroup}><b>Create Group</b><label>Group name<input name="name" required autoFocus /></label><label>Subgroup <small>(optional)</small><input name="subgroup" placeholder="For example: Presidium 1" /></label><div><button type="button" onClick={() => setGroupFormOpen(false)}>Cancel</button><button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Create Group'}</button></div></form>}{message && <p className={styles.groupMessage} role="status">{message}</p>}</section>
}

export default QuickActionCard