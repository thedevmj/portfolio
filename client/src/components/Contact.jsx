import React, { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios'
import { FiMail, FiPhone, FiGithub, FiSend, FiCheckCircle, FiAlertCircle, FiLoader, FiArrowRight, FiDownload } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { StatCardSkeleton } from './Skeleton'
import { buildWhatsAppLink, API_BASE_URL } from '../constants'
import { Reveal, Stagger, StaggerItem } from './Motion'

const DotGrid = lazy(() => import('./DotGrid'))

const contactInfo = [
  { label: 'Email', value: 'junaidmansuri71@gmail.com', href: 'mailto:junaidmansuri71@gmail.com' },
  { label: 'Phone', value: '9649354858', href: 'tel:9649354858' },
  { label: 'WhatsApp', value: '9649354858', href: buildWhatsAppLink() },
  { label: 'GitHub', value: 'github.com/thedevmj', href: 'https://github.com/thedevmj' },
  { label: 'Resume', value: 'Download PDF', href: '/junaidMansoori_Resume.pdf', download: 'junaidMansoori_Resume.pdf' }
]

const initialForm = { name: '', email: '', subject: '', message: '' }

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
      await axios.post(`${API_BASE_URL}/api/contact`, form)

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
    `w-full px-5 py-4 bg-white border-4 border-black font-bold text-base text-black placeholder-black/40 focus-visible:bg-neo-secondary focus-visible:shadow-neo-md focus-visible:outline-none focus-visible:ring-0 duration-100 ${
      errors[field] ? '!border-neo-accent !shadow-[8px_8px_0_0_#FF6B6B]' : ''
    }`

  return (
    <section id="contact" className="relative border-t-4 border-neo-ink bg-neo-accent overflow-hidden">
      <div className="hidden sm:block">
        <Suspense fallback={null}>
          <DotGrid
            dotSize={4}
            gap={26}
            baseColor="#000000"
            activeColor="#FFD93D"
            proximity={90}
            speedTrigger={80}
            shockRadius={170}
            shockStrength={4}
            resistance={600}
            returnDuration={1.2}
          />
        </Suspense>
      </div>
      <div className="section-pad container-neo relative z-10">
        <Reveal className="max-w-3xl">
          <span className="inline-block bg-black border-4 border-black text-white px-4 py-2 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_#000] transform -rotate-1">
            ( contact )
          </span>
          <h2 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-black">
            Let&rsquo;s <span className="text-white" style={{ textShadow: '5px 5px 0 #000' }}>talk.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base md:text-lg font-bold text-black">
            Open to opportunities, freelance projects, and collaborations.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info */}
          <div>
            {infoLoading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <Stagger as="ul" className="flex flex-col gap-4" gap={0.06}>
                {contactInfo.map((c) => (
                  <StaggerItem as="li" key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      download={c.download || undefined}
                      className="group flex items-center justify-between gap-4 bg-neo-panel border-4 border-neo-ink shadow-neo-sm p-4 duration-100 hover:shadow-neo-md hover:-translate-y-0.5 cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none"
                    >
                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-neo-ink opacity-50 dark:opacity-80">{c.label}</span>
                        <span className="mt-1 block text-sm md:text-base font-black text-neo-ink">{c.value}</span>
                      </div>
                      <span className="w-10 h-10 shrink-0 border-2 border-black bg-neo-secondary flex items-center justify-center text-black duration-100 group-hover:bg-neo-accent group-hover:text-white">
                        <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>

          {/* Form */}
          <Reveal className="bg-neo-bg border-4 border-neo-ink shadow-neo-lg p-5 sm:p-8 md:p-10" delay={0.1}>
            <form onSubmit={handleSubmit} onClick={handleFormClick} noValidate>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest mb-2 text-neo-ink">Name *</label>
                  <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} className={inputCls('name')} />
                  {errors.name && <p className="mt-1.5 text-xs font-black uppercase text-white">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest mb-2 text-neo-ink">Email *</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputCls('email')} />
                  {errors.email && <p className="mt-1.5 text-xs font-black uppercase text-white">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="block text-xs font-black uppercase tracking-widest mb-2 text-neo-ink">Subject *</label>
                <input id="subject" name="subject" type="text" placeholder="What is this about?" value={form.subject} onChange={handleChange} className={inputCls('subject')} />
                {errors.subject && <p className="mt-1.5 text-xs font-black uppercase text-white">{errors.subject}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest mb-2 text-neo-ink">Message *</label>
                <textarea id="message" name="message" rows="4" className={`${inputCls('message')} resize-none`} placeholder="Tell me about your project or message..." value={form.message} onChange={handleChange} />
                {errors.message && <p className="mt-1.5 text-xs font-black uppercase text-white">{errors.message}</p>}
              </div>

              {status && (
                <div className={`mt-5 flex items-center gap-2 text-sm font-black uppercase ${status.type === 'success' ? 'text-black' : 'text-white'}`}>
                  {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  <span>{status.msg}</span>
                </div>
              )}

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <button type="submit" disabled={loading} className="btn-secondary px-6 py-4 w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                <button type="button" onClick={handleWhatsApp} className="btn-neo px-6 py-4 w-full bg-black text-white hover:bg-neo-secondary hover:text-black">
                  <FaWhatsapp /> Send via WhatsApp
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
})