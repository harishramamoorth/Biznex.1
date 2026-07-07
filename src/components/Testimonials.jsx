import React, { useState, useEffect } from 'react';

const testimonials = [
    { quote: "BizNex helped us identify leaks we didn't know existed. We grew 40% in 6 months.", author: "CEO, Tech Startup" },
    { quote: "Our operations went from chaos to clarity in 90 days. Best investment we made.", author: "COO, Manufacturing Co." },
    { quote: "The Scan-Solve-Scale framework transformed how we run our business.", author: "Founder, Retail Chain" },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="testimonials py-24 bg-slate-50 dark:bg-slate-900 min-h-[60vh] flex items-center">
            <div className="max-w-4xl mx-auto px-6 text-center w-full">
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">What Our Clients Say</h2>
                <div className="grid grid-cols-1">
                    {testimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className={`col-start-1 row-start-1 transition-all duration-500 ${idx === current ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                                }`}
                        >
                            <blockquote className="text-xl md:text-3xl font-medium text-slate-800 dark:text-slate-200 italic max-w-3xl mx-auto">
                                “{item.quote}”
                            </blockquote>
                            <cite className="block mt-4 text-slate-500 dark:text-slate-400 font-bold not-italic">— {item.author}</cite>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center gap-2">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-3 h-3 rounded-full transition-colors ${idx === current ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}