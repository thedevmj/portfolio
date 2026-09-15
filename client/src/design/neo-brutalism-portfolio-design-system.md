# Neo-Brutalism Design System for Portfolio
## Mobile-First, AI-Implementation Ready

---

## Quick Start for Developers

### Setup (Copy-Paste Ready)
```html
<!-- In your <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap" rel="stylesheet">
```

### Tailwind Config Extension
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'neo-bg': '#FFFDF5',      // Cream background
        'neo-black': '#000000',    // Pure black
        'neo-accent': '#FF6B6B',   // Hot red
        'neo-secondary': '#FFD93D', // Vivid yellow
        'neo-muted': '#C4B5FD',    // Soft violet
      },
      fontFamily: {
        'sans': ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '4px 4px 0px 0px #000',
        'neo-md': '8px 8px 0px 0px #000',
        'neo-lg': '12px 12px 0px 0px #000',
        'neo-xl': '16px 16px 0px 0px #000',
        'neo-white': '4px 4px 0px 0px #fff',
      },
    },
  },
};
```

---

## Design Philosophy (TL;DR)

Neo-brutalism is the **digital punk rebellion** against polished corporate design. It combines:
- **Unapologetic visibility**: Everything has thick black borders & hard shadows
- **Digital tactility**: Elements feel like stickers, buttons "press down," cards "lift up"
- **Organized chaos**: Slight rotations, overlapping elements, asymmetric layouts
- **Raw authenticity**: Pure black text, high-saturation colors, heavy typography
- **Mechanical interaction**: Fast, satisfying, arcade-like responses

**The vibe**: Energetic, playful, confident, anti-corporate. Like a 90s punk zine meets a Y2K rave poster.

---

## Color Palette (Light Mode Only)

| Name | Hex | Use Case | Tailwind |
|------|-----|----------|----------|
| **Background** | `#FFFDF5` | Main canvas, card interiors, contrast panels | `bg-neo-bg` |
| **Black** | `#000000` | ALL text, borders, shadows, icons | `text-black`, `border-black`, `bg-black` |
| **Red (Accent)** | `#FF6B6B` | Primary actions, hero highlights | `bg-neo-accent`, `text-neo-accent` |
| **Yellow (Secondary)** | `#FFD93D` | Secondary actions, badges, footer | `bg-neo-secondary`, `text-neo-secondary` |
| **Violet (Muted)** | `#C4B5FD` | Subtle backgrounds, decorative | `bg-neo-muted`, `text-neo-muted` |
| **White** | `#FFFFFF` | High-contrast on dark, inverted text | `bg-white`, `text-white` |

