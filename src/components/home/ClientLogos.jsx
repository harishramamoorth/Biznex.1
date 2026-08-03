import React from 'react';
import company1 from '../../assets/company1.png';
import company2 from '../../assets/company2.png';
import company3 from '../../assets/company3.png';
import company4 from '../../assets/company4.png';
import company5 from '../../assets/Compnay5.png';
import company6 from '../../assets/company6.png';

const clientLogos = [
    { src: company1, alt: 'Company 1' },
    { src: company2, alt: 'Company 2' },
    { src: company3, alt: 'Company 3' },
    { src: company4, alt: 'Company 4' },
    { src: company5, alt: 'Company 5' },
    { src: company6, alt: 'Company 6' }
];

// Repeat the logos to fill the marquee width nicely
const repeatCount = 3;
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