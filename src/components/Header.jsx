import React from 'react';
import { BookOpen, Sun, Moon, Sparkles, GraduationCap } from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenDemo, onOpenAdmin, onOpenStudentPortal }) {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="#" className="brand-logo">
          <div className="brand-icon">
            <BookOpen size={22} />
          </div>
          <span>Tech<span className="gradient-text">Learn</span></span>
        </a>

        <ul className="nav-links">
          <li><a href="#courses" className="nav-link">Courses</a></li>
          <li><a href="#ip-section" className="nav-link">Class 11-12 IP</a></li>
          <li><a href="#playground" className="nav-link">Code Sandbox</a></li>
          <li><a href="#calculator" className="nav-link">Batch Schedule</a></li>
          <li><a href="#contact" className="nav-link">Contact Admin</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            className="btn-secondary" 
            onClick={onOpenStudentPortal}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}
            title="Student LMS Login"
          >
            <GraduationCap size={16} /> Student Login
          </button>

          <button 
            className="theme-btn" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button className="btn-primary" onClick={() => onOpenDemo()}>
            <Sparkles size={16} />
            Free Demo Class
          </button>
        </div>
      </div>
    </header>
  );
}
