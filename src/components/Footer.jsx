import React from 'react';
import { BookOpen, Mail, MapPin, MessageSquare } from 'lucide-react';

export default function Footer({ onOpenDemo, onSecretAdmin }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#" className="brand-logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <div className="brand-icon">
                <BookOpen size={22} />
              </div>
              <span>Tech<span className="gradient-text">Learn</span></span>
            </a>
            <p className="footer-desc">
              Premier coaching institute for CBSE Class 11 & 12 IP (Informatics Practices) and Data Science Masterclasses.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={15} color="#25D366" /> Admin WhatsApp: <strong>8974003523</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={15} color="var(--primary-indigo)" /> Admin Email: <strong>pp8842973@gmail.com</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--primary-indigo)" /> Tech Learn Campus, Online Live Classes (Flexible Timings)
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-title">School IP Programs</h4>
            <ul className="footer-links">
              <li><a href="#ip-section">Class 11 IP (Online Flexible)</a></li>
              <li><a href="#ip-section">Class 12 IP (Online Flexible)</a></li>
              <li><a href="#ip-section">IP Practical File & Board Viva Help</a></li>
              <li><a href="#ip-section">CBSE Sample Papers & Mock Tests</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Data Science & Tech</h4>
            <ul className="footer-links">
              <li><a href="#courses">Data Science Full Course (5-in-1)</a></li>
              <li><a href="#courses">Linux Administration & Shell Scripting</a></li>
              <li><a href="#courses">Computer Networking & Protocols</a></li>
              <li><a href="#courses">Python Programming</a></li>
              <li><a href="#courses">SQL & Database Mastery</a></li>
              <li><a href="#courses">Power BI Masterclass</a></li>
              <li><a href="#courses">Machine Learning</a></li>
              <li><a href="#courses">Data Science & EDA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Contact & Admissions</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Admin Desk</a></li>
              <li><a href="https://wa.me/918974003523" target="_blank" rel="noreferrer">WhatsApp Chat (8974003523)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenDemo(); }}>Reserve Seat Online</a></li>
              <li><a href="#calculator">Batch Schedule</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tech Learn Institute. Helpline: 8974003523 | Email: pp8842973@gmail.com
            <span 
              onClick={onSecretAdmin}
              style={{ cursor: 'pointer', opacity: 0.15, marginLeft: '0.6rem', userSelect: 'none' }}
              aria-hidden="true"
            >
              •
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
