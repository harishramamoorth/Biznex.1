import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ExpansionSystem.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Worried About(2).png';

export default function ExpansionSystem({ isActive, onNext, onPrev, theme: propTheme }) {
  const { theme: globalTheme } = useTheme();
  const theme = propTheme || globalTheme;
  return (
    <div className={`es-slide-container ${isActive ? 'active' : ''}`}>
      <div className="es-slide-card">
      <div className="es-slide-content">
        <div className="es-slide-badge" style={{ background: '#8b5cf618', border: '1px solid #8b5cf640' }}>
          <i className="fas fa-exclamation-circle text-[#8b5cf6]" />
          <span className="text-[#8b5cf6]">Worried About…</span>
        </div>

        <blockquote className="es-slide-question">
          "Can I open another location or expand without creating more chaos?"
        </blockquote>

        <div className="es-slide-num text-[#8b5cf615]">03</div>

        <h1 className="es-slide-title">03 — Expansion System</h1>
        <p className="es-slide-body">
          We build the systems, processes, and execution roadmap that let your business grow into new locations, markets, products, or verticals—without depending on you.
        </p>

        <div className="es-slide-you-get border-l-[#8b5cf6]">
          <div className="es-slide-you-get-tag text-[#8b5cf6]">YOU GET</div>
          <p className="es-slide-you-get-text">A complete expansion playbook with the systems, responsibilities, and milestones required to scale confidently.</p>
        </div>

        <ul className="es-slide-benefits">
          {['Expansion roadmap', 'Standardised operating systems', 'Repeatable growth framework'].map((b, i) => (
            <li key={i} className="es-slide-benefit">
              <span className="es-slide-checkmark" style={{ background: '#8b5cf620', color: '#8b5cf6' }}>
                <i className="fas fa-check" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="es-slide-ctas">
          <Link to="/book-session" className="es-slide-cta-primary bg-[#8b5cf6]" style={{ boxShadow: '0 10px 36px rgba(139,92,246,0.55)' }}>
            Book Free Strategy Call <i className="fas fa-arrow-right" />
          </Link>
          <Link to="/pricing" className="es-slide-cta-ghost">
            View Pricing <i className="fas fa-chevron-right" />
          </Link>
        </div>
      </div>
        <div className="es-slide-image-wrapper">
          <div className="es-image-mockup">
            
            <img src={img} alt="Expansion System" className="es-slide-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
