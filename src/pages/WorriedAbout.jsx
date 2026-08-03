import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './WorriedAbout.css';

import BusinessScan from '../components/worried/BusinessScan';
import StructureSolve from '../components/worried/StructureSolve';
import ExpansionSystem from '../components/worried/ExpansionSystem';
import CashflowControl from '../components/worried/CashflowControl';
import ScalePartnership from '../components/worried/ScalePartnership';
import OwnerExitPlan from '../components/worried/OwnerExitPlan';

const SLIDES = [
  { id: '01', label: 'Business Scan', accent: '#10b981', component: BusinessScan },
  { id: '02', label: 'Structure Solve', accent: '#3b82f6', component: StructureSolve },
  { id: '03', label: 'Expansion System', accent: '#8b5cf6', component: ExpansionSystem },
  { id: '04', label: 'Cashflow Control', accent: '#f59e0b', component: CashflowControl },
  { id: '05', label: 'Scale Partnership', accent: '#06b6d4', component: ScalePartnership },
  { id: '06', label: 'Owner Exit Plan', accent: '#ec4899', component: OwnerExitPlan },
];

export default function WorriedAbout() {
  const { theme } = useTheme();
  const [active, setActive] = useState(0);
  
  // Ref for the main scrolling container
  const containerRef = useRef(null);
  
  // Framer Motion hook to track scroll progress perfectly
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Track which section is in view to update the navigation dots
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5, // Triggers when the section is 50% visible
      }
    );

    const sections = document.querySelectorAll('.wa-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.wa-section');
    if (sections[index] && containerRef.current) {
      // Native smooth scroll to the exact section
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getThemeClasses = (slideId) => {
    const isOdd = parseInt(slideId, 10) % 2 !== 0;
    const isDarkSlide = (theme === 'light') ? isOdd : !isOdd;
    return isDarkSlide 
      ? 'wa-theme-dark bg-slate-900 border-slate-800 text-white' 
      : 'wa-theme-light bg-slate-50 border-slate-200 text-slate-900';
  };

  const current = SLIDES[active] || SLIDES[0];

  return (
    <div className="wa-page transition-colors duration-500">
      
      {/* Dynamic Scroll Progress Bar using Framer Motion */}
      <div className="wa-progress-container">
        <motion.div 
          className="wa-progress-fill" 
          style={{ 
            scaleY: scrollYProgress, 
            transformOrigin: "top",
            backgroundColor: current.accent 
          }}
        />
      </div>

      {/* Premium Glass Header */}
      <header className="wa-topbar">
        <Link to="/" className="wa-back">
          <i className="fas fa-arrow-left" /> Home
        </Link>
        <div className="wa-counter" style={{ '--acc': current.accent }}>
          <span className="wa-counter-cur">{current.id}</span>
          <span className="wa-counter-sep">/{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </header>

      {/* Side Navigation */}
      <nav className="wa-sidenav">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`wa-snav-btn ${i === active ? 'wa-snav-active' : ''}`}
            onClick={() => scrollToSection(i)}
            title={s.label}
          >
            <span className="wa-snav-dot" style={i === active ? { background: current.accent, boxShadow: `0 0 12px ${current.accent}` } : {}} />
            <span className="wa-snav-label">{s.id} — {s.label}</span>
          </button>
        ))}
      </nav>

      {/* CONTINUOUS SCROLL WRAPPER */}
      <div className="wa-continuous-wrapper" ref={containerRef}>
        {SLIDES.map((s, i) => {
          const SlideComponent = s.component;
          
          return (
            <motion.section
              key={s.id}
              data-index={i}
              className={`wa-section ${getThemeClasses(s.id)}`}
              // Premium Apple-style reveal: Subtle scale (0.95), light blur (2px), fading in
              initial={{ opacity: 0.3, scale: 0.95, filter: 'blur(2px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Cinematic ease out
              viewport={{ amount: 0.4 }} // Triggers when 40% is in view
            >
              <div className="wa-section-inner">
                 <SlideComponent isActive={i === active} accent={s.accent} />
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Floating Bottom Footer */}
      <footer className="wa-footer">
        <button
          className="wa-nav-btn"
          onClick={() => scrollToSection(Math.max(active - 1, 0))}
          disabled={active === 0}
        >
          <i className="fas fa-chevron-left" /> Prev
        </button>

        <div className="wa-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className={`wa-dot ${i === active ? 'wa-dot-active' : ''}`}
              style={i === active ? { background: current.accent, width: '32px' } : {}}
            />
          ))}
        </div>

        <button
          className="wa-nav-btn"
          onClick={() => scrollToSection(Math.min(active + 1, SLIDES.length - 1))}
          disabled={active === SLIDES.length - 1}
        >
          Next <i className="fas fa-chevron-right" />
        </button>
      </footer>
    </div>
  );
}