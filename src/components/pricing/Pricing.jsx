import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './Pricing.css';

const TIERS = [
    {
        id: 'young',
        name: 'Young Entrepreneurs',
        range: '< ₹50L',
        type: 'free',
        content: {
            title: 'Free Business Scan',
            subtitle: "Start on the right foundation.",
            desc: 'For pre-revenue or businesses generating under ₹50L annually. Get a comprehensive strategy without the upfront cost.',
            features: [
                { icon: '📞', text: '30-minute Strategy Session' },
                { icon: '📊', text: 'Business Model Review' },
                { icon: '🔍', text: 'Growth Bottleneck Assessment' },
                { icon: '🎯', text: 'Action Plan for First ₹1 Crore' }
            ],
            note: 'Limited to 10 spots/month',
            cta: 'Apply for Free Scan',
            link: '/book-session'
        }
    },
    {
        id: 'growing',
        name: 'Growing',
        range: '₹50L – ₹5Cr',
        type: 'paid',
        plans: [
            {
                name: 'Scan', color: 'cyan', price: '₹4,999', duration: '7 Days', popular: false, cta: 'Start Scan - ₹4,999',
                desc: 'Identify the exact leaks in your business model.',
                features: [
                    { icon: '📊', text: '360° Business Audit' },
                    { icon: '🔄', text: 'Sales, Ops & Cashflow Review' },
                    { icon: '📄', text: 'Growth Bottleneck Report' },
                    { icon: '📞', text: 'Strategy Session' }
                ]
            },
            {
                name: 'Solve', color: 'blue', price: '₹49,000', duration: '90 Days', popular: true, cta: 'Start Solving - ₹49,000',
                desc: 'Implement the systems needed to fix operations and cashflow.',
                features: [
                    { icon: '🏗️', text: 'Structure Solve' },
                    { icon: '📋', text: 'SOP Documentation' },
                    { icon: '💰', text: 'Cashflow Control System' },
                    { icon: '🗺️', text: 'Growth Blueprint' },
                    { icon: '📅', text: 'Weekly Implementation Reviews' }
                ]
            },
            {
                name: 'Scale', color: 'violet', price: '₹99,000', duration: '12 Months', popular: false, cta: 'Start Scaling - ₹99,000',
                desc: 'A full year of partnership for exponential growth.',
                features: [
                    { icon: '📈', text: 'Monthly Strategy Reviews' },
                    { icon: '📊', text: 'KPI Dashboard' },
                    { icon: '🏪', text: 'Store Expansion Support' },
                    { icon: '🔄', text: 'Continuous SOP Improvement' }
                ]
            }
        ]
    },
    {
        id: 'scaling',
        name: 'Scaling',
        range: '₹5Cr – ₹15Cr',
        type: 'paid',
        plans: [
            {
                name: 'Scan', color: 'cyan', price: '₹9,999', duration: '7 Days', popular: false, cta: 'Start Scan - ₹9,999',
                desc: 'Deep multi-department audit to prepare for scale.',
                features: [
                    { icon: '🏢', text: 'Multi-Department Audit' },
                    { icon: '👥', text: 'Team Assessment' },
                    { icon: '📈', text: 'Growth Readiness Report' },
                    { icon: '👔', text: 'Executive Strategy Workshop' }
                ]
            },
            {
                name: 'Solve', color: 'blue', price: '₹1,25,000', duration: '90 Days', popular: true, cta: 'Start Solving - ₹1,25,000',
                desc: 'Restructure leadership and build robust operational systems.',
                features: [
                    { icon: '📋', text: 'Department SOPs' },
                    { icon: '🏗️', text: 'Leadership Structure' },
                    { icon: '⚙️', text: 'Sales & Operations Systems' },
                    { icon: '🤝', text: 'Hiring Framework' },
                    { icon: '📅', text: 'Weekly Progress Reviews' }
                ]
            },
            {
                name: 'Scale', color: 'violet', price: '₹2,49,000', duration: '12 Months', popular: false, cta: 'Start Scaling - ₹2,49,000',
                desc: 'Long-term partnership for multi-location expansion.',
                features: [
                    { icon: '👔', text: 'Monthly Leadership Reviews' },
                    { icon: '🗺️', text: 'Expansion Planning' },
                    { icon: '📊', text: 'Performance Dashboard' },
                    { icon: '📍', text: 'Multi-Location Rollout Support' }
                ]
            }
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        range: '₹15Cr+',
        type: 'paid',
        plans: [
            {
                name: 'Scan', color: 'cyan', price: '₹19,999', duration: '7 Days', popular: false, cta: 'Start Scan - ₹19,999',
                desc: 'Comprehensive enterprise evaluation for corporate readiness.',
                features: [
                    { icon: '🏢', text: 'Enterprise Business Audit' },
                    { icon: '🗣️', text: 'Leadership Interviews' },
                    { icon: '🔄', text: 'Process Mapping' },
                    { icon: '📈', text: 'Scale Readiness Report' }
                ]
            },
            {
                name: 'Solve', color: 'blue', prefix: 'Starting at', price: '₹2,50,000', duration: '90 Days', popular: true, cta: 'Start Solving',
                desc: 'Total business transformation and cross-functional synergy.',
                features: [
                    { icon: '🏗️', text: 'Enterprise SOP Framework' },
                    { icon: '🚀', text: 'Business Transformation' },
                    { icon: '🚪', text: 'Owner Exit Roadmap' },
                    { icon: '⚙️', text: 'Cross-Functional Systems' }
                ]
            },
            {
                name: 'Scale', color: 'violet', prefix: 'Starting at', price: '₹5,00,000', duration: '12 Months', popular: false, cta: 'Start Scaling',
                desc: 'Board-level advisory and continuous operational excellence.',
                features: [
                    { icon: '👔', text: 'Dedicated Consultant' },
                    { icon: '📊', text: 'Board-Level Reviews' },
                    { icon: '🏪', text: 'Franchise Readiness' },
                    { icon: '🤝', text: 'Enterprise Growth Partnership' },
                    { icon: '🌟', text: 'Continuous Operational Excellence' }
                ]
            }
        ]
    }
];

export default function Pricing() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [activeTierIdx, setActiveTierIdx] = useState(1); // Default to 'Growing'
    const [animating, setAnimating] = useState(false);

    const activeTier = TIERS[activeTierIdx];

    const openModal = (plan) => {
        setSelectedPlan({ ...plan });
        setModalOpen(true);
    };

    const handleTierChange = (idx) => {
        if (idx === activeTierIdx) return;
        setAnimating(true);
        setTimeout(() => {
            setActiveTierIdx(idx);
            setAnimating(false);
        }, 300); // Wait for fade out
    };

    return (
        <section id="pricing" className="pricing-section">
            <div className="pricing-bg-elements">
                <div className="pricing-bg-blob blur-3xl opacity-30 bg-blue-500 w-96 h-96 absolute top-0 -left-20 rounded-full animate-blob"></div>
                <div className="pricing-bg-blob blur-3xl opacity-30 bg-purple-500 w-96 h-96 absolute bottom-0 -right-20 rounded-full animate-blob animation-delay-2000"></div>
            </div>

            <div className="pricing-inner relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Transparent Pricing for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Every Stage of Growth</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Select your current annual turnover to reveal the strategic plans tailored perfectly to your scale.
                    </p>
                </div>

                {/* Segmented Control */}
                <div className="flex justify-center mb-16 px-4">
                    <div className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex flex-wrap md:flex-nowrap justify-center gap-2 max-w-full relative">
                        {TIERS.map((tier, idx) => (
                            <button
                                key={tier.id}
                                onClick={() => handleTierChange(idx)}
                                className={`relative px-6 py-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 min-w-[140px] md:min-w-[180px]
                                    ${activeTierIdx === idx ? 'text-blue-700 dark:text-blue-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                            >
                                {activeTierIdx === idx && (
                                    <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-sm border border-blue-100 dark:border-blue-800/50 -z-10 animate-fade-in"></div>
                                )}
                                <span className="font-bold text-lg mb-1">{tier.name}</span>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${activeTierIdx === idx ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                    {tier.range}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className={`transition-opacity duration-300 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} px-4`}>

                    {activeTier.type === 'free' ? (
                        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-[1px] shadow-2xl">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

                                <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                                    <div className="flex-1">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            {activeTier.content.note}
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                                            {activeTier.content.title}
                                        </h3>
                                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg">
                                            {activeTier.content.desc}
                                        </p>

                                        <ul className="space-y-4 mb-8">
                                            {activeTier.content.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                                        <i className="fas fa-check text-xs"></i>
                                                    </div>
                                                    {f.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-full md:w-auto shrink-0 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                        <div className="text-6xl mb-6">🌱</div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeTier.content.subtitle}</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">100% Free • No commitments</p>
                                        <Link to={activeTier.content.link} className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all hover:-translate-y-1">
                                            {activeTier.content.cta}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {activeTier.plans.map((plan, idx) => (
                                <div key={idx} className={`pricing-card pc-${plan.color} ${plan.popular ? 'pc-popular' : ''} flex flex-col`}>
                                    <div className="pc-glow"></div>

                                    {plan.popular && (
                                        <div className="pc-badge">Most Popular</div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm h-10">{plan.desc}</p>
                                    </div>

                                    <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                                        <div className="flex flex-col items-start gap-1 mb-4">
                                            {plan.prefix && (
                                                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">{plan.prefix}</span>
                                            )}
                                            <span className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br drop-shadow-sm ${plan.color === 'cyan' ? 'from-teal-400 to-cyan-500 dark:from-teal-300 dark:to-cyan-400' :
                                                    plan.color === 'blue' ? 'from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400' :
                                                        plan.color === 'violet' ? 'from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400' :
                                                            'from-slate-700 to-slate-900 dark:from-slate-100 dark:to-slate-300'
                                                }`}>
                                                {plan.price}
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                                            <i className="far fa-clock"></i> Duration: {plan.duration}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">What's Included</h4>
                                        <ul className="space-y-3 mb-10">
                                            {plan.features.map((f, i) => (
                                                <li key={i} className="flex gap-3 items-center text-slate-700 dark:text-slate-300 text-sm font-medium group/item">
                                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm border transition-all group-hover/item:scale-110
                                                        ${plan.color === 'cyan' ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-800' :
                                                            plan.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800' :
                                                                'bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800'
                                                        }`}>
                                                        {f.icon}
                                                    </div>
                                                    <span className="leading-tight">{f.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => openModal(plan)}
                                        className={`pc-cta pc-cta-${plan.color} ${plan.popular ? 'pc-cta-popular' : ''}`}
                                    >
                                        {plan.cta}
                                        <i className="fas fa-arrow-right pc-cta-arrow"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer note */}
                <div className="text-center mt-16 text-sm text-slate-500 dark:text-slate-500">
                    <i className="fas fa-shield-alt mr-2" />
                    Prices listed in Indian Rupees (₹) · Custom enterprise solutions available upon request.
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