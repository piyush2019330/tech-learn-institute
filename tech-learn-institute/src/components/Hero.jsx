import React from 'react';
import { ArrowRight, CheckCircle2, Award, Terminal, Code2, Database, Cpu, Layout, Network, Server } from 'lucide-react';

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
            Master <span className="gradient-text">Class 11 & 12 IP</span>, <span className="gradient-text-cyan">Data Science</span> & <span style={{ color: '#10b981' }}>Linux & Networks</span>
          </h1>

          <p className="hero-description">
            Specialized coaching institute for CBSE Informatics Practices (Code 065), Full Data Science Career Track, Linux System Administration & Shell Scripting, and Computer Networking & Protocols with 100% hands-on practical labs.
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
            <div className="badge-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10b981' }}>
              <Terminal size={14} /> Linux & Bash Shell
            </div>
            <div className="badge-pill" style={{ borderColor: 'rgba(6, 182, 212, 0.4)', color: '#06b6d4' }}>
              <Network size={14} /> Computer Networking (TCP/IP)
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
              <div className="stat-number">100%</div>
              <div className="stat-label">Hands-on Practical Labs</div>
            </div>
            <div>
              <div className="stat-number">Linux & Net</div>
              <div className="stat-label">System & Cloud Infra Labs</div>
            </div>
            <div>
              <div className="stat-number">10+ Modules</div>
              <div className="stat-label">Specialized Tech & Board Tracks</div>
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
              tech_learn_terminal.sh
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
              <div className="tech-icon linux-icon">🐧</div>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Linux & Bash</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CLI & Permissions</span>
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon net-icon">🌐</div>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Networking</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OSI & TCP/IP Protocols</span>
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
            <div style={{ color: '#64748b' }}># Tech Learn Unified Practical Environment</div>
            <div>$ uname -srmo && python3 -V</div>
            <div style={{ color: '#38bdf8' }}>Linux 6.8.0 x86_64 GNU/Linux | Python 3.12.2</div>
            <div>$ ping -c 1 techlearn.local</div>
            <div style={{ color: '#fbbf24' }}>64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.04 ms</div>
            <div style={{ color: '#a7f3d0', marginTop: '0.4rem' }}># System ready: IP Board Prep, Data Science, Linux & Networking 🚀</div>
          </div>
        </div>
      </div>
    </section>
  );
}
