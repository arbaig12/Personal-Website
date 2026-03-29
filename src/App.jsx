import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import profileImage from './assets/mypicture.jpg';
import github from './assets/Github-Logo.png';
import linkedIn from './assets/LinkedIn_logo_initials.png';
import Timeline from './Timeline';
import Project from './Project';
import Hero from './Hero';
import LoadingScreen from './LoadingScreen';
import PokemonPlayer from './PokemonPlayer';
import Resume from '/Resume.pdf';

// ── Sun / Moon icons ────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function App() {
  const [loaded, setLoaded]             = useState(false);
  const [theme, setTheme]               = useState(() => localStorage.getItem('theme') || 'dark');
  const [scrollPct, setScrollPct]       = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [showResume, setShowResume]     = useState(false);
  const [copied, setCopied]             = useState(false);

  const aboutRef      = useRef(null);
  const experienceRef = useRef(null);
  const contactRef    = useRef(null);
  const projectRef    = useRef(null);

  // ── Theme ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // ── Cursor spotlight ───────────────────────────────────────────────────────
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // ── Scroll progress ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll spy ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (showResume) return;
    const sections = [
      { id: 'about',      ref: aboutRef },
      { id: 'experience', ref: experienceRef },
      { id: 'projects',   ref: projectRef },
      { id: 'contact',    ref: contactRef },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sections.find(s => s.ref.current === entry.target);
            if (found) setActiveSection(found.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: `-${60}px 0px -40% 0px` }
    );
    sections.forEach(({ ref }) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, [showResume]);

  // ── Reveal animations ──────────────────────────────────────────────────────
  useEffect(() => {
    if (showResume) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }, 50);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [showResume]);

  // ── Nav click ──────────────────────────────────────────────────────────────
  const handleNavClick = (e, sectionRef) => {
    e.preventDefault();
    if (showResume) {
      setShowResume(false);
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } else {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ── Copy email ─────────────────────────────────────────────────────────────
  const copyEmail = () => {
    navigator.clipboard.writeText('ab12person@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Loading splash */}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Animated gradient orbs */}
      <div className="bg-canvas" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* Mouse spotlight */}
      <div className="cursor-spotlight" aria-hidden="true" />

      {/* Scroll progress */}
      <div className="scroll-progress-bar" style={{ width: `${scrollPct}%` }} aria-hidden="true" />

      <div className="app-container">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="main-header">
          <h1 className="name-title">Arslan Baig</h1>
          <nav className="nav-links">
            <a href="#about"      className={!showResume && activeSection === 'about'      ? 'active' : ''} onClick={e => handleNavClick(e, aboutRef)}>About</a>
            <a href="#resume"     className={showResume ? 'active' : ''}                                    onClick={e => { e.preventDefault(); setShowResume(r => !r); }}>Resume</a>
            <a href="#experience" className={!showResume && activeSection === 'experience' ? 'active' : ''} onClick={e => handleNavClick(e, experienceRef)}>Experience</a>
            <a href="#projects"   className={!showResume && activeSection === 'projects'   ? 'active' : ''} onClick={e => handleNavClick(e, projectRef)}>Projects</a>
            <a href="#contact"    className={!showResume && activeSection === 'contact'    ? 'active' : ''} onClick={e => handleNavClick(e, contactRef)}>Contact</a>
          </nav>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <aside className="sidebar">
          <div className="profile-section">
            <img src={profileImage} alt="Arslan Baig" className="profile-image" width="180" height="210" />
            <p className="profile-name">Arslan Baig</p>
            <p className="profile-title">Software Engineer</p>
            <div className="profile-divider" />
            <div className="social-media">
              <a href="https://github.com/arbaig12" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="GitHub" className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/arslanbaig12/" target="_blank" rel="noopener noreferrer">
                <img src={linkedIn} alt="LinkedIn" className="social-icon" />
              </a>
            </div>
          </div>
        </aside>

        {/* ── Main content ───────────────────────────────────────────────── */}
        <main className="content-area">
          {showResume ? (
            <div className="resume-viewer">
              <iframe title="Resume" src={Resume} width="100%" height="100%">
                <p>Your browser does not support PDFs. <a href={Resume}>Download Resume</a></p>
              </iframe>
            </div>
          ) : (
            <>
              <Hero />

              <section id="about" ref={aboutRef} className="content-about" data-reveal>
                <h2>About Me</h2>
                <p>
                  Hello, my name is Arslan Baig. I am a Junior studying Computer Science &amp; Applied
                  Mathematics and Statistics at Stony Brook University and a Software Engineer Intern at
                  NYC Health + Hospitals. My passion for programming started in childhood, crafting Roblox
                  games in Lua and designing redstone circuitry in Minecraft — recreational hobbies that
                  were quietly shaping my problem-solving mindset.
                </p>
                <p>
                  Over the years I have honed my ability to develop solutions across multiple disciplines,
                  mastering various programming languages and technologies. I find deep satisfaction in
                  algorithm development, optimizing efficiency, and architecting large-scale projects that
                  solve real-world problems. Whether it&apos;s designing scalable systems, working with
                  artificial intelligence, or building impactful applications, I thrive on tackling
                  challenges that push my abilities further.
                </p>
                <p>
                  Feel free to explore the rest of my website to see my projects, experience, and skills
                  in action. Let&apos;s build something great together!
                </p>
              </section>

              <section id="experience" ref={experienceRef} className="content-section" data-reveal>
                <h2>Experience</h2>
                <Timeline />
              </section>

              <section id="projects" ref={projectRef} className="content-section" data-reveal>
                <h2>Projects</h2>
                <Project />
              </section>
            </>
          )}
        </main>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        {!showResume && (
          <footer className="contact-footer" id="contact" ref={contactRef}>
            <div className="contact-info">
              <div className="contact-item">
                <span>📞</span>
                <a href="tel:+19179151979">+1 (917) 915-1979</a>
              </div>

              <div className="contact-item">
                <span>✉️</span>
                <button className="copy-email-btn" onClick={copyEmail}>
                  ab12person@gmail.com
                  <span className={`copy-confirm ${copied ? 'show' : ''}`}>✓ Copied!</span>
                </button>
              </div>

              <div className="contact-item">
                <img src={linkedIn} alt="LinkedIn" className="social-contact-icon" />
                <a href="https://www.linkedin.com/in/arslanbaig12/">arslanbaig12</a>
              </div>
            </div>

            {/* Footer meta row */}
            <div className="footer-meta">
              <a
                href="https://github.com/arbaig12/Personal-Website"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-meta-link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View Source
              </a>
              <a
                href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Farbaig12.github.io%2FPersonal-Website%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="perf-badge"
              >
                ⚡ PageSpeed
              </a>
            </div>
          </footer>
        )}
      </div>

      {/* Pokémon music player — fixed, outside layout flow */}
      <PokemonPlayer />
    </>
  );
}

export default App;
