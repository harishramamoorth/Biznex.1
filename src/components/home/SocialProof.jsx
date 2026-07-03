import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './SocialProof.css';

const Stat = ({ target, label, icon, delay }) => {
  const [count, setCount] = useState(0);
  const [celebrated, setCelebrated] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          setCelebrated(true);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className={`stat-card ${inView ? 'visible' : ''} ${celebrated ? 'celebrated' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-icon-wrapper">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-number">{count}+</div>
      <div className="stat-label">{label}</div>
      {/* Sparkles – appear on celebration */}
      {celebrated && (
        <div className="sparkles">
          <span className="sparkle sparkle-1">✨</span>
          <span className="sparkle sparkle-2">💙</span>
          <span className="sparkle sparkle-3">✨</span>
        </div>
      )}
    </div>
  );
};

export default function SocialProof() {
  const stats = [
    { target: 10000, label: 'End Users Scanned', icon: 'fa-users' },
    { target: 100, label: 'Businesses Solved', icon: 'fa-building' },
    { target: 200, label: 'Sales Teams Scaled', icon: 'fa-chart-line' },
  ];

  return (
    <section className="social-proof">
      <div className="social-proof-container">
        {stats.map((stat, idx) => (
          <Stat key={idx} target={stat.target} label={stat.label} icon={stat.icon} delay={idx * 150} />
        ))}
      </div>
    </section>
  );
}