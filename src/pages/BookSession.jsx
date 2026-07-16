import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TIME_SLOTS = [
  { time: '09:30 AM', period: 'Morning'        },
  { time: '11:00 AM', period: 'Morning'        },
  { time: '01:30 PM', period: 'Afternoon'      },
  { time: '03:00 PM', period: 'Afternoon'      },
  
  { time: '04:30 PM', period: 'Late Afternoon' },
];

// Deterministic per-date slot availability — seeded by date so it's
// consistent on refresh but differs across every calendar day.
function getBookedSlotsForDate(date) {
  if (!date) return new Set();
  // Simple LCG seeded by year+month+day
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  let s = seed;
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.abs(s) / 0xffffffff; };
  const booked = new Set();
  // Each slot independently has ~45% chance of being booked
  TIME_SLOTS.forEach((slot, i) => { if (rand() < 0.45) booked.add(slot.time); });
  // Always guarantee at least 1 available slot so a date is never impossible to book
  if (booked.size === TIME_SLOTS.length) booked.delete(TIME_SLOTS[Math.floor(rand() * TIME_SLOTS.length)].time);
  return booked;
}

// A day is "calendar-fully-booked" if every single slot is taken (rare)
const isDayFullyBookedBySlots = (date) => getBookedSlotsForDate(date).size === TIME_SLOTS.length;

const FEATURES = [
  {
    icon: 'fa-search',
    color: 'blue',
    title: '360° Bottleneck Audit',
    desc: 'Deep-dive into org structure, roles, SOPs, and sales processes to pinpoint every growth inhibitor.'
  },
  {
    icon: 'fa-route',
    color: 'purple',
    title: 'Custom Growth Roadmap',
    desc: 'Walk away with a 90-day action plan tailored to your specific team size, market, and stage.'
  },
  {
    icon: 'fa-shield-alt',
    color: 'green',
    title: 'Full NDA Confidentiality',
    desc: 'Every word stays between us. Financials, strategy, and operational data — fully protected.'
  },
  {
    icon: 'fa-clock',
    color: 'amber',
    title: '30 Minutes. High Signal.',
    desc: 'No fluff. No pitches. Pure strategic clarity that most owners never get without a ₹50K retainer.'
  }
];

const STEPS = [
  { num: 1, label: 'Pick Your Slot' },
  { num: 2, label: 'Your Details' },
  { num: 3, label: 'Confirmed' },
];

const colorMap = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   text: 'text-blue-400'   },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500/20',  text: 'text-green-400'  },
  amber:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  text: 'text-amber-400'  },
};

