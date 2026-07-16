import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './OwnerExitPlan.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Worried About((5).png';

export default function OwnerExitPlan({ isActive, onNext, onPrev, theme: propTheme }) {
  const { theme: globalTheme } = useTheme();
  const theme = propTheme || globalTheme;
  return (
    <div className={`op-slide-container ${isActive ? 'active' : ''}`}>
      <div className="op-slide-card">
        <div className="op-slide-content">
          <div className="op-slide-badge" style={{ background: '#ec489918', border: '1px solid #ec489940' }}>
            <i className="fas fa-exclamation-circle text-[#ec4899]" />
            <span className="text-[#ec4899]">Worried About…</span>
          </div>

          <blockquote className="op-slide-question">
            "Can my business run for two weeks without me?"
          </blockquote>

          <div className="op-slide-num text-[#ec489915]">06</div>

          <h1 className="op-slide-title">06 — Owner Exit Plan</h1>
          <p className="op-slide-body">
            We identify every decision that depends on you and systematically transfer ownership through SOPs, delegation, and management systems.
          </p>

          <div className="op-slide-you-get border-l-[#ec4899]">
            <div className="op-slide-you-get-tag text-[#ec4899]">YOU GET</div>
            <p className="op-slide-you-get-text">A practical roadmap that gradually removes you from daily operations while keeping the business growing.</p>
          </div>

          <ul className="op-slide-benefits">
            {['Delegation roadmap', 'Decision ownership matrix', 'Business independence milestone'].map((b, i) => (
              <li key={i} className="op-slide-benefit">
                <span className="op-slide-checkmark" style={{ background: '#ec489920', color: '#ec4899' }}>
                  <i className="fas fa-check" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="op-slide-ctas">
            <Link to="/book-session" className="op-slide-cta-primary bg-[#ec4899]" style={{ boxShadow: '0 10px 36px rgba(236,72,153,0.55)' }}>
              Book Free Strategy Call <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/pricing" className="op-slide-cta-ghost">
              View Pricing <i className="fas fa-chevron-right" />
            </Link>
          </div>
        </div>
        <div className="op-slide-image-wrapper">
          <div className="op-image-mockup">
            
            <img src={img} alt="Owner Exit Plan" className="op-slide-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