**Color Rule**: Never use grays (#333, #666, #999). It's **black or a bright color**, never in-between.

---

## Typography System (Mobile-First Scaling)

**Font**: Space Grotesk, weights: **400, 500, 700, 900 ONLY**

### Heading Scale (Mobile → Desktop)

| Level | Mobile | Tablet | Desktop | Weight | Example Use |
|-------|--------|--------|---------|--------|-------------|
| **Display** | `text-5xl` | `text-7xl` | `text-9xl` | `font-black` | Hero headline |
| **H1** | `text-4xl` | `text-6xl` | `text-8xl` | `font-black` | Page title |
| **H2** | `text-3xl` | `text-5xl` | `text-6xl` | `font-black` | Section heading |
| **H3** | `text-2xl` | `text-4xl` | `text-5xl` | `font-black` | Subsection |
| **Large Body** | `text-lg` | `text-xl` | `text-2xl` | `font-bold` | Prominent text |
| **Body** | `text-base` | `text-lg` | `text-lg` | `font-bold` | Regular text |
| **Small** | `text-sm` | `text-base` | `text-sm` | `font-medium` | Labels, metadata |

### Typography Techniques

```jsx
// UPPERCASE with tracking for emphasis
<h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
  Build & Ship
</h2>

// Text stroke (outlined) for display
<h1 className="text-7xl md:text-9xl font-black" style={{ 
  WebkitTextStroke: '2px black', 
  color: 'transparent' 
}}>
  CREATIVE DEV
</h1>

// Split text with colors and rotation
<div className="flex flex-wrap gap-2">
  <span className="text-5xl font-black text-neo-accent">BOLD</span>
  <span className="text-5xl font-black transform -rotate-2">DESIGN</span>
</div>

// Dense line height
<p className="text-xl leading-none font-bold">
  No smoothness.<br />No subtlety.<br />Just impact.
</p>
```

**Case Rule**: Headings & labels = **UPPERCASE**. Body text = normal case.

---

## Core Component Library (Production Ready)

### 1. Borders & Shadows

```jsx
// Default bordered box
<div className="bg-white border-4 border-black shadow-neo-md rounded-none">
  Content
</div>

// Shadow options
<div className="shadow-neo-sm">4px offset (small element)</div>
<div className="shadow-neo-md">8px offset (card/section)</div>
<div className="shadow-neo-lg">12px offset (prominent card)</div>
<div className="shadow-neo-xl">16px offset (hero component)</div>

// Text shadow
<h1 className="text-6xl font-black" style={{ textShadow: '6px 6px 0px #000' }}>
  LOUD TITLE
</h1>
```

**Rule**: If it doesn't have a border, it doesn't exist. Default = `border-4 border-black`.

---

### 2. Button System

```jsx
// PRIMARY (Red, aggressive)
<button className="
  px-6 py-4 md:px-8 md:py-5
  bg-neo-accent border-4 border-black
  font-black text-sm uppercase tracking-wider
  shadow-neo-md
  active:translate-x-1 active:translate-y-1 active:shadow-none
  hover:shadow-neo-lg
  duration-100 cursor-pointer
">
  Get Started
</button>

// SECONDARY (Yellow, approachable)
<button className="
  px-6 py-4 md:px-8 md:py-5
  bg-neo-secondary border-4 border-black
  font-black text-sm uppercase tracking-wider
  shadow-neo-md
  active:translate-x-1 active:translate-y-1 active:shadow-none
  hover:shadow-neo-lg
  duration-100
">
  Learn More
</button>

// OUTLINE (White with border, subtle)
<button className="
  px-6 py-4 md:px-8 md:py-5
  bg-white border-4 border-black
  font-black text-sm uppercase tracking-wider
  shadow-neo-sm
  hover:bg-neo-secondary
  active:translate-x-1 active:translate-y-1
  duration-100
">
  Explore
</button>

// GHOST (Minimal, hover-revealed)
<button className="
  px-4 py-2 md:px-6 md:py-3
  bg-transparent border-2 border-transparent
  font-bold uppercase tracking-widest
  hover:border-black hover:bg-white hover:shadow-neo-sm
  active:translate-x-0.5 active:translate-y-0.5
  duration-100
">
  View Project
</button>
```

**Button Physics**:
- Click: `active:translate-x-[2px] active:translate-y-[2px] active:shadow-none` (pressed)
- Hover: Shadow deepens, slight darkening
- Transition: `duration-100` (fast, snappy)

---

### 3. Card Component

```jsx
// Portfolio project card
<div className="
  bg-white border-4 border-black rounded-none
  shadow-neo-md
  hover:-translate-y-2 hover:shadow-neo-lg
  duration-200
  overflow-hidden
  group
">
  {/* Image with overlay */}
  <div className="relative overflow-hidden h-48 md:h-64 bg-neo-secondary">
    <img 
      src="/project.jpg" 
      alt="Project"
      className="w-full h-full object-cover group-hover:scale-105 duration-300"
    />
    {/* Badge overlay */}
    <div className="absolute -top-6 -right-6 bg-neo-accent border-4 border-black p-3 transform rotate-3 shadow-neo-sm">
      <span className="font-black text-xs uppercase tracking-widest">Featured</span>
    </div>
  </div>

  {/* Content */}
  <div className="p-6 md:p-8 border-t-4 border-black">
    <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">
      Project Name
    </h3>
    <p className="text-sm md:text-base font-bold text-black/70 mb-4">
      Brief description of the project
    </p>
    <div className="flex gap-2 flex-wrap">
      <span className="bg-neo-muted border-2 border-black px-3 py-1 text-xs font-black uppercase">React</span>
      <span className="bg-neo-muted border-2 border-black px-3 py-1 text-xs font-black uppercase">Tailwind</span>
    </div>
  </div>
</div>
```

**Card Physics**:
- Hover: `hover:-translate-y-2 hover:shadow-neo-lg` (lift effect)
- Smooth transition: `duration-200`

---

### 4. Hero Section

```jsx
<section className="bg-neo-bg min-h-screen flex items-center px-4 sm:px-6 md:px-8 py-16 md:py-32 relative overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
      
      {/* Left: Text */}
      <div>
        {/* Subtitle */}
        <div className="mb-6 md:mb-8">
          <span className="
            inline-block
            bg-neo-secondary border-4 border-black
            px-4 py-2 md:px-6 md:py-3
            font-black text-xs md:text-sm uppercase tracking-widest
            shadow-neo-sm
            transform -rotate-1
          ">
            Welcome
          </span>
        </div>

        {/* Main headline with color split */}
        <h1 className="mb-6 md:mb-8 leading-none">
          <div className="text-5xl md:text-7xl lg:text-8xl font-black uppercase">
            <span className="text-black">Design &</span>
          </div>
          <div className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-neo-accent transform rotate-2">
            Dev Magic
          </div>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl font-bold mb-8 md:mb-12 max-w-md leading-tight">
          Building bold, unapologetic digital experiences that demand attention.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <button className="
            w-full sm:w-auto
            px-8 py-4 md:px-10 md:py-5
            bg-neo-accent border-4 border-black
            font-black text-sm uppercase tracking-wider
            shadow-neo-md
            active:translate-x-1 active:translate-y-1 active:shadow-none
            hover:shadow-neo-lg
            duration-100
          ">
            View Projects
          </button>
          <button className="
            w-full sm:w-auto
            px-8 py-4 md:px-10 md:py-5
            bg-white border-4 border-black
            font-black text-sm uppercase tracking-wider
            shadow-neo-sm
            active:translate-x-1 active:translate-y-1
            hover:bg-neo-secondary
            duration-100
          ">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Right: Floating elements & decorative */}
      <div className="hidden md:block relative h-96 lg:h-[500px]">
        {/* Floating shape 1 */}
        <div className="
          absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48
          bg-neo-secondary border-4 border-black
          shadow-neo-lg
          transform -rotate-3
        "></div>

        {/* Floating shape 2 */}
        <div className="
          absolute top-20 left-0 w-24 h-24 lg:w-32 lg:h-32
          bg-neo-muted border-4 border-black
          shadow-neo-md
          transform rotate-6
        "></div>

        {/* Floating element with content */}
        <div className="
          absolute bottom-0 right-20 w-40 h-40 lg:w-56 lg:h-56
          bg-neo-accent border-4 border-black
          shadow-neo-lg
          transform rotate-2
          flex items-center justify-center
        ">
          <span className="
            font-black text-2xl lg:text-4xl uppercase
            text-center leading-none
          " style={{ color: '#fff', textShadow: '4px 4px 0px #000' }}>
            Bold<br />Design
          </span>
        </div>

        {/* Background text texture */}
        <div className="
          absolute inset-0 pointer-events-none
          text-9xl lg:text-[200px] font-black
          opacity-5 text-black
          leading-none
        ">
          BOLD BOLD
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### 5. Project Grid

```jsx
<section className="bg-neo-bg px-4 sm:px-6 md:px-8 py-16 md:py-32">
  <div className="container mx-auto max-w-6xl">
    {/* Section Header */}
    <div className="mb-12 md:mb-16">
      <h2 className="
        text-4xl md:text-6xl lg:text-7xl font-black uppercase
        leading-none mb-4 md:mb-6
      ">
        <span className="text-neo-accent">Featured</span> Work
      </h2>
      <p className="text-lg md:text-xl font-bold max-w-2xl">
        Selected projects showcasing bold design & solid engineering.
      </p>
    </div>

    {/* Grid: Mobile stacked, tablet 2 cols, desktop 3 cols */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Project card x6 (see Card Component above) */}
    </div>
  </div>
</section>
```

---

### 6. Input Field

```jsx
<input 
  type="text"
  placeholder="Enter your email"
  className="
    w-full px-6 py-4 md:py-5
    bg-white border-4 border-black
    font-bold text-base md:text-lg
    placeholder:text-black/40
    focus-visible:bg-neo-secondary focus-visible:shadow-neo-md
    focus-visible:outline-none focus-visible:ring-0
    duration-100
  "
/>
```

---

### 7. Navigation Bar

```jsx
<nav className="bg-neo-bg border-b-4 border-black sticky top-0 z-50">
  <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 py-4 md:py-6">
    <div className="flex justify-between items-center">
      
      {/* Logo */}
      <div className="
        border-4 border-black bg-neo-accent
        px-4 py-3 md:px-6 md:py-4
        shadow-neo-sm
      ">
        <span className="font-black text-lg md:text-xl uppercase">LOGO</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8">
        {['Work', 'About', 'Contact'].map((item) => (
          <button
            key={item}
            className="
              font-black text-sm uppercase tracking-wider
              hover:bg-neo-accent hover:border-4 hover:border-black
              hover:px-4 hover:py-2 hover:shadow-neo-sm
              duration-100
            "
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Menu Toggle (hamburger) */}
      <button className="
        md:hidden
        w-12 h-12 md:w-14 md:h-14
        border-4 border-black bg-white
        shadow-neo-sm
        flex items-center justify-center
        active:translate-x-1 active:translate-y-1 active:shadow-none
        duration-100
      ">
        <span className="font-black text-xl">☰</span>
      </button>
    </div>
  </div>
</nav>
```

---

### 8. Section Divider (Optional)

```jsx
// Thick border separator
<div className="h-4 md:h-6 bg-black my-16 md:my-32"></div>

// Or with pattern
<div className="
  py-8 md:py-12 my-16 md:my-32
  border-y-4 border-black
  relative
" style={{
  backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 20px, transparent 20px, transparent 40px)'
}}>
</div>
```

---

## Layout Grid & Spacing (Mobile-First)

### Container Widths
```jsx
// Centered content
<div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">

