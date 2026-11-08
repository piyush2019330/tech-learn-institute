import React, { useState } from 'react';
import { Calendar, ArrowRight, MessageSquare, Mail, CheckCircle2, Clock, Globe } from 'lucide-react';

const COURSE_SCHEDULE_RULES = {
  'class-11-ip': { duration: 'Online Class with Flexible Timings', name: 'Class 11 IP (CBSE 065)', batches: 'Weekday & Weekend Batches' },
  'class-12-ip': { duration: 'Online Class with Flexible Timings', name: 'Class 12 IP (CBSE 065)', batches: 'Weekday & Weekend Batches' },
  'data-science-full': { duration: '6–8 months', name: 'Data Science Full Course (Python + SQL + Power BI + ML + DS)', batches: 'Evening & Weekend Batches' },
  'linux': { duration: '2 months', name: 'Linux Administration & Shell Scripting', batches: 'Flexible Online Batches' },
  'networking': { duration: '2 months', name: 'Computer Networking & Protocols', batches: 'Flexible Online Batches' },
  'python': { duration: '2 months', name: 'Python Programming', batches: 'Flexible Online Batches' },
  'sql': { duration: '1.5 months', name: 'SQL & Database Mastery', batches: 'Flexible Online Batches' },
  'powerbi': { duration: '1.5 months', name: 'Power BI Masterclass', batches: 'Flexible Online Batches' },
  'ml': { duration: '3 months', name: 'Machine Learning', batches: 'Flexible Online Batches' },
  'ds-individual': { duration: '4 months', name: 'Data Science', batches: 'Flexible Online Batches' }
};

export default function FeeCalculator({ onOpenDemo }) {
  const [selectedCourse, setSelectedCourse] = useState('data-science-full');

  const courseObj = COURSE_SCHEDULE_RULES[selectedCourse] || COURSE_SCHEDULE_RULES['data-science-full'];

  return (
    <section id="calculator" className="section" style={{ background: 'var(--bg-glass)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Calendar size={14} /> Batch Schedule & Seat Reservation
          </div>
          <h2 className="section-title">
            Course Schedule & <span className="gradient-text">Instant Seat Reservation</span>
          </h2>
          <p className="section-subtitle">
            Flexible online timings for all batches. Reserve your seat and receive complete course schedule details directly on Admin WhatsApp (<strong style={{ color: 'var(--text-primary)' }}>8974003523</strong>) or Email (<strong style={{ color: 'var(--text-primary)' }}>pp8842973@gmail.com</strong>).
          </p>
        </div>

        <div className="calculator-card">
          <div>
            <div className="calc-control-group">
              <label className="calc-label">Select Course / Subject:</label>
              <select 
                className="calc-select" 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="class-11-ip">Class 11 IP (Online Flexible Timing)</option>
                <option value="class-12-ip">Class 12 IP (Online Flexible Timing)</option>
                <option value="data-science-full">Data Science Full Course (Python + SQL + Power BI + ML + DS — 6–8 mos)</option>
                <option value="linux">Linux Administration & Shell Scripting (2 months)</option>
                <option value="networking">Computer Networking & Protocols (2 months)</option>
                <option value="python">Python Programming (2 months)</option>
                <option value="sql">SQL & Database Mastery (1.5 months)</option>
                <option value="powerbi">Power BI Masterclass (1.5 months)</option>
                <option value="ml">Machine Learning (3 months)</option>
                <option value="ds-individual">Data Science (4 months)</option>
              </select>
            </div>

            <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.2rem', marginTop: '1.2rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--primary-indigo)' }}>
                Course Specifications:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div>⏱️ <strong>Duration:</strong> {courseObj.duration}</div>
                <div>💻 <strong>Class Mode:</strong> 100% Online Classes with Flexible Timings</div>
                <div>📅 <strong>Batch Slots:</strong> {courseObj.batches}</div>
                <div>📚 <strong>Course Material:</strong> Full Hands-on Codebooks, Practical Files & Doubt Sessions</div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <MessageSquare size={16} color="#25D366" /> Admin WhatsApp: <strong>8974003523</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--primary-indigo)" /> Admin Email: <strong>pp8842973@gmail.com</strong>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="fee-summary-box">
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-emerald)', fontWeight: '700', letterSpacing: '0.05em' }}>
              Batch Status & Enrollment
            </span>

            <div className="fee-total" style={{ fontSize: '2rem', color: 'var(--accent-emerald)' }}>
              Admissions Open
            </div>

            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
              Duration: <strong>{courseObj.duration}</strong>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--primary-indigo)', marginBottom: '1.5rem', fontWeight: 600 }}>
              100% Online • Live Doubt Solving
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '0.85rem' }}
              onClick={() => onOpenDemo(courseObj.name)}
            >
              Reserve Seat for {courseObj.name} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
