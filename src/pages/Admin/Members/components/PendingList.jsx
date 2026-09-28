import { FiCheck, FiClock, FiLoader, FiTrash2 } from 'react-icons/fi'
import styles from './styles.module.css'

function PendingList({ registrations, loadingId, onApprove, onSetPending, onDelete }) {
  if (!registrations.length) {
    return (
      <section className={styles.pendingPanel}>
        <div className={styles.pendingHeader}>
          <h3>Pending Registrations</h3>
          <span>No new applications waiting.</span>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.pendingPanel}>
      <div className={styles.pendingHeader}>
        <h3>Pending Registrations</h3>
        <span>{registrations.length} waiting</span>
      </div>

      <div className={styles.pendingList}>
        {registrations.map((item) => {
          const name = [item.first_name, item.middle_name, item.surname].filter(Boolean).join(' ')
          const sacraments = Array.isArray(item.sacrament_received) ? item.sacrament_received.map((value) => value.replace(/-/g, ' ')).join(', ') : 'None listed'

          return (
            <article key={item.id} className={styles.pendingItem}>
              <div className={styles.pendingMeta}>
                <strong>{name}</strong>
                <small>{item.email} • {item.phone}</small>
                <small>{item.family_name} • {item.group_name || 'No ministry selected'}</small>
                <small>Received: {sacraments}</small>
              </div>

              <div className={styles.pendingActions}>
                <button type="button" className={styles.approveButton} disabled={loadingId === item.id} onClick={() => onApprove(item.id)}>
                  {loadingId === item.id ? <FiLoader className={styles.spinner} /> : <FiCheck />} Approve
                </button>
                <button type="button" className={styles.pendingButton} disabled={loadingId === item.id} onClick={() => onSetPending(item.id)}>
                  {loadingId === item.id ? <FiLoader className={styles.spinner} /> : <FiClock />} Pending
                </button>
                <button type="button" className={styles.deleteButton} disabled={loadingId === item.id} onClick={() => onDelete(item.id)}>
                  {loadingId === item.id ? <FiLoader className={styles.spinner} /> : <FiTrash2 />} Delete
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default PendingList
