import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './WorriedAbout.css';

import BusinessScan from '../worried/BusinessScan';
import StructureSolve from '../worried/StructureSolve';
import ExpansionSystem from '../worried/ExpansionSystem';
import CashflowControl from '../worried/CashflowControl';
import ScalePartnership from '../worried/ScalePartnership';
import OwnerExitPlan from '../worried/OwnerExitPlan';

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
  const containerRef = useRef(null);
  const busy = useRef(false);
  const touchStartY = useRef(null);

  const goTo = (idx) => {
    if (idx === active || busy.current) return;
    busy.current = true;
    setActive(idx);
    setTimeout(() => {
      busy.current = false;
    }, 900); // 900ms lock to allow slide transition and prevent rapid scrolling
  };

  const next = () => goTo(Math.min(active + 1, SLIDES.length - 1));
  const prev = () => goTo(Math.max(active - 1, 0));

  const lastTop = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current) return;

      // If a transition is actively happening, swallow ALL scroll events 
      // to absorb trackpad momentum and prevent skipping the section!
      if (busy.current) {
        e.preventDefault();
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const top = rect.top;

      // Are we physically near the top of the section? (allow 50px error margin)
      const isNearTop = Math.abs(top) <= 50;

      // Did the user scroll so fast that they skipped the 50px window?
      let crossedBoundary = false;
      if (lastTop.current !== null) {
        if (lastTop.current > 0 && top < 0 && active < SLIDES.length - 1) crossedBoundary = true;
        if (lastTop.current < 0 && top > 0 && active > 0) crossedBoundary = true;
      }
      lastTop.current = top;

      // If we are currently locked into the section
      if (isNearTop || crossedBoundary) {
        if (e.deltaY > 0 && active < SLIDES.length - 1) {
          // Scrolling down and we have more slides
          e.preventDefault();
          if (Math.abs(top) > 1) window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' }); // Force exact snap smoothly
          next();
        } else if (e.deltaY < 0 && active > 0) {
          // Scrolling up and we have more slides
          e.preventDefault();
          if (Math.abs(top) > 1) window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' }); // Force exact snap smoothly
          prev();
        }
      }
    };

    let startY = 0;
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      if (containerRef.current) {
        lastTop.current = containerRef.current.getBoundingClientRect().top;
      }
    };

    const handleTouchMove = (e) => {
      if (!containerRef.current) return;

      // Prevent touch momentum from glitching past the slide
      if (busy.current) {
        e.preventDefault();
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const top = rect.top;
      const isNearTop = Math.abs(top) <= 50;

      if (isNearTop) {
        const diff = startY - e.touches[0].clientY;
        if (Math.abs(diff) > 20) {
          if (diff > 0 && active < SLIDES.length - 1) { // Swipe up (scroll down)
            e.preventDefault();
            if (Math.abs(top) > 1) window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' });
            goTo(active + 1);
          } else if (diff < 0 && active > 0) { // Swipe down (scroll up)
            e.preventDefault();
            if (Math.abs(top) > 1) window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' });
            goTo(active - 1);
          }
        }
      }
    };

    // We attach to window with passive: false to guarantee we can preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [active]);



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
    <section ref={containerRef} className="wa-home-section transition-colors duration-500">

      {/* Vertical Slider Wrapper */}
      <div
        className="wa-slides-wrapper"
        style={{ transform: `translateY(-${active * 100}%)` }}
      >
        {SLIDES.map((s, i) => {
          const SlideComponent = s.component;
          return (
            <div
              key={s.id}
              className={`wa-slide-section flex items-center justify-center transition-all duration-500 ease-in-out ${i === active ? 'wa-slide-section-active' : ''
                } ${getThemeClasses(s.id)}`}
            >
              <SlideComponent isActive={i === active} />
            </div>
          );
        })}
      </div>


    </section>
  );
}
