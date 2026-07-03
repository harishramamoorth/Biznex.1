import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/binexlogo.png';
import './Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Detect scroll for glass effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const links = [
        { to: '/', label: 'Home' },
        { to: '/process', label: 'Process' },
        { to: '/services', label: 'Services' },
        { to: '/about', label: 'About' },
        { to: '/pricing', label: 'Pricing' },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="BizNex Logo" />
                    </Link>

                    {/* Desktop links */}
                    <div className="navbar-desktop">
                        {links.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.to === '/'}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                {l.label}
                            </NavLink>
                        ))}
                        {/* Free Scan — special highlighted link */}
                        <NavLink
                            to="/free-scan"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''} flex items-center gap-1.5`
                            }
                        >
                            Free Scan
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-green-500/15 border border-green-500/30 text-green-400">
                                Free
                            </span>
                        </NavLink>
                        <Link to="/contact" className="navbar-cta">
                            Contact
                        </Link>
                    </div>

                    {/* Hamburger button */}
                    <button
                        className={`hamburger ${mobileOpen ? 'open' : ''}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile drawer overlay */}
            <div
                className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile drawer */}
            <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
                <div className="mobile-drawer-inner">
                    {links.map((l, i) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === '/'}
                            style={{ animationDelay: `${i * 0.06}s` }}
                            className={({ isActive }) =>
                                `mobile-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setMobileOpen(false)}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    {/* Free Scan mobile link */}
                    <NavLink
                        to="/free-scan"
                        style={{ animationDelay: `${links.length * 0.06}s` }}
                        className={({ isActive }) =>
                            `mobile-link ${isActive ? 'active' : ''} flex items-center gap-2`
                        }
                        onClick={() => setMobileOpen(false)}
                    >
                        Free Scan
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-green-500/15 border border-green-500/30 text-green-400">
                            Free
                        </span>
                    </NavLink>
                    <Link
                        to="/contact"
                        className="mobile-cta"
                        onClick={() => setMobileOpen(false)}
                        style={{ animationDelay: `${(links.length + 1) * 0.06}s` }}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </>
    );
}