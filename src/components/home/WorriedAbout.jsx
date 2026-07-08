import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import image1 from '../../assets/Worried About(1).png';
import image2 from '../../assets/Worried About(2).png';
import image3 from '../../assets/Worried About.png';
import image4 from '../../assets/Worried About(3).png';
import image5 from '../../assets/Worried About(4).png';
import image6 from '../../assets/Worried About((5).png';
import './WorriedAbout.css';

const questions = [
  { text: "Sales aren't growing despite your efforts?", link: "/services#sales-process-fix" },
  { text: "Unsure how to attract more customers?", link: "/services#strategy-solve" },
  { text: "Marketing campaigns not delivering results?", link: "/services#strategy-solve" },
  { text: "Planning to launch a new product?", link: "/services#strategy-solve" },
  { text: "Competitors growing faster than you?", link: "/services#scale-partnership" },
  { text: "Your team needs better sales or leadership skills?", link: "/services#team-performance-lab" }
];

export default function WorriedAbout() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="worried-about-section">
      <div className="worried-container" ref={ref}>
        <div className={`worried-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">Challenges</span>
          <h2 className="section-title">Worried <span className="gradient-text">About?</span></h2>
          <p className="section-subtitle">
            If you're facing any of these challenges, we have the measurable outcomes to solve them.
          </p>
        </div>

        <div className="worried-split">
          <div className={`worried-image-collage ${inView ? 'visible' : ''}`}>
            <div className="image-main">
              <img src={image1} alt="Business challenges" className="worried-img" />
            </div>
            <div className="image-secondary">
              <img src={image2} alt="Strategic solutions" className="worried-img" />
            </div>
            <div className="image-tertiary">
              <img src={image3} alt="Team constraints" className="worried-img" />
            </div>
            <div className="image-quaternary">
              <img src={image4} alt="Process optimization" className="worried-img" />
            </div>
            <div className="image-quinary">
              <img src={image5} alt="Growth strategies" className="worried-img" />
            </div>
            <div className="image-senary">
              <img src={image6} alt="Operational efficiency" className="worried-img" />
            </div>
            <div className="worried-image-overlay">
              <span className="worried-image-badge">
                <i className="fas fa-check-circle mr-2" style={{ color: '#2563eb' }}></i>
                Identify & Solve
              </span>
            </div>
          </div>

          <div className="questions-grid">
            {questions.map((q, idx) => (
              <Link 
                to={q.link} 
                state={{ question: q.text }}
                key={idx}
                className={`question-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="question-icon">
                  <i className="fas fa-exclamation-circle text-red-500"></i>
                </div>
                <h3 className="question-text">{q.text}</h3>
                <div className="question-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
