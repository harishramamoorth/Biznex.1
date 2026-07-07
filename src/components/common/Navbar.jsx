import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/binexlogo.png';
import './Navbar.css';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useTheme();

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
        { 
            to: '/process', 
            label: 'Journey',
            subLinks: [
                { to: '/process#bottleneck', label: 'Identify the Bottleneck' },
                { to: '/process#framework', label: 'The Framework' },
                { to: '/process#how-we-work', label: 'How We Work' }
            ]
        },
        { 
            to: '/services', 
            label: 'Services',
            subLinks: [
                { to: '/services', label: 'All Capabilities' },
                { to: '/free-scan', label: 'Book a Free Scan' }
            ]
        },
        { 
            to: '/about', 
            label: 'About',
            subLinks: [
                { to: '/about#story', label: 'Our Story' },
                { to: '/about#team', label: 'The Team' },
                { to: '/about#reviews', label: 'Client Reviews' }
            ]
        },
        { to: '/pricing', label: 'Pricing' },
        { 
            to: '/book-session', 
            label: 'Strategy Call', 
            badge: 'New', 
            badgeClass: 'bg-blue-500/15 border-blue-500/30 text-blue-400' 
        },
        { 
            to: '/free-scan', 
            label: 'Free Scan', 
            badge: 'Free', 
            badgeClass: 'bg-green-500/15 border-green-500/30 text-green-400' 
        },
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
                            <div key={l.to} className="relative group">
                                <NavLink
                                    to={l.to}
                                    end={l.to === '/'}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''} ${l.badge ? 'flex items-center gap-1.5' : ''}`
                                    }
                                >
                                    {l.label}
                                    {l.badge && (
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${l.badgeClass}`}>
                                            {l.badge}
                                        </span>
                                    )}
                                    {l.subLinks && (
                                        <svg className="w-3.5 h-3.5 ml-1 inline-block transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    )}
                                </NavLink>
                                
                                {/* Dropdown Menu */}
                                {l.subLinks && (
                                    <div className="dropdown-menu">
                                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 flex flex-col gap-1">
                                            {l.subLinks.map(sub => (
                                                <a 
                                                    key={sub.to}
                                                    href={sub.to}
                                                    className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-white rounded-lg transition-colors flex items-center justify-between group/item"
                                                >
                                                    {sub.label}
                                                    <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-600 dark:text-blue-400">→</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button 
                            onClick={toggleTheme} 
                            className="mr-3 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors duration-200"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-3.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                        <Link to="/contact" className="navbar-cta">
                            Contact
                        </Link>
                    </div>

                    {/* Right-aligned mobile controls */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors duration-200"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-3.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>

                        <button
                            className={`hamburger ${mobileOpen ? 'open' : ''}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <span /><span /><span />
                        </button>
                    </div>
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
                        <div key={l.to} className="flex flex-col">
                            <NavLink
                                to={l.to}
                                end={l.to === '/'}
                                style={{ animationDelay: `${i * 0.06}s` }}
                                className={({ isActive }) =>
                                    `mobile-link ${isActive ? 'active' : ''} ${l.badge ? 'flex items-center gap-2' : ''}`
                                }
                                onClick={() => !l.subLinks && setMobileOpen(false)}
                            >
                                {l.label}
                                {l.badge && (
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${l.badgeClass}`}>
                                        {l.badge}
                                    </span>
                                )}
                            </NavLink>
                            {l.subLinks && (
                                <div className="pl-6 flex flex-col gap-1 mt-1 border-l-2 border-slate-100 dark:border-slate-800 ml-4 mb-2">
                                    {l.subLinks.map(sub => (
                                        <a
                                            key={sub.to}
                                            href={sub.to}
                                            className="mobile-link text-sm py-2 text-slate-500 hover:text-blue-600"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {sub.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        to="/contact"
                        className="mobile-cta"
                        onClick={() => setMobileOpen(false)}
                        style={{ animationDelay: `${links.length * 0.06}s` }}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </>
    );
}