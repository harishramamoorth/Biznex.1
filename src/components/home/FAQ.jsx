import React, { useState } from 'react';
import './FAQ.css';

const CATEGORIES = ['All', 'Getting Started', 'Pricing', 'Process', 'Results'];

const faqs = [
    {
        category: 'Getting Started',
        emoji: '🚀',
        q: 'How do I get started with Business Building Company (BBC)?',
        a: 'It starts with a free Business Scan — no credit card, no commitment. We analyse your sales, operations, and cashflow, then give you a one-page diagnosis within 48 hours. From there, you decide if you want to go deeper.',
    },
    {
        category: 'Process',
        emoji: '⏱️',
        q: 'How long does a typical engagement take?',
        a: 'Most clients see tangible, measurable results within the first 90 days. Our Scan is a one-time engagement. Solve and Scale are monthly retainers — we stay until you can run solo and scale independently.',
    },
    {
        category: 'Pricing',
        emoji: '💰',
        q: 'Do you offer custom pricing for larger teams?',
        a: 'Yes. Our listed plans cover most businesses, but for large enterprises or multi-location businesses we create fully custom packages. Contact us and we\'ll have a proposal ready within 24 hours.',
    },
    {
        category: 'Getting Started',
        emoji: '🏭',
        q: 'What industries do you specialise in?',
        a: 'We\'ve worked across SaaS, manufacturing, retail, professional services, and D2C brands. Our diagnostic framework is industry-agnostic — the bottlenecks that kill growth are almost always the same, regardless of sector.',
    },
    {
        category: 'Getting Started',
        emoji: '🎁',
        q: 'Is the free scan really free?',
        a: 'Absolutely. No credit card required, no strings attached. You\'ll receive a comprehensive one-page business health report and a 30-minute strategy call — completely free.',
    },
    {
        category: 'Process',
        emoji: '🤝',
        q: 'Do you work with us hands-on or just advise?',
        a: 'Both — but we lean heavily toward execution. On the Solve and Scale plans we work alongside your team, redesign processes, train people, and do weekly reviews. We\'re not consultants who hand you a deck and disappear.',
    },
    {
        category: 'Results',
        emoji: '📈',
        q: 'What kind of results can we expect?',
        a: 'Our clients typically see 20–40% operational efficiency gains within 90 days, and 2–3× revenue growth within 12 months on the Scale plan. Results vary by starting point, but we document every milestone transparently.',
    },
    {
        category: 'Results',
        emoji: '🔒',
        q: 'Is our business information kept confidential?',
        a: 'Yes, always. We sign an NDA before any engagement begins. Your financials, strategies, and internal data are never shared — full stop.',
    },
    {
        category: 'Pricing',
        emoji: '🔄',
        q: 'Can I cancel or pause my plan anytime?',
        a: 'Yes. Solve and Scale are month-to-month with no lock-in contracts. Cancel or pause anytime with 30 days\' notice. We believe in earning your business every month.',
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