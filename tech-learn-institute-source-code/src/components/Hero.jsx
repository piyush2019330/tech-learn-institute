import React from 'react';
import { ArrowRight, CheckCircle2, Award, Terminal, Code2, Database, Cpu, Layout } from 'lucide-react';

export default function Hero({ onOpenDemo }) {
  return (
    <section className="hero-section">
      <div className="hero-glow"></div>
      
      <div className="container hero-grid">
        <div>
          <div className="section-tag">
            <Award size={15} /> Premier Tech & Board Prep Coaching
          </div>
          
          <h1 className="hero-title">
            Master <span className="gradient-text">Class 11 & 12 IP</span> & <span className="gradient-text-cyan">Data Science</span>
          </h1>

          <p className="hero-description">
            Specialized coaching institute for CBSE Informatics Practices (Code 065), Full Data Science Career Track, and Individual Skill Masterclasses in Python, SQL, Machine Learning & Power BI.
          </p>

          <div className="hero-badges">
            <div className="badge-pill highlight">
              <CheckCircle2 size={14} /> CBSE Class 11-12 IP Board Prep
            </div>
            <div className="badge-pill">
              <Code2 size={14} /> Python & Pandas
            </div>
            <div className="badge-pill">
              <Database size={14} /> SQL Queries
            </div>
            <div className="badge-pill">
              <Cpu size={14} /> Machine Learning
            </div>
            <div className="badge-pill">
              <Layout size={14} /> Power BI
            </div>
          </div>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => onOpenDemo()}>
              Book Free Live Demo <ArrowRight size={18} />
            </button>
            <a href="#courses" className="btn-secondary">
              Explore All Courses
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-number">98%</div>
              <div className="stat-label">Class 12 IP Highest Marks</div>
            </div>
            <div>
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Students Mentored</div>
            </div>
            <div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Hands-on Practical Labs</div>
            </div>
          </div>
        </div>

        {/* Visual Terminal / Card */}
        <div className="hero-visual-card">
          <div className="hero-visual-header">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              tech_learn_curriculum.py
            </span>
          </div>

          <div className="tech-stack-row">
            <div className="tech-card">
              <div className="tech-icon python-icon">Py</div>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Python & Pandas</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Class 11-12 & DS</span>
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon sql-icon">SQL</div>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>MySQL Database</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Queries & Joins</span>
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon ds-icon">ML</div>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Machine Learning</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scikit-Learn Models</span>
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon bi-icon">BI</div>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Power BI</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAX & Dashboards</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-main)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: '1.6',
            color: '#a7f3d0'
          }}>
            <div style={{ color: '#64748b' }}># Class 12 IP Pandas DataFrame & Board Query Example</div>
            <div>import pandas as pd</div>
            <div>df = pd.DataFrame&#40;&#123;'Student': ['Aarav', 'Priya'], 'IP_Score': [98, 99]&#125;&#41;</div>
            <div style={{ color: '#fbbf24' }}>print&#40;df[df['IP_Score'] &gt; 95]&#41;</div>
            <div style={{ color: '#38bdf8', marginTop: '0.4rem' }}># Result: Top Board Performers Ready! 🚀</div>
          </div>
        </div>
      </div>
    </section>
  );
}