export default function BookSession() {
  const [selectedDate,  setSelectedDate]  = useState(null);
  const [bookingStep,   setBookingStep]   = useState(1);
  const [selectedTime,  setSelectedTime]  = useState(null);
  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [formData,      setFormData]      = useState({ name: '', email: '', company: '', focus: '', platform: 'Google Meet' });
  const dates = []; // backward-compat placeholder

  // ── Calendar state ──
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-indexed

  // No static demo list — availability is computed per-date via getBookedSlotsForDate()

  // Build calendar grid: array of Date|null (nulls = leading empty cells)
  const buildCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null); // leading blanks
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  };

  const calCells  = buildCalendar(calYear, calMonth);
  const monthName = new Date(calYear, calMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  const isDayBooked   = (date) => isDayFullyBookedBySlots(date);
  const isDayWeekend  = (date) => date.getDay() === 0 || date.getDay() === 6;
  const isDayPast     = (date) => date < today;
  const isDayDisabled = (date) => isDayPast(date) || isDayWeekend(date) || isDayBooked(date);
  const isDaySelected = (date) => selectedDate && date.toDateString() === selectedDate.toDateString();

  // Slots booked for the currently selected date
  const bookedSlotsForDay = selectedDate ? getBookedSlotsForDate(selectedDate) : new Set();
  const availableCount = TIME_SLOTS.length - bookedSlotsForDay.size;

  // Keep previously generated dates array for backward-compat (not rendered anymore)
  useEffect(() => {
    setSelectedDate(null);
  }, []);


  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const formatShortDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleBook = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingStep(3);
    }, 1800);
  };

  const isFormValid = () =>
    formData.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.company.trim().length > 1;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden">
      {/* ── Ambient background glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/6 rounded-full blur-[80px]" />
      </div>

      {/* ── Subtle grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10">
        {/* ── Top nav bar ── */}
        <div className="px-6 pt-8 pb-0 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors duration-200 group">
              <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">Slots Available This Week</span>
            </div>
          </div>
        </div>

        {/* ── Hero header ── */}
        <div className="pt-14 pb-12 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <i className="fas fa-user-tie text-blue-400 text-xs" />
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">One-on-One Strategy Session</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            30 Minutes That Could{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Change Your Business
            </span>
          </h1>
          <p className="mt-5 text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Sit down privately with our senior consulting team. We scan your operations, surface the real bottlenecks, and hand you a clear path forward — no fluff, no pitch.
          </p>

          {/* Trust bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-green-400" />
              <span>Zero commitment required</span>
            </div>
            <div className="w-px h-4 bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <i className="fas fa-lock text-blue-400" />
              <span>NDA-backed confidentiality</span>
            </div>
            <div className="w-px h-4 bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <i className="fas fa-users text-purple-400" />
              <span>100+ businesses diagnosed</span>
            </div>
            <div className="w-px h-4 bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <i className="fas fa-star text-amber-400" />
              <span>Senior consultant, not a junior rep</span>
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        {bookingStep !== 3 ? (
          <div className="px-6 pb-24 max-w-6xl mx-auto">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-0 mb-10">
              {STEPS.map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-all duration-300 ${
                        bookingStep === s.num
                          ? 'bg-blue-600 border-blue-500 text-slate-900 dark:text-white shadow-lg shadow-blue-500/30 scale-110'
                          : bookingStep > s.num
                          ? 'bg-green-600 border-green-500 text-slate-900 dark:text-white'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      {bookingStep > s.num ? <i className="fas fa-check text-xs" /> : s.num}
                    </div>
                    <span className={`mt-1.5 text-[10px] font-bold uppercase tracking-wider ${bookingStep >= s.num ? 'text-slate-700 dark:text-slate-300' : 'text-slate-600'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`w-20 h-px mb-4 mx-1 transition-all duration-500 ${bookingStep > s.num ? 'bg-green-500/60' : 'bg-slate-100 dark:bg-slate-800'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Value panel */}
              <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
                <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 space-y-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">What You'll Get</p>
                  {FEATURES.map((f) => {
                    const c = colorMap[f.color];
                    return (
                      <div key={f.title} className="flex gap-3.5 items-start">
                        <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text} shrink-0 mt-0.5`}>
                          <i className={`fas ${f.icon} text-sm`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-100 text-sm leading-snug">{f.title}</h4>
                          <p className="text-slate-500 text-xs mt-1 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Testimonial mini-card */}
                <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/15 rounded-2xl p-5">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-amber-400 text-xs" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed italic">
                    "The 30-minute session alone identified 3 operational leaks costing us ₹4L/month. We signed on for the Solve plan the same day."
                  </p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xs">R</div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Rahul M.</p>
                      <p className="text-[10px] text-slate-500">Founder, D2C Brand · 42 employees</p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right: Scheduler panel */}
              <div className="lg:col-span-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                {/* Panel header */}
                <div className="px-8 pt-7 pb-0 border-b border-slate-200 dark:border-slate-800/60 pb-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {bookingStep === 1 ? '1. Choose Your Date & Time' : '2. Tell Us About You'}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                        {bookingStep === 1
                          ? 'All times shown in your local timezone. Slots fill fast.'
                          : 'So we can prepare a custom agenda before the session.'}
                      </p>
                    </div>
                    {bookingStep === 2 && (
                      <button
                        onClick={() => setBookingStep(1)}
                        className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white flex items-center gap-1.5 font-semibold bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg transition-all hover:bg-slate-200 dark:bg-slate-700/80"
                      >
                        <i className="fas fa-chevron-left text-[9px]" /> Change
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  {bookingStep === 1 ? (
                    <div>
                      {/* ── Monthly calendar ── */}
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                        <i className="fas fa-calendar-alt text-blue-400" /> Select a Date
                      </label>
                      <div className="mb-6">
                        {/* Month navigation header */}
                        <div className="flex items-center justify-between mb-4">
                          <button
                            type="button"
                            onClick={prevMonth}
                            disabled={calYear === today.getFullYear() && calMonth === today.getMonth()}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-600 text-slate-900 dark:text-white font-bold text-xs hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100 dark:bg-slate-800 disabled:hover:border-slate-600"
                          >
                            <i className="fas fa-chevron-left" /> Prev
                          </button>
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide">{monthName}</span>
                          <button
                            type="button"
                            onClick={nextMonth}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-600 text-slate-900 dark:text-white font-bold text-xs hover:bg-blue-600 hover:border-blue-500 transition-all duration-200"
                          >
                            Next <i className="fas fa-chevron-right" />
                          </button>
                        </div>

                        {/* Weekday labels */}
                        <div className="grid grid-cols-7 mb-1">
                          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                            <div key={d} className={`text-center text-[9px] font-bold uppercase tracking-wider py-1 ${
                              d === 'Sun' || d === 'Sat' ? 'text-slate-700' : 'text-slate-500'
                            }`}>{d}</div>
                          ))}
                        </div>

                        {/* Day cells */}
                        <div className="grid grid-cols-7 gap-1">
                          {calCells.map((date, idx) => {
                            if (!date) return <div key={`empty-${idx}`} />;
                            const disabled = isDayDisabled(date);
                            const booked   = isDayBooked(date);
                            const weekend  = isDayWeekend(date);
                            const past     = isDayPast(date);
                            const selected = isDaySelected(date);
                            const isToday  = date.toDateString() === today.toDateString();
                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={disabled}
                                onClick={() => { if (!disabled) { setSelectedDate(date); setSelectedTime(null); } }}
                                title={booked ? 'This date is fully booked' : weekend ? 'Weekends unavailable' : past ? 'Past date' : ''}
                                className={`relative h-9 w-full rounded-xl text-sm font-bold flex flex-col items-center justify-center transition-all duration-200 ${
                                  selected
                                    ? 'bg-blue-600 text-slate-900 dark:text-white shadow-lg shadow-blue-600/30 scale-105'
                                    : booked
                                    ? 'bg-white/50 dark:bg-slate-900/50 text-slate-700 cursor-not-allowed'
                                    : past || weekend
                                    ? 'text-slate-700 cursor-not-allowed'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:bg-slate-800 hover:text-slate-900 dark:text-white'
                                }`}
                              >
                                {/* Today ring */}
                                {isToday && !selected && (
                                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                )}
                                <span className={booked && !selected ? 'line-through opacity-40' : ''}>
                                  {date.getDate()}
                                </span>
                                {booked && !selected && (
                                  <span className="text-[7px] text-red-500/70 font-bold leading-none">booked</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Live summary strip – shown when date is picked */}
                      {selectedDate && (
                        <div className="mb-5 px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <i className="fas fa-calendar-day text-blue-400 text-xs" />
                            <span className="font-bold text-slate-900 dark:text-white">{formatDate(selectedDate)}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {selectedTime ? (
                              <div className="flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full">
                                <i className="fas fa-clock text-blue-400 text-[10px]" />
                                <span className="text-blue-300 text-xs font-extrabold">{selectedTime}</span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 font-semibold">Pick a time ↓</span>
                            )}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                              {availableCount} slot{availableCount !== 1 ? 's' : ''} left
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Time row */}
                      <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                        <i className="fas fa-clock text-purple-400" /> Select a Time Slot
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {TIME_SLOTS.map((slot, idx) => {
                          const isSel    = selectedTime === slot.time;
                          const isBooked = bookedSlotsForDay.has(slot.time);
                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={isBooked}
                              onClick={() => !isBooked && setSelectedTime(slot.time)}
                              className={`relative py-4 px-3 rounded-2xl border font-bold text-sm text-center transition-all duration-300 flex flex-col items-center gap-1 overflow-hidden ${
                                isBooked
                                  ? 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/50 text-slate-700 cursor-not-allowed'
                                  : isSel
                                  ? 'bg-blue-600 border-blue-500 text-slate-900 dark:text-white shadow-lg shadow-blue-600/20'
                                  : 'bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-600/40 hover:bg-white dark:bg-slate-900 group'
                              }`}
                            >
                              {/* Diagonal strikethrough overlay for booked */}
                              {isBooked && (
                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                  <div
                                    className="absolute top-0 left-0 w-full h-full"
                                    style={{
                                      background: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(100,100,100,0.06) 5px, rgba(100,100,100,0.06) 6px)'
                                    }}
                                  />
                                </div>
                              )}

                              <span className={`font-extrabold ${ isBooked ? 'line-through opacity-40' : '' }`}>
                                {slot.time}
                              </span>

                              {isBooked ? (
                                <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider bg-red-500/15 border border-red-500/25 text-red-400 px-2 py-0.5 rounded-full">
                                  <i className="fas fa-lock text-[7px]" /> Booked
                                </span>
                              ) : (
                                <span className={`text-[10px] font-medium ${ isSel ? 'text-blue-200' : 'text-slate-600 group-hover:text-slate-600 dark:text-slate-400' }`}>
                                  {slot.period}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* CTA button */}
                      <button
                        type="button"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setBookingStep(2)}
                        className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all duration-300 flex items-center justify-center gap-3 ${
                          selectedDate && selectedTime
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-900 dark:text-white shadow-xl shadow-blue-600/25 active:scale-[0.99]'
                            : 'bg-white dark:bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {selectedDate && selectedTime ? (
                          <>
                            <span>Continue — {formatShortDate(selectedDate)}, {selectedTime}</span>
                            <i className="fas fa-arrow-right" />
                          </>
                        ) : (
                          'Select a date and time to continue'
                        )}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Reserved slot banner */}
                      <div className="mb-6 p-4 bg-blue-600/8 border border-blue-500/20 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500/15 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                            <i className="fas fa-calendar-check text-sm" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{formatDate(selectedDate)}</p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400">{selectedTime} · 30 minutes · {formData.platform || 'Google Meet'}</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          ✓ Held for you
                        </span>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleBook} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                              Your Name <span className="text-blue-400">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-600 transition-all text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                              Work Email <span className="text-blue-400">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="john@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-600 transition-all text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                            Company Name <span className="text-blue-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Acme Corp"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-600 transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                            What's the #1 Thing You Want to Solve? <span className="text-slate-600">(optional)</span>
                          </label>
                          <textarea
                            rows={3}
                            placeholder="e.g. We're losing leads in our sales process. Operations feel chaotic. Cashflow is unpredictable..."
                            value={formData.focus}
                            onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-600 resize-none transition-all text-sm"
                          />
                          <p className="mt-1.5 text-[10px] text-slate-600">Helps us prepare a specific agenda before the session.</p>
                        </div>

                        {/* Platform picker */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                            <i className="fas fa-video text-purple-400 mr-1.5" />
                            Preferred Meeting Platform <span className="text-blue-400">*</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'Google Meet', icon: 'fa-video',        color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/30',  activeBg: 'bg-green-600',  activeBorder: 'border-green-500'  },
                              { id: 'Zoom',        icon: 'fa-desktop',      color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   activeBg: 'bg-blue-600',   activeBorder: 'border-blue-500'   },
                              { id: 'MS Teams',    icon: 'fa-users',        color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', activeBg: 'bg-purple-600', activeBorder: 'border-purple-500' },
                            ].map((p) => {
                              const active = formData.platform === p.id;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, platform: p.id })}
                                  className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border font-bold text-xs transition-all duration-200 ${
                                    active
                                      ? `${p.activeBg} ${p.activeBorder} text-slate-900 dark:text-white shadow-lg`
                                      : `bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 ${p.border} ${p.color} hover:scale-[1.03]`
                                  }`}
                                >
                                  <i className={`fas ${p.icon} text-lg`} />
                                  {p.id}
                                  {active && <i className="fas fa-check-circle text-[10px] opacity-80" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={!isFormValid() || isSubmitting}
                          className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all duration-300 flex items-center justify-center gap-3 ${
                            isFormValid() && !isSubmitting
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-900 dark:text-white shadow-xl shadow-blue-600/25 active:scale-[0.99]'
                              : 'bg-white dark:bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Reserving Your Session...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-calendar-check" />
                              Confirm One-on-One Session
                            </>
                          )}
                        </button>

                        <p className="text-center text-[10px] text-slate-600 mt-2">
                          <i className="fas fa-lock mr-1 text-slate-700" />
                          No payment required. Cancel anytime. Your data is protected under our NDA policy.
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── SUCCESS SCREEN ── */
          <div className="px-6 pb-24 pt-4 max-w-3xl mx-auto">
            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
              {/* Top gradient accent */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <div className="p-10 md:p-14 text-center">
                {/* Success icon */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping opacity-30" />
                  <div className="relative w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-calendar-check text-green-400 text-3xl" />
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 block mb-3">Session Locked In</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                  You're All Set, {formData.name.split(' ')[0]}!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base max-w-lg mx-auto leading-relaxed mb-10">
                  A calendar invite and {formData.platform} link are on their way to <span className="text-slate-900 dark:text-white font-semibold">{formData.email}</span>. Our consultant will review your session brief before joining — no cold starts.
                </p>

                {/* Booking summary card */}
                <div className="bg-slate-50 dark:bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md mx-auto text-left overflow-hidden mb-10">
                  <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Session Summary</p>
                  </div>
                  <div className="p-5 space-y-3.5 text-sm">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-calendar text-blue-400 w-4 text-center" />
                      <span className="text-slate-600 dark:text-slate-400">Date &amp; Time</span>
                      <span className="ml-auto font-bold text-slate-900 dark:text-white">{formatShortDate(selectedDate)}, {selectedTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-clock text-purple-400 w-4 text-center" />
                      <span className="text-slate-600 dark:text-slate-400">Duration</span>
                      <span className="ml-auto font-bold text-slate-900 dark:text-white">30 minutes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-video text-green-400 w-4 text-center" />
                      <span className="text-slate-600 dark:text-slate-400">Platform</span>
                      <span className="ml-auto font-bold text-slate-900 dark:text-white">{formData.platform}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-user-tie text-amber-400 w-4 text-center" />
                      <span className="text-slate-600 dark:text-slate-400">Host</span>
                      <span className="ml-auto font-bold text-slate-900 dark:text-white">Business Building Company (BBC) Senior Consultant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-building text-slate-600 dark:text-slate-400 w-4 text-center" />
                      <span className="text-slate-600 dark:text-slate-400">Company</span>
                      <span className="ml-auto font-bold text-slate-900 dark:text-white">{formData.company}</span>
                    </div>
                  </div>
                </div>

                {/* Next steps */}
                <div className="text-left max-w-md mx-auto mb-10 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">What Happens Next</p>
                  {[
                    { icon: 'fa-envelope', color: 'text-blue-400', label: 'Confirmation email sent', desc: 'With calendar invite + Meet link.' },
                    { icon: 'fa-file-alt', color: 'text-purple-400', label: 'We review your brief', desc: 'Personalised agenda prepared in advance.' },
                    { icon: 'fa-rocket', color: 'text-green-400', label: 'Session day', desc: 'Jump in. Leave with clarity.' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center ${item.color} shrink-0`}>
                        <i className={`fas ${item.icon} text-xs`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-extrabold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
                  >
                    <i className="fas fa-home" /> Go to Home
                  </Link>
                  <button
                    onClick={() => {
                      setBookingStep(1);
                      setSelectedDate(dates[0] || null);
                      setSelectedTime(null);
                      setFormData({ name: '', email: '', company: '', focus: '' });
                    }}
                    className="bg-white dark:bg-slate-900 hover:bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-extrabold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-redo text-sm" /> Book Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
