import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CashflowControl.css';
import { Link } from 'react-router-dom';
import img from '../../assets/Worried About(3).png';

export default function CashflowControl({ isActive, onNext, onPrev, theme: propTheme }) {
  const { theme: globalTheme } = useTheme();
  const theme = propTheme || globalTheme;
  return (
    <div className={`cc-slide-container ${isActive ? 'active' : ''}`}>
      <div className="cc-slide-card">
        <div className="cc-slide-content">
          <div className="cc-slide-badge" style={{ background: '#f59e0b18', border: '1px solid #f59e0b40' }}>
            <i className="fas fa-exclamation-circle text-[#f59e0b]" />
            <span className="text-[#f59e0b]">Worried About…</span>
          </div>

          <blockquote className="cc-slide-question">
            "Where is my money actually leaking every month?"
          </blockquote>

          <div className="cc-slide-num text-[#f59e0b15]">04</div>

          <h1 className="cc-slide-title">04 — Cashflow Control System</h1>
          <p className="cc-slide-body">
            We identify hidden cash leaks, improve inventory flow, and install a simple cashflow system your team updates every week.
          </p>

          <div className="cc-slide-you-get border-l-[#f59e0b]">
            <div className="cc-slide-you-get-tag text-[#f59e0b]">YOU GET</div>
            <p className="cc-slide-you-get-text">Complete visibility of your cash position—before problems become emergencies.</p>
          </div>

          <ul className="cc-slide-benefits">
            {['Weekly cashflow dashboard', 'Inventory-to-cash control', 'Early warning system'].map((b, i) => (
              <li key={i} className="cc-slide-benefit">
                <span className="cc-slide-checkmark" style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                  <i className="fas fa-check" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="cc-slide-ctas">
            <Link to="/book-session" className="cc-slide-cta-primary bg-[#f59e0b]" style={{ boxShadow: '0 10px 36px rgba(245,158,11,0.55)' }}>
              Book Free Strategy Call <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/pricing" className="cc-slide-cta-ghost">
              View Pricing <i className="fas fa-chevron-right" />
            </Link>
          </div>
        </div>
        <div className="cc-slide-image-wrapper">
          <div className="cc-image-mockup">
            
            <img src={img} alt="Cashflow Control" className="cc-slide-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
