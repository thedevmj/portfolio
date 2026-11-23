import React, { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Services from './components/Services'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Background from './components/Background'
import HighlightEffect from './components/HighlightEffect'
import CustomCursor from './components/CustomCursor'
import Marquee from './components/Marquee'
import './App.css'

// Lazy-load heavy/below-the-fold sections for better initial payload
const Projects = lazy(() => import('./components/Projects'))
const Education = lazy(() => import('./components/Education'))
const GithubCta = lazy(() => import('./components/GithubCta'))
const CtaBanner = lazy(() => import('./components/CtaBanner'))
const Contact = lazy(() => import('./components/Contact'))
const AiFloat = lazy(() => import('./components/AiFloat'))
// Lazy-load the search modal (only loaded when opened) for code splitting
const SearchModal = lazy(() => import('./components/SearchModal'))

const SectionFallback = () => <div className="section min-h-[32rem] animate-pulse" aria-hidden="true" />

function GlobalUI() {
  return (
    <>
      <HighlightEffect />
      <CustomCursor />
      <Suspense fallback={null}>
        <SearchModal />
      </Suspense>
    </>
  )
}

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" suppressHydrationWarning>
      <Background />
      <Navbar />
      <main className="editorial-main">
        <Hero />
        <Marquee
          items={['Full-Stack Apps', 'Websites', 'Android', 'iOS', 'React Native', 'AI / LLM']}
        />
        <About />
        <Skills />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Marquee
          items={['Full-stack thinking', 'Websites', 'Android + iOS', 'Scalable', 'AI-powered']}
          reverse
          tone="accent"
        />
        <Experience />
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>
        <Faq />
        <Suspense fallback={<SectionFallback />}>
          <GithubCta />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CtaBanner />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <div className="editorial-lower">
        <Footer />
      </div>
      <Suspense fallback={null}>
        <AiFloat />
      </Suspense>
      <GlobalUI />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Portfolio />
      </SearchProvider>
    </ThemeProvider>
  )
}
