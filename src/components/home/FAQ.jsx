import React, { useState } from 'react';
import './FAQ.css';

const CATEGORIES = ['All', 'Getting Started', 'Pricing','Services', 'Process', 'Results', ];

const faqs = [
    {
        category: 'Getting Started',
        emoji: '🚀',
        q: 'How do I know if my business actually needs systems?',
        a: "If you're involved in daily operations, constantly answering the same questions, or your business slows down whenever you're away, it's a sign your business depends on you instead of systems. We help change that.",
    },
    {
        category: 'Process',
        emoji: '⏱️',
        q: 'How does the engagement start?',
        a: 'Every engagement starts with a Business Scan where we assess your operations, sales, team structure, and cashflow to identify your biggest growth bottlenecks.',
    },
    
    {
        category: 'Pricing',
        emoji: '💰',
        q: 'How much does your consulting cost?',
        a: "Pricing depends on the size of your business, project scope, number of locations, and implementation requirements. After the Business Scan, we'll recommend the most suitable engagement.",
    },
    {
        category: 'Services',
        emoji: '🏭',
        q: "What's included in the Business Scan?",
        a:"We review sales, operations, staff responsibilities, cashflow, reporting, customer journey, and operational bottlenecks before providing a prioritized action plan.",
    },
    {
        category: 'Getting Started',
        emoji: '🏭',
        q: "What types of businesses do you work with?",
        a:"We work with growing SMEs, retail chains, manufacturers, distributors, service businesses, restaurants, healthcare providers, and businesses planning expansion or operational improvement.",
    },
    {
        category: 'Getting Started',
        emoji: '🎁',
        q: 'Do you only work with businesses that want to expand?',
        a: "No. Many clients first come to fix operational issues, improve profitability, reduce owner dependency, or build SOPs before thinking about expansion.",
    },
    {
        category: 'Services',
        emoji: '🏭',
        q: "What is Structure Solve?",
        a:"Structure Solve defines roles, responsibilities, reporting lines, and SOPs so your business operates consistently without depending on one person.",
    },
    {
        category: 'Getting Started',
        emoji: '🎁',
        q: 'My business is already profitable. Why would I need consulting?',
        a: "Profit doesn't always mean efficiency. We help profitable businesses scale without creating more complexity or increasing dependence on the owner.",
    },
    {
        category: 'Services',
        emoji: '🏭',
        q: "What is the Expansion System?",
        a:"Our Expansion System helps businesses grow into new locations, markets, products, or business units using repeatable systems instead of trial and error.",
    },
    {
        category: 'Getting Started',
        emoji: '🎁',
        q: 'My business is struggling. Can you still help?',
        a: "Yes. We begin with a Business Scan to identify what's causing the decline before recommending any solutions. The goal is to fix the root cause—not just the symptoms.",
    },
    {
        category: 'Services',
        emoji: '🏭',
        q: "Do you help with hiring and onboarding?",
        a:"Yes. We create hiring processes, interview scorecards, onboarding plans, and role-specific SOPs that improve consistency across your business.",
    },
    {
        category: 'Services',
        emoji: '🏭',
        q: "Can you improve our sales process?",
        a:"Yes. We analyze your sales pipeline, identify conversion bottlenecks, and build a structured sales process your team can consistently follow.",
    },
    {
        category: 'Services',
        emoji: '🏭',
        q: "Do you help improve cashflow?",
        a:"Yes. We identify cash leaks, improve inventory control, optimize payment cycles, and implement weekly cashflow tracking systems.",
    },
    {
        category: 'Process',
        emoji: '🤝',
        q: 'Do you create SOPs from scratch?',
        a: "No. We document and improve the processes you're already using, making them consistent, scalable, and easy for your team to follow.",
    },
    {
        category: 'Process',
        emoji: '🤝',
        q: 'Will you work with my team directly',
        a: "Absolutely. We work closely with business owners, managers, and employees to ensure every system is practical and actually gets implemented.",
    },
    {
        category: 'Process',
        emoji: '🤝',
        q: 'How long does implementation take?',
        a: "Depending on your business size and requirements, implementation typically ranges from 4 to 12 weeks.",
    },
    {
        category: 'Process',
        emoji: '🤝',
        q: 'Do you provide support after implementation?',
        a: "Yes. Through our Scale Partnership, we continue reviewing KPIs, refining systems, and ensuring your team follows the new processes.",
    },
    {
        category: 'Results',
        emoji: '📈',
        q: 'When can I expect to see improvements?',
        a: 'Many clients see operational clarity within the first few weeks, while measurable improvements in efficiency and performance typically appear within 60–90 days, depending on implementation.',
    },
    {
        category: 'Results',
        emoji: '📈',
        q: 'Can you guarantee business growth?',
        a: 'No consultant can ethically guarantee growth. What we guarantee is a structured implementation of proven business systems that improve consistency, accountability, and scalability.',
    },
    {
        category: 'Results',
        emoji: '🔒',
        q: 'Will my business be able to run without me?',
        a: "That's one of our primary goals. We build systems, delegate responsibilities, and establish accountability so your business becomes less dependent on your daily involvement.",
    },
    {
        category: 'Results',
        emoji: '🔒',
        q: 'What makes your consulting different?',
        a: "Most consultants deliver reports. We build practical systems, implement them with your team, and stay involved until they become part of your daily operations.",
    },
    {
        category: 'Results',
        emoji: '🔒',
        q: 'Do you customize solutions for every business?',
        a: "Yes. Every business is different. We adapt our frameworks to your industry, team size, operational model, and growth objectives.",
    },
    {
        category: 'Results',
        emoji: '🔒',
        q: 'How do you measure success?',
        a: "We track improvements using operational KPIs, team accountability, implementation progress, cashflow visibility, customer experience, and business owner dependency.",
    },
    {
        category: 'Pricing',
        emoji: '🔄',
        q: 'Do you offer one-time projects?',
        a: 'Yes. We offer standalone services like Business Scans, SOP development, operational restructuring, and Expansion Systems, as well as long-term partnerships.',
    },
    {
        category: 'Pricing',
        emoji: '🔄',
        q: 'Is there a long-term contract?',
        a: 'Not necessarily. Some projects are completed within a few weeks, while businesses looking for ongoing growth often choose our Scale Partnership.',
    },
    {
        category: 'Pricing',
        emoji: '🔄',
        q: 'Can you work with businesses outside my city?',
        a: 'Yes. We work both remotely and on-site, depending on your project requirements and implementation needs.',
    },
    {
        category: 'Pricing',
        emoji: '🔄',
        q: 'What if my team resists change?',
        a: "That's common. We involve key team members throughout the process, provide training, and build systems that are simple enough for teams to adopt successfully.",
    },
    {
        category: 'Pricing',
        emoji: '🔄',
        q: 'What happens after the Business Scan?',
        a: "You'll receive a clear diagnosis, prioritized recommendations, and a roadmap. You can choose to implement the changes yourself or have us build and implement the systems with your team.",
    },
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);

    const filtered = activeCategory === 'All'
        ? faqs
        : faqs.filter(f => f.category === activeCategory);

    return (
        <section className="faq-section">
            {/* Decorative blobs */}
            <div className="faq-blob faq-blob-1" />
            <div className="faq-blob faq-blob-2" />

            <div className="faq-inner">
                {/* ── Header ── */}
                <div className="faq-header">
                    <div className="faq-label">
                        <span className="faq-label-dot" />
                        FAQ
                    </div>
                    <h2 className="faq-title">
                        Common <span className="faq-title-accent">Questions</span>
                    </h2>
                    <p className="faq-subtitle">
                        Everything you need to know before getting started. Can't find an answer?{' '}
                        <a href="#contact" className="faq-contact-link">Ask us directly →</a>
                    </p>
                </div>

                {/* ── Category tabs ── */}
                <div className="faq-tabs">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`faq-tab${activeCategory === cat ? ' faq-tab-active' : ''}`}
                            onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* ── Accordion ── */}
                <div className="faq-list">
                    {filtered.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div key={idx} className={`faq-item${isOpen ? ' faq-item-open' : ''}`}>
                                <button
                                    className="faq-question"
                                    onClick={() => toggle(idx)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="faq-q-left">
                                        <span className="faq-point" />
                                        <span className="faq-q-text">{faq.q}</span>
                                    </span>
                                    <span className={`faq-chevron${isOpen ? ' faq-chevron-open' : ''}`}>
                                        <i className="fas fa-chevron-down" />
                                    </span>
                                </button>
                                <div className={`faq-answer-wrap${isOpen ? ' faq-answer-visible' : ''}`}>
                                    <div className="faq-answer">
                                        <p>{faq.a}</p>
                                        <span className="faq-category-chip">{faq.category}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="faq-bottom">
                    <div className="faq-bottom-card">
                        <span className="faq-bottom-emoji">💬</span>
                        <div>
                            <h4>Still have questions?</h4>
                            <p>Our team typically responds within 2 hours during business hours.</p>
                        </div>
                        <a href="#contact" className="faq-bottom-btn">
                            Talk to Us <i className="fas fa-arrow-right" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}