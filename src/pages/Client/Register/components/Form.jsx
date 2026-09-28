import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { FiUser, FiMail, FiPhone, FiHome, FiShield, FiCheckCircle, FiPlus, FiUsers, FiBriefcase, FiRefreshCw, FiUserPlus, FiHeart, FiUserCheck, FiSearch } from 'react-icons/fi'

const sacramentOptions = [
  { id: 'baptism', label: 'Baptism', icon: <FiShield /> },
  { id: 'first-communion', label: 'First Holy Communion', icon: <FiCheckCircle /> },
  { id: 'confirmation', label: 'Confirmation', icon: <FiUserCheck /> },
  { id: 'marriage', label: 'Marriage', icon: <FiHeart /> },
]

const groupOptions = [
  { label: 'Choir', options: ['7am Mass Choir (St. Cecilia Choir)', '9am Mass Choir (St. Gregory Choir)'] },
  'Lectors',
  'CYON',
  'CMO',
  'CWO',
  'St. Vincent de Paul',
  'Sacred Heart',
  'Altar Boys',
  { label: 'Legion of Mary', options: ['Legion of Mary - Presidium 1', 'Legion of Mary - Presidium 2', 'Legion of Mary - Presidium 3'] },
  'Not sure yet',
]

function Form() {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileMessage, setTurnstileMessage] = useState('')
  const [familyStatus, setFamilyStatus] = useState('')
  const [familyQuery, setFamilyQuery] = useState('')
  const [familyResults, setFamilyResults] = useState([])
  const [selectedFamily, setSelectedFamily] = useState(null)
  const [familySearchMessage, setFamilySearchMessage] = useState('')
  const [searchingFamilies, setSearchingFamilies] = useState(false)
  const turnstileRef = useRef(null)
  const turnstileWidgetId = useRef(null)
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  async function searchFamilies() {
    if (familyQuery.trim().length < 2) {
      setFamilySearchMessage('Enter at least two characters from the family name or phone number.')
      return
    }
    setSearchingFamilies(true)
    setFamilySearchMessage('')
    setSelectedFamily(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
      const response = await fetch(`${apiUrl}/api/families/search?q=${encodeURIComponent(familyQuery.trim())}`)
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Family search failed.')
      setFamilyResults(result.data || [])
      if (!result.data?.length) setFamilySearchMessage('No family matched. You can create a new family below.')
    } catch (error) {
      setFamilyResults([])
      setFamilySearchMessage(error instanceof Error ? error.message : 'Family search failed.')
    } finally {
      setSearchingFamilies(false)
    }
  }

  useEffect(() => {
    if (!turnstileSiteKey) return undefined

    function renderTurnstile() {
      if (!window.turnstile || !turnstileRef.current || turnstileWidgetId.current !== null) return
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => { setTurnstileToken(token); setTurnstileMessage('') },
        'expired-callback': () => { setTurnstileToken(''); setTurnstileMessage('Verification expired. Please complete it again.') },
        'error-callback': () => { setTurnstileToken(''); setTurnstileMessage('Verification could not load. Check that this site is allowed in your Cloudflare Turnstile settings.') },
      })
    }

    if (window.turnstile) {
      renderTurnstile()
      return undefined
    }

    const existingScript = document.querySelector('script[data-turnstile-script]')
    const script = existingScript || document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.setAttribute('data-turnstile-script', 'true')
    script.addEventListener('load', renderTurnstile)
    if (!existingScript) document.head.appendChild(script)

    return () => script.removeEventListener('load', renderTurnstile)
  }, [turnstileSiteKey])

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    setSubmitting(true)
    setMessage('')
    if (turnstileSiteKey && !turnstileToken) {
      setMessage('Please complete the bot verification before submitting.')
      setSubmitting(false)
      return
    }
    if (!turnstileSiteKey && import.meta.env.VITE_TURNSTILE_REQUIRED === 'true') {
      setMessage('Bot verification is not configured on this website. Please contact the parish office.')
      setSubmitting(false)
      return
    }
    try {
      const formData = new FormData(formElement)
      formData.set('sacramentReceived', JSON.stringify(formData.getAll('sacramentReceived')))
      if (turnstileToken) formData.set('turnstileToken', turnstileToken)
      if (selectedFamily) {
        formData.set('familyId', selectedFamily.id)
        formData.set('familyName', selectedFamily.familyName)
        formData.set('fatherName', selectedFamily.fatherName || '')
        formData.set('motherName', selectedFamily.motherName || '')
      }
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'
      const response = await fetch(`${apiUrl}/api/register`, { method: 'POST', body: formData })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Registration could not be submitted.')
      formElement.reset()
      setFamilyStatus('')
      setFamilyQuery('')
      setFamilyResults([])
      setSelectedFamily(null)
      setTurnstileToken('')
      setTurnstileMessage('')
      if (window.turnstile && turnstileWidgetId.current !== null) window.turnstile.reset(turnstileWidgetId.current)
      setMessage(result.message)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Registration could not be submitted.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.formShell}>
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <section className={styles.sectionBox}>
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}><FiUser /></span>
            <h2>Personal Information</h2>
          </div>
          <p className={styles.sectionHint}>Please provide your personal details below.</p>

          <div className={styles.twoColumn}>
            <label className={styles.field}>
              <span className={styles.labelText}>First Name <em>*</em></span>
              <span className={styles.inputWrap}><i><FiUser /></i><input name="firstName" type="text" placeholder="Enter your first name" required /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Middle Name</span>
              <span className={styles.inputWrap}><i><FiUser /></i><input name="middleName" type="text" placeholder="Enter your middle name" /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Surname <em>*</em></span>
              <span className={styles.inputWrap}><i><FiUser /></i><input name="surname" type="text" placeholder="Enter your surname" required /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Gender <em>*</em></span>
              <span className={styles.inputWrap}><i><FiUserCheck /></i>
                <select name="gender" defaultValue="" required>
                  <option value="" disabled>Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>What group do you belong to or would you like to join?</span>
              <span className={styles.inputWrap}><i><FiUsers /></i>
                <select name="group" defaultValue="">
                  <option value="" disabled>Select a group</option>
                  {groupOptions.map((group) => {
                    if (typeof group === 'string') return <option key={group} value={group}>{group}</option>
                    return <optgroup key={group.label} label={group.label}>
                      {group.options.map((option) => <option key={option} value={option}>{option}</option>)}
                    </optgroup>
                  })}
                </select>
              </span>
            </label>
          </div>
        </section>

        <div className={styles.splitSection}>
          <section className={styles.sectionBox}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionIcon}><FiPlus /></span>
              <h2>Sacrament Received</h2>
            </div>
            <p className={styles.sectionHint}>Select all the sacrament(s) you have received.</p>

            <div className={styles.radioList}>
              {sacramentOptions.map((option) => (
                <label key={option.id} className={styles.radioItem}>
                  <input type="checkbox" name="sacramentReceived" value={option.id} className={styles.radioInput} />
                  <span className={styles.radioCircle}>{option.icon}</span>
                  <span className={styles.radioLabel}>{option.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className={styles.sectionBox}>
            <div className={styles.sectionTitle}>
              <span className={styles.sectionIcon}><FiUsers /></span>
              <h2>Family Information</h2>
            </div>
            <p className={styles.sectionHint}>Tell us about the family you belong to.</p>

            <label className={styles.field}>
              <span className={styles.labelText}>Is your family registered?</span>
              <span className={styles.inputWrap}><i><FiUsers /></i><select value={familyStatus} onChange={(event) => { setFamilyStatus(event.target.value); setSelectedFamily(null); setFamilyResults([]); setFamilySearchMessage('') }}>
                <option value="">Choose an option</option>
                <option value="registered">Yes, search for my family</option>
                <option value="new">No, create a family</option>
                <option value="complicated">It is complicated</option>
              </select></span>
            </label>

            {familyStatus === 'registered' && <div className={styles.familyLookup}>
              <label className={styles.field}>
                <span className={styles.labelText}>Search by family name or phone number</span>
                <span className={styles.inputWrap}><i><FiSearch /></i><input value={familyQuery} onChange={(event) => setFamilyQuery(event.target.value)} placeholder="Family name or phone number" /></span>
              </label>
              <button type="button" className={styles.familySearchButton} onClick={searchFamilies} disabled={searchingFamilies}><FiSearch /> {searchingFamilies ? 'Searching...' : 'Search family'}</button>
              {familyResults.map((family) => <button type="button" className={`${styles.familyResult} ${selectedFamily?.id === family.id ? styles.familyResultSelected : ''}`} key={family.id} onClick={() => setSelectedFamily(family)}><strong>{family.familyName}</strong><span>{family.registeredNumbers.join(' / ') || 'No phone number on file'}</span></button>)}
              {familySearchMessage && <p className={styles.familySearchMessage} role="status">{familySearchMessage}</p>}
              {!familyResults.length && familyQuery.trim().length >= 2 && <button type="button" className={styles.familyCreateButton} onClick={() => setFamilyStatus('new')}>Create a new family</button>}
              {selectedFamily && <input type="hidden" name="familyId" value={selectedFamily.id} />}
            </div>}

            {familyStatus === 'new' && <div className={styles.familyFields}>
              <p className={styles.familyNote}>Create a family using the surname and both household phone numbers.</p>
              <label className={styles.field}><span className={styles.labelText}>Family Name (Surname)</span><span className={styles.inputWrap}><i><FiUsers /></i><input name="familyName" type="text" placeholder="Enter family surname" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Husband's Name</span><span className={styles.inputWrap}><i><FiUser /></i><input name="fatherName" type="text" placeholder="Enter husband's name" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Wife's Name</span><span className={styles.inputWrap}><i><FiUser /></i><input name="motherName" type="text" placeholder="Enter wife's name" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Husband's Phone Number</span><span className={styles.inputWrap}><i><FiPhone /></i><input name="fatherPhone" type="tel" placeholder="Enter husband's phone" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Wife's Phone Number</span><span className={styles.inputWrap}><i><FiPhone /></i><input name="motherPhone" type="tel" placeholder="Enter wife's phone" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Number of Children</span><span className={styles.inputWrap}><i><FiUsers /></i><input name="childrenCount" type="number" min="0" max="1000" placeholder="0" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Number of Grandchildren</span><span className={styles.inputWrap}><i><FiUsers /></i><input name="grandchildrenCount" type="number" min="0" max="1000" placeholder="0" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Deceased Loved Ones</span><span className={styles.inputWrap}><i><FiHeart /></i><input name="deceasedLovedOnesCount" type="number" min="0" max="1000" placeholder="0" /></span></label>
            </div>}

            {familyStatus === 'complicated' && <div className={styles.familyFields}>
              <p className={styles.familyNote}>Provide the family name and one phone number so the parish can help complete the record.</p>
              <label className={styles.field}><span className={styles.labelText}>Family Name</span><span className={styles.inputWrap}><i><FiUsers /></i><input name="familyName" type="text" placeholder="Enter family name" /></span></label>
              <label className={styles.field}><span className={styles.labelText}>Family Phone Number</span><span className={styles.inputWrap}><i><FiPhone /></i><input name="familyPhone" type="tel" placeholder="Enter family phone number" /></span></label>
            </div>}

            {!familyStatus && <>
              <label className={styles.field}>
                <span className={styles.labelText}>Family Name (Optional)</span>
                <span className={styles.inputWrap}><i><FiUsers /></i><input name="familyName" type="text" placeholder="Enter family name if known" /></span>
              </label>
              <label className={styles.field}>
                <span className={styles.labelText}>Mother's Name (Optional)</span>
                <span className={styles.inputWrap}><i><FiUser /></i><input name="motherName" type="text" placeholder="Enter mother's name" /></span>
              </label>
              <label className={styles.field}>
                <span className={styles.labelText}>Father's Name (Optional)</span>
                <span className={styles.inputWrap}><i><FiUser /></i><input name="fatherName" type="text" placeholder="Enter father's name" /></span>
              </label>
            </>}
          </section>
        </div>

        <section className={styles.sectionBox}>
          <div className={styles.sectionTitle}>
            <span className={styles.sectionIcon}><FiHome /></span>
            <h2>Contact &amp; Address Information</h2>
          </div>

          <div className={styles.twoColumn}>
            <label className={styles.field}>
              <span className={styles.labelText}>House Address <em>*</em></span>
              <span className={styles.inputWrap}><i><FiHome /></i><input name="houseAddress" type="text" placeholder="Enter your house address" required /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Email Address <em>*</em></span>
              <span className={styles.inputWrap}><i><FiMail /></i><input name="email" type="email" placeholder="Enter your email address" required /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Phone Number <em>*</em></span>
              <span className={styles.inputWrap}><i><FiPhone /></i><input name="phone" type="tel" placeholder="Enter your phone number" required /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Occupation <em>*</em></span>
              <span className={styles.inputWrap}><i><FiBriefcase /></i><input name="occupation" type="text" placeholder="Enter your occupation" /></span>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Profile Photo (Optional)</span>
              <span className={styles.inputWrap}><i><FiUserPlus /></i><input name="image" type="file" accept="image/jpeg,image/png,image/webp" /></span>
            </label>
          </div>
        </section>

        <div className={styles.noticeBox}>
          <span className={styles.noticeIcon}><FiShield /></span>
          <p>Your information will be kept safe and used only for parish records and communication purposes.</p>
        </div>

        {turnstileSiteKey && <div className={styles.turnstileBox}><div ref={turnstileRef} />{turnstileMessage ? <small className={styles.turnstileError}>{turnstileMessage}</small> : <small>Complete the verification to submit your registration.</small>}</div>}

        {message && <p className={styles.formMessage} role="status">{message}</p>}

        <div className={styles.actions}>
          <button type="reset" className={styles.secondaryButton}><FiRefreshCw /> Reset Form</button>
          <button type="submit" className={styles.primaryButton} disabled={submitting}><FiUserPlus /> {submitting ? 'Submitting...' : 'Register'}</button>
        </div>
      </form>
    </div>
  )
}

export default Form
