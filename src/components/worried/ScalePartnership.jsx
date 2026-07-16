import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ScalePartnership.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Worried About(4).png';

export default function ScalePartnership({ isActive, onNext, onPrev, theme: propTheme }) {
  const { theme: globalTheme } = useTheme();
  const theme = propTheme || globalTheme;
  return (
    <div className={`sp-slide-container ${isActive ? 'active' : ''}`}>
      <div className="sp-slide-card">
        <div className="sp-slide-content">
          <div className="sp-slide-badge" style={{ background: '#06b6d418', border: '1px solid #06b6d440' }}>
            <i className="fas fa-exclamation-circle text-[#06b6d4]" />
            <span className="text-[#06b6d4]">Worried About…</span>
          </div>

          <blockquote className="sp-slide-question">
            "Who's going to make sure all these systems actually get implemented?"
          </blockquote>

          <div className="sp-slide-num text-[#06b6d415]">05</div>

          <h1 className="sp-slide-title">05 — Scale Partnership</h1>
          <p className="sp-slide-body">
            We become your growth partner—executing alongside you, training your team, and course-correcting weekly until you scale independently.
          </p>

          <div className="sp-slide-you-get border-l-[#06b6d4]">
            <div className="sp-slide-you-get-tag text-[#06b6d4]">YOU GET</div>
            <p className="sp-slide-you-get-text">A partner in the trenches with you until your business runs on systems—not your presence.</p>
          </div>

          <ul className="sp-slide-benefits">
            {['Weekly KPI reviews', 'Implementation support', 'Continuous improvement'].map((b, i) => (
              <li key={i} className="sp-slide-benefit">
                <span className="sp-slide-checkmark" style={{ background: '#06b6d420', color: '#06b6d4' }}>
                  <i className="fas fa-check" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="sp-slide-ctas">
            <Link to="/book-session" className="sp-slide-cta-primary bg-[#06b6d4]" style={{ boxShadow: '0 10px 36px rgba(6,182,212,0.55)' }}>
              Book Free Strategy Call <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/pricing" className="sp-slide-cta-ghost">
              View Pricing <i className="fas fa-chevron-right" />
            </Link>
          </div>
        </div>
        <div className="sp-slide-image-wrapper">
          <div className="sp-image-mockup">
            
            <img src={img} alt="Scale Partnership" className="sp-slide-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
