import React, { Suspense, lazy, useEffect, useState } from 'react'
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader, FiArrowUpRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { StatCardSkeleton } from './Skeleton'
import { buildWhatsAppLink, API_BASE_URL } from '../constants'
import { Reveal, Stagger, StaggerItem } from './Motion'
import { useTheme } from '../context/ThemeContext.jsx'

const DotGrid = lazy(() => import('./DotGrid'))

const contactInfo = [
  { label: 'Email', value: 'junaidmansuri71@gmail.com', href: 'mailto:junaidmansuri71@gmail.com' },
  { label: 'Phone', value: '9649354858', href: 'tel:9649354858' },
  { label: 'WhatsApp', value: '9649354858', href: buildWhatsAppLink() },
  { label: 'LinkedIn', value: 'linkedin.com/in/junaid-mansuri-devmj', href: 'https://www.linkedin.com/in/junaid-mansuri-devmj' },
  { label: 'GitHub', value: 'github.com/thedevmj', href: 'https://github.com/thedevmj' },
  { label: 'Resume', value: 'Download resume (PDF)', href: '/Junaid_Mansoori_AI_First_Resume_v2.pdf', download: 'Junaid_Mansoori_AI_First_Resume_v2.pdf' }
]

const initialForm = { name: '', email: '', subject: '', message: '' }

export default React.memo(function Contact() {
  const { theme } = useTheme()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [infoLoading, setInfoLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setInfoLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: null }))
    setStatus(null)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setStatus(null)
    try {
      const apiRes = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!apiRes.ok) throw new Error('Contact API request failed')

      const formData = new FormData()
      formData.append('access_key', '1335541c-e464-4845-bbdd-534e12901be9')
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('subject', `Portfolio Contact: ${form.subject}`)
      formData.append('message', form.message)
      formData.append('from_name', form.name)

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()

      if (!data.success) throw new Error(data.message)

      setStatus({ type: 'success', msg: 'Message sent. I’ll reply within 24 hours.' })
      setForm(initialForm)
    } catch (err) {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const text = `Hello Junaid!\n\nName: ${form.name.trim()}\nEmail: ${form.email.trim()}\nSubject: ${form.subject.trim()}\n\nMessage:\n${form.message.trim()}`
    window.open(buildWhatsAppLink(text), '_blank')
  }

  const handleFormClick = (e) => {
    const tag = e.target.tagName
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
      setErrors({})
      setStatus(null)
    }
  }

  const inputCls = (field) => `field ${errors[field] ? 'field-error' : ''}`

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      {/* Ambient dot field (interactive) */}
      <div className="absolute inset-0 hidden opacity-[0.22] lg:block">
        <Suspense fallback={null}>
          <DotGrid
            dotSize={3}
            gap={30}
            baseColor={theme === 'dark' ? '#2a2a2a' : '#b8b8b8'}
            activeColor={theme === 'dark' ? '#f4f4f4' : '#111111'}
            proximity={110}
            speedTrigger={70}
            shockRadius={150}
            shockStrength={3}
            resistance={650}
            returnDuration={1.2}
          />
        </Suspense>
      </div>

      <div className="section container-wide relative z-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">07 / Contact</span>
            <h2 className="display mt-5 text-5xl leading-none sm:text-6xl md:text-7xl">
              Contact <em className="italic text-accent">Junaid.</em>
            </h2>
            <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-muted md:text-base">
              Open to freelance and remote work.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Replies within 24h
          </span>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact rows */}
          <div>
            {infoLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <Stagger as="ul" className="border-t border-line" gap={0.05}>
                {contactInfo.map((c) => (
                  <StaggerItem as="li" key={c.label} className="border-b border-line">
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      download={c.download || undefined}
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                          {c.label}
                        </span>
                        <span className="mt-1.5 block text-sm font-semibold tracking-tight text-fg transition-colors group-hover:text-accent md:text-base">
                          {c.value}
                        </span>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent">
                        <FiArrowUpRight size={15} />
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>

          {/* Form */}
          <Reveal className="card p-5 sm:p-7 md:p-8" delay={0.1}>
            <form onSubmit={handleSubmit} onClick={handleFormClick} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Name *
                  </label>
                  <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} className={inputCls('name')} />
                  {errors.name && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-accent">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    Email *
                  </label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputCls('email')} />
                  {errors.email && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-accent">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Subject *
                </label>
                <input id="subject" name="subject" type="text" placeholder="What is this about?" value={form.subject} onChange={handleChange} className={inputCls('subject')} />
                {errors.subject && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-accent">{errors.subject}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Message *
                </label>
                <textarea id="message" name="message" rows="4" className={`${inputCls('message')} resize-none`} placeholder="Tell me about your project or message..." value={form.message} onChange={handleChange} />
                {errors.message && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-accent">{errors.message}</p>}
              </div>

              {status && (
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-accent">
                  {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  <span>{status.msg}</span>
                </div>
              )}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button type="submit" disabled={loading} className="btn btn-accent w-full whitespace-normal disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
                  {loading ? 'Sending…' : 'Send message'}
                </button>
                <button type="button" onClick={handleWhatsApp} className="btn btn-ghost w-full whitespace-normal">
                  <FaWhatsapp /> WhatsApp
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
})
