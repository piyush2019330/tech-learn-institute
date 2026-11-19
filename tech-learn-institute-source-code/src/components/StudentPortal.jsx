import React, { useState } from 'react';
import { COURSE_NOTES } from '../data/courseNotesData';
import { 
  GraduationCap, 
  Lock, 
  Key, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Download, 
  Code, 
  Database, 
  LogOut, 
  Sparkles,
  ChevronRight,
  UserCheck,
  HelpCircle,
  Copy,
  Check,
  FolderGit2,
  Printer,
  X
} from 'lucide-react';

export default function StudentPortal({ onBackToSite, studentAccounts }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentStudent, setCurrentStudent] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState(null);
  
  // LMS view tabs: 'notes' | 'exercises' | 'project'
  const [lmsTab, setLmsTab] = useState('notes');
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [copiedCode, setCopiedCode] = useState(false);

  // PDF Study Sheet Modal State
  const [viewingPdfTopic, setViewingPdfTopic] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Find student matching email or username
    const found = studentAccounts.find(
      s => (s.email.toLowerCase() === loginEmail.toLowerCase() || s.username.toLowerCase() === loginEmail.toLowerCase())
    );

    if (!found) {
      setLoginError('No student account found with this email/username. Please register or contact Admin.');
      return;
    }

    if (found.password !== loginPassword) {
      setLoginError('Incorrect password! Please check your credentials.');
      return;
    }

    // Check Admin Access Grant
    if (!found.isAccessGranted) {
      setLoginError('⛔ ACCESS RESTRICTED: Admin has not enabled login access for your account yet. Please contact Admin on WhatsApp +91 8974003523.');
      return;
    }

    // Success login
    setCurrentStudent(found);
    if (found.unlockedCourses && found.unlockedCourses.length > 0) {
      setActiveCourseId(found.unlockedCourses[0]);
    }
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    setActiveCourseId(null);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  const toggleAnswer = (qKey) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // Login Screen
  if (!currentStudent) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          maxWidth: '460px',
          width: '100%',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.2rem auto',
            color: '#fff'
          }}>
            <GraduationCap size={36} />
          </div>

          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.4rem' }}>
            Student Learning Portal
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>
            Log in to access your CBSE IP chapter notes, PDF study sheets & codebooks
          </p>

          {loginError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              marginBottom: '1.2rem',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{loginError}</div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username or Email ID *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. aarav12 or aarav@gmail.com" 
                className="form-input" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input 
                type="password" 
                required
                placeholder="Enter your student password" 
                className="form-input" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <Key size={16} /> Sign In to My Courses
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Don't have login access yet? Contact Admin at{' '}
              <a href="https://wa.me/918974003523" target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>
                WhatsApp 8974003523
              </a>
            </div>

            <button 
              type="button" 
              className="btn-secondary" 
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={onBackToSite}
            >
              <ArrowLeft size={16} /> Back to Institute Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Logged-In Student LMS Dashboard View
  const unlockedCourses = currentStudent.unlockedCourses || [];
  const selectedNotesData = activeCourseId ? COURSE_NOTES[activeCourseId] : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingBottom: '4rem' }}>
      {/* Student Top Header Bar */}
      <header style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div className="brand-icon" style={{ width: '38px', height: '38px' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                Tech Learn <span className="gradient-text">Student LMS</span>
              </h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Welcome, <strong>{currentStudent.name}</strong> ({currentStudent.email})
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-secondary" onClick={onBackToSite} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <ArrowLeft size={15} /> Website
            </button>
            <button className="btn-primary" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#ef4444' }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Student Welcome Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.8rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>
              <UserCheck size={16} /> Access Verified & Granted by Admin
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
              My Enrolled Course Notes, Chapter PDFs & Exercises
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Admin has unlocked <strong>{unlockedCourses.length}</strong> course(s) for your account. Select a course below to study.
            </p>
          </div>

          <div className="badge-pill highlight" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            100% Online Class (Flexible Timings)
          </div>
        </div>

        {/* Unlocked Courses Selector Bar */}
        {unlockedCourses.length > 0 ? (
          <div>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {unlockedCourses.map((cId) => {
                const noteObj = COURSE_NOTES[cId];
                if (!noteObj) return null;
                const isActive = activeCourseId === cId;

                return (
                  <button
                    key={cId}
                    onClick={() => setActiveCourseId(cId)}
                    className={`tab-btn ${isActive ? 'active' : ''}`}
                    style={{ padding: '0.75rem 1.4rem', borderRadius: 'var(--radius-md)' }}
                  >
                    📖 {noteObj.title}
                  </button>
                );
              })}
            </div>

            {/* Course Notes Content View */}
            {selectedNotesData && (
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.4rem' }}>
                      {selectedNotesData.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                      {selectedNotesData.description}
                    </p>
                  </div>

                  {/* LMS Content Sub-Tabs */}
                  <div className="filter-tabs" style={{ marginBottom: 0 }}>
                    <button 
                      className={`tab-btn ${lmsTab === 'notes' ? 'active' : ''}`}
                      onClick={() => setLmsTab('notes')}
                    >
                      📚 Chapter Notes ({selectedNotesData.topics?.length || 0})
                    </button>
                    <button 
                      className={`tab-btn ${lmsTab === 'exercises' ? 'active' : ''}`}
                      onClick={() => setLmsTab('exercises')}
                    >
                      ✏️ Chapter Exercises
                    </button>
                    <button 
                      className={`tab-btn ${lmsTab === 'project' ? 'active' : ''}`}
                      onClick={() => setLmsTab('project')}
                    >
                      🚀 Project Code ({selectedNotesData.projects?.length || 0})
                    </button>
                  </div>
                </div>

                {/* Sub-Tab 1: Topic Notes with PDF View & Download */}
                {lmsTab === 'notes' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    {selectedNotesData.topics?.map((topic, idx) => (
                      <div key={topic.id || idx} style={{
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.8rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem' }}>
                          <div>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              color: 'var(--accent-amber)',
                              background: 'rgba(245, 158, 11, 0.12)',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '9999px',
                              display: 'inline-block',
                              marginBottom: '0.4rem'
                            }}>
                              {topic.chapterNum || `Unit ${idx + 1}`} • CBSE IP
                            </span>
                            <h4 style={{ fontSize: '1.25rem', color: 'var(--primary-indigo)', fontWeight: '700' }}>
                              {topic.topicName}
                            </h4>
                          </div>

                          {/* PDF Notes Button */}
                          <button
                            onClick={() => setViewingPdfTopic(topic)}
                            className="btn-primary"
                            style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', background: 'var(--grad-primary)' }}
                          >
                            <FileText size={15} /> 📄 Read & Download Chapter Notes PDF
                          </button>
                        </div>

                        <div style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.92rem',
                          lineHeight: '1.7',
                          whiteSpace: 'pre-line',
                          fontFamily: 'var(--font-body)'
                        }}>
                          {topic.detailedNotes}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub-Tab 2: Topic Exercise Questions */}
                {lmsTab === 'exercises' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {selectedNotesData.topics?.map((topic, tIdx) => (
                      <div key={tIdx} style={{
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.8rem'
                      }}>
                        <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-amber)', fontWeight: '700', marginBottom: '1.2rem' }}>
                          Practice Exercises: {topic.topicName}
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {topic.exercises?.map((ex, eIdx) => {
                            const qKey = `${tIdx}-${eIdx}`;
                            const isOpen = expandedAnswers[qKey];

                            return (
                              <div key={eIdx} style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1.2rem'
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                                    {ex.question}
                                  </strong>

                                  <button
                                    onClick={() => toggleAnswer(qKey)}
                                    className="btn-secondary"
                                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                                  >
                                    {isOpen ? 'Hide Solution' : '👁️ View Solution'}
                                  </button>
                                </div>

                                {isOpen && (
                                  <div style={{
                                    marginTop: '0.8rem',
                                    paddingTop: '0.8rem',
                                    borderTop: '1px solid var(--border-subtle)',
                                    color: '#7ee787',
                                    fontSize: '0.88rem',
                                    fontFamily: 'var(--font-mono)',
                                    whiteSpace: 'pre-line',
                                    background: '#0d1117',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-sm)'
                                  }}>
                                    💡 <strong>Model Answer / Solution:</strong>
                                    <div style={{ marginTop: '0.4rem' }}>{ex.answer}</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sub-Tab 3: Capstone Project & Real Source Code */}
                {lmsTab === 'project' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {selectedNotesData.projects?.map((proj, pIdx) => (
                      <div key={proj.id || pIdx} style={{
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-glow)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                          <div>
                            <span className="section-tag" style={{ marginBottom: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10b981' }}>
                              <FolderGit2 size={14} /> Full Runnable Project Code
                            </span>
                            <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                              {proj.projectName}
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
                              {proj.projectDescription}
                            </p>
                          </div>

                          <button 
                            className="btn-primary" 
                            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                            onClick={() => handleCopyCode(proj.fullSourceCode)}
                          >
                            {copiedCode ? <Check size={15} /> : <Copy size={15} />}
                            {copiedCode ? 'Copied to Clipboard!' : 'Copy Project Code'}
                          </button>
                        </div>

                        {/* Code Display Block */}
                        <div style={{
                          background: '#0d1117',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.5rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.85rem',
                          color: '#e6edf3',
                          lineHeight: '1.6',
                          overflowX: 'auto',
                          marginBottom: '1.8rem',
                          maxHeight: '380px'
                        }}>
                          <pre style={{ margin: 0 }}>{proj.fullSourceCode}</pre>
                        </div>

                        {/* Project Questions & Viva Drills */}
                        <div style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.2rem'
                        }}>
                          <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '0.6rem' }}>
                            🎯 Project Viva Voce & Evaluation Questions:
                          </h5>
                          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                            {proj.projectQuestions?.map((pq, pqIdx) => (
                              <li key={pqIdx} style={{ marginBottom: '0.4rem' }}>{pq}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <AlertCircle size={48} color="#f59e0b" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              No Active Courses Assigned Yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Your account has been enabled by Admin, but no course notes have been unlocked yet. Please contact Admin at WhatsApp <strong>8974003523</strong> to assign your courses.
            </p>
            <a href="https://wa.me/918974003523" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366' }}>
              Chat with Admin on WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* PDF Study Sheet & Printable Document Modal */}
      {viewingPdfTopic && (
        <div className="modal-overlay" onClick={() => setViewingPdfTopic(null)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '2px solid var(--primary-indigo)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase' }}>
                  CBSE Informatics Practices (Code 065) • Official Revision Notes
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.2rem' }}>
                  {viewingPdfTopic.topicName}
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Tech Learn Institute • Director: Piyush (WhatsApp: 8974003523)
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <button 
                  onClick={handlePrintPdf}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#10b981' }}
                  title="Print or Save as PDF (Ctrl+P / Cmd+P)"
                >
                  <Printer size={15} /> 🖨️ Print / Save as PDF
                </button>
                <button 
                  onClick={() => setViewingPdfTopic(null)}
                  className="modal-close-btn"
                  style={{ position: 'static' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div style={{
              background: '#fff',
              color: '#1e293b',
              padding: '2rem',
              borderRadius: 'var(--radius-md)',
              lineHeight: '1.7',
              fontSize: '0.95rem'
            }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#0f172a', fontSize: '1.6rem', fontWeight: '800' }}>{viewingPdfTopic.topicName}</h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  CBSE Board Curriculum • Chapter Theory, Practical Code & Solved Questions
                </p>
              </div>

              <div style={{ whiteSpace: 'pre-line', marginBottom: '2rem' }}>
                {viewingPdfTopic.detailedNotes}
              </div>

              {viewingPdfTopic.exercises && viewingPdfTopic.exercises.length > 0 && (
                <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                  <h4 style={{ color: '#0f172a', fontSize: '1.15rem', marginBottom: '1rem', fontWeight: '700' }}>
                    📝 CBSE Solved Practice & Board Exam Questions:
                  </h4>
                  {viewingPdfTopic.exercises.map((ex, exIdx) => (
                    <div key={exIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', marginBottom: '0.8rem' }}>
                      <strong style={{ color: '#1e293b', display: 'block', marginBottom: '0.4rem' }}>{ex.question}</strong>
                      <div style={{ color: '#059669', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                        <strong>Solution:</strong> {ex.answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '0.78rem' }}>
                Tech Learn Coaching Institute • CBSE Class 11-12 IP & Data Science • Admin: 8974003523 • pp8842973@gmail.com
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.2rem', gap: '0.8rem' }}>
              <button 
                onClick={handlePrintPdf} 
                className="btn-primary"
                style={{ background: '#10b981' }}
              >
                <Printer size={15} /> 🖨️ Print / Save as PDF
              </button>
              <button 
                onClick={() => setViewingPdfTopic(null)} 
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
