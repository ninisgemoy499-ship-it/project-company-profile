import { useState } from 'react'
import { authService } from '../../../services/auth.service'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    const result = await authService.login(email.trim(), password)
    if (!result.success) {
      setError(result.error)
      setIsSubmitting(false)
      return
    }
    window.location.href = '/admin'
  }

  return (
    <main className="login-shell">
      <div className="login-art"><span className="login-art-label">Northstar<br />Admin / 01</span><div className="login-orbit orbit-one" /><div className="login-orbit orbit-two" /><div className="login-sun" /></div>
      <section className="login-panel">
        <a className="admin-brand login-brand" href="/"><span className="brand-mark">N</span><span>Northstar</span></a>
        <div className="login-heading"><p className="admin-eyebrow">Studio workspace</p><h1>Welcome<br /><em>back.</em></h1><p>Sign in to manage your website content and projects.</p></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address<input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required /></label>
          <label htmlFor="admin-password">Password<input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="login-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'} <span>↗</span></button>
        </form>
        <p className="login-hint">Demo access: <strong>admin@northstar.studio</strong> · <strong>northstar123</strong></p>
        <a className="back-to-site" href="/">← Back to website</a>
      </section>
    </main>
  )
}