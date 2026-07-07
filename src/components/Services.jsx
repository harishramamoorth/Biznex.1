import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './Services.css';

const ServiceCard = ({ service, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`service-card ${inView ? 'visible' : ''}`}
      style={{
        transitionDelay: `${delay}ms`,
        backgroundImage: `url(${service.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for readability */}
      <div className="service-card-overlay"></div>
      
      <div className="service-content">
        <div className="service-header">
          <span className="service-number">{service.number}</span>
          <span className="service-icon">{service.icon}</span>
          <h3 className="service-title">{service.title}</h3>
        </div>
        <p className="service-description">{service.description}</p>
        <div className="service-details">
          <div className="service-outcome">
            <span className="service-outcome-label">You get</span>
            <p className="service-outcome-text">{service.outcome}</p>
          </div>
          <div className="service-benefits">
            <span className="service-benefits-label">Benefits</span>
            <ul className="service-benefits-list">
              {service.benefits.map((benefit, idx) => (
                <li key={idx}><span className="benefit-icon">✓</span> {benefit}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Services() {
  const services = [
    {
      number: '01',
      title: 'Business Scan',
      // icon: '📋',
      description: 'We perform a comprehensive audit of your entire business – sales, operations, team structure, and cashflow. No assumptions, no vanity metrics.',
      outcome: 'A one‑page diagnosis that pinpoints exactly what\'s killing your growth – not a 50‑slide deck.',
      benefits: ['Unbiased, data‑driven insights', 'Prioritised action list', '30‑min strategy debrief'],
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' // data analytics
    },
    {
      number: '02',
      title: 'Structure Solve',
      // icon: '🏗️',
      description: 'Chaos in roles, no SOPs, every day is a crisis? We redesign your organisational structure and create standard operating procedures that stick.',
      outcome: 'Right people in the right roles, working SOPs, and a clear action plan – you\'ll stop fire‑fighting daily.',
      benefits: ['Clear role definitions', 'Documented SOPs', 'On‑boarding framework'],
      bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' // office/org structure
    },
    {
      number: '03',
      title: 'Strategy Solve',
      // icon: '🗺️',
      description: 'We build a 6–12 month strategic roadmap that aligns your team, finances, and market positioning. Every step is measurable and achievable.',
      outcome: 'A clear, actionable plan – you\'ll know exactly what to do, when to do it, and why.',
      benefits: ['Strategic clarity', 'KPI‑driven milestones', 'Quarterly reviews'],
      bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80' // strategy/roadmap
    },
    {
      number: '04',
      title: 'Scale Partnership',
      // icon: '🤝',
      description: 'We become your growth partner – executing alongside you, training your team, and course‑correcting weekly until you scale independently.',
      outcome: 'A partner in the trenches with you until you can run solo. We grow when you grow.',
      benefits: ['Dedicated partner', 'Weekly execution reviews', 'Scalable systems'],
      bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' // partnership/team
    },
    {
      number: '05',
      title: 'Sales Process Fix',
      // icon: '📈',
      description: 'We analyse your current sales funnel, identify leaks, and redesign your process to convert more leads into paying customers.',
      outcome: 'A repeatable, predictable sales engine that delivers consistent results.',
      benefits: ['Funnel optimisation', 'Sales playbook', 'Team training'],
      bgImage: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80' // sales/chart
    },
    {
      number: '06',
      title: 'Team Performance Lab',
      // icon: '🧠',
      description: 'We assess your team\'s capabilities, design personalised development plans, and implement performance tracking to unlock their full potential.',
      outcome: 'A high‑performing team aligned with your business goals and culture.',
      benefits: ['Competency mapping', 'Coaching programs', 'Performance metrics'],
      bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' // team/development
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="section-header">
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">Services as <span className="gradient-text">Outcomes</span></h2>
          <p className="section-subtitle">
            We don’t just offer services – we deliver measurable, transformative outcomes for your business.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} delay={idx * 100} />
          ))}
        </div>

        <div className="bottom-cta">
          <Link to="/book-session" className="btn-primary">
            Book Your One-on-One Session <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}