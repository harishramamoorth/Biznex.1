import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimatedNumber from '../common/AnimatedNumber';
import './Hero.css';
import heroImg from '../../assets/hero-image.jpg';
import heroVideo from '../../assets/7148575-uhd_3840_2160_25fps.mp4';

const questions = [
  'Accelerate growth?',
  'Streamline operations?',
  'Next breakthrough?',
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 dark:from-slate-900/90 via-white/10 dark:via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30 dark:to-slate-900/80" />
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


       

        {/* ─── Two‑column container with dynamic positioning ─── */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center transition-all duration-1000 ease-in-out">

          {/* ── LEFT / CENTER: Questions ── */}
          <div
            className={`w-full md:w-1/2 z-10 flex flex-col gap-5 items-center md:items-start text-center md:text-left pr-0 md:pr-8 transition-transform duration-1000 ease-in-out ${isLeftShifted
                ? 'translate-x-0'
                : 'translate-x-0 md:translate-x-1/2'
              }`}
          >
            {questions.map((q, index) => (
              <div
                key={index}
                className={`transition-all duration-700 transform ${isQuestionVisible(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
                  }`}
                style={{
                  transitionDelay: `${isQuestionVisible(index) ? index * 0.2 : 0}s`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <h2
                  className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] dark:drop-shadow-none ${index === 2
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-blue-400 bg-[length:200%_auto] animate-shimmer'
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
            className={`w-full md:w-1/2 transition-all duration-1000 ease-in-out overflow-hidden md:overflow-visible flex justify-center items-center ${isLeftShifted
                ? 'opacity-100 translate-y-0 md:translate-x-0 max-h-[1000px] md:max-h-none mt-12 md:mt-0'
                : 'opacity-0 translate-y-8 md:translate-y-0 md:translate-x-12 max-h-0 md:max-h-none pointer-events-none mt-0'
              }`}
          >
            <div className="w-full min-w-[280px] md:min-w-[400px] relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 rounded-[1.25rem] blur-md opacity-40 group-hover:opacity-60 transition duration-1000"></div>

              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 md:p-10 lg:p-12 border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-blue-900/5 dark:shadow-blue-900/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent rounded-3xl pointer-events-none"></div>
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                    Scale With Confidence
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-5">
                    Build a Business That Scales with Confidence.
                  </h3>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                    Stop guessing what's holding your business back. We analyze your operations, identify growth opportunities, and implement practical strategies that improve efficiency, profitability, and long-term success.
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-6"></div>
                  <div className="flex items-center gap-4 w-full justify-center md:justify-start">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm z-30"><i className="fas fa-chart-line"></i></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm z-20"><i className="fas fa-bullseye"></i></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-sm z-10"><i className="fas fa-rocket"></i></div>
                    </div>
                    <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-tight max-w-[180px]">
                      Let's Turn Your Vision Into Measurable Success
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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