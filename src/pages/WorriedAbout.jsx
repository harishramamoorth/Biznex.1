import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const busy = useRef(false);
  const touchStartY = useRef(null);

  const goTo = (idx) => {
    if (idx === active || busy.current) return;
    busy.current = true;
    setActive(idx);
    setTimeout(() => {
      busy.current = false;
    }, 1000); // Match CSS transition duration
  };

  const next = () => goTo(Math.min(active + 1, SLIDES.length - 1));
  const prev = () => goTo(Math.max(active - 1, 0));

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (busy.current) return;
      if (e.deltaY > 30) {
        next();
      } else if (e.deltaY < -30) {
        prev();
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (busy.current || touchStartY.current === null) return;
      const diff = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          next();
        } else {
          prev();
        }
        touchStartY.current = null;
      }
    };

    const handleKeyDown = (e) => {
      if (busy.current) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev();
    };

    const el = document.getElementById('wa-scroll-container');
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
      el.addEventListener('touchstart', handleTouchStart, { passive: true });
      el.addEventListener('touchmove', handleTouchMove, { passive: true });
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (el) {
        el.removeEventListener('wheel', handleWheel);
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchmove', handleTouchMove);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  const current = SLIDES[active];

  const getThemeClasses = (slideId) => {
    const isOdd = parseInt(slideId, 10) % 2 !== 0;
    // In light theme: odd slides -> dark theme, even slides -> light theme
    // In dark theme: odd slides -> light theme, even slides -> dark theme
    const isDarkSlide = (theme === 'light') ? isOdd : !isOdd;
    if (isDarkSlide) {
      return 'wa-theme-dark bg-slate-900 border-slate-800';
    } else {
      return 'wa-theme-light bg-slate-50 border-slate-200';
    }
  };

  return (
    <div id="wa-scroll-container" className="wa-page transition-colors duration-500">
      {/* Top Bar */}
      <header className="wa-topbar">
        <Link to="/" className="wa-back">
          <i className="fas fa-arrow-left" /> Home
        </Link>
        <div className="wa-counter" style={{ '--acc': current.accent }}>
          <span className="wa-counter-cur">{current.id}</span>
          <span className="wa-counter-sep">/{String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </header>

      {/* Sidenav */}
      <nav className="wa-sidenav">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`wa-snav-btn ${i === active ? 'wa-snav-active' : ''}`}
            onClick={() => goTo(i)}
            title={s.label}
          >
            <span className="wa-snav-dot" style={i === active ? { background: current.accent } : {}} />
            <span className="wa-snav-label">{s.id} — {s.label}</span>
          </button>
        ))}
      </nav>

      {/* Vertical Slider Wrapper */}
      <div
        className="wa-slides-wrapper"
        style={{ transform: `translateY(-${active * 100}%)` }}
      >
        {SLIDES.map((s, i) => {
          const SlideComponent = s.component;
          return (
            <section
              key={s.id}
              className={`wa-slide-section flex items-center justify-center transition-all duration-500 ease-in-out ${i === active ? 'wa-slide-section-active' : ''
                } ${getThemeClasses(s.id)}`}
            >
              <SlideComponent isActive={i === active} />
            </section>
          );
        })}
      </div>

      {/* Footer Nav */}
      <footer className="wa-footer">
        <button
          className="wa-nav-btn"
          onClick={prev}
          disabled={active === 0}
          style={{ '--acc': current.accent }}
        >
          <i className="fas fa-chevron-left" /> Prev
        </button>

        <div className="wa-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`wa-dot ${i === active ? 'wa-dot-active' : ''}`}
              style={i === active ? { background: current.accent, width: 28 } : {}}
            />
          ))}
        </div>

        <button
          className="wa-nav-btn"
          onClick={next}
          disabled={active === SLIDES.length - 1}
          style={{ '--acc': current.accent }}
        >
          Next <i className="fas fa-chevron-right" />
        </button>
      </footer>
    </div>
  );
}

