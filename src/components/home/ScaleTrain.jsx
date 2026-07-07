import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './ScaleTrain.css';

export default function ScaleTrain() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    const stops = [
        { label: 'Scan', desc: '360° audit of sales, ops, team, cashflow', icon: 'fa-search' },
        { label: 'Diagnose', desc: 'Identify leaks & growth blockers', icon: 'fa-stethoscope' },
        { label: 'Solve', desc: 'Fix structure, SOPs, strategy', icon: 'fa-tools' },
        { label: 'Scale', desc: 'Execute & grow with our partnership', icon: 'fa-rocket' },
    ];

    useEffect(() => {
        if (!inView) return;
        let idx = 0;
        const timer = setInterval(() => {
            idx = (idx + 1) % stops.length;
            setActiveIndex(idx);
        }, 2000);
        return () => clearInterval(timer);
    }, [inView, stops.length]);

    const progress = ((activeIndex + 1) / stops.length) * 100;

    return (
        <section ref={ref} className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">The Journey</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50">Your Scale Train</h3>
                    <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">From chaos to clarity — a proven track to sustainable growth</p>
                </div>

                <div className="train-track">
                    <div className="track-fill" style={{ width: `${progress}%` }} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {stops.map((stop, idx) => {
                        const isActive = idx === activeIndex;
                        const isCompleted = idx < activeIndex;
                        const status = isActive ? 'active' : isCompleted ? 'completed' : '';
                        return (
                            <div key={idx} className={`train-stop text-center p-4 rounded-2xl ${status} ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50' : ''}`}>
                                <div className={`stop-dot mx-auto ${status}`} />
                                <div className={`mt-3 text-lg font-bold text-slate-800 dark:text-slate-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                                    <i className={`fas ${stop.icon} mr-2 text-sm`} />
                                    {stop.label}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{stop.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <div className="inline-block bg-white dark:bg-slate-800 rounded-2xl px-8 py-4 shadow-md border border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Current stop:</span>
                        <span className="ml-2 text-lg font-bold text-blue-600 dark:text-blue-400">{stops[activeIndex].label}</span>
                        <span className="block text-slate-600 dark:text-slate-300 mt-1">{stops[activeIndex].desc}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}