import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimatedNumber from '../common/AnimatedNumber';
import './Hero.css';
import heroImg from '../../assets/hero-image.jpg';
import heroVideo from '../../assets/7148575-uhd_3840_2160_25fps.mp4';

const questions = [
  'Worried about growth?',
  'Stuck in operations?',
  'Ready to transform?',
];

export default function Hero() {
  const [step, setStep] = useState(0); // 0,1,2: questions appear; 3: move left; 4: show right

  useEffect(() => {
    let timers = [];
    
    const runSequence = () => {
      setStep(0);
      
      timers.forEach(clearTimeout);
      timers = [];

      questions.forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            setStep(i + 1); // step 1,2,3
          }, (i + 1) * 1000) // 1s between each question
        );
      });

      // Move left and fade in right side
      const moveLeft = setTimeout(() => {
        setStep(4); // step 4: left shift + right fade in
      }, questions.length * 1000 + 1500);
      timers.push(moveLeft);
    };

    // Run first time
    runSequence();
    
    // Repeat every 15 seconds
    const loopTimer = setInterval(() => {
      runSequence();
    }, 15000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, []);

  const isQuestionVisible = (index) => step > index;
  const isLeftShifted = step >= 4;

  return (
    <section id="hero" className="hero-container min-h-[calc(100vh-72px)] flex items-center relative overflow-hidden border-b border-slate-200 dark:border-slate-800 pt-24 lg:pt-0">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={heroImg}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 dark:from-slate-900/80 via-white/70 dark:via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-slate-900/40" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* ─── Main Content ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 py-16 lg:py-24 flex flex-col items-center justify-center h-full">

        {/* Top Badge (always visible) */}
        <div className="hero-text-animate inline-flex items-center justify-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-700 dark:text-blue-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 dark:bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-500" />
          </span>
          Trusted by 200+ businesses
        </div>

        {/* ─── Two‑column container with dynamic positioning ─── */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out">
          
          {/* ── LEFT / CENTER: Questions ── */}
          <div
            className={`w-full md:w-1/2 z-10 flex flex-col gap-5 items-center md:items-start text-center md:text-left pr-0 md:pr-8 transition-transform duration-1000 ease-in-out ${
              isLeftShifted 
                ? 'translate-x-0' 
                : 'translate-x-0 md:translate-x-1/2'
            }`}
          >
            {questions.map((q, index) => (
              <div
                key={index}
                className={`transition-all duration-700 transform ${
                  isQuestionVisible(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
                }`}
                style={{
                  transitionDelay: `${isQuestionVisible(index) ? index * 0.2 : 0}s`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <h2
                  className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight ${
                    index === 2
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-shimmer'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {q}
                </h2>
              </div>
            ))}
          </div>

          {/* ── RIGHT: Encouragement + BizNex ── */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 ease-in-out overflow-hidden md:overflow-visible flex justify-center items-center ${
              isLeftShifted
                ? 'opacity-100 translate-y-0 md:translate-x-0 max-h-[1000px] md:max-h-none mt-12 md:mt-0'
                : 'opacity-0 translate-y-8 md:translate-y-0 md:translate-x-12 max-h-0 md:max-h-none pointer-events-none mt-0'
            }`}
          >
            <div className="w-full min-w-[280px] md:min-w-[400px] relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 rounded-[1.25rem] blur-md opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              
              <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 border border-blue-200/50 dark:border-blue-700/50 shadow-[0_0_40px_rgba(59,130,246,0.2)] dark:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-relaxed">
                    You're at the right place.
                  </p>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mt-4 leading-relaxed">
                    We're <strong className="text-blue-600 dark:text-blue-400">BizNex</strong>.
                    We scan your business, solve what's broken, and stay with you
                    till you scale on your own.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 w-fit">
                    <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    Trusted by 200+ businesses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="hero-text-animate delay-5 mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/pricing"
            className="btn-primary inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 w-full sm:w-auto text-center relative overflow-hidden group"
          >
            <span className="relative z-10">Book a Free Business Scan</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>
          <Link
            to="/process"
            className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium transition-colors duration-200 underline-offset-4 hover:underline w-full sm:w-auto text-center py-2 group"
          >
            See how we work 
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="hero-text-animate delay-6 mt-12 flex flex-wrap items-center justify-center gap-8 text-base">
          <div className="stat-item">
            <span className="font-black text-slate-900 dark:text-white">
              <AnimatedNumber end={10} suffix="K+" duration={2500} />
            </span> 
            <span className="text-slate-600 dark:text-slate-300 ml-1">scans</span>
          </div>
          <div className="stat-item">
            <span className="font-black text-slate-900 dark:text-white">
              <AnimatedNumber end={100} suffix="+" duration={2500} />
            </span> 
            <span className="text-slate-600 dark:text-slate-300 ml-1">solved</span>
          </div>
          <div className="stat-item">
            <span className="font-black text-slate-900 dark:text-white">
              <AnimatedNumber end={100} suffix="%" duration={2500} />
            </span> 
            <span className="text-slate-600 dark:text-slate-300 ml-1">satisfaction</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="scroll-indicator flex flex-col items-center text-slate-500 dark:text-slate-400 animate-bounce-slow">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}