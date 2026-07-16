import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './BusinessScan.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Worried About.png';

export default function BusinessScan({ isActive, onNext, onPrev, theme: propTheme }) {
  const { theme: globalTheme } = useTheme();
  const theme = propTheme || globalTheme;
  return (
    <div className={`bs-slide-container ${isActive ? 'active' : ''}`}>
      <div className="bs-slide-card">
      <div className="bs-slide-content">
        <div className="bs-slide-badge" style={{ background: '#10b98118', border: '1px solid #10b98140' }}>
          <i className="fas fa-exclamation-circle text-[#10b981]" />
          <span className="text-[#10b981]">Worried About…</span>
        </div>

        <blockquote className="bs-slide-question">
          "Why isn't my business growing despite working harder every day?"
        </blockquote>

        <div className="bs-slide-num text-[#10b98115]">01</div>

        <h1 className="bs-slide-title">01 — Business Scan</h1>
        <p className="bs-slide-body">
          We perform a comprehensive audit of your entire business—sales, operations, team structure, and cashflow. No assumptions, no vanity metrics.
        </p>

        <div className="bs-slide-you-get border-l-[#10b981]">
          <div className="bs-slide-you-get-tag text-[#10b981]">YOU GET</div>
          <p className="bs-slide-you-get-text">A one-page diagnosis that pinpoints exactly what's killing your growth—not a 50-slide deck.</p>
        </div>

        <ul className="bs-slide-benefits">
          {['Unbiased, data-driven insights', 'Prioritised action list', '30-minute strategy debrief'].map((b, i) => (
            <li key={i} className="bs-slide-benefit">
              <span className="bs-slide-checkmark" style={{ background: '#10b98120', color: '#10b981' }}>
                <i className="fas fa-check" />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="bs-slide-ctas">
          <Link to="/book-session" className="bs-slide-cta-primary bg-[#10b981]" style={{ boxShadow: '0 10px 36px rgba(16,185,129,0.55)' }}>
            Book Free Strategy Call <i className="fas fa-arrow-right" />
          </Link>
          <Link to="/pricing" className="bs-slide-cta-ghost">
            View Pricing <i className="fas fa-chevron-right" />
          </Link>
        </div>
      </div>
        <div className="bs-slide-image-wrapper">
          <div className="bs-image-mockup">
            
            <img src={img} alt="Business Scan" className="bs-slide-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
