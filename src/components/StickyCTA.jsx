import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        setIsVisible(window.scrollY > hero.offsetHeight * 0.7);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-md md:max-w-lg bg-slate-950/80 backdrop-blur-xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 py-3.5 px-6 rounded-2xl transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-90 pointer-events-none'
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 opacity-30 pointer-events-none"></div>
      
      <div className="relative flex items-center justify-between gap-4 w-full z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <p className="text-white font-bold text-sm sm:text-base tracking-tight">
            Ready to scale?
          </p>
        </div>
        <Link
          to="/free-scan"
          className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:from-blue-500 hover:to-violet-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 active:translate-y-0 active:shadow-md transition-all duration-300 whitespace-nowrap text-center"
        >
          Book Free Scan
        </Link>
      </div>
    </div>
  );
}