import { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './Pricing.css';

const PLANS = [
    {
        name: 'Scan',
        emoji: '🔍',
        icon: 'fa-search',
        price: '₹4,999',
        period: 'one-time',
        desc: 'Full business diagnosis – no guesswork',
        color: 'cyan',
        features: [
            { icon: '📊', text: '360° audit of sales, ops & cashflow' },
            { icon: '🔎', text: 'Leak identification report' },
            { icon: '📄', text: 'One‑page strategic summary' },
            { icon: '📞', text: '30‑min strategy call with our team' },
            { icon: '✅', text: 'Actionable priority list' },
        ],
        popular: false,
        cta: 'Start Scan',
    },
    {
        name: 'Solve',
        emoji: '⚡',
        icon: 'fa-tools',
        price: '₹14,999',
        period: 'month',
        desc: 'Fix what\'s broken, fast',
        color: 'blue',
        features: [
            { icon: '🏗️', text: 'Org structure redesign' },
            { icon: '📋', text: 'SOP creation & documentation' },
            { icon: '💼', text: 'Sales process overhaul' },
            { icon: '📅', text: 'Weekly progress reviews' },
            { icon: '🎓', text: 'Team training sessions' },
            { icon: '💬', text: 'Priority email support' },
        ],
        popular: true,
        cta: 'Start Solving',
    },
    {
        name: 'Scale',
        emoji: '🚀',
        icon: 'fa-rocket',
        price: '₹29,999',
        period: 'month',
        desc: 'Full‑scale partnership for exponential growth',
        color: 'violet',
        features: [
            { icon: '✨', text: 'All Solve features' },
            { icon: '🤝', text: 'Dedicated account partner' },
            { icon: '📈', text: 'Monthly board‑level review' },
            { icon: '♾️', text: 'Unlimited direct support' },
            { icon: '📡', text: 'Real‑time growth dashboard' },
            { icon: '🌐', text: 'Access to our network of experts' },
        ],
        popular: false,
        cta: 'Start Scaling',
    },
];


export default function Pricing() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [hovered, setHovered] = useState(null);

    const openModal = (plan) => {
        setSelectedPlan(plan);
        setModalOpen(true);
    };

    return (
        <section id="pricing" className="pricing-section">
            {/* Background orbs */}
            <div className="pricing-orb pricing-orb-1" />
            <div className="pricing-orb pricing-orb-2" />
            <div className="pricing-orb pricing-orb-3" />

            <div className="pricing-inner">
                {/* ── Header ── */}
                <div className="pricing-header">
                    <div className="pricing-label">
                        <span className="pricing-label-dot" />
                        Investment
                    </div>
                    <h2 className="pricing-title">Choose your path</h2>
                    <p className="pricing-subtitle">
                        Transparent pricing. No hidden fees.<br />
                        Start with a free business scan.
                    </p>
                </div>

                {/* ── Free Scan Horizontal Banner ── */}
                <div className="relative max-w-4xl mx-auto mb-16 px-4 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-indigo-500 rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-green-200/50 dark:border-green-700/50 shadow-[0_0_30px_rgba(34,197,94,0.1)] dark:shadow-[0_0_40px_rgba(34,197,94,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start mb-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-green-500/10 border border-green-500/30 text-green-500 dark:text-green-400">
                                    🎁 Free Offer
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/10 border border-blue-500/30 text-blue-500 dark:text-blue-400">
                                    ⏱️ 30-Min Session
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                                Start with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Free Business Scan</span>
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-xl">
                                Diagnose your biggest sales, operations, and cashflow bottlenecks live with a senior consultant. Walk away with a written 90-day action plan.
                            </p>
                        </div>
                        <div className="shrink-0 w-full md:w-auto text-center">
                            <Link
                                to="/free-scan"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:scale-105"
                            >
                                Book Free Scan
                                <i className="fas fa-arrow-right" />
                            </Link>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">No payment info required · NDA-Protected</p>
                        </div>
                    </div>
                </div>

                {/* ── Cards ── */}
                <div className="pricing-grid">
                    {PLANS.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`pricing-card pc-${plan.color}${plan.popular ? ' pc-popular' : ''}${hovered === idx ? ' pc-hovered' : ''}`}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Glow layer */}
                            <div className="pc-glow" />

                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="pc-badge">
                                    <span>⭐ Most Popular</span>
                                </div>
                            )}

                            {/* Plan icon */}
                            <div className={`pc-icon-wrap pc-icon-${plan.color}`}>
                                <span className="pc-emoji">{plan.emoji}</span>
                            </div>

                            {/* Plan name & desc */}
                            <h3 className="pc-name">{plan.name}</h3>
                            <p className="pc-desc">{plan.desc}</p>

                            {/* Price */}
                            <div className="pc-price-block">
                                <span className={`pc-price pc-price-${plan.color}`}>{plan.price}</span>
                                <span className="pc-period">/ {plan.period}</span>
                            </div>

                            {/* Divider */}
                            <div className={`pc-divider pc-divider-${plan.color}`} />

                            {/* Features */}
                            <ul className="pc-features">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="pc-feature-item">
                                        <span className="pc-feature-emoji">{f.icon}</span>
                                        <span>{f.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            {plan.to ? (
                                <Link
                                    to={plan.to}
                                    className={`pc-cta pc-cta-${plan.color} block text-center`}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                                >
                                    <span>{plan.cta}</span>
                                    <i className="fas fa-arrow-right pc-cta-arrow" />
                                </Link>
                            ) : (
                                <button
                                    onClick={() => openModal(plan)}
                                    className={`pc-cta pc-cta-${plan.color}${plan.popular ? ' pc-cta-popular' : ''}`}
                                >
                                    <span>{plan.cta}</span>
                                    <i className="fas fa-arrow-right pc-cta-arrow" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Footer note ── */}
                <div className="pricing-note">
                    <i className="fas fa-shield-alt" />
                    <span>All plans are priced in Indian Rupees (₹) · Free 30-min discovery call included · Custom enterprise pricing available</span>
                </div>
            </div>

            <PaymentModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setSelectedPlan(null); }}
                plan={selectedPlan}
            />
        </section>
    );
}