import { FiFileText, FiBookOpen, FiUsers, FiDollarSign, FiDownload, FiPlus } from 'react-icons/fi'
import styles from './styles.module.css'

const actions = [
	[FiUsers, 'Generate Membership Report'],
	[FiBookOpen, 'Generate Sacrament Report'],
	[FiFileText, 'Generate Groups Report'],
	[FiDollarSign, 'Generate Finance Report'],
	[FiDownload, 'Export All Reports'],
]

function QuickAction() {
	return <section className={styles.panel}><header><h2><FiPlus style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Quick Actions</h2></header><div className={styles.actions}>{actions.map(([Icon, label]) => <button type="button" key={label}><strong><Icon /></strong>{label}</button>)}</div></section>
}

export default QuickAction
