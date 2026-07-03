import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SCAN_COVERS = [
  {
    icon: 'fa-solid fa-sitemap',
    color: 'blue',
    title: 'Org Structure Review',
    desc: 'Identify hierarchy gaps, redundant roles, and the hidden cost of mis-aligned reporting lines.',
  },
  {
    icon: 'fa-solid fa-filter-circle-dollar',
    color: 'purple',
    title: 'Sales Funnel Leak Audit',
    desc: 'Pinpoint exactly where leads are slipping through the cracks — and what it is costing you monthly.',
  },
  {
    icon: 'fa-solid fa-gears',
    color: 'green',
    title: 'Operations Snapshot',
    desc: 'Surface the top 3 process bottlenecks slowing your team down before they scale the problem.',
  },
  {
    icon: 'fa-solid fa-chart-line',
    color: 'amber',
    title: 'Growth Opportunity Map',
    desc: 'Spot the fastest, lowest-risk lever you can pull in the next 30 days to accelerate revenue.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    color: 'rose',
    title: 'Risk Blind-Spot Check',
    desc: 'Uncover compliance, cash-flow, or key-person dependencies that quietly threaten stability.',
  },
  {
    icon: 'fa-solid fa-road',
    color: 'cyan',
    title: '90-Day Priority Roadmap',
    desc: 'Walk away with a concrete, prioritised action plan — not a generic checklist.',
  },
];

const HOW_IT_WORKS = [
  {
    num: '01',
    icon: 'fa-solid fa-calendar-check',
    title: 'Book Your Free Slot',
    desc: 'Pick any available 30-minute window that fits your schedule. No credit card, no commitment.',
    color: 'blue',
  },
  {
    num: '02',
    icon: 'fa-solid fa-file-invoice',
    title: 'Share Context (2 min)',
    desc: 'Tell us your biggest current challenge so we arrive prepared — not cold.',
    color: 'purple',
  },
  {
    num: '03',
    icon: 'fa-solid fa-video',
    title: 'Live 30-Min Deep Dive',
    desc: 'A senior consultant (not a junior rep) leads the session. We analyse, ask sharp questions, and surface clarity fast.',
    color: 'green',
  },
  {
    num: '04',
    icon: 'fa-solid fa-rocket',
    title: 'Receive Your Action Plan',
    desc: 'Within 24 hours you receive a written priority breakdown tailored to what we uncovered.',
    color: 'amber',
  },
];

const TESTIMONIALS = [
  {
    quote: '"The free scan was more valuable than a consulting report we paid ₹80K for. We had clarity in 30 minutes."',
    name: 'Priya S.',
    role: 'Co-Founder, HealthTech Startup · 28 employees',
    avatar: 'P',
    grad: 'from-pink-500 to-rose-600',
  },
  {
    quote: '"They spotted a ₹3.2L/month operational drain in our logistics process that we had simply normalised."',
    name: 'Arjun M.',
    role: 'MD, Manufacturing Group · 140 employees',
    avatar: 'A',
    grad: 'from-blue-500 to-indigo-600',
  },
  {
    quote: '"No pitch. No upsell pressure. Just a razor-sharp diagnosis. That alone earned my trust."',
    name: 'Kavita R.',
    role: 'CEO, D2C Brand · 55 employees',
    avatar: 'K',
    grad: 'from-purple-500 to-violet-600',
  },
];

