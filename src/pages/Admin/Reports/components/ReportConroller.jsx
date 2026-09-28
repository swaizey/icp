import { FiDownload } from 'react-icons/fi'
import styles from './styles.module.css'

function ReportConroller() {
	return <section className={styles.controller}><label>Report Category<select><option>All Reports</option></select></label><label>Date Range<select><option>This Year</option></select></label><label>Group / Ministry<select><option>All Groups</option></select></label><label>Format<select><option>PDF</option></select></label><button type="button"><FiDownload style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Generate Report</button></section>
}

export default ReportConroller
