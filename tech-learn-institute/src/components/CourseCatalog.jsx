import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { 
  Check, 
  Clock, 
  Star, 
  BookOpen, 
  Database, 
  Code, 
  Cpu, 
  LineChart, 
  Layers, 
  ChevronRight, 
  X,
  Sparkles,
  Terminal,
  Network
} from 'lucide-react';

export default function CourseCatalog({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  const filteredCourses = COURSES.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'systems') return course.id === 'linux-fundamentals' || course.id === 'computer-networking';
    return course.category === activeTab;
  });

  const getCourseIcon = (type) => {
    switch (type) {
      case 'book': return <BookOpen size={24} color="#6366f1" />;
      case 'trend': return <LineChart size={24} color="#06b6d4" />;
      case 'code': return <Code size={24} color="#3b82f6" />;
      case 'database': return <Database size={24} color="#f59e0b" />;
      case 'chart': return <LineChart size={24} color="#10b981" />;
      case 'cpu': return <Cpu size={24} color="#ec4899" />;
      case 'layout': return <Layers size={24} color="#8b5cf6" />;
      case 'terminal': return <Terminal size={24} color="#10b981" />;
      case 'network': return <Network size={24} color="#06b6d4" />;
      default: return <BookOpen size={24} color="#6366f1" />;
    }
  };

  return (
    <section id="courses" className="section" style={{ background: 'var(--bg-glass)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} /> Curriculum Designed by Experts
          </div>
          <h2 className="section-title">
            Our Teaching Programs & <span className="gradient-text">Courses</span>
          </h2>
          <p className="section-subtitle">
            Master CBSE Class 11-12 IP board exams, launch a career in Data Science, explore Linux System Administration, or build Computer Networking expertise with live practical labs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Programs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'cbse' ? 'active' : ''}`}
            onClick={() => setActiveTab('cbse')}
          >
            Class 11 & 12 IP (CBSE)
          </button>
          <button 
            className={`tab-btn ${activeTab === 'systems' ? 'active' : ''}`}
            onClick={() => setActiveTab('systems')}
          >
            Linux & Networking
          </button>
          <button 
            className={`tab-btn ${activeTab === 'career-track' ? 'active' : ''}`}
            onClick={() => setActiveTab('career-track')}
          >
            Data Science Career Track
          </button>
          <button 
            className={`tab-btn ${activeTab === 'individual' ? 'active' : ''}`}
            onClick={() => setActiveTab('individual')}
          >
            Individual Skill Modules
          </button>
        </div>

        {/* Course Cards Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div>
                <span className={`course-badge-top ${course.badgeClass}`}>
                  {course.badge}
                </span>

                <div className="course-icon-wrapper" style={{ background: 'var(--bg-accent-subtle)' }}>
                  {getCourseIcon(course.iconType)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <Star size={15} fill="#f59e0b" color="#f59e0b" />
                  <strong style={{ fontSize: '0.85rem' }}>{course.rating}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({course.duration} • Live Online)</span>
                </div>

                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.shortDesc}</p>

                <ul className="course-highlights">
                  {course.highlights.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="course-highlight-item">
                      <Check size={16} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button 
                  onClick={() => setSelectedCourseModal(course)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--primary-indigo)',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    marginBottom: '1rem',
                    padding: 0
                  }}
                >
                  View Full Detailed Syllabus <ChevronRight size={16} />
                </button>

                <div className="course-footer">
                  <div>
                    <div className="course-duration">
                      <Clock size={14} /> {course.duration}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600, marginTop: '0.2rem' }}>
                      100% Online Class
                    </div>
                  </div>

                  <button 
                    className="btn-primary" 
                    style={{ padding: '0.55rem 1.2rem', fontSize: '0.88rem' }}
                    onClick={() => onOpenDemo(course.title)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus Modal */}
      {selectedCourseModal && (
        <div className="modal-overlay" onClick={() => setSelectedCourseModal(null)}>
          <div className="modal-content" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCourseModal(null)}>
              <X size={20} />
            </button>

            <span className={`course-badge-top ${selectedCourseModal.badgeClass}`} style={{ position: 'static', display: 'inline-block', marginBottom: '0.8rem' }}>
              {selectedCourseModal.badge}
            </span>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{selectedCourseModal.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              {selectedCourseModal.shortDesc}
            </p>

            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              Detailed Module Syllabus Roadmap
            </h4>

            <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {selectedCourseModal.syllabus.map((mod, idx) => (
                <div key={idx} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '0.8rem'
                }}>
                  <strong style={{ color: 'var(--primary-indigo)', fontSize: '0.95rem', display: 'block', marginBottom: '0.4rem' }}>
                    {mod.module}
                  </strong>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {mod.topics.map((t, tIdx) => (
                      <li key={tIdx} style={{ marginBottom: '0.2rem' }}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  const title = selectedCourseModal.title;
                  setSelectedCourseModal(null);
                  onOpenDemo(title);
                }}
              >
                Get Free Demo & Syllabus PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