const colorMap = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-400',   glow: 'shadow-blue-500/20'   },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500/25',  text: 'text-green-400',  glow: 'shadow-green-500/20'  },
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-400',  glow: 'shadow-amber-500/20'  },
  rose:   { bg: 'bg-rose-500/10',   border: 'border-rose-500/25',   text: 'text-rose-400',   glow: 'shadow-rose-500/20'   },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/25',   text: 'text-cyan-400',   glow: 'shadow-cyan-500/20'   },
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function FreeScan() {
  const [hovered, setHovered] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[80px]" />
      </div>

      {/* ── Grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10">
        {/* ────────────────────────────────────────
            TOP NAV
        ──────────────────────────────────────── */}
        <div className="px-6 pt-8 pb-0 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 group"
            >
              <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">100% Free · No Commitment</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            HERO — ONE-ON-ONE LIVE FREE SCAN
        ════════════════════════════════════════ */}
        <section className="pt-16 pb-10 px-6 max-w-6xl mx-auto">
          {/* ── Eyebrow ── */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/25 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
              </span>
              <span className="text-xs font-extrabold text-blue-300 uppercase tracking-widest">
                One-on-One · Live · Completely Free
              </span>
            </div>
          </div>

          {/* ── Headline ── */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] text-center mb-6">
            Get Your Business{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Free Scan
            </span>{' '}
            Today
          </h1>

          <p className="text-slate-400 text-lg md:text-xl text-center max-w-2xl mx-auto leading-relaxed mb-10">
            A senior consultant sits with you for{' '}
            <span className="text-white font-semibold">30 minutes</span> — live, one-on-one — to
            diagnose your biggest operational and growth bottlenecks. No pitch. No invoice.{' '}
            <span className="text-white font-semibold">Just clarity.</span>
          </p>

          {/* ── Hero CTA Card ── */}
          <div className="relative max-w-3xl mx-auto">
            {/* Glowing border effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-sm" />
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Inner glow top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left: scan icon */}
                <div className="shrink-0">
                  <div className="relative w-28 h-28">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="relative w-28 h-28 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center">
                      <i className="fa-solid fa-stethoscope text-blue-400 text-5xl animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Right: info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                    Business Health Scan
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    A live, structured 30-minute diagnostic with a senior BizNex consultant. We scan
                    your operations, sales flow, and team structure — then hand you a prioritised
                    action plan within 24 hours.
                  </p>

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2.5 justify-center md:justify-start mb-7">
                    {[
                      { icon: 'fa-solid fa-clock',    label: '30 Min Live Session', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'   },
                      { icon: 'fa-solid fa-shield-halved', label: 'NDA Protected',       color: 'text-green-400 bg-green-500/10 border-green-500/20' },
                      { icon: 'fa-solid fa-user-tie', label: 'Senior Consultant',   color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
                      { icon: 'fa-solid fa-tag',      label: 'Zero Cost',           color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                    ].map((b) => (
                      <span
                        key={b.label}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${b.color} shadow-sm`}
                      >
                        <i className={`${b.icon} text-[10px]`} />
                        {b.label}
                      </span>
                    ))}
                  </div>

                  {/* CTA button */}
                  <Link
                    to="/book-session"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.99] group"
                  >
                    <i className="fas fa-calendar-plus" />
                    Book My Free Scan Now
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>

              {/* Bottom micro-trust strip */}
              <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
                {[
                  { icon: 'fa-solid fa-check-circle', color: 'text-green-400',  label: 'No payment required'     },
                  { icon: 'fa-solid fa-ban',          color: 'text-red-400',    label: 'Zero sales pitch'         },
                  { icon: 'fa-solid fa-shield-halved',   color: 'text-blue-400',   label: 'NDA-backed confidentiality' },
                  { icon: 'fa-solid fa-users',        color: 'text-purple-400', label: '100+ businesses diagnosed' },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <div className="w-px h-4 bg-slate-800 hidden sm:block" />}
                    <div className="flex items-center gap-1.5">
                      <i className={`${item.icon} ${item.color}`} />
                      {item.label}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            WHAT WE COVER IN YOUR SCAN
        ════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
              <i className="fas fa-search text-purple-400 text-xs" />
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">What We Scan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              6 Critical Areas Covered in{' '}
              <span style={{ background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                30 Minutes
              </span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              We don't skim the surface. Each area is probed with pointed questions that uncover the root cause — not just the symptom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCAN_COVERS.map((item, idx) => {
              const c = colorMap[item.color];
              const isHov = hovered === idx;
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative group p-6 rounded-2xl border transition-all duration-300 cursor-default ${
                    isHov
                      ? `${c.bg} ${c.border} shadow-xl scale-[1.02]`
                      : 'bg-slate-900/40 border-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <span className="absolute top-4 right-4 text-[10px] font-black text-slate-700 tracking-wider">
                    0{idx + 1}
                  </span>
                  <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <i className={`${item.icon} text-base`} />
                  </div>
                  <h3 className="font-extrabold text-white text-base mb-2 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
              <i className="fas fa-route text-green-400 text-xs" />
              <span className="text-xs font-bold text-green-300 uppercase tracking-widest">Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              How Your Free Scan Works
            </h2>
            <p className="text-slate-400 text-base max-w-lg mx-auto">
              From booking to a written action plan — in under 48 hours.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map((step) => {
                const c = colorMap[step.color];
                return (
                  <div key={step.num} className="flex flex-col items-center text-center group">
                    <div className={`relative w-[104px] h-[104px] rounded-full ${c.bg} border-2 ${c.border} flex flex-col items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${c.text} opacity-60 mb-0.5`}>{step.num}</span>
                      <i className={`fas ${step.icon} text-2xl ${c.text}`} />
                    </div>
                    <h3 className="font-extrabold text-white text-base mb-2 leading-snug">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-[180px] group-hover:text-slate-400 transition-colors">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SOCIAL PROOF
        ════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <i className="fas fa-star text-amber-400 text-xs" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Real Results</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              What Founders Said After Their Scan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-amber-400 text-xs" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-5 group-hover:text-slate-200 transition-colors">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center font-extrabold text-sm text-white shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '100+',  label: 'Businesses Scanned',       icon: 'fa-building', color: 'text-blue-400'   },
              { value: '4.9★', label: 'Average Rating',            icon: 'fa-star',     color: 'text-amber-400'  },
              { value: '₹0',   label: 'Cost to You',               icon: 'fa-tag',      color: 'text-green-400'  },
              { value: '< 24h', label: 'Action Plan Turnaround',   icon: 'fa-bolt',     color: 'text-purple-400' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-center hover:border-slate-700 transition-all">
                <i className={`fas ${s.icon} ${s.color} text-lg mb-2`} />
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            FINAL CTA
        ════════════════════════════════════════ */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 blur-md" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 md:p-16 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

              <div className="relative w-20 h-20 mx-auto mb-7">
                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl animate-pulse" />
                <div className="relative w-20 h-20 bg-blue-500/10 border border-blue-500/25 rounded-2xl flex items-center justify-center">
                  <i className="fas fa-stethoscope text-blue-400 text-3xl" />
                </div>
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3 block">
                Limited Slots — First Come, First Served
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Ready to See What's{' '}
                <span style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Holding You Back?
                </span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                30 minutes. A senior consultant. Zero cost. Walk away knowing exactly what to fix first.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/book-session"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-extrabold text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.99] group"
                >
                  <i className="fas fa-calendar-plus" />
                  Book My Free Scan
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all duration-300"
                >
                  <i className="fas fa-envelope text-xs" />
                  Have a Question First?
                </Link>
              </div>

              <p className="text-center text-[10px] text-slate-600 mt-6">
                <i className="fas fa-lock mr-1 text-slate-700" />
                No payment. No pitch. Fully NDA-protected. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