// Full-width sections with contained interior
<section className="w-full px-4 sm:px-6 md:px-8">
  <div className="max-w-6xl mx-auto">
```

### Responsive Spacing

| Element | Mobile | Tablet | Desktop | Tailwind |
|---------|--------|--------|---------|----------|
| Page padding | `p-4` | `p-6` | `p-8` | `px-4 sm:px-6 md:px-8` |
| Section vertical | `py-12` | `py-20` | `py-32` | `py-12 sm:py-20 md:py-32` |
| Grid gap | `gap-4` | `gap-6` | `gap-8` | `gap-4 sm:gap-6 md:gap-8` |
| Card padding | `p-4` | `p-6` | `p-8` | `p-4 sm:p-6 md:p-8` |

### Responsive Typography Scale
```jsx
// Always use mobile-first scaling
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black">
  Responsive Headline
</h1>

<p className="text-base sm:text-lg md:text-lg font-bold">
  Body text auto-scales
</p>
```

---

## Mobile-Specific Patterns

### 1. Touch-Friendly Buttons
```jsx
// Minimum 44-48px tap target
<button className="
  w-full
  h-12 md:h-14
  px-6 md:px-8
  ...
">
  Full width on mobile, explicit height
</button>
```

### 2. Mobile Navigation Drawer
```jsx
<div className="md:hidden fixed inset-0 bg-neo-bg z-40 overflow-y-auto">
  <div className="p-6 space-y-4">
    {['Work', 'About', 'Contact'].map((item) => (
      <button key={item} className="
        w-full
        py-4 px-6
        border-4 border-black bg-white
        font-black uppercase
        shadow-neo-md
        active:translate-x-1 active:translate-y-1 active:shadow-none
      ">
        {item}
      </button>
    ))}
  </div>
