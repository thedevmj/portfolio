import React, { lazy, Suspense, useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Services from './components/Services'
import Footer from './components/Footer'
import Background from './components/Background'
import AiFloat from './components/AiFloat'
import HighlightEffect from './components/HighlightEffect'
import PageLoader from './components/PageLoader'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Marquee from './components/Marquee'
import './App.css'

// Lazy-load heavy/below-the-fold sections for better initial payload
const Projects = lazy(() => import('./components/Projects'))
const Education = lazy(() => import('./components/Education'))
const GithubCta = lazy(() => import('./components/GithubCta'))
const CtaBanner = lazy(() => import('./components/CtaBanner'))
const Contact = lazy(() => import('./components/Contact'))
// Lazy-load the search modal (only loaded when opened) for code splitting
const SearchModal = lazy(() => import('./components/SearchModal'))

const SectionFallback = () => <div className="section animate-pulse" aria-hidden="true" />

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
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Preloader counts to 100, then the skeleton screen crosses in, then content paints.
  const handlePreloaderDone = useCallback(() => {
    setReady(true)
    setTimeout(() => setLoaded(true), 400)
  }, [])

  const content = (
    <div className="relative min-h-screen overflow-x-hidden" suppressHydrationWarning>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Marquee
          items={['Full Stack Developer', 'MERN', 'AI / LLM', 'React Native', 'Node.js', 'UI/UX']}
        />
        <About />
        <Skills />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Marquee
          items={['Problem solving', 'Full-stack thinking', 'AI-powered', 'Scalable', 'User-centric']}
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
      <Footer />
      <AiFloat />
      <GlobalUI />
    </div>
  )

  if (!ready) {
    return (
      <div className="relative min-h-screen bg-bg">
        <Preloader onDone={handlePreloaderDone} />
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="relative min-h-screen bg-bg">
        <PageLoader />
      </div>
    )
  }

  return content
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
