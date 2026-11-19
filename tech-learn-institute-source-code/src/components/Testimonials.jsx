import React from 'react';
import { TESTIMONIALS } from '../data/coursesData';
import { Star, MessageSquareQuote, ShieldCheck, UserCheck } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MessageSquareQuote size={14} /> Student Wall of Fame
          </div>
          <h2 className="section-title">
            What Our Students & Parents <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="section-subtitle">
            Real feedback from CBSE Class 11-12 IP board toppers and Data Science learners.
          </p>
        </div>

        <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="course-card" style={{ padding: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '9999px', 
                    background: 'rgba(16, 185, 129, 0.15)', 
                    color: '#10b981', 
                    fontWeight: '700',
                    marginLeft: 'auto'
                  }}>
                    {item.score}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  "{item.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '2rem' }}>{item.avatar}</div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{item.name}</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructor Banner */}
        <div style={{
          marginTop: '4rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: '#fff',
            flexShrink: 0,
            boxShadow: 'var(--shadow-glow)'
          }}>
            👨‍🏫
          </div>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-indigo)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Lead Educator & Tech Mentor
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0.3rem 0 0.6rem 0' }}>
              Dedicated Subject Coaching for IP & Data Science
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              With 8+ years of teaching experience, our practical-first methodology ensures that students master python syntax, complex database queries, and predictive modeling with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
