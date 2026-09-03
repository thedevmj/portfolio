import React, { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios'
import { FiMail, FiPhone, FiGithub, FiSend, FiCheckCircle, FiAlertCircle, FiLoader, FiArrowRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { StatCardSkeleton } from './Skeleton'
import { buildWhatsAppLink } from '../constants'
import TorsionText from './TorsionText'

const DotGrid = lazy(() => import('./DotGrid'))

const contactInfo = [
  { label: 'Email', value: 'junaidmansuri71@gmail.com', href: 'mailto:junaidmansuri71@gmail.com' },
  { label: 'Phone', value: '9649354858', href: 'tel:9649354858' },
  { label: 'WhatsApp', value: '9649354858', href: buildWhatsAppLink() },
  { label: 'GitHub', value: 'github.com/thedevmj', href: 'https://github.com/thedevmj' }
]

const initialForm = { name: '', email: '', subject: '', message: '' }

const API_URL = (import.meta.env.VITE_API_URL || 'https://portfolio-3-xx49.onrender.com').replace(/\/$/, '')

export default React.memo(function Contact() {
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
      await axios.post(`${API_URL}/api/contact`, form)

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

      setStatus({ type: 'success', msg: 'Message sent successfully! I will get back to you soon.' })
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

  const inputCls = (field) =>
    `w-full bg-transparent border-b border-line-light dark:border-white/20 px-2 py-3 text-ink dark:text-gray-200 placeholder-ink-muted/60 dark:placeholder-gray-500 focus:outline-none focus:border-accent transition-colors ${
      errors[field] ? '!border-red-500' : ''
    }`

  return (
    <section id="contact" className="relative border-t border-line-light dark:border-white/10 overflow-hidden">
      <div className="hidden sm:block">
        <Suspense fallback={null}>
          <DotGrid
            dotSize={3}
            gap={20}
            baseColor="currentColor"
            activeColor="#2500AD"
            proximity={100}
            speedTrigger={80}
            shockRadius={180}
            shockStrength={4}
            resistance={600}
            returnDuration={1.2}
            className="text-line-light dark:text-white/[0.06]"
          />
        </Suspense>
      </div>
      <div className="section-pad relative z-10">
        <div className="reveal mb-16">
          <span className="section-label">( contact )</span>
          <TorsionText maxX={7} maxY={4} maxSkew={2} wobble={0.4}>
            <h2 className="section-title mt-4">Get in <span className="italic text-accent">touch.</span></h2>
          </TorsionText>
          <p className="mt-6 max-w-xl text-ink-muted dark:text-gray-400 leading-relaxed">
            Open to opportunities, freelance projects, and collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info */}
          <div>
            {infoLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <ul className="space-y-0">
                {contactInfo.map((c, i) => (
                  <li key={c.label} className="reveal border-t border-line-light dark:border-white/10 py-5 group" style={{ transitionDelay: `${i * 0.06}s` }}>
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center justify-between group cursor-pointer">
                      <div>
                        <span className="block text-xs uppercase tracking-[0.2em] text-ink-muted dark:text-gray-500">{c.label}</span>
                        <span className="mt-1 block text-lg text-ink dark:text-white group-hover:text-accent transition-colors">{c.value}</span>
                      </div>
                      <FiArrowRight className="text-ink-muted dark:text-gray-500 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} onClick={handleFormClick} noValidate>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] mb-1 text-ink-muted dark:text-gray-400">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} className={inputCls('name')} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] mb-1 text-ink-muted dark:text-gray-400">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputCls('email')} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="subject" className="block text-xs uppercase tracking-[0.15em] mb-1 text-ink-muted dark:text-gray-400">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="What is this about?" value={form.subject} onChange={handleChange} className={inputCls('subject')} />
                {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] mb-1 text-ink-muted dark:text-gray-400">Message</label>
                <textarea id="message" name="message" rows="3" className={`${inputCls('message')} resize-none min-h-[80px] sm:min-h-auto`} placeholder="Tell me about your project or message..." value={form.message} onChange={handleChange} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              {status && (
                <div className={`mt-6 flex items-center gap-2 text-sm font-medium ${status.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                  {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  <span>{status.msg}</span>
                </div>
              )}

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <button type="submit" disabled={loading} className="btn-black w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                <button type="button" onClick={handleWhatsApp} className="btn-outline w-full">
                  <FaWhatsapp /> Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
})
