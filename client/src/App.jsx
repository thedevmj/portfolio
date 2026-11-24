import React, { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ScrollExpand from './components/ScrollExpand'
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
        <section id="approach" className="relative border-t border-line">
          <div className="h-[100dvh]">
            <ScrollExpand
              src="/heroimg.jpeg"
              alt="Junaid Mansoori"
              title="Built end to end."
              scrollHint="Scroll to expand"
              useWindowScroll
              lockScroll
              startWidth={38}
              startHeight={56}
              startRadius={28}
              mediaZoom={1.3}
              scrollDistance={1.05}
              holdDistance={0.1}
              smoothing={0.075}
              overlayScrim={0.5}
            >
              <h2 className="display max-w-4xl text-3xl leading-none text-white sm:text-5xl md:text-7xl">
                Every pixel, every endpoint.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Interfaces, APIs, and mobile apps — designed, built, and shipped as one product.
              </p>
              <a href="#projects" className="btn btn-accent mt-7">
                See selected work
              </a>
            </ScrollExpand>
          </div>
        </section>
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
