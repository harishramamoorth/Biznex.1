import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './StructureSolve.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Worried About(1).png';

export default function StructureSolve({ isActive, onNext, onPrev, theme: propTheme }) {
  const { theme: globalTheme } = useTheme();
  const theme = propTheme || globalTheme;
  return (
    <div className={`ss-slide-container ${isActive ? 'active' : ''}`}>
      <div className="ss-slide-card">
      <div className="ss-slide-content">
        <div className="ss-slide-badge" style={{ background: '#3b82f618', border: '1px solid #3b82f640' }}>
          <i className="fas fa-exclamation-circle text-[#3b82f6]" />
          <span className="text-[#3b82f6]">Worried About…</span>
        </div>

        <blockquote className="ss-slide-question">
          "Why does every important decision still depend on me?"
        </blockquote>

        <div className="ss-slide-num text-[#3b82f615]">02</div>

        <h1 className="ss-slide-title">02 — Structure Solve</h1>
        <p className="ss-slide-body">
          Chaos in roles, no SOPs, every day is a crisis? We redesign your organisational structure and create standard operating procedures that stick.
        </p>

        <div className="ss-slide-you-get border-l-[#3b82f6]">
          <div className="ss-slide-you-get-tag text-[#3b82f6]">YOU GET</div>
          <p className="ss-slide-you-get-text">Right people in the right roles, working SOPs, and a clear action plan—you'll stop fire-fighting daily.</p>
        </div>

        <ul className="ss-slide-benefits">
          {['Clear role definitions', 'Documented SOPs', 'Onboarding framework'].map((b, i) => (
            <li key={i} className="ss-slide-benefit">
              <span className="ss-slide-checkmark" style={{ background: '#3b82f620', color: '#3b82f6' }}>
                <i className="fas fa-check" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="ss-slide-ctas">
          <Link to="/book-session" className="ss-slide-cta-primary bg-[#3b82f6]" style={{ boxShadow: '0 10px 36px rgba(59,130,246,0.55)' }}>
            Book Free Strategy Call <i className="fas fa-arrow-right" />
          </Link>
          <Link to="/pricing" className="ss-slide-cta-ghost">
            View Pricing <i className="fas fa-chevron-right" />
          </Link>
        </div>
      </div>
        <div className="ss-slide-image-wrapper">
          <div className="ss-image-mockup">
            
            <img src={img} alt="Structure Solve" className="ss-slide-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
