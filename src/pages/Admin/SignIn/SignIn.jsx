import { useState } from 'react'
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiShield } from 'react-icons/fi'
import { api } from '../../../lib/api'
import logo from '../../../assets/logo.png'
import styles from './styles.module.css'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') || '').trim().toLowerCase()
    const password = String(formData.get('password') || '')

    try {
      const result = await api.post('/api/auth/admin/sign-in', { email, password })
      localStorage.setItem('supabase.access_token', result.access_token)
      if (result.refresh_token) localStorage.setItem('supabase.refresh_token', result.refresh_token)
      window.history.replaceState({}, '', '/admin/dashboard')
      window.dispatchEvent(new Event('app:navigate'))
    } catch (requestError) {
      setError(requestError?.status === 429 ? 'Too many sign-in attempts. Please try again later.' : 'Invalid email or password.')
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.signInPage}>
      <section className={styles.illustration} aria-label="Immaculate Conception Parish">
        <div className={styles.illustrationOverlay} />
        <div className={styles.illustrationContent}>
          <img src={logo} alt="Immaculate Conception Parish" />
          <p className={styles.eyebrow}>Parish administration</p>
          <h1>Serve the parish with clarity and care.</h1>
          <p>Manage members, ministries, sacraments, schedules, and parish events from one secure workspace.</p>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.formHeader}>
          <span className={styles.iconBadge}><FiShield /></span>
          <p className={styles.eyebrow}>Secure access</p>
          <h2>Welcome back</h2>
          <p>Sign in to continue to the parish administration panel.</p>
        </div>

        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <label>
            <span>Email address</span>
            <div className={styles.inputWrap}><FiMail /><input name="email" type="email" autoComplete="username" inputMode="email" maxLength="254" placeholder="admin@yourparish.org" required /></div>
          </label>
          <label>
            <span>Password</span>
            <div className={styles.inputWrap}><FiLock /><input name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" maxLength="128" placeholder="Enter your password" required /><button type="button" className={styles.passwordToggle} aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEyeOff /> : <FiEye />}</button></div>
          </label>
          {error && <p className={styles.errorMessage} role="alert">{error}</p>}
          <button className={styles.submitButton} type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'} {!submitting && <FiArrowRight />}</button>
        </form>

        <p className={styles.securityNote}><FiLock /> Your session is protected by Supabase Auth.</p>
        <p className={styles.memberPrompt}>Are you registering as a parish member? <a href="/register">Register here</a></p>
        <a className={styles.backLink} href="/">Return to parish website</a>
      </section>
    </main>
  )
}

export default SignIn
