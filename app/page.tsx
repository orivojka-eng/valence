"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  Volume2, VolumeX, ArrowUpRight, X, ChevronRight, ChevronLeft, 
  Check, Copy, Sparkles, Layers, Terminal, Globe, Clock, ShieldCheck,
  Send, ExternalLink, Menu
} from "lucide-react"

// Types
interface Project {
  id: string
  num: string
  title: string
  category: "FASHION" | "ARCHITECTURE" | "DIGITAL" | "EDITORIAL" | "COMMERCE"
  client: string
  year: string
  tagline: string
  description: string
  challenge: string
  solution: string
  tech: string[]
  mainImage: string
  galleryImages: string[]
  liveUrl?: string
  floatingWord: string
}

// 6 Curated High-End Editorial Projects
const PROJECTS: Project[] = [
  {
    id: "noir",
    num: "001",
    title: "NOIR",
    category: "FASHION",
    client: "Maison de L'Ombre, Paris",
    year: "2026",
    tagline: "Monochromatic haute couture digital identity & interactive lookbook.",
    description: "A deep-dive into monochromatic textures and high-contrast digital layouts for a Parisian couture house. The experience strips away superfluous chrome to focus entirely on tactile silhouettes, woven drapery, and high-frequency typography.",
    challenge: "Deliver 60fps WebGL textile simulations alongside responsive editorial typography without exceeding a 1.2s initial load time on mobile networks.",
    solution: "Architected by Quolytech using custom GLSL shaders, texture atlas compression, and Next.js static asset streaming, yielding 99/100 Core Web Vitals.",
    tech: ["Next.js 16", "GLSL Shaders", "WebGL / Three.js", "TailwindCSS", "Quolytech Core"],
    mainImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200"
    ],
    liveUrl: "https://noir.atelier-paris.com",
    floatingWord: "SHADOW"
  },
  {
    id: "brute",
    num: "002",
    title: "BRUTE",
    category: "ARCHITECTURE",
    client: "Monolith Structural Engineers, Berlin",
    year: "2025",
    tagline: "Conceptual digital monolith for structural concrete engineers.",
    description: "Conceptual web experience for a structural engineering firm focused on monolithic concrete structures, brutalist forms, and architectural weight. The layout reacts dynamically to scroll inertia, creating physical tactile feedback.",
    challenge: "Conveying raw physical mass and brutalist concrete materiality through digital glass without falling into generic minimalist tropes.",
    solution: "Built by Quolytech using bespoke physics-driven inertia algorithms and dynamic SVG clipping planes, giving every structure real gravitational presence.",
    tech: ["React 19", "HTML5 Canvas", "TailwindCSS", "Web Audio API", "Quolytech Kinematics"],
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"
    ],
    liveUrl: "https://brute.berlin-structures.de",
    floatingWord: "CONCRETE"
  },
  {
    id: "kinetix",
    num: "003",
    title: "KINETIX",
    category: "DIGITAL",
    client: "Spatial Frequency Lab, Tokyo",
    year: "2026",
    tagline: "Real-time generative spatial audio & parametric particle field.",
    description: "An experimental digital artifact uniting interactive WebGL particle fields with real-time browser-synthesized acoustic feedback. Every gesture ripples through a 3D coordinate lattice.",
    challenge: "Achieving sub-5ms low latency audio synthesis responsive to cursor acceleration across Safari, Chrome, and iOS.",
    solution: "Quolytech engineered a specialized Web Audio oscillator matrix connected directly to pointer velocity vectors with zero garbage collection spikes.",
    tech: ["Web Audio API", "Three.js", "TypeScript", "Vercel Edge", "Quolytech Synth"],
    mainImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200"
    ],
    liveUrl: "https://kinetix.tokyo-lab.jp",
    floatingWord: "FREQUENCY"
  },
  {
    id: "obsidian",
    num: "004",
    title: "OBSIDIAN",
    category: "EDITORIAL",
    client: "Obsidian Press, London",
    year: "2025",
    tagline: "High-frequency avant-garde typography journal & design archive.",
    description: "A digital publication breaking traditional grid discipline. It juxtaposes brutalist serif headlines against microscopic monospace telemetry, creating a collector-grade editorial atmosphere.",
    challenge: "Preserving extreme typographic hierarchy and micro-kerning precision across ultra-wide desktop displays down to narrow compact mobile viewports.",
    solution: "Developed with Quolytech's responsive fluid clamp mathematical typography scale and variable font weight axis interpolation.",
    tech: ["Next.js Turbopack", "Variable Fonts", "CSS Grid 2.0", "Quolytech Typography"],
    mainImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"
    ],
    liveUrl: "https://obsidian.press",
    floatingWord: "MANIFESTO"
  },
  {
    id: "vendome",
    num: "005",
    title: "VENDÔME",
    category: "COMMERCE",
    client: "Maison Vendôme, Paris",
    year: "2026",
    tagline: "Ultra-luxury high jewelry digital flagship & bespoke commissions.",
    description: "An uncompromising e-commerce experience created for a heritage Place Vendôme jeweler. Features private salon appointments, real-time gold and diamond market indexing, and bespoke concierge ordering.",
    challenge: "Combining bespoke French maison luxury pacing with instant sub-second checkout and international multi-currency conversions.",
    solution: "Engineered by Quolytech utilizing Next.js static prerendering, instant optimistic UI state, and custom luxury micro-transitions.",
    tech: ["Next.js 16", "Headless Commerce", "Framer Motion", "Quolytech Payments"],
    mainImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
    ],
    liveUrl: "https://vendome-paris.com",
    floatingWord: "HERITAGE"
  },
  {
    id: "aether",
    num: "006",
    title: "AETHER",
    category: "DIGITAL",
    client: "Aether Modular Systems, Stockholm",
    year: "2025",
    tagline: "Minimalist industrial hardware platform & spatial peripherals.",
    description: "Interactive hardware showcase for next-generation tactile acoustic interfaces. Users can inspect exploded hardware schematics, configure materials, and experience simulated haptic tactile sound feedback.",
    challenge: "Rendering interactive 3D exploded assemblies with physically accurate metallic reflections at smooth 60fps on mobile browsers.",
    solution: "Engineered by Quolytech with lightweight low-poly glTF model pipelining and custom environment reflection probes.",
    tech: ["WebGL", "Three.js", "Web Audio API", "TailwindCSS", "Quolytech Precision"],
    mainImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"
    ],
    liveUrl: "https://aether-audio.se",
    floatingWord: "KINETIC"
  }
]

