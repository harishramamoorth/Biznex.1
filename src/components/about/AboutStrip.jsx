import React, { useState, useEffect, useRef } from 'react';
import './AboutStrip.css';
import trustTeamImg from '../../assets/trust-team.jpg';

// Animated counter
const AnimatedCounter = ({ target, label, suffix = '+', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-4xl md:text-5xl font-black text-white">{count}{suffix}</div>
      <div className="text-sm text-blue-200 font-medium mt-2">{label}</div>
    </div>
  );
};

// Testimonial Carousel
const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "Business Building Company (BBC) helped us identify leaks we didn't know existed. We grew 40% in 6 months.",
      author: 'Sarah Johnson',
      role: 'CEO, TechStart',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&auto=format'
    },
    {
      quote: "Our operations went from chaos to clarity in 90 days. Best investment we made.",
      author: 'Mark Davis',
      role: 'COO, ManufactureCo',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format'
    },
    {
      quote: "The Scan-Solve-Scale framework transformed how we run our business.",
      author: 'Emily Chen',
      role: 'Founder, RetailChain',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face&auto=format'
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((item, idx) => (
            <div key={idx} className="min-w-full px-4 text-center">
              <img
                src={item.img}
                alt={item.author}
                className="w-16 h-16 rounded-full mx-auto border-2 border-blue-400 shadow-lg object-cover"
              />
              <blockquote className="mt-4 text-xl md:text-2xl text-white italic font-light leading-relaxed">
                “{item.quote}”
              </blockquote>
              <cite className="block mt-3 text-blue-300 font-medium not-italic">
                — {item.author}, <span className="text-slate-400 text-sm">{item.role}</span>
              </cite>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-blue-500 w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main AboutStrip
export default function AboutStrip() {

  return (
    <section className="about-strip relative overflow-hidden min-h-screen py-20 bg-slate-900">
      {/* Background video/image with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-colleagues-discussing-work-at-a-desk-in-a-busy-32363-large.mp4" type="video/mp4" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
      </div>

      {/* Decorative particles (optional) */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top section: heading + description */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-400/30">
              Trust &amp; Results
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">10,000+</span> scans matter
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              We didn't learn business from PDFs. We learned it by sitting with <strong className="text-white">10,000+ real customers</strong> — understanding what makes them buy, stay, or leave. That ground data powers every solution we design for you.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-6 italic text-slate-300 text-lg">
              “No theory. Only what works.”
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 mt-8 pt-8 border-t border-slate-700/50">
              <AnimatedCounter target={10} label="Scans" suffix="K+" />
              <AnimatedCounter target={100} label="Businesses Solved" suffix="+" />
              <AnimatedCounter target={98} label="Satisfaction" suffix="%" />
            </div>

            {/* Team badge + CTA */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=face&auto=format"
                  alt="Business Building Company (BBC) Team"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400 shadow-lg"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Business Building Company (BBC) Team</p>
                  <p className="text-xs text-slate-400">100+ businesses transformed</p>
                </div>
              </div>
              <a
                href="#pricing"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-blue-600/30 hover:scale-105"
              >
                Book a Free Scan →
              </a>
            </div>
          </div>

          {/* Right column: Image collage + carousel */}
          <div className="space-y-6">
            <div className="relative">
              <div>
                <img
                  src={trustTeamImg}
                  alt="Business consultation"
                  className="rounded-2xl shadow-2xl w-full object-cover h-64 md:h-80"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★★★★★</span>
                <span className="text-sm font-bold">4.9</span>
                <span className="text-xs text-slate-500">(200+ reviews)</span>
              </div>

            </div>

            {/* Testimonial carousel */}
            <TestimonialCarousel />
          </div>
        </div>


      </div>
    </section>
  );
}