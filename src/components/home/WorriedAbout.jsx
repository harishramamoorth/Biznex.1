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



  // Track scroll details for momentum, accumulation, animation locking and persistent trapping

  const isAnimating = useRef(false);

  const accumulatedDelta = useRef(0);

  const resetAccumulationTimer = useRef(null);

  const lastTop = useRef(null);

  const isTrapped = useRef(false);



  // Custom requestAnimationFrame smooth scroll implementation (fast, decelerates smoothly)

  const smoothScrollTo = (targetY, duration = 450) => {

    const startY = window.scrollY;

    const difference = targetY - startY;

    const startTime = performance.now();



    const step = (currentTime) => {

      const timeElapsed = currentTime - startTime;

      const progress = Math.min(timeElapsed / duration, 1);



      // cubic ease-out curve (fast start, smooth deceleration)

      const ease = 1 - Math.pow(1 - progress, 3);



      window.scrollTo(0, startY + difference * ease);



      if (progress < 1) {

        requestAnimationFrame(step);

      }

    };



    requestAnimationFrame(step);

  };



  const goTo = (idx) => {

    if (idx === active || isAnimating.current) return;

   

    isAnimating.current = true;

    setActive(idx);

   

    // Cooldown duration (800ms lock to allow slide transition to complete)

    setTimeout(() => {

      isAnimating.current = false;

      accumulatedDelta.current = 0;

    }, 800);

  };



  const next = () => goTo(Math.min(active + 1, SLIDES.length - 1));

  const prev = () => goTo(Math.max(active - 1, 0));



  useEffect(() => {

    const handleWheel = (e) => {

      if (!containerRef.current) return;



      const rect = containerRef.current.getBoundingClientRect();

      const top = rect.top;

      const height = rect.height;

      const windowHeight = window.innerHeight;



      // 1. If currently animating a slide transition, freeze scroll entirely

      if (isAnimating.current) {

        e.preventDefault();

        return;

      }



      const delta = e.deltaY;

      const absDelta = Math.abs(delta);

      const isAligned = Math.abs(top) <= 50;



      // Trap Activation:

      let justTrapped = false;

      if (delta > 0 && active < SLIDES.length - 1 && top < windowHeight - 50) {

        if (!isTrapped.current) {

          isTrapped.current = true;

          justTrapped = true;

        }

      }

      if (delta < 0 && active > 0 && top > -height + 50) {

        if (!isTrapped.current) {

          isTrapped.current = true;

          justTrapped = true;

        }

      }

      if (active > 0 && active < SLIDES.length - 1) {

        isTrapped.current = true;

      }



      // Trap Deactivation:

      if (active === 0 && delta < 0) {

        isTrapped.current = false;

      }

      if (active === SLIDES.length - 1 && delta > 0) {

        isTrapped.current = false;

      }

      if (top >= windowHeight || top <= -height) {

        isTrapped.current = false;

      }



      if (isTrapped.current) {

        // ALWAYS prevent default to completely freeze browser scrolling and absorb momentum

        e.preventDefault();



        // Snap/align the page to the section top exactly when first trapped

        if (justTrapped && !isAligned) {

          smoothScrollTo(window.scrollY + top, 450);

          isAnimating.current = true;

          setTimeout(() => {

            isAnimating.current = false;

          }, 450);

        }



        // Rule 3: Ignore tiny movements

        if (absDelta < 15) return;



        // Clear accumulation on direction switch

        if ((delta > 0 && accumulatedDelta.current < 0) || (delta < 0 && accumulatedDelta.current > 0)) {

          accumulatedDelta.current = 0;

        }



        // Rule 4: Accumulate Scroll Input

        accumulatedDelta.current += delta;



        // Rule 2: Debounce/Reset accumulated delta

        if (resetAccumulationTimer.current) {

          clearTimeout(resetAccumulationTimer.current);

        }

        resetAccumulationTimer.current = setTimeout(() => {

          accumulatedDelta.current = 0;

        }, 200);



        // Threshold check: trigger slide transition when accumulated amount is high enough

        const threshold = 80;

        if (Math.abs(accumulatedDelta.current) >= threshold) {

          // Align section exactly if not already aligned

          if (!isAligned) {

            smoothScrollTo(window.scrollY + top, 450);

          }

         

          if (accumulatedDelta.current > 0) {

            next();

          } else {

            prev();

          }

          accumulatedDelta.current = 0;

        }

      } else {

        // If we scroll out of the section, sync active slide state

        if (top > windowHeight * 0.8 && active !== 0) {

          setActive(0);

        } else if (top < -windowHeight * 0.8 && active !== SLIDES.length - 1) {

          setActive(SLIDES.length - 1);

        }

      }

    };



    let startY = 0;

    const handleTouchStart = (e) => {

      startY = e.touches[0].clientY;

    };



    const handleTouchMove = (e) => {

      if (!containerRef.current) return;



      const rect = containerRef.current.getBoundingClientRect();

      const top = rect.top;

      const height = rect.height;

      const windowHeight = window.innerHeight;



      // 1. If currently animating, freeze touch scroll entirely

      if (isAnimating.current) {

        e.preventDefault();

        return;

      }



      const diff = startY - e.touches[0].clientY;

      const isAligned = Math.abs(top) <= 50;



      // Touch Trap Activation:

      let justTrapped = false;

      if (diff > 0 && active < SLIDES.length - 1 && top < windowHeight - 50) {

        if (!isTrapped.current) {

          isTrapped.current = true;

          justTrapped = true;

        }

      }

      if (diff < 0 && active > 0 && top > -height + 50) {

        if (!isTrapped.current) {

          isTrapped.current = true;

          justTrapped = true;

        }

      }

      if (active > 0 && active < SLIDES.length - 1) {

        isTrapped.current = true;

      }



      // Touch Trap Deactivation:

      if (active === 0 && diff < 0) {

        isTrapped.current = false;

      }

      if (active === SLIDES.length - 1 && diff > 0) {

        isTrapped.current = false;

      }

      if (top >= windowHeight || top <= -height) {

        isTrapped.current = false;

      }



      if (isTrapped.current) {

        e.preventDefault();



        // Snap touch to alignment exactly when first trapped

        if (justTrapped && !isAligned) {

          smoothScrollTo(window.scrollY + top, 450);

          isAnimating.current = true;

          setTimeout(() => {

            isAnimating.current = false;

          }, 450);

        }



        if (Math.abs(diff) > 40) { // Swipe threshold

          if (!isAligned) {

            smoothScrollTo(window.scrollY + top, 450);

          }

          if (diff > 0) {

            goTo(active + 1);

          } else {

            goTo(active - 1);

          }

        }

      }

    };



    // We attach to window with passive: false to guarantee we can prevent default

    window.addEventListener('wheel', handleWheel, { passive: false });

    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    window.addEventListener('touchmove', handleTouchMove, { passive: false });



    return () => {

      window.removeEventListener('wheel', handleWheel);

      window.removeEventListener('touchstart', handleTouchStart);

      window.removeEventListener('touchmove', handleTouchMove);

      if (resetAccumulationTimer.current) clearTimeout(resetAccumulationTimer.current);

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