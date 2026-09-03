import { Link } from 'react-router-dom';
import logo from '../../assets/Bbc logo.png';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="premium-footer">
            {/* Glowing background orbs */}
            <div className="footer-orb footer-orb-left"></div>
            <div className="footer-orb footer-orb-right"></div>
            <div className="footer-orb footer-orb-center"></div>

            <div className="footer-inner">

                {/* ── Newsletter Banner ── */}
                <div className="footer-newsletter">
                    <div className="footer-newsletter-text">
                        <div className="footer-badge">
                            <i className="fas fa-shield-alt"></i>
                            <span>Trusted by 200+ businesses</span>
                        </div>
                        <h3>Stay ahead of the curve</h3>
                        <p>Get weekly insights on growth strategy, operations &amp; scaling.</p>
                    </div>
                    <form className="footer-newsletter-form" onSubmit={e => e.preventDefault()}>
                        <div className="input-wrapper">
                            <i className="fas fa-envelope input-icon"></i>
                            <input type="email" placeholder="Enter your email address" />
                        </div>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                {/* ── Divider ── */}
                <div className="footer-divider"></div>

                {/* ── Main Grid ── */}
                <div className="footer-grid">

                    {/* Brand Column */}
                    <div className="footer-brand">
                        <img src={logo} alt="Business Building Company (BBC) Logo" className="footer-logo" />
                        <p className="footer-tagline">
                            Business Building Company (BBC) helps businesses identify growth bottlenecks, solve operational chaos, and scale systems with precision.
                        </p>
                       
                    </div>

                    {/* Company Column */}
                    <div className="footer-col">
                        <h4 className="footer-col-heading">
                            <span className="footer-col-accent accent-blue"></span>
                            Company
                        </h4>
                        <ul>
                            <li><Link to="/about" className="footer-link"><span className="link-emoji">🏢</span>About Us</Link></li>
                            <li><Link to="/worried-about" className="footer-link"><span className="link-emoji">⚙️</span>Our Services</Link></li>
                            <li><Link to="/pricing" className="footer-link"><span className="link-emoji">💎</span>Pricing Plans</Link></li>
                            <li><Link to="/careers" className="footer-link"><span className="link-emoji">🚀</span>Careers</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="footer-col">
                        <h4 className="footer-col-heading">
                            <span className="footer-col-accent accent-violet"></span>
                            Resources
                        </h4>
                        <ul>
                            <li><Link to="/process" className="footer-link"><span className="link-emoji">🔄</span>How We Work</Link></li>
                            <li><a href="#" className="footer-link"><span className="link-emoji">📝</span>Blog &amp; Insights</a></li>
                            <li><a href="#" className="footer-link"><span className="link-emoji">📊</span>Case Studies</a></li>
                            <li><a href="#" className="footer-link"><span className="link-emoji">📚</span>Documentation</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-col">
                        <h4 className="footer-col-heading">
                            <span className="footer-col-accent accent-emerald"></span>
                            Contact
                        </h4>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="contact-icon">📧</span>
                                <a href="mailto:hello@biznex." className="footer-link">*******@gmail.com</a>
                            </li>
                            <li>
                                <span className="contact-icon">📞</span>
                                <a href="tel:+1234567890" className="footer-link">+91 #########</a>
                            </li>
                            <li>
                                <span className="contact-icon">📍</span>
                                <span className="text-slate-400">#######</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="footer-divider"></div>

                {/* ── Bottom Bar ── */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        © 2026 Business Building Company (BBC). All rights reserved. Built with <i className="fas fa-heart" style={{ color: '#ef4444' }}></i> by <strong>Mrg Engineering</strong>
                    </p>
                    <div className="footer-legal">
                        <a href="#" className="footer-legal-link">Privacy Policy</a>
                        <span className="footer-dot">·</span>
                        <a href="#" className="footer-legal-link">Terms of Service</a>
                        <span className="footer-dot">·</span>
                        <a href="#" className="footer-legal-link">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}