export default function Home() {
  // State
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("ALL")
  const [viewMode, setViewMode] = useState<"stream" | "index">("stream")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0)
  const [showQuolytechModal, setShowQuolytechModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Real-time Studio World Clocks
  const [clocks, setClocks] = useState({
    berlin: "--:--:--",
    tokyo: "--:--:--",
    ny: "--:--:--"
  })

  // Contact Configurator State
  const [selectedServices, setSelectedServices] = useState<string[]>(["Digital Architecture"])
  const [selectedBudget, setSelectedBudget] = useState<string>("$30,000 – $60,000")
  const [selectedTimeline, setSelectedTimeline] = useState<string>("Immediate (Q2 2026)")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactScope, setContactScope] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  // Web Audio Synthesizer Engine
  const audioCtxRef = useRef<AudioContext | null>(null)

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    }
  }

  const playSynthesizerTone = (frequency: number, type: OscillatorType = "sine", duration = 0.08, gainVal = 0.04) => {
    if (!soundEnabled) return
    try {
      initAudio()
      const ctx = audioCtxRef.current
      if (!ctx) return
      if (ctx.state === "suspended") ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(frequency, ctx.currentTime)
      
      gain.gain.setValueAtTime(gainVal, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio fallback silent
    }
  }

  const playClickSound = () => playSynthesizerTone(750, "sine", 0.05, 0.03)
  const playOpenSound = () => {
    playSynthesizerTone(440, "sine", 0.1, 0.04)
    setTimeout(() => playSynthesizerTone(660, "sine", 0.15, 0.04), 60)
  }
  const playSuccessSound = () => {
    playSynthesizerTone(523.25, "triangle", 0.15, 0.05)
    setTimeout(() => playSynthesizerTone(659.25, "triangle", 0.2, 0.05), 100)
    setTimeout(() => playSynthesizerTone(783.99, "triangle", 0.35, 0.06), 200)
  }

  const toggleSound = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    if (next) {
      setTimeout(() => {
        playSynthesizerTone(600, "sine", 0.1, 0.05)
      }, 50)
    }
  }

  // World Clocks Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatTime = (timeZone: string) => 
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(now)

      setClocks({
        berlin: formatTime("Europe/Berlin"),
        tokyo: formatTime("Asia/Tokyo"),
        ny: formatTime("America/New_York")
      })
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Parallax, Cursor Follower & Scroll Effects
  useEffect(() => {
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)

    const handleScroll = () => {
      const scroll = window.pageYOffset

      const parallaxTexts = document.querySelectorAll(".parallax-text")
      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed")
        if (speed) {
          ;(text as HTMLElement).style.transform = `translateX(${scroll * Number.parseFloat(speed) * 0.1}px)`
        }
      })

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.15}px)) scale(${1 + scroll * 0.0003})`
      }

      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.08 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const href = target.getAttribute("href")
        if (href) {
          playClickSound()
          setMobileMenuOpen(false)
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [soundEnabled])

  // Keybindings (ESC to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null)
        setShowQuolytechModal(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Filtered Projects
  const filteredProjects = activeCategory === "ALL" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === activeCategory)

  // Service options for configurator
  const serviceOptions = [
    "Digital Architecture",
    "Haute Couture WebGL",
    "Brand Identity & Zine",
    "Headless Commerce",
    "Full-Stack Web App",
    "Spatial 3D & Audio"
  ]

  const budgetOptions = [
    "$15,000 – $30,000",
    "$30,000 – $60,000",
    "$60,000 – $120,000+",
    "Retainer / Advisory"
  ]

  const timelineOptions = [
    "Immediate (Q2 2026)",
    "30 – 60 Days",
    "Q3 / Q4 2026"
  ]

  const toggleService = (srv: string) => {
    playClickSound()
    setSelectedServices((prev) => 
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    )
  }

  // Handle Commission Form Submission
  const handleSubmitCommission = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName || !contactEmail) return
    
    setIsSubmitting(true)
    playClickSound()

    setTimeout(() => {
      const generatedId = `QUOLY-VAL-${Math.floor(1000 + Math.random() * 9000)}`
      setSubmittedBookingId(generatedId)
      setIsSubmitting(false)
      playSuccessSound()
    }, 900)
  }

  const copyBookingReference = () => {
    if (submittedBookingId) {
      navigator.clipboard.writeText(submittedBookingId)
      setCopySuccess(true)
      playClickSound()
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  return (
    <>
      {/* Background Cursor Blob */}
      <div className="blob" id="cursor-blob"></div>

      {/* TOP SYSTEM TICKER & TIME BAR */}
      <div className="top-ticker-bar">
        <div className="top-ticker-left">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="pulse-dot"></span>
            <span style={{ color: "#fff", fontWeight: 700 }}>COMMISSIONS OPEN</span>
            <span style={{ color: "#555" }}>// Q2–Q3 2026</span>
          </div>
          <div className="hidden md:flex" style={{ gap: "16px", color: "#666" }}>
            <span>BERLIN {clocks.berlin}</span>
            <span>•</span>
            <span>TOKYO {clocks.tokyo}</span>
            <span>•</span>
            <span>NYC {clocks.ny}</span>
          </div>
        </div>

        <div className="top-ticker-right">
          {/* Made by Quolytech Hallmark Pill */}
          <button 
            type="button"
            className="quolytech-pill"
            onClick={() => {
              playOpenSound()
              setShowQuolytechModal(true)
            }}
            title="View Engineering Specs & Made by Quolytech Credentials"
          >
            <Sparkles size={12} />
            <span>MADE BY QUOLYTECH</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: soundEnabled ? "var(--accent)" : "#777",
              padding: "3px 10px",
              cursor: "pointer",
              fontSize: "0.7rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--syne)",
              fontWeight: 700,
              textTransform: "uppercase"
            }}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>AUDIO: {soundEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <nav>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <a 
            href="#hero" 
            className="logo" 
            style={{ textDecoration: "none", color: "white" }}
            onClick={playClickSound}
          >
            VALENCE <span style={{ color: "var(--accent)", fontSize: "1rem" }}>©26</span>
          </a>
          <span 
            className="hidden lg:inline-block" 
            style={{ 
              fontSize: "0.72rem", 
              fontFamily: "var(--inter)", 
              letterSpacing: "0.1em", 
              color: "#666",
              paddingLeft: "16px",
              borderLeft: "1px solid #333"
            }}
          >
            AVANT-GARDE ARCHITECTURE & DIGITAL ARTIFACTS
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links hidden md:flex">
          <li><a href="#work">[01] WORK</a></li>
          <li><a href="#archive">[02] ARCHIVE</a></li>
          <li><a href="#about">[03] STUDIO</a></li>
          <li><a href="#manifesto">[04] MANIFESTO</a></li>
          <li><a href="#contact">[05] CONTACT</a></li>
        </ul>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a 
            href="#contact" 
            className="nav-btn hidden sm:inline-flex"
            onClick={playClickSound}
          >
            <span>COMMISSION WORK</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => {
              playClickSound()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay md:hidden">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="logo">VALENCE ©26</span>
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
            >
              <X size={28} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", margin: "40px 0" }}>
            <a 
              href="#work" 
              style={{ fontSize: "2rem", fontFamily: "var(--syne)", color: "white", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              01 // WORK
            </a>
            <a 
              href="#archive" 
              style={{ fontSize: "2rem", fontFamily: "var(--syne)", color: "white", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              02 // ARCHIVE INDEX
            </a>
            <a 
              href="#about" 
              style={{ fontSize: "2rem", fontFamily: "var(--syne)", color: "white", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              03 // THE STUDIO
            </a>
            <a 
              href="#manifesto" 
              style={{ fontSize: "2rem", fontFamily: "var(--syne)", color: "white", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              04 // MANIFESTO
            </a>
            <a 
              href="#contact" 
              style={{ fontSize: "2rem", fontFamily: "var(--syne)", color: "var(--accent)", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              05 // INQUIRE
            </a>
          </div>

          <div style={{ borderTop: "1px solid #333", paddingTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "0.8rem", color: "#888" }}>AUDIO FEEDBACK</span>
              <button 
                type="button"
                onClick={toggleSound} 
                className="quolytech-pill"
              >
                {soundEnabled ? "SOUND ON" : "MUTED"}
              </button>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#555" }}>
              MADE BY QUOLYTECH • VALENCE ARCHITECTURE 2026
            </p>
          </div>
        </div>
      )}

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
            alt="Valence Studio Editorial Lookbook"
            className="hero-img"
            id="hero-img"
          />
          <div className="hero-title-container container">
            <span className="huge-type parallax-text" data-speed="-2">
              VALENCE
            </span>
            <span 
              className="huge-type outline-text parallax-text" 
              data-speed="2" 
              style={{ paddingLeft: "clamp(40px, 15vw, 200px)" }}
            >
              SYSTEMS
            </span>

            {/* Sub-hero editorial info */}
            <div 
              style={{ 
                marginTop: "40px", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "20px"
              }}
            >
              <div style={{ maxWidth: "420px" }}>
                <p style={{ fontSize: "1rem", color: "#aaa", lineHeight: 1.6 }}>
                  Monolithic digital architecture and brutalist editorial artifacts designed to transcend ephemeral digital noise.
                </p>
                <div style={{ marginTop: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--syne)", color: "var(--accent)", letterSpacing: "0.1em" }}>
                    ENGINEERED BY QUOLYTECH
                  </span>
                  <span style={{ color: "#444" }}>—</span>
                  <span style={{ fontSize: "0.75rem", color: "#666" }}>BERLIN // TOKYO // PARIS</span>
                </div>
              </div>

              <div>
                <a 
                  href="#work" 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "var(--syne)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    borderBottom: "1px solid var(--accent)",
                    paddingBottom: "6px"
                  }}
                  onClick={playClickSound}
                >
                  <span>EXPLORE 2026 ARCHIVE</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO STATEMENT SECTION */}
        <section id="about" style={{ minHeight: "auto", padding: "120px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "880px" }}>
              <span 
                style={{ 
                  color: "var(--accent)", 
                  fontFamily: "var(--syne)", 
                  fontSize: "0.85rem", 
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                  display: "inline-block"
                }}
              >
                03 / THE MANIFESTO
              </span>
              <h2
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
                  fontFamily: "var(--syne)",
                  marginBottom: "36px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em"
                }}
              >
                WE BUILD DIGITAL ARTIFACTS THAT SHATTER THE NOISE.
              </h2>
              <p
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                  fontWeight: 300,
                  color: "#999",
                  lineHeight: 1.6,
                  marginBottom: "30px"
                }}
              >
                Visceral aesthetic. Technical precision. We operate at the intersection of high-fashion editorial, brutalist architecture, and algorithmic web computation. Made & powered by <strong style={{ color: "white" }}>Quolytech</strong>.
              </p>

              {/* Studio Metrics Grid */}
              <div 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
                  gap: "24px",
                  marginTop: "50px",
                  paddingTop: "40px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <div>
                  <div style={{ fontSize: "2.5rem", fontFamily: "var(--syne)", fontWeight: 800, color: "white" }}>
                    99.98%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                    Speed & Performance Index
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "2.5rem", fontFamily: "var(--syne)", fontWeight: 800, color: "var(--accent)" }}>
                    18+
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                    International Accolades
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "2.5rem", fontFamily: "var(--syne)", fontWeight: 800, color: "white" }}>
                    06
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                    2026 Core Artifacts
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "2.5rem", fontFamily: "var(--syne)", fontWeight: 800, color: "#fff" }}>
                    100%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
                    Engineered by Quolytech
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCROLLING MARQUEE */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">
              NEW ERA — VALENCE — MADE BY QUOLYTECH — BEYOND FORM — MONOLITHIC CODE —{" "}
            </span>
            <span className="huge-type outline-text">
              NEW ERA — VALENCE — MADE BY QUOLYTECH — BEYOND FORM — MONOLITHIC CODE —{" "}
            </span>
          </div>
        </div>

        {/* WORK SECTION & FILTER CONTROLS */}
        <section id="work" className="container">
          <div className="sticky-type">ARCHIVE</div>

          {/* Header & Filter Controls Bar */}
          <div className="filters-bar">
            {/* Category Filter Pills */}
            <div className="filter-group">
              {["ALL", "FASHION", "ARCHITECTURE", "DIGITAL", "EDITORIAL", "COMMERCE"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    playClickSound()
                    setActiveCategory(cat)
                  }}
                >
                  {cat} {cat === "ALL" ? `(${PROJECTS.length})` : ""}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Stream vs Index */}
            <div className="view-toggle">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === "stream" ? "active" : ""}`}
                onClick={() => {
                  playClickSound()
                  setViewMode("stream")
                }}
              >
                STREAM
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === "index" ? "active" : ""}`}
                onClick={() => {
                  playClickSound()
                  setViewMode("index")
                }}
              >
                INDEX
              </button>
            </div>
          </div>

          {/* STREAM VIEW (Editorial Big Presentation) */}
          {viewMode === "stream" && (
            <div style={{ position: "relative", zIndex: 10 }}>
              {filteredProjects.map((project, idx) => (
                <div 
                  key={project.id}
                  className="project-row"
                  style={{
                    flexDirection: idx % 2 === 1 ? "row-reverse" : "row"
                  }}
                >
                  <div className="project-info">
                    <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                      {project.num} / {project.category}
                    </span>
                    <h3 
                      className="huge-type" 
                      style={{ 
                        fontSize: "clamp(3.5rem, 8vw, 6.5rem)", 
                        margin: "16px 0",
                        letterSpacing: "-0.04em",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        playOpenSound()
                        setSelectedProject(project)
                        setSelectedGalleryIdx(0)
                      }}
                    >
                      {project.title}
                    </h3>
                    <p style={{ color: "#aaa", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "480px" }}>
                      {project.description}
                    </p>
                    
                    {/* Tech Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "24px 0" }}>
                      {project.tech.map((t) => (
                        <span 
                          key={t}
                          style={{
                            fontSize: "0.72rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            padding: "4px 10px",
                            color: "#bbb",
                            letterSpacing: "0.05em"
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="divider" style={{ margin: "24px 0" }}></div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "480px" }}>
                      <p style={{ fontSize: "0.82rem", color: "#666", letterSpacing: "0.1em" }}>
                        CLIENT: {project.client} // {project.year}
                      </p>
                      
                      <button
                        type="button"
                        onClick={() => {
                          playOpenSound()
                          setSelectedProject(project)
                          setSelectedGalleryIdx(0)
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontFamily: "var(--syne)",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          padding: 0
                        }}
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div 
                    className="project-media"
                    onClick={() => {
                      playOpenSound()
                      setSelectedProject(project)
                      setSelectedGalleryIdx(0)
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={project.mainImage}
                      alt={`${project.title} Artifact`}
                      className="project-image"
                      loading="lazy"
                    />
                    <div 
                      className="floating-label huge-type outline-text" 
                      style={{ 
                        fontSize: "clamp(5rem, 12vw, 8rem)",
                        right: idx % 2 === 1 ? "auto" : "-60px",
                        left: idx % 2 === 1 ? "-60px" : "auto"
                      }}
                    >
                      {project.floatingWord}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* INDEX VIEW (Brutalist Data Catalog Table) */}
          {viewMode === "index" && (
            <div id="archive" style={{ position: "relative", zIndex: 10 }}>
              <table className="archive-table">
                <thead>
                  <tr>
                    <th className="archive-header">NO.</th>
                    <th className="archive-header">PROJECT & ARTIFACT</th>
                    <th className="archive-header hidden sm:table-cell">DISCIPLINE</th>
                    <th className="archive-header hidden md:table-cell">CLIENT</th>
                    <th className="archive-header hidden lg:table-cell">YEAR</th>
                    <th className="archive-header text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr 
                      key={project.id}
                      className="archive-row"
                      onClick={() => {
                        playOpenSound()
                        setSelectedProject(project)
                        setSelectedGalleryIdx(0)
                      }}
                    >
                      <td className="archive-cell" style={{ fontFamily: "var(--syne)", color: "var(--accent)", fontWeight: 700 }}>
                        {project.num}
                      </td>
                      <td className="archive-cell">
                        <span className="archive-title">{project.title}</span>
                        <div className="sm:hidden" style={{ fontSize: "0.75rem", color: "#666", marginTop: "4px" }}>
                          {project.category} • {project.year}
                        </div>
                      </td>
                      <td className="archive-cell hidden sm:table-cell" style={{ fontSize: "0.85rem", color: "#aaa" }}>
                        {project.category}
                      </td>
                      <td className="archive-cell hidden md:table-cell" style={{ fontSize: "0.85rem", color: "#888" }}>
                        {project.client}
                      </td>
                      <td className="archive-cell hidden lg:table-cell" style={{ fontSize: "0.85rem", color: "#666" }}>
                        {project.year}
                      </td>
                      <td className="archive-cell text-right">
                        <span 
                          style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: "6px", 
                            fontFamily: "var(--syne)",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color: "white" 
                          }}
                        >
                          EXPLORE <ArrowUpRight size={14} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* OVERLAPPING EDITORIAL COMPOSITION SECTION */}
        <section style={{ padding: "80px 0" }}>
          <div className="container composition">
            <div className="comp-item-1">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600"
                className="comp-image"
                alt="Tactile Layer 1"
                loading="lazy"
              />
            </div>
            <div className="comp-item-2">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
                className="comp-image"
                alt="Tactile Layer 2"
                loading="lazy"
              />
            </div>
            <div className="comp-item-3">
              <div
                style={{
                  background: "var(--accent)",
                  padding: "40px",
                  color: "white",
                  boxShadow: "0 20px 60px rgba(255, 62, 0, 0.3)"
                }}
              >
                <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8 }}>
                  VALENCE ARCHITECTURAL LABS
                </div>
                <h4 style={{ fontFamily: "var(--syne)", fontSize: "2rem", margin: "14px 0" }}>LAYERED DEPTH</h4>
                <p style={{ marginTop: "14px", lineHeight: 1.6, opacity: 0.9 }}>
                  We believe in depth—both in meaning and in visual manifestation. Overlapping elements create an editorial tension that is meticulously structured and engineered by Quolytech.
                </p>
                <div style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      playOpenSound()
                      setShowQuolytechModal(true)
                    }}
                    style={{
                      background: "black",
                      border: "none",
                      color: "white",
                      padding: "10px 18px",
                      fontFamily: "var(--syne)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span>VIEW ENGINEERING STACK</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "clamp(250px, 30vw, 400px)",
                zIndex: 10,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500"
                className="comp-image"
                alt="Layer 3"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* MANIFESTO & CAPABILITIES SECTION */}
        <section id="manifesto" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "120px 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px" }}>
              {/* Left Column: Manifesto Values */}
              <div>
                <span style={{ color: "var(--accent)", fontFamily: "var(--syne)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                  04 // CORE ARCHITECTURAL DOCTRINE
                </span>
                <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--syne)", margin: "20px 0 30px 0", lineHeight: 1.1 }}>
                  DISCIPLINE OVER TRENDS.
                </h3>
                <p style={{ color: "#888", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "30px" }}>
                  While the commercial web gravitates toward interchangeable generic templates, Valence asserts a sculptural permanence. Every layout is calibrated like a physical monument.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <div style={{ fontFamily: "var(--syne)", fontWeight: 700, color: "white", fontSize: "1.1rem" }}>
                      01 / MONOLITHIC SIMPLICITY
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "8px", lineHeight: 1.5 }}>
                      We eliminate superfluous ornamentation. High typographic scale, deliberate whitespace, and raw editorial contrast do the heavy lifting.
                    </p>
                  </div>

                  <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <div style={{ fontFamily: "var(--syne)", fontWeight: 700, color: "white", fontSize: "1.1rem" }}>
                      02 / SUB-ZERO LATENCY RIGOR
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "8px", lineHeight: 1.5 }}>
                      Architected by Quolytech for sub-100ms response cycles, edge execution, and buttery smooth 60fps interaction kinetics.
                    </p>
                  </div>

                  <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                    <div style={{ fontFamily: "var(--syne)", fontWeight: 700, color: "white", fontSize: "1.1rem" }}>
                      03 / MULTI-SENSORY FEEDBACK
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "8px", lineHeight: 1.5 }}>
                      Integrating synthesized micro-acoustic feedback and fluid parallax transforms to establish physical presence on digital screens.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Capabilities Matrix */}
              <div>
                <span style={{ color: "var(--accent)", fontFamily: "var(--syne)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                  DISCIPLINES & SERVICES
                </span>
                <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--syne)", margin: "20px 0 30px 0", lineHeight: 1.1 }}>
                  COMMISSION CAPABILITIES
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <h5 style={{ fontFamily: "var(--syne)", fontSize: "1.2rem", color: "white" }}>
                      DIGITAL ARCHITECTURE & FULL-STACK APPS
                    </h5>
                    <p style={{ fontSize: "0.9rem", color: "#777", marginTop: "6px" }}>
                      Next.js 16, React 19, Turbopack, Headless API integrations, custom CMS frameworks, and sub-millisecond edge hosting.
                    </p>
                  </div>
                  <div className="divider" style={{ margin: "4px 0" }}></div>

                  <div>
                    <h5 style={{ fontFamily: "var(--syne)", fontSize: "1.2rem", color: "white" }}>
                      HAUTE COUTURE DIGITAL EDITORIAL & LOOKBOOKS
                    </h5>
                    <p style={{ fontSize: "0.9rem", color: "#777", marginTop: "6px" }}>
                      Art direction, high-fashion layout compositions, custom typographic pairings, and digital zine editions for forward-thinking maisons.
                    </p>
                  </div>
                  <div className="divider" style={{ margin: "4px 0" }}></div>

                  <div>
                    <h5 style={{ fontFamily: "var(--syne)", fontSize: "1.2rem", color: "white" }}>
                      WEBGL, THREE.JS & GENERATIVE EXPERIENCES
                    </h5>
                    <p style={{ fontSize: "0.9rem", color: "#777", marginTop: "6px" }}>
                      Custom shaders, interactive spatial 3D environments, tactile mouse particles, and audio-reactive Web Audio engines.
                    </p>
                  </div>
                  <div className="divider" style={{ margin: "4px 0" }}></div>

                  <div>
                    <h5 style={{ fontFamily: "var(--syne)", fontSize: "1.2rem", color: "white" }}>
                      ENGINEERING & CRAFTSMANSHIP BY QUOLYTECH
                    </h5>
                    <p style={{ fontSize: "0.9rem", color: "#777", marginTop: "6px" }}>
                      Precision architecture, bulletproof codebases, strict SEO compliance, WCAG accessibility, and continuous optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COMMISSION & CONTACT CONFIGURATOR */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a 
                href="#commission-form" 
                onClick={(e) => {
                  e.preventDefault()
                  playClickSound()
                  document.getElementById("commission-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                LET&apos;S — WORK
              </a>
            </div>

            {/* Interactive Commission Configurator Card */}
            <div id="commission-form" className="configurator-wrapper">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
                <div>
                  <span style={{ color: "var(--accent)", fontFamily: "var(--syne)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                    COMMISSION CONFIGURATOR // 2026 INTAKE
                  </span>
                  <h3 style={{ fontFamily: "var(--syne)", fontSize: "2rem", color: "white", marginTop: "8px" }}>
                    CONFIGURE YOUR ARTIFACT
                  </h3>
                  <p style={{ color: "#888", fontSize: "0.95rem", marginTop: "6px" }}>
                    Select your project requirements below to receive a personalized architectural estimate.
                  </p>
                </div>

                <div className="quolytech-pill" onClick={() => setShowQuolytechModal(true)}>
                  <ShieldCheck size={14} />
                  <span>DIRECT INQUIRY // QUOLYTECH VERIFIED</span>
                </div>
              </div>

              {!submittedBookingId ? (
                <form onSubmit={handleSubmitCommission}>
                  {/* Step 1: Select Services */}
                  <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", marginBottom: "12px", fontFamily: "var(--syne)" }}>
                      1. SELECT SERVICES (MULTIPLE)
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {serviceOptions.map((service) => {
                        const isSelected = selectedServices.includes(service)
                        return (
                          <div
                            key={service}
                            className={`pill-option ${isSelected ? "selected" : ""}`}
                            onClick={() => toggleService(service)}
                          >
                            {isSelected && <Check size={14} style={{ display: "inline", marginRight: "6px" }} />}
                            {service}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Step 2: Select Budget */}
                  <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", marginBottom: "12px", fontFamily: "var(--syne)" }}>
                      2. ESTIMATED BUDGET RANGE
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {budgetOptions.map((budget) => {
                        const isSelected = selectedBudget === budget
                        return (
                          <div
                            key={budget}
                            className={`pill-option ${isSelected ? "pill-option-accent selected" : ""}`}
                            onClick={() => {
                              playClickSound()
                              setSelectedBudget(budget)
                            }}
                          >
                            {budget}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Step 3: Select Timeline */}
                  <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa", marginBottom: "12px", fontFamily: "var(--syne)" }}>
                      3. TARGET TIMELINE
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {timelineOptions.map((time) => {
                        const isSelected = selectedTimeline === time
                        return (
                          <div
                            key={time}
                            className={`pill-option ${isSelected ? "selected" : ""}`}
                            onClick={() => {
                              playClickSound()
                              setSelectedTimeline(time)
                            }}
                          >
                            {time}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Step 4: Contact Information Inputs */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "24px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: "8px" }}>
                        YOUR NAME / ORGANIZATION *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova / Maison Vanguard"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="brutalist-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: "8px" }}>
                        COMMERCIAL EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. elena@vanguard.paris"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="brutalist-input"
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "32px" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", marginBottom: "8px" }}>
                      PROJECT BRIEF / KEY OBJECTIVES
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Outline your project scope, aesthetic goals, or key technical challenges..."
                      value={contactScope}
                      onChange={(e) => setContactScope(e.target.value)}
                      className="brutalist-input"
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-work-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="pulse-dot" style={{ background: "white", boxShadow: "none" }}></span>
                        <span>TRANSMITTING COMMISSION BRIEF...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT COMMISSION BRIEF</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Submission Confirmation Receipt */
                <div style={{ padding: "40px 20px", textAlign: "center", background: "rgba(0, 255, 102, 0.03)", border: "1px solid rgba(0, 255, 102, 0.2)" }}>
                  <div style={{ display: "inline-flex", padding: "16px", borderRadius: "50%", background: "rgba(0, 255, 102, 0.1)", color: "#00ff66", marginBottom: "20px" }}>
                    <Check size={36} />
                  </div>
                  <h4 style={{ fontFamily: "var(--syne)", fontSize: "2rem", color: "white", marginBottom: "10px" }}>
                    COMMISSION BRIEF TRANSMITTED
                  </h4>
                  <p style={{ color: "#aaa", maxWidth: "560px", margin: "0 auto 24px auto", lineHeight: 1.6 }}>
                    Thank you, <strong style={{ color: "white" }}>{contactName}</strong>. Your inquiry for <strong style={{ color: "white" }}>{selectedServices.join(", ")}</strong> has been logged directly into the Valence & Quolytech atelier queue.
                  </p>

                  <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "#050505", border: "1px solid rgba(255, 255, 255, 0.2)", padding: "12px 24px", marginBottom: "30px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#777", letterSpacing: "0.1em" }}>BOOKING REFERENCE:</span>
                    <span style={{ fontFamily: "var(--syne)", fontWeight: 800, color: "var(--accent)", fontSize: "1.1rem" }}>
                      {submittedBookingId}
                    </span>
                    <button
                      type="button"
                      onClick={copyBookingReference}
                      style={{ background: "none", border: "none", color: copySuccess ? "#00ff66" : "#aaa", cursor: "pointer", display: "flex", alignItems: "center" }}
                      title="Copy Reference ID"
                    >
                      {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedBookingId(null)
                        setContactName("")
                        setContactEmail("")
                        setContactScope("")
                      }}
                      style={{ background: "transparent", border: "1px solid #444", color: "white", padding: "10px 24px", fontFamily: "var(--syne)", fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      CONFIGURE ANOTHER INQUIRY
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="divider" style={{ margin: "80px 0 40px 0" }}></div>

            {/* GRAND FOOTER & QUOLYTECH HALLMARK */}
            <div style={{ textAlign: "center", padding: "40px 0 60px 0" }}>
              <div 
                style={{ 
                  fontFamily: "var(--syne)", 
                  fontSize: "clamp(2rem, 5vw, 4rem)", 
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "white"
                }}
              >
                MADE BY QUOLYTECH
              </div>
              <p style={{ fontSize: "0.9rem", color: "#777", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "10px" }}>
                AVANT-GARDE ARCHITECTURE • BESPOKE COMPUTATION • EST. 2026
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px",
                fontFamily: "var(--syne)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "#666",
                paddingBottom: "40px"
              }}
            >
              <div>
                © 2026 VALENCE STUDIO // ARCHITECTED BY QUOLYTECH
              </div>

              <div style={{ display: "flex", gap: "24px" }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "none" }}>
                  INSTAGRAM
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "none" }}>
                  TWITTER/X
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" style={{ color: "#777", textDecoration: "none" }}>
                  BEHANCE
                </a>
                <a href="mailto:hello@valence.studio" style={{ color: "var(--accent)", textDecoration: "none" }}>
                  HELLO@VALENCE.STUDIO
                </a>
              </div>

              <div>LOCATED IN BERLIN // TOKYO // PARIS</div>
            </div>
          </div>
        </footer>
      </main>

      {/* INTERACTIVE CASE STUDY MODAL / DRAWER */}
      {selectedProject && (
        <div 
          className="modal-overlay" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              playClickSound()
              setSelectedProject(null)
            }
          }}
        >
          <div className="modal-container">
            {/* Close Button */}
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => {
                playClickSound()
                setSelectedProject(null)
              }}
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>

            {/* Modal Hero Image */}
            <div style={{ height: "420px", position: "relative", overflow: "hidden" }}>
              <img 
                src={selectedProject.galleryImages[selectedGalleryIdx] || selectedProject.mainImage} 
                alt={selectedProject.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div 
                style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: "linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.2) 60%, transparent 100%)" 
                }} 
              />
              <div style={{ position: "absolute", bottom: "30px", left: "30px", right: "30px" }}>
                <div style={{ color: "var(--accent)", fontFamily: "var(--syne)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                  {selectedProject.num} // {selectedProject.category} • MADE BY QUOLYTECH
                </div>
                <h2 style={{ fontFamily: "var(--syne)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "white", margin: "6px 0", letterSpacing: "-0.03em" }}>
                  {selectedProject.title}
                </h2>
                <p style={{ color: "#ccc", fontSize: "1.1rem", maxWidth: "680px" }}>
                  {selectedProject.tagline}
                </p>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {selectedProject.galleryImages.length > 1 && (
              <div style={{ display: "flex", gap: "10px", padding: "16px 30px", background: "#0a0a0a", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                {selectedProject.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      playClickSound()
                      setSelectedGalleryIdx(i)
                    }}
                    style={{
                      width: "80px",
                      height: "54px",
                      border: selectedGalleryIdx === i ? "2px solid var(--accent)" : "1px solid rgba(255, 255, 255, 0.2)",
                      cursor: "pointer",
                      padding: 0,
                      overflow: "hidden",
                      opacity: selectedGalleryIdx === i ? 1 : 0.6
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Body Content */}
            <div style={{ padding: "clamp(24px, 4vw, 40px)" }}>
              {/* Specs Grid */}
              <div 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
                  gap: "20px", 
                  paddingBottom: "30px", 
                  marginBottom: "30px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)" 
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>CLIENT</span>
                  <div style={{ color: "white", fontWeight: 600, marginTop: "4px" }}>{selectedProject.client}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>YEAR</span>
                  <div style={{ color: "white", fontWeight: 600, marginTop: "4px" }}>{selectedProject.year}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>ENGINEERING</span>
                  <div style={{ color: "var(--accent)", fontWeight: 700, marginTop: "4px" }}>Made by Quolytech</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>CORE STACK</span>
                  <div style={{ color: "white", fontSize: "0.85rem", marginTop: "4px" }}>{selectedProject.tech.slice(0, 3).join(", ")}</div>
                </div>
              </div>

              {/* Overview & Deep Dive */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", marginBottom: "40px" }}>
                <div>
                  <h4 style={{ fontFamily: "var(--syne)", fontSize: "1.2rem", color: "white", marginBottom: "12px" }}>
                    THE ARCHITECTURAL CHALLENGE
                  </h4>
                  <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.95rem" }}>
                    {selectedProject.challenge}
                  </p>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--syne)", fontSize: "1.2rem", color: "var(--accent)", marginBottom: "12px" }}>
                    THE QUOLYTECH SOLUTION
                  </h4>
                  <p style={{ color: "#aaa", lineHeight: 1.6, fontSize: "0.95rem" }}>
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Technologies Full Badges */}
              <div style={{ marginBottom: "40px" }}>
                <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "10px" }}>
                  FULL ARCHITECTURE & LIBRARIES
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedProject.tech.map((t) => (
                    <span 
                      key={t}
                      style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "white",
                        padding: "6px 14px",
                        fontSize: "0.8rem",
                        fontFamily: "var(--syne)",
                        fontWeight: 600
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Next/Prev Controls */}
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  flexWrap: "wrap", 
                  gap: "16px",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-btn"
                      onClick={playClickSound}
                      style={{ background: "white", color: "black", borderColor: "white" }}
                    >
                      <span>LAUNCH LIVE ARTIFACT</span>
                      <ExternalLink size={14} />
                    </a>
                  )}

                  <a
                    href="#contact"
                    className="nav-btn"
                    onClick={() => {
                      playClickSound()
                      setSelectedProject(null)
                      document.getElementById("commission-form")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <span>COMMISSION SIMILAR</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                {/* Project Pager */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound()
                      const curIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id)
                      const prevIdx = (curIdx - 1 + PROJECTS.length) % PROJECTS.length
                      setSelectedProject(PROJECTS[prevIdx])
                      setSelectedGalleryIdx(0)
                    }}
                    style={{ background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "white", padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center" }}
                    title="Previous Project"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound()
                      const curIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id)
                      const nextIdx = (curIdx + 1) % PROJECTS.length
                      setSelectedProject(PROJECTS[nextIdx])
                      setSelectedGalleryIdx(0)
                    }}
                    style={{ background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "white", padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center" }}
                    title="Next Project"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CORNER "MADE BY QUOLYTECH" HALLMARK BADGE */}
      <div 
        className="floating-quolytech-badge"
        onClick={() => {
          playOpenSound()
          setShowQuolytechModal(true)
        }}
        title="Engineering Specs & Credentials"
      >
        <span className="pulse-dot"></span>
        <span style={{ color: "white" }}>MADE BY QUOLYTECH</span>
        <Sparkles size={13} style={{ color: "var(--accent)" }} />
      </div>

      {/* QUOLYTECH CREDENTIALS & AGENCY PROFILE MODAL */}
      {showQuolytechModal && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              playClickSound()
              setShowQuolytechModal(false)
            }
          }}
        >
          <div className="modal-container" style={{ maxWidth: "680px" }}>
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={() => {
                playClickSound()
                setShowQuolytechModal(false)
              }}
              aria-label="Close Credentials"
            >
              <X size={20} />
            </button>

            <div style={{ padding: "clamp(30px, 5vw, 48px)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontFamily: "var(--syne)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
                <Terminal size={14} />
                <span>ARCHITECTURAL SPECIFICATION</span>
              </div>

              <h3 style={{ fontFamily: "var(--syne)", fontSize: "2.4rem", color: "white", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                MADE BY QUOLYTECH
              </h3>

              <p style={{ color: "#aaa", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "28px" }}>
                This template has been re-architected, upgraded to full interactive fidelity, and powered by <strong style={{ color: "white" }}>Quolytech</strong>. We combine forward-thinking brutalist editorial aesthetics with high-performance software engineering.
              </p>

              {/* Tech Matrix */}
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "20px", marginBottom: "28px" }}>
                <div style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                  BUILT WITH THE QUOLYTECH CORE STACK
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ color: "#888" }}>FRAMEWORK:</span>
                    <div style={{ color: "white", fontWeight: 600 }}>Next.js 16 + React 19</div>
                  </div>
                  <div>
                    <span style={{ color: "#888" }}>COMPILER:</span>
                    <div style={{ color: "white", fontWeight: 600 }}>Next.js Turbopack</div>
                  </div>
                  <div>
                    <span style={{ color: "#888" }}>ACOUSTICS:</span>
                    <div style={{ color: "white", fontWeight: 600 }}>Web Audio API Synth</div>
                  </div>
                  <div>
                    <span style={{ color: "#888" }}>STYLING:</span>
                    <div style={{ color: "white", fontWeight: 600 }}>TailwindCSS + Vanilla Tokens</div>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="#contact"
                  className="nav-btn"
                  onClick={() => {
                    playClickSound()
                    setShowQuolytechModal(false)
                    document.getElementById("commission-form")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "white" }}
                >
                  <span>INQUIRE WITH QUOLYTECH</span>
                  <ArrowUpRight size={14} />
                </a>

                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => {
                    playClickSound()
                    setShowQuolytechModal(false)
                  }}
                >
                  <span>CLOSE CREDENTIALS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
