import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Reveal } from './Motion'
import SpecularButton from './SpecularButton'
import Ferrofluid from './Ferrofluid'
import { useTheme } from '../context/ThemeContext.jsx'

export default React.memo(function CtaBanner() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const fluidColors = dark ? ['#ffffff', '#ffffff', '#ffffff'] : ['#111111', '#111111', '#111111']

  const scrollTo = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    if (window.location.hash !== '#contact') window.history.replaceState(null, '', '#contact')
  }

  return (
    <section id="cta" className="relative overflow-hidden border-y border-line bg-elev-2">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Ferrofluid
          colors={fluidColors}
          spikeHeight={1}
          sharpness={2.5}
          tilt={48}
          mouseInteraction
          clickPulse
          brightness={1}
          scale={1.6}
          turbulence={1}
          fluidity={0.5}
          speed={0.5}
          magnetism={1}
          variation={0}
          flowDirection="down"
          mouseStrength={1}
          mouseRadius={0.22}
          intro
          lightMode={!dark}
          opacity={dark ? 0.34 : 0.18}
          dpr={1.5}
        />
      </div>
      <div className="section container-wide relative z-10 text-center">
        <Reveal className="mx-auto max-w-4xl">
          <span className="eyebrow">Next step</span>
          <h2 className="display mt-6 text-5xl leading-[0.92] sm:text-7xl md:text-8xl">
            Have a project
            <br />
            <em className="italic text-accent">in mind?</em>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm font-medium leading-relaxed text-muted md:text-base">
            I build full-stack web apps, websites, and Android/iOS apps.
          </p>
          <SpecularButton
            size="lg"
            radius={18}
            tint="#ffffff"
            tintOpacity={0.04}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1}
            idleIntensity={0.35}
            shineSize={10}
            shineFade={34}
            thickness={1.2}
            glow={1}
            followMouse
            proximity={250}
            onClick={scrollTo}
            className="group mt-9 w-full text-center sm:w-auto"
          >
            Contact Junaid about a project
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </SpecularButton>
        </Reveal>
      </div>
    </section>
  )
})
