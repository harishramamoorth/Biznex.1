import React from 'react';
import logo3 from '../../assets/logo3.jpg';
import binexLogo from '../../assets/binexlogo.png';

const clientLogos = [
    { src: logo3, alt: 'MRG Engineering' },
    { src: binexLogo, alt: 'BizNex' }
];

// Repeat the logos to fill the marquee width nicely
const repeatCount = 6;
const logoList = Array(repeatCount).fill(clientLogos).flat();

export default function ClientLogos() {
    return (
        <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
                    Trusted by leading companies
                </p>
                <div className="relative flex overflow-x-hidden">
                    <div className="animate-marquee flex items-center whitespace-nowrap gap-24">
                        {logoList.concat(logoList).map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-12 w-auto object-contain transition-all duration-300 hover:scale-105"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </section>
    );
}