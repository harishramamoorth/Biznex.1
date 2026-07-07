import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './HowWeWork.css';

const StepCard = ({ step, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`step-card ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Large background number with gradient */}
      <span
        className="step-number-bg"
        style={{
          background: step.gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {step.number}
      </span>

      <div className="step-header">
        <div className="step-icon-wrapper" style={{ background: step.gradient }}>
          <i className={`fas ${step.icon}`}></i>
        </div>
        <h3 className="step-title">{step.title}</h3>
      </div>

      <p className="step-description">{step.description}</p>

      <div className="step-details">
        <div className="step-action">
          <span className="step-action-label">What we do</span>
          <ul className="step-action-list">
            {step.actions.map((action, idx) => (
              <li key={idx}>
                <i className="fas fa-check-circle"></i>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="step-outcome">
          <span className="step-outcome-label">You get</span>
          <p className="step-outcome-text">{step.outcome}</p>
        </div>
      </div>


    </div>
  );
};

export default function HowWeWork() {
  const steps = [
    {
      number: '01',
      title: 'Scan',
      icon: 'fa-search',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      description: 'We run a 360° audit of your sales, operations, team structure, and cashflow. No assumptions, no vanity metrics. Just the truth.',
      actions: [
        'Deep‑dive interviews with key stakeholders',
        'Financial and operational data analysis',
        'Sales pipeline and customer journey mapping',
        'Team competency and role assessment'
      ],
      outcome: 'A clear, one‑page diagnosis – not a 50‑slide deck. You\'ll know exactly where your business is leaking.',
      cta: 'Start with a free scan'
    },
    {
      number: '02',
      title: 'Solve',
      icon: 'fa-tools',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      description: 'We fix what\'s broken. Org structures, SOPs, sales processes, and business strategy – we redesign everything so your business stops leaking.',
      actions: [
        'Organisational structure redesign',
        'Standard operating procedures (SOPs) creation',
        'Sales process overhaul and training',
        'Strategy alignment with measurable KPIs'
      ],
      outcome: 'Right people in the right roles, working SOPs, and a clear action plan. You\'ll stop fire‑fighting daily.',
      cta: 'Let\'s solve your operations'
    },
    {
      number: '03',
      title: 'Scale',
      icon: 'fa-rocket',
      gradient: 'linear-gradient(135deg, #f97316, #f59e0b)',
      description: 'We execute with you. We track data, train your team, and course‑correct weekly. We don\'t leave until growth becomes your new normal.',
      actions: [
        'Weekly execution reviews and adjustments',
        'On‑the‑ground team training and coaching',
        'Real‑time performance dashboards',
        'Scalable systems that run without you'
      ],
      outcome: 'A growth engine that works even when you\'re not in the room. You\'ll be ready to scale independently.',
      cta: 'Start scaling now'
    }
  ];

  return (
    <section id="process" className="how-we-work">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">The Framework</span>
          <h2 className="section-title">
            Scan. <span className="gradient-text">Solve.</span> Scale.
          </h2>
          <p className="section-subtitle">
            Most consultants stop at Scan. We stay till Scale.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <StepCard key={idx} step={step} delay={idx * 150} />
          ))}
        </div>

        <div className="bottom-cta">
          <Link to="/pricing" className="btn-primary">
            View Pricing & Plans <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}