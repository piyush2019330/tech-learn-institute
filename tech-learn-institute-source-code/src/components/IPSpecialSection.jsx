import React from 'react';
import { Award, CheckCircle2, FileCode, Database, BarChart3, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

export default function IPSpecialSection({ onOpenDemo }) {
  return (
    <section id="ip-section" className="section">
      <div className="container">
        <div className="ip-spotlight">
          <div className="ip-spotlight-grid">
            <div>
              <div className="section-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#f59e0b' }}>
                <Award size={15} /> CBSE Code 065 Master Prep
              </div>

              <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem', lineHeight: '1.2' }}>
                Class 11 & 12 <span style={{ color: '#f59e0b' }}>Informatics Practices (IP)</span> Specialization
              </h2>

              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                Designed strictly as per the latest CBSE NCERT curriculum. We bridge the gap between textbook theory and practical execution, helping students achieve 95+ marks in both Class 11 finals & Class 12 Board Exams.
              </p>

              <div className="ip-feature-list">
                <div className="ip-feature-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <BarChart3 size={18} color="#6366f1" />
                    <h4>Python Pandas & DataFrames</h4>
                  </div>
                  <p>In-depth Series, DataFrame creation, indexing, slicing, aggregation & CSV file handling.</p>
                </div>

                <div className="ip-feature-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Database size={18} color="#f59e0b" />
                    <h4>MySQL Database & Functions</h4>
                  </div>
                  <p>Mastering SQL Functions (Math, String, Date), GROUP BY, HAVING, and Multi-Table Joins.</p>
                </div>

                <div className="ip-feature-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <FileCode size={18} color="#10b981" />
                    <h4>Board Practical File & Project</h4>
                  </div>
                  <p>Complete guidance for preparing 30+ practical programs, viva voce questions & Class 12 IP project work.</p>
                </div>

                <div className="ip-feature-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Globe size={18} color="#06b6d4" />
                    <h4>Networks & Cyber Ethics</h4>
                  </div>
                  <p>Full 100% NCERT coverage of Network topologies, IP addressing, digital footprint & cyber safety.</p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button 
                  className="btn-primary" 
                  style={{ background: 'var(--grad-amber)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)' }}
                  onClick={() => onOpenDemo('Class 11 & 12 IP Board Special')}
                >
                  Join Class 11/12 IP Batch <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Card: Board Score Strategy */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck color="#10b981" size={24} />
                How We Ensure 95+ in Board Exam
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem', borderRadius: '50%', color: '#6366f1', fontWeight: 'bold' }}>1</div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block' }}>Line-by-Line NCERT & Practical Coding</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Every concept is taught with live Python terminal & MySQL execution.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem', borderRadius: '50%', color: '#f59e0b', fontWeight: 'bold' }}>2</div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block' }}>Past 10 Years Board Papers & Sample Tests</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Rigorous practice of board exam pattern questions and marking scheme drills.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem', borderRadius: '50%', color: '#10b981', fontWeight: 'bold' }}>3</div>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block' }}>Personalized Doubt Resolution & Viva Prep</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>1-on-1 assistance for viva questions and external examiner evaluation.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
