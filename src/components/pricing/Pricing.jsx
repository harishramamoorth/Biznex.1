import { useState } from 'react';
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './Pricing.css';

const PLANS = [
    {
        name: 'Scan',
        emoji: '🔍',
        icon: 'fa-search',
        monthly: { price: '₹4,999', originalPrice: null, period: 'one-time', cta: 'Start Scan - ₹4,999' },
        quarterly: { price: '₹4,999', originalPrice: null, period: 'one-time', cta: 'Start Scan - ₹4,999' },
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
    },
    {
        name: 'Solve',
        emoji: '⚡',
        icon: 'fa-tools',
        monthly: { price: '₹22,499', originalPrice: null, period: 'month', cta: 'Start Solving - ₹22,499' },
        quarterly: { price: '₹33,749', originalPrice: '₹67,497', period: '3 months', cta: 'Start Solving - ₹33,749' },
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
    },
    {
        name: 'Scale',
        emoji: '🚀',
        icon: 'fa-rocket',
        monthly: { price: '₹44,999', originalPrice: null, period: 'month', cta: 'Start Scaling - ₹44,999' },
        quarterly: { price: '₹67,499', originalPrice: '₹134,997', period: '3 months', cta: 'Start Scaling - ₹67,499' },
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
    },
];

export default function Pricing() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [billingCycle, setBillingCycle] = useState('quarterly');

    const openModal = (plan) => {
        setSelectedPlan({ ...plan, ...plan[billingCycle] });
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

                {/* ── Billing Toggle ── */}
                <div className="flex justify-center items-center mb-12">
                    <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full inline-flex flex-wrap sm:flex-nowrap items-center border border-slate-200 dark:border-slate-700 shadow-inner gap-1">
                        <button 
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-md scale-[1.02]' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}
                        >
                            Pay Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('quarterly')}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all duration-300 ${billingCycle === 'quarterly' ? 'bg-blue-600 text-white shadow-md scale-[1.02]' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'}`}
                        >
                            Pay for 3 Months 
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider transition-colors duration-300 border ${billingCycle === 'quarterly' ? 'bg-white/20 text-white border-white/30' : 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-transparent'}`}>
                                Save 50%
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── Cards ── */}
                <div className="pricing-grid">
                    {PLANS.map((plan, idx) => {
                        const currentPlan = plan[billingCycle];
                        return (
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
                            <div className="pc-price-block flex flex-col items-center">
                                {currentPlan.originalPrice && (
                                    <span className="text-slate-400 dark:text-slate-500 line-through text-sm md:text-base mb-1 font-semibold">
                                        {currentPlan.originalPrice}
                                    </span>
                                )}
                                <div>
                                    <span className={`pc-price pc-price-${plan.color}`}>{currentPlan.price}</span>
                                    <span className="pc-period">/ {currentPlan.period}</span>
                                </div>
                                {currentPlan.originalPrice && (
                                    <span className="text-green-500 font-bold text-xs uppercase tracking-wider mt-1 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                        50% Off
                                    </span>
                                )}
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
                            <button
                                onClick={() => openModal(plan)}
                                className={`pc-cta pc-cta-${plan.color}${plan.popular ? ' pc-cta-popular' : ''}`}
                            >
                                <span>{currentPlan.cta}</span>
                                <i className="fas fa-arrow-right pc-cta-arrow" />
                            </button>
                        </div>
                    )})}
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