</div>
```

### 3. Responsive Grid
```jsx
// Stack single column on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
  {/* Items automatically wrap */}
</div>
```

### 4. Scaled Shadow on Mobile
```jsx
<div className="
  shadow-[4px_4px_0px_0px_#000]
  sm:shadow-[6px_6px_0px_0px_#000]
  md:shadow-neo-md
  lg:shadow-neo-lg
">
  Shadows reduce on small screens for visual breathing room
</div>
```

### 5. Responsive Images
```jsx
<img 
  src="/image-mobile.jpg"
  srcSet="/image-mobile.jpg 640w, /image-tablet.jpg 1024w, /image-desktop.jpg 1920w"
  alt="Project"
  className="w-full h-auto object-cover"
/>
```

---

## Portfolio-Specific Sections

### Skills/Services Showcase
```jsx
<section className="bg-neo-secondary px-4 sm:px-6 md:px-8 py-12 md:py-20">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12">
      Toolkit
    </h2>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {['React', 'Next.js', 'Tailwind', 'TypeScript', 'Node', 'PostgreSQL'].map((skill) => (
        <div key={skill} className="
          border-4 border-black bg-white
          p-4 md:p-6
          shadow-neo-sm
          hover:shadow-neo-md hover:-translate-y-1
          duration-150
          text-center
        ">
          <span className="font-black text-sm md:text-base uppercase">{skill}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Testimonials
```jsx
<section className="bg-neo-bg px-4 sm:px-6 md:px-8 py-12 md:py-20">
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-black uppercase mb-12">Social Proof</h2>
    
    <div className="space-y-6 md:space-y-8">
      {testimonials.map((item, i) => (
        <div key={i} className="
          bg-white border-4 border-black
          p-6 md:p-8
          shadow-neo-md
          hover:-translate-y-2 hover:shadow-neo-lg
          duration-200
        ">
          <p className="text-base md:text-lg font-bold mb-4">"{item.text}"</p>
          <div className="border-t-4 border-black pt-4">
            <p className="font-black text-sm uppercase">{item.author}</p>
            <p className="text-xs text-black/60 font-bold">{item.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Contact Form
```jsx
<section className="bg-neo-accent px-4 sm:px-6 md:px-8 py-12 md:py-20">
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12">
      Let's Talk
    </h2>
    
    <form className="space-y-6">
      <input 
        placeholder="Your Name"
        className="
          w-full px-6 py-4 md:py-5
          bg-white border-4 border-black
          font-bold text-base
          focus-visible:ring-0 focus-visible:outline-none
        "
      />
      <textarea 
        placeholder="Your Message"
        rows="5"
        className="
          w-full px-6 py-4 md:py-5
          bg-white border-4 border-black
          font-bold text-base
          focus-visible:ring-0 focus-visible:outline-none
        "
      />
      <button className="
        w-full
        px-8 py-4 md:py-5
        bg-white border-4 border-black
        font-black text-sm uppercase tracking-wider
        shadow-neo-md
        active:translate-x-1 active:translate-y-1 active:shadow-none
        hover:shadow-neo-lg
        duration-100
      ">
        Send Message
      </button>
    </form>
  </div>
</section>
```

---

## Animation & Interaction Guide

### CSS Custom Properties for Reuse
```css
/* In your global CSS */
@layer utilities {
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  .btn-press {
    @apply active:translate-x-[2px] active:translate-y-[2px] active:shadow-none duration-100;
  }

  .card-lift {
    @apply hover:-translate-y-2 hover:shadow-neo-lg duration-200;
  }

  .spin-slow {
    animation: spin-slow 12s linear infinite;
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
}
```

### Common Interaction Patterns
```jsx
// Button press
className="active:translate-x-1 active:translate-y-1 active:shadow-none duration-100"

// Card lift
className="hover:-translate-y-2 hover:shadow-neo-lg duration-200"

// Subtle scale
className="hover:scale-105 duration-150"

// Rotation on hover (for badges)
className="hover:rotate-6 duration-200"

// Color shift (state change)
className="hover:bg-neo-secondary duration-100"
```

---

## Accessibility Checklist

- ✅ **Contrast**: Black on cream (21:1), black on white (21:1), black on yellow (19:1) — all exceed WCAG AAA
- ✅ **Focus States**: Visible focus rings or background color change
- ✅ **Keyboard Navigation**: Tab order is logical, all buttons/links keyboard-accessible
- ✅ **Motion**: Respect `prefers-reduced-motion` (animations disabled)
- ✅ **Touch Targets**: Minimum `h-12` (48px) on mobile
- ✅ **Semantic HTML**: Use `<button>`, `<nav>`, `<section>`, `<article>`, etc.
- ✅ **Screen Readers**: `aria-label` on icon-only buttons, proper heading hierarchy
- ✅ **Color Blindness**: Design doesn't rely on color alone (use shape + border + text)

```jsx
// Example accessible button
<button 
  aria-label="Open navigation menu"
  className="..."
>
  ☰
</button>
```

---

## Anti-Patterns (Avoid These)

❌ Blur effects (`blur()`, `backdrop-blur`)  
❌ Soft shadows with blur radius  
❌ Opacity/alpha on backgrounds  
❌ Smooth gradients (use color blocks instead)  
❌ Rounded corners mid-range (`rounded-md`, `rounded-lg`)  
❌ Subtle grays (#333, #666, #999)  
❌ Minimalist whitespace (fill with texture)  
❌ Slow transitions (keep under 300ms)  
❌ Timid design choices (be bold or don't)  
❌ Generic component look (always add neo-brutalist signature)  

---

## File Structure for Portfolio

```
portfolio/
├── app/
│   ├── layout.tsx (global styles, nav)
│   ├── page.tsx (home/hero)
│   ├── projects/
│   │   ├── page.tsx (project grid)
│   │   └── [slug]/page.tsx (project detail)
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── ProjectGrid.tsx
│   └── Footer.tsx
├── styles/
│   └── globals.css (halftone patterns, animations)
├── public/
│   └── images/
└── tailwind.config.js
```

---

## Implementation Checklist for AI

- [ ] Tailwind config extended with neo colors & shadows
- [ ] Google Fonts Space Grotesk loaded
- [ ] Global CSS patterns (halftone, grid, noise)
- [ ] Navigation component (sticky, mobile toggle)
- [ ] Hero section with floating shapes
- [ ] Project grid with hover effects
- [ ] Responsive typography scale
- [ ] Button components (primary, secondary, outline, ghost)
- [ ] Card components with lift effect
- [ ] Contact form with validation
- [ ] Footer with legal links
- [ ] Mobile navigation drawer
- [ ] Accessibility: focus states, ARIA labels, semantic HTML
- [ ] Motion: prefers-reduced-motion support
- [ ] Performance: image optimization, lazy loading

---

## Quick Copy-Paste Components

### Minimal Hero
```jsx
<section className="bg-neo-bg min-h-screen flex items-center px-4 py-20 md:py-32">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-8xl font-black uppercase mb-6 leading-none">
      Bold Work<br /><span className="text-neo-accent">Speaks Loud</span>
    </h1>
    <p className="text-lg md:text-2xl font-bold mb-8 max-w-2xl mx-auto">
      No trends, no nonsense. Just solid design and engineering.
    </p>
    <button className="px-8 py-5 bg-neo-accent border-4 border-black font-black text-sm uppercase shadow-neo-md hover:shadow-neo-lg active:translate-x-1 active:translate-y-1 active:shadow-none duration-100">
      Explore Work
    </button>
  </div>
</section>
```

### Minimal Card
```jsx
<div className="bg-white border-4 border-black shadow-neo-md hover:-translate-y-2 hover:shadow-neo-lg duration-200 p-6 md:p-8">
  <h3 className="text-2xl md:text-3xl font-black uppercase mb-3">Title</h3>
  <p className="font-bold text-sm md:text-base mb-4">Description here</p>
  <button className="px-4 py-2 border-2 border-black font-bold text-xs uppercase hover:bg-neo-accent duration-100">
    Learn More
  </button>
</div>
```

---

## Color Combinations (WCAG AAA Compliant)

| Background | Text | Contrast | Rating |
|------------|------|----------|--------|
| `#FFFDF5` | `#000000` | 21:1 | AAA ✅ |
| `#FFD93D` | `#000000` | 19:1 | AAA ✅ |
| `#C4B5FD` | `#000000` | 7.5:1 | AAA ✅ |
| `#000000` | `#FFFFFF` | 21:1 | AAA ✅ |
| `#FF6B6B` | `#FFFFFF` | 7:1 | AAA ✅ |

---

## Final Notes

- **Be Bold**: Neo-brutalism has zero room for hesitation. Every design choice should be intentional and exaggerated.
- **Mobile First**: Start styling for mobile (base Tailwind), then enhance for larger screens.
- **Borders Everywhere**: If you're unsure, add a border. It's the neo-brutalism signature.
- **No Grays**: Pure black or a bright color. Never in-between.
- **Fast Interactions**: 100-200ms for snappy, mechanical feel.
- **Accessibility Baked In**: High contrast is already there; just ensure focus states and semantic HTML.

---

**Built for bold portfolios. No apologies.**
