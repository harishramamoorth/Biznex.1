import React from 'react';
import { useInView } from 'react-intersection-observer';
import './WhyBizNex.css';
import builtImg from '../../assets/Built.jpg';

const FeatureCard = ({ title, desc, delay, gradient }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`feature-card ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="feature-point-wrapper">
        <span className="feature-point" style={{ background: gradient }} />
      </div>
      <div className="feature-content">
        <h4 className="feature-title">{title}</h4>
        <p className="feature-desc">{desc}</p>
      </div>
    </div>
  );
};

export default function WhyBizNex() {
  const points = [
    {
      title: 'Data‑Driven, Not Guesswork',
      desc: 'We’ve scanned 200+ real businesses – we know exactly where to look for leaks.',
      gradient: 'linear-gradient(145deg, #2563eb, #3b82f6)',
      icon: 'fa-chart-line'
    },
    {
      title: 'Partners, Not Consultants',
      desc: 'We stay in the trenches until you scale. Our success is tied to yours.',
      gradient: 'linear-gradient(145deg, #7c3aed, #8b5cf6)',
      icon: 'fa-handshake'
    },
    {
      title: 'Speed & Execution',
      desc: 'No endless reports. We fix things fast and keep you moving forward.',
      gradient: 'linear-gradient(145deg, #f59e0b, #f97316)',
      icon: 'fa-bolt'
    }
  ];

  return (
    <section className="why-biznex">
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>

      <div className="container">
        <div className="section-header">
          <span className="section-tag">Why BizNex</span>
          <h2 className="section-title">
            Built for Business <span className="gradient-text">Owners</span>
          </h2>
          <p className="section-subtitle">
            We turn Ground Data into Boardroom Decisions
          </p>
        </div>

        <div className="split-layout">
          <div className="image-wrapper">
            <img src={builtImg} alt="Built for Business Owners" className="feature-image" />
            <div className="image-overlay">
              <span className="image-badge">10,000+ scans</span>
            </div>
          </div>

          <div className="features-vertical">
            {points.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                delay={idx * 150}
                gradient={item.gradient}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}