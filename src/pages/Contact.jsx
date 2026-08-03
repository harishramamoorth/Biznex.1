import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    id: 'name',
    label: 'Your Name',
    question: 'What should we call you?',
    placeholder: 'e.g., John Doe',
    type: 'text',
    encouragement: "You're at the right place. Let's start with your name.",
  },
  {
    id: 'email',
    label: 'Email Address',
    question: 'Where should we send your free business diagnosis?',
    placeholder: 'e.g., john@company.com',
    type: 'email',
    encouragement: 'Great to meet you! We\'ll keep your details 100% secure.',
  },
  {
    id: 'businessName',
    label: 'Business Name',
    question: 'What is the name of your company?',
    placeholder: 'e.g., Acme Corp',
    type: 'text',
    encouragement: 'Every successful scaling journey begins with a name.',
  },
  {
    id: 'industrySize',
    label: 'Industry & Team Size',
    question: 'What industry are you in, and how many team members do you have?',
    encouragement: 'Understanding your niche helps us tailor our diagnosis with precision.',
    type: 'custom_industry_size'
  },
  {
    id: 'challenge',
    label: 'Biggest Challenge',
    question: 'What is the biggest operational or growth bottleneck holding you back?',
    placeholder: 'e.g., Lack of SOPs, sales conversion leaks, team alignment...',
    type: 'textarea',
    encouragement: 'Almost there! Spotting the leaks is the first step to fixing them.',
  }
];

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [contactMode, setContactMode] = useState('diagnose'); // 'diagnose' or 'quick'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    teamSize: '',
    challenge: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepInfo = STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    if (stepInfo.id === 'name') return formData.name.trim().length > 1;
    if (stepInfo.id === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (stepInfo.id === 'businessName') return formData.businessName.trim().length > 1;
    if (stepInfo.id === 'industrySize') return formData.industry.trim() !== '' && formData.teamSize.trim() !== '';
    if (stepInfo.id === 'challenge') return formData.challenge.trim().length > 4;
    return false;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <main className="pt-28 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center relative overflow-hidden text-slate-900 dark:text-white">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 w-full relative z-10">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 group"
          >
            <i className="fas fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>
        </div>

        {!isSubmitted && (
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl mb-8 max-w-sm mx-auto">
            <button
              onClick={() => setContactMode('diagnose')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${contactMode === 'diagnose' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Free Diagnosis
            </button>
            <button
              onClick={() => setContactMode('quick')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${contactMode === 'quick' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Quick Contact
            </button>
          </div>
        )}

        {!isSubmitted ? (
          <div>
            {contactMode === 'diagnose' ? (
              <>
                {/* Form Header */}
            <div className="mb-8">
              <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs">Free Business Scan</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Let's Diagnose Your Business</h1>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span>Step {currentStep + 1} of {STEPS.length}: {stepInfo.label}</span>
                  <span>{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Encouraging text banner */}
            <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm flex items-start gap-3 animate-pulse">
              <span className="text-lg">💡</span>
              <p className="font-medium">{stepInfo.encouragement}</p>
            </div>

            {/* Question Card */}
            <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl min-h-[220px] flex flex-col justify-between">
              <div>
                <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
                  {stepInfo.question}
                </label>

                {stepInfo.type === 'text' && (
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300"
                    placeholder={stepInfo.placeholder}
                    value={formData[stepInfo.id]}
                    onChange={(e) => setFormData({ ...formData, [stepInfo.id]: e.target.value })}
                  />
                )}

                {stepInfo.type === 'email' && (
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300"
                    placeholder={stepInfo.placeholder}
                    value={formData[stepInfo.id]}
                    onChange={(e) => setFormData({ ...formData, [stepInfo.id]: e.target.value })}
                  />
                )}

                {stepInfo.type === 'textarea' && (
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 resize-none"
                    placeholder={stepInfo.placeholder}
                    value={formData[stepInfo.id]}
                    onChange={(e) => setFormData({ ...formData, [stepInfo.id]: e.target.value })}
                  />
                )}

                {stepInfo.type === 'custom_industry_size' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Industry</label>
                      <select
                        className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all duration-300"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      >
                        <option value="">Select your industry...</option>
                        <option value="saas">SaaS / Tech</option>
                        <option value="retail">Retail / E-commerce</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="services">Professional Services</option>
                        <option value="agency">Agency / Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Team Size</label>
                      <select
                        className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all duration-300"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      >
                        <option value="">Select team size...</option>
                        <option value="1-5">1 - 5 employees</option>
                        <option value="6-20">6 - 20 employees</option>
                        <option value="21-50">21 - 50 employees</option>
                        <option value="51-200">51 - 200 employees</option>
                        <option value="200+">200+ employees</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    currentStep === 0
                      ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50 dark:opacity-30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  disabled={currentStep === 0}
                >
                  <i className="fas fa-arrow-left mr-2" /> Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid() || isSubmitting}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                    isStepValid()
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:translate-y-0.5'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : currentStep === STEPS.length - 1 ? (
                    <>
                      Submit Scan <i className="fas fa-check" />
                    </>
                  ) : (
                    <>
                      Next <i className="fas fa-arrow-right" />
                    </>
                  )}
                </button>
              </div>
            </div>
            </>) : (
              /* Quick Contact Form */
              <div className="animate-fade-in-up">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Get in Touch</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Leave your email or request a call back.</p>
                </div>
                
                <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Email ID</label>
                    <input type="email" className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Phone (For Call Back)</label>
                    <input type="tel" className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Message</label>
                    <textarea className="w-full px-4 py-3 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all resize-none" rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How can we help?" />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formData.name || (!formData.email && !formData.phone) || isSubmitting}
                    className={`mt-4 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      (formData.name && (formData.email || formData.phone))
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:translate-y-0.5'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Request <i className="fas fa-paper-plane" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-12 px-6 bg-white/90 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-4xl text-green-500 dark:text-green-400 mb-6 animate-bounce">
              <i className="fas fa-check" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              {contactMode === 'diagnose' ? 'Diagnostic Request Received' : 'Message Received'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-sm mx-auto">
              Thank you, <span className="font-bold text-blue-600 dark:text-blue-400">{formData.name}</span>! 
              {contactMode === 'diagnose' 
                ? <> We have everything we need to start scanning <span className="font-bold text-blue-600 dark:text-blue-400">{formData.businessName}</span>.</>
                : <> We've received your request and will be in touch shortly.</>}
            </p>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 text-sm max-w-sm mx-auto mb-8 font-medium">
              {contactMode === 'diagnose' 
                ? `📅 Expect your 1-page report and strategy call invitation in your inbox (${formData.email}) within 48 hours.`
                : `📅 Our team will get back to you within 24 hours.`}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => {
                  setCurrentStep(0);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    industry: '',
                    teamSize: '',
                    challenge: '',
                    message: '',
                  });
                  setIsSubmitted(false);
                }}
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300"
              >
                Start New Scan
              </button>
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                Return to Home <i className="fas fa-home" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

