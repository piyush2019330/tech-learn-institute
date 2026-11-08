import React, { useState, useEffect } from 'react';
import { COURSES as INITIAL_COURSES } from '../data/coursesData';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  BookOpen, 
  MessageSquare, 
  Trash2, 
  CheckCircle, 
  X, 
  Search, 
  Download, 
  Plus, 
  Lock, 
  Unlock,
  Key, 
  RefreshCw,
  Edit,
  Save,
  ArrowLeft,
  GraduationCap,
  Check,
  UserPlus
} from 'lucide-react';

export default function AdminPanel({ onBackToSite, studentAccounts, setStudentAccounts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Admin Data States
  const [admissions, setAdmissions] = useState([
    {
      id: 1,
      student_name: 'Aarav Sharma',
      phone_number: '8974003523',
      email_id: 'aarav@gmail.com',
      course_name: 'Class 12 IP',
      fee_amount: 'Online Batch',
      timing_slot: 'Online Class (Flexible Timing)',
      status: 'Confirmed',
      created_at: '2026-10-04 18:30:00'
    },
    {
      id: 2,
      student_name: 'Priya Verma',
      phone_number: '8974003523',
      email_id: 'priya@gmail.com',
      course_name: 'Data Science Full Course',
      fee_amount: 'Online Batch',
      timing_slot: 'Online Class (Flexible Timing)',
      status: 'Confirmed',
      created_at: '2026-10-04 19:15:00'
    }
  ]);

  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' | 'admissions' | 'courses'
  const [searchQuery, setSearchQuery] = useState('');

  // New Student Modal state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    username: '',
    email: '',
    phone: '8974003523',
    password: 'learn' + Math.floor(1000 + Math.random() * 9000),
    isAccessGranted: true,
    unlockedCourses: ['class-12-ip']
  });

  // Fetch real admissions from MySQL Server if available
  useEffect(() => {
    fetch('/api/admissions')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.admissions.length > 0) {
          setAdmissions(data.admissions);
        }
      })
      .catch(() => console.log('Using local admissions state'));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === '7742' || pinInput === '8974' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin Passcode! Use 7742 or 8974');
    }
  };

  // Toggle master login access for a student
  const toggleStudentAccess = (studentId) => {
    setStudentAccounts(prev => prev.map(std => {
      if (std.id === studentId) {
        return { ...std, isAccessGranted: !std.isAccessGranted };
      }
      return std;
    }));
  };

  // Toggle individual course access for a student
  const toggleCourseForStudent = (studentId, courseId) => {
    setStudentAccounts(prev => prev.map(std => {
      if (std.id === studentId) {
        const currentUnlocked = std.unlockedCourses || [];
        let newUnlocked = [];
        if (currentUnlocked.includes(courseId)) {
          newUnlocked = currentUnlocked.filter(id => id !== courseId);
        } else {
          newUnlocked = [...currentUnlocked, courseId];
        }
        return { ...std, unlockedCourses: newUnlocked };
      }
      return std;
    }));
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    const createdObj = {
      id: 'std-' + Date.now(),
      name: newStudent.name,
      username: newStudent.username || newStudent.name.toLowerCase().replace(/\s+/g, ''),
      email: newStudent.email,
      password: newStudent.password,
      isAccessGranted: newStudent.isAccessGranted,
      unlockedCourses: newStudent.unlockedCourses,
      registeredDate: new Date().toISOString().slice(0, 10)
    };

    setStudentAccounts(prev => [...prev, createdObj]);
    setShowAddStudentModal(false);

    // Send credentials via WhatsApp
    const waText = `Hi ${createdObj.name}, your Tech Learn Student Login credentials are ready!\n\nWebsite: http://localhost:3000/\nUsername/Email: ${createdObj.email}\nPassword: ${createdObj.password}\n\nPlease login to access your course notes.`;
    window.open(`https://wa.me/918974003523?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student login account?')) {
      setStudentAccounts(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const ALL_AVAILABLE_COURSES = [
    { id: 'class-11-ip', label: 'Class 11 IP (CBSE 065)' },
    { id: 'class-12-ip', label: 'Class 12 IP (CBSE 065)' },
    { id: 'data-science-full', label: 'Data Science Full Course (5-in-1)' },
    { id: 'linux-fundamentals', label: 'Linux Administration & Shell Scripting' },
    { id: 'computer-networking', label: 'Computer Networking & Protocols' },
    { id: 'python-mastery', label: 'Python Programming' },
    { id: 'sql-database', label: 'SQL & Database Mastery' },
    { id: 'power-bi', label: 'Power BI Masterclass' },
    { id: 'machine-learning', label: 'Machine Learning' },
    { id: 'data-science-individual', label: 'Data Science' }
  ];

  // Auth Screen
  if (!isAuthenticated) {
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
          maxWidth: '440px',
          width: '100%',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.2rem auto',
            color: '#fff'
          }}>
            <ShieldCheck size={32} />
          </div>

          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.4rem' }}>
            Admin Control Portal
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>
            Tech Learn Admin Console (<code style={{ color: 'var(--primary-indigo)' }}>Tech_learn</code> MySQL DB)
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Admin Passcode / PIN *</label>
              <input 
                type="password" 
                required
                placeholder="Enter Passcode (7742 or 8974)" 
                className="form-input" 
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
              />
            </div>

            {pinError && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                {pinError}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <Key size={16} /> Unlock Admin Dashboard
            </button>

            <button 
              type="button" 
              className="btn-secondary" 
              style={{ width: '100%', marginTop: '0.8rem' }}
              onClick={onBackToSite}
            >
              <ArrowLeft size={16} /> Return to Main Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main View
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingBottom: '4rem' }}>
      {/* Top Navbar */}
      <header style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div className="brand-icon" style={{ width: '36px', height: '36px' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                Tech Learn <span className="gradient-text">Admin Dashboard</span>
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Database: Tech_learn | Admin WhatsApp: 8974003523
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-secondary" onClick={onBackToSite} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <ArrowLeft size={15} /> Back to Website
            </button>
            <button className="btn-primary" onClick={() => setIsAuthenticated(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#ef4444' }}>
              Lock Portal
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered Student Accounts</span>
              <GraduationCap size={20} color="var(--primary-indigo)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {studentAccounts.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>Per-Course Access Control</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Login Access Granted</span>
              <Unlock size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {studentAccounts.filter(s => s.isAccessGranted).length} / {studentAccounts.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>Admin Approved Logins</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Student Admissions Log</span>
              <Users size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {admissions.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-amber)' }}>Tech_learn.admissions DB</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="filter-tabs" style={{ marginBottom: 0 }}>
            <button 
              className={`tab-btn ${activeTab === 'accounts' ? 'active' : ''}`}
              onClick={() => setActiveTab('accounts')}
            >
              🔐 Student Login & Course Access Manager ({studentAccounts.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('admissions')}
            >
              📋 Admissions Log ({admissions.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 Course Catalog & Batches ({courses.length})
            </button>
          </div>

          {activeTab === 'accounts' && (
            <button className="btn-primary" onClick={() => setShowAddStudentModal(true)} style={{ padding: '0.65rem 1.2rem' }}>
              <UserPlus size={16} /> Create Student Credential & Send WhatsApp
            </button>
          )}
        </div>

        {/* TAB 1: Student Login & Granular Course Access Manager */}
        {activeTab === 'accounts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {studentAccounts.map((std) => (
              <div 
                key={std.id}
                style={{
                  background: 'var(--bg-card)',
                  border: std.isAccessGranted ? '1px solid var(--border-glow)' : '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{std.name}</strong>
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'var(--bg-main)', color: 'var(--text-muted)' }}>
                        ID: {std.id}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'flex', gap: '1.5rem' }}>
                      <span>✉️ Email/Username: <strong>{std.email}</strong></span>
                      <span>🔑 Password: <code style={{ color: 'var(--accent-amber)' }}>{std.password}</code></span>
                      <span>📅 Date: {std.registeredDate || 'Recent'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Master Access Toggle Button */}
                    <button
                      onClick={() => toggleStudentAccess(std.id)}
                      className="btn-primary"
                      style={{
                        background: std.isAccessGranted ? '#10b981' : '#ef4444',
                        padding: '0.55rem 1.1rem',
                        fontSize: '0.85rem'
                      }}
                    >
                      {std.isAccessGranted ? <Unlock size={15} /> : <Lock size={15} />}
                      {std.isAccessGranted ? 'Login Access ENABLED' : 'Login Access DISABLED'}
                    </button>

                    <a
                      href={`https://wa.me/918974003523?text=${encodeURIComponent(`Hi ${std.name}, here are your Tech Learn login details:\nUsername/Email: ${std.email}\nPassword: ${std.password}\nLogin Status: ${std.isAccessGranted ? 'Active' : 'Disabled'}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ background: '#25D366', color: '#fff', border: 'none', padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
                    >
                      <MessageSquare size={15} /> Send Info on WhatsApp
                    </a>

                    <button 
                      onClick={() => handleDeleteStudent(std.id)}
                      style={{ background: 'transparent', color: '#ef4444', border: 'none' }}
                      title="Delete Student Account"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Granular Per-Course Unlock Checkboxes */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BookOpen size={16} color="var(--primary-indigo)" />
                    Unlocked Courses for {std.name} (Select one by one):
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.8rem' }}>
                    {ALL_AVAILABLE_COURSES.map((course) => {
                      const isUnlocked = (std.unlockedCourses || []).includes(course.id);

                      return (
                        <label 
                          key={course.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            background: isUnlocked ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-main)',
                            border: isUnlocked ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)',
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)'
                          }}
                        >
                          <input 
                            type="checkbox"
                            checked={isUnlocked}
                            onChange={() => toggleCourseForStudent(std.id, course.id)}
                            style={{ width: '16px', height: '16px', accentColor: 'var(--primary-indigo)' }}
                          />
                          <span>{course.label}</span>
                          {isUnlocked && <Check size={14} color="#10b981" style={{ marginLeft: 'auto' }} />}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Admissions Table */}
        {activeTab === 'admissions' && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem 1.2rem' }}>ID</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Student Name</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Contact Info</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Course Enrolled</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Class Timing</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '1rem 1.2rem', fontWeight: 'bold' }}>#{item.id}</td>
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{item.student_name}</strong>
                      </td>
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <div>📞 {item.phone_number}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✉️ {item.email_id}</div>
                      </td>
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <span style={{ color: 'var(--primary-indigo)', fontWeight: '700' }}>{item.course_name}</span>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>{item.fee_amount || 'Reserved'}</div>
                      </td>
                      <td style={{ padding: '1rem 1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {item.timing_slot || 'Online Class (Flexible Timing)'}
                      </td>
                      <td style={{ padding: '1rem 1.2rem' }}>
                        <a 
                          href={`https://wa.me/918974003523?text=Hi%20${encodeURIComponent(item.student_name)},%20this%20is%20Admin%20from%20Tech%20Learn%20regarding%20your%20admission.`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', background: '#25D366', color: '#fff', border: 'none', fontSize: '0.8rem' }}
                        >
                          <MessageSquare size={14} /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Course Catalog & Batches */}
        {activeTab === 'courses' && (
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div>
                  <span className={`course-badge-top ${course.badgeClass}`}>
                    {course.badge}
                  </span>
                  <h3 className="course-title" style={{ marginTop: '1.2rem' }}>{course.title}</h3>
                  <p className="course-desc">{course.shortDesc}</p>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Duration: <strong>{course.duration}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      ✓ Admissions Open (100% Online)
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--primary-indigo)', fontWeight: 600 }}>
                      Flexible Timings
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create New Student Account */}
      {showAddStudentModal && (
        <div className="modal-overlay" onClick={() => setShowAddStudentModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowAddStudentModal(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem' }}>
              Create New Student Login Credential
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Generate login ID & password for a student and grant specific course access.
            </p>

            <form onSubmit={handleCreateStudent}>
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Piyush" 
                  className="form-input"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email / Username *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="student@gmail.com" 
                    className="form-input"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value, username: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Generated Password *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input"
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Enable Login Access Immediately?</label>
                <select 
                  className="form-input"
                  value={newStudent.isAccessGranted ? 'yes' : 'no'}
                  onChange={(e) => setNewStudent({...newStudent, isAccessGranted: e.target.value === 'yes'})}
                >
                  <option value="yes">YES — Grant Login Access Immediately</option>
                  <option value="no">NO — Keep Access Disabled Until Payment</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
                Create Student Account & Send to WhatsApp (8974003523) 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
