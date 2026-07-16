import { useState } from 'react';
import './PaymentModal.css';

export default function PaymentModal({ isOpen, onClose, plan }) {
  const [step, setStep] = useState('company_info');
  const [form, setForm] = useState({ 
    companyName: '', 
    website: '', 
    role: '', 
    name: '', 
    email: '', 
    card: '', 
    expiry: '', 
    cvc: '' 
  });

  if (!isOpen) return null;

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    setStep('form');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const reset = () => {
    setStep('company_info');
    setForm({ companyName: '', website: '', role: '', name: '', email: '', card: '', expiry: '', cvc: '' });
    onClose();
  };

  return (
    <div className={`payment-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="payment-modal flex flex-col md:flex-row relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Left Side: Order Summary */}
        <div className="w-full md:w-5/12 bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden flex flex-col justify-between hidden md:flex">
            {/* Glowing background blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-blue-500/20">
                        <i className="fas fa-lock"></i> Secure Checkout
                    </div>
                    <h2 className="text-3xl font-black mb-3">{plan?.name} Plan</h2>
                    <p className="text-slate-400 leading-relaxed">{plan?.desc || 'Complete your subscription to unlock growth.'}</p>
                </div>
                
                <div className="mb-12 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                    {plan?.prefix && <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{plan.prefix}</div>}
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        {plan?.price}
                    </div>
                    {plan?.duration && <div className="text-sm font-medium text-slate-400"><i className="far fa-clock mr-1.5"></i> {plan.duration}</div>}
                </div>
            </div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><i className="fas fa-check text-xs"></i></div>
                    Full access to all included features
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><i className="fas fa-check text-xs"></i></div>
                    Priority onboarding support
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><i className="fas fa-check text-xs"></i></div>
                    Risk-free performance guarantee
                </div>
            </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white dark:bg-slate-900 relative">
          <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <i className="fas fa-times"></i>
          </button>

          {step === 'company_info' && (
            <div className="max-w-md mx-auto h-full flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Tell us about you</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Let's personalize your <strong className="text-slate-900 dark:text-white">{plan?.name}</strong> experience.
                </p>
              </div>
              
              <form onSubmit={handleCompanySubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Full Name</label>
                    <input type="text" required className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email Address</label>
                    <input type="email" required className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Company Name</label>
                  <input type="text" required className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} placeholder="Acme Corp" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Company Website</label>
                  <input type="url" className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://acme.com (optional)" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Your Role</label>
                  <select required className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="" disabled>Select your role</option>
                    <option value="Founder/CEO">Founder / CEO</option>
                    <option value="Director">Director / VP</option>
                    <option value="Manager">Manager</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="pt-4">
                    <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-black text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-transform active:scale-[0.98] shadow-xl shadow-slate-900/10 dark:shadow-white/10 flex justify-center items-center gap-3">
                    Continue to Payment <i className="fas fa-arrow-right text-sm"></i>
                    </button>
                </div>
              </form>
            </div>
          )}

          {step === 'form' && (
            <div className="max-w-md mx-auto h-full flex flex-col justify-center">
              <div className="mb-8">
                <button type="button" onClick={() => setStep('company_info')} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
                  <i className="fas fa-arrow-left text-sm"></i>
                </button>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Payment Details</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Complete your purchase securely via Stripe.
                </p>
              </div>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" required className="w-full pl-12 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all font-mono" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} placeholder="0000 0000 0000 0000" />
                    <i className="far fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Expiry Date</label>
                    <input type="text" required className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all font-mono" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">CVC</label>
                    <div className="relative">
                        <input type="text" required className="w-full pl-4 pr-10 py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white transition-all font-mono" value={form.cvc} onChange={(e) => setForm({ ...form, cvc: e.target.value })} placeholder="123" />
                        <i className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-transform active:scale-[0.98] shadow-xl shadow-blue-500/20 flex justify-center items-center gap-3">
                        Pay {plan?.price}
                    </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 mt-6">
                    <i className="fas fa-shield-alt text-green-500"></i>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Secured by Stripe</p>
                </div>
              </form>
            </div>
          )}

          {step === 'processing' && (
            <div className="h-full flex flex-col items-center justify-center py-12">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-blue-100 dark:border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="mt-8 text-xl font-bold text-slate-900 dark:text-white animate-pulse">Processing Payment...</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">Please don't close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl text-white shadow-xl shadow-green-500/30 mb-8 animate-[bounce_1s_ease-in-out]">
                <i className="fas fa-check" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Payment Successful!</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
                Welcome aboard! We've sent your receipt and onboarding instructions to <strong className="text-slate-700 dark:text-slate-300">{form.email}</strong>.
              </p>
              <button onClick={reset} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-transform active:scale-[0.98]">
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}