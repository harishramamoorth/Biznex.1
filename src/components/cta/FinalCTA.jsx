import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ctaBg from '../../assets/hero-image.jpg';
import './FinalCTA.css';

export default function FinalCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} id="cta" className={`final-cta relative py-24 text-white overflow-hidden min-h-screen flex items-center ${inView ? 'cta-in-view' : ''}`}>
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBg}
          alt="Team collaborating"
          className="bg-kenburns w-full h-full object-cover origin-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
      </div>

      {/* Floating Decorative Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-64 h-64 bg-blue-600/20 top-10 -left-10"></div>
        <div className="floating-shape w-80 h-80 bg-indigo-600/20 bottom-10 -right-10" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full">
        <h2 className="cta-animate-item text-4xl md:text-5xl lg:text-6xl font-black leading-tight drop-shadow-lg">
          Still stuck at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Scan</span>?
        </h2>
        <p className="cta-animate-item delay-100 mt-6 text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light drop-shadow">
          Growth is hard when you're solving alone. Let Business Building Company (BBC) scan, solve, and scale with you.
        </p>
        <div className="cta-animate-item delay-200 mt-12 flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-500 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-green-600/40"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            Talk to Business Building Company (BBC) on WhatsApp
          </a>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-xl"
          >
            <i className="fas fa-arrow-right"></i>
            See the Plans
          </Link>
        </div>
      </div>
    </section>
  );
}