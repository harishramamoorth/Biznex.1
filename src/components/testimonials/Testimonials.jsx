import { useState, useEffect } from 'react';
import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    { quote: "Business Building Company (BBC) helped us identify leaks we didn't know existed. We grew 40% in 6 months.", author: 'CEO, Tech Startup', role: 'SaaS' },
    { quote: "Our operations went from chaos to clarity in 90 days. Best investment we made.", author: 'COO, Manufacturing Co.', role: 'Industrial' },
    { quote: "The Scan-Solve-Scale framework transformed how we run our business.", author: 'Founder, Retail Chain', role: 'Retail' },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="testimonials py-24 bg-slate-50 min-h-[60vh] flex items-center">
      <div className="max-w-4xl mx-auto px-6 text-center w-full">
        <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-3">What Our Clients Say</h2>
        <div className="relative">
          {testimonials.map((item, idx) => (
            <div key={idx} className={`col-start-1 row-start-1 transition-all duration-500 ${idx === current ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0'}`}>
              <blockquote className="text-xl md:text-3xl font-medium text-slate-800 italic max-w-3xl mx-auto">
                “{item.quote}”
              </blockquote>
              <cite className="block mt-4 text-slate-500 font-bold not-italic">— {item.author}</cite>
              <span className="text-sm text-slate-400">{item.role}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} className={`w-3 h-3 rounded-full transition-colors ${idx === current ? 'bg-blue-600' : 'bg-slate-300'}`} aria-label={`Go to testimonial ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}