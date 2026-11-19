import React, { useState, useEffect } from 'react';
import { COURSES as INITIAL_COURSES } from '../data/coursesData';
import { 
  ShieldCheck, 
  Users, 
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
  UserPlus,
  FileSpreadsheet,
  Database,
  Phone,
  Mail,
  Settings,
  AlertCircle
} from 'lucide-react';

export default function AdminPanel({ onBackToSite, studentAccounts, setStudentAccounts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('tech_learn_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Admin Data States
  const [admissions, setAdmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('tech_learn_admissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
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
    ];
  });

  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('tech_learn_courses');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_COURSES;
  });

  const [activeTab, setActiveTab] = useState('accounts'); // 'accounts' | 'admissions' | 'courses' | 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [admissionsFilter, setAdmissionsFilter] = useState('all');

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddAdmissionModal, setShowAddAdmissionModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  // New Student state
  const [newStudent, setNewStudent] = useState({
    name: '',
    username: '',
    email: '',
    phone: '8974003523',
    password: 'learn' + Math.floor(1000 + Math.random() * 9000),
    isAccessGranted: true,
    unlockedCourses: ['class-12-ip']
  });

  // New Admission state
  const [newAdmission, setNewAdmission] = useState({
    student_name: '',
    phone_number: '8974003523',
    email_id: '',
    course_name: 'Class 12 IP',
    timing_slot: 'Online Class (Flexible Timing)',
    message: 'Enrolled via Admin Console'
  });

  // New Course state
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'individual',
    badge: 'Certified',
    duration: '2 months',
    shortDesc: ''
  });

  // Password editing state for students
  const [editingPasswordStudentId, setEditingPasswordStudentId] = useState(null);
  const [tempPassword, setTempPassword] = useState('');

  // Sync admissions with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tech_learn_admissions', JSON.stringify(admissions));
    } catch (e) {}
  }, [admissions]);

  // Sync courses with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tech_learn_courses', JSON.stringify(courses));
    } catch (e) {}
  }, [courses]);

  // Fetch real admissions from MySQL Server if available
  useEffect(() => {
    fetch('/api/admissions')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.admissions && data.admissions.length > 0) {
          setAdmissions(data.admissions);
        }
      })
      .catch(() => console.log('Using local admissions state'));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === '7742' || pinInput === '8974' || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('tech_learn_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid Admin Passcode! Use 7742 or 8974');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tech_learn_admin_auth');
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

  const handleSaveStudentPassword = (studentId) => {
    if (!tempPassword.trim()) return;
    setStudentAccounts(prev => prev.map(s => s.id === studentId ? { ...s, password: tempPassword.trim() } : s));
    setEditingPasswordStudentId(null);
    setTempPassword('');
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    const createdObj = {
      id: 'std-' + Date.now(),
      name: newStudent.name,
      username: newStudent.username || newStudent.name.toLowerCase().replace(/\s+/g, ''),
      email: newStudent.email,
      phone: newStudent.phone || '8974003523',
      password: newStudent.password,
      isAccessGranted: newStudent.isAccessGranted,
      unlockedCourses: newStudent.unlockedCourses,
      registeredDate: new Date().toISOString().slice(0, 10)
    };

    setStudentAccounts(prev => [...prev, createdObj]);
    setShowAddStudentModal(false);

    // Send credentials via WhatsApp
    const waText = `Hi ${createdObj.name}, your Tech Learn Student Login credentials are ready!\n\nWebsite: https://tech-learn-institute.vercel.app/\nUsername/Email: ${createdObj.email}\nPassword: ${createdObj.password}\n\nPlease login to access your course notes.`;
    window.open(`https://wa.me/918974003523?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student account?')) {
      setStudentAccounts(prev => prev.filter(s => s.id !== studentId));
    }
  };

  const handleCreateAdmission = (e) => {
    e.preventDefault();
    const createdAdmission = {
      id: Date.now(),
      student_name: newAdmission.student_name,
      phone_number: newAdmission.phone_number,
      email_id: newAdmission.email_id,
      course_name: newAdmission.course_name,
      timing_slot: newAdmission.timing_slot,
      fee_amount: 'Online Batch',
      message: newAdmission.message,
      status: 'Confirmed',
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19)
    };
    setAdmissions(prev => [createdAdmission, ...prev]);
    setShowAddAdmissionModal(false);
  };

  const handleUpdateAdmissionStatus = (id, newStatus) => {
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDeleteAdmission = (id) => {
    if (window.confirm('Are you sure you want to delete this admission record?')) {
      setAdmissions(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const courseObj = {
      id: 'custom-' + Date.now(),
      title: newCourse.title,
      category: newCourse.category,
      badge: newCourse.badge || 'Admissions Open',
      badgeClass: 'badge-pro',
      iconType: 'book',
      rating: 4.95,
      studentsCount: 'Online Batches',
      shortDesc: newCourse.shortDesc || 'Comprehensive online training course with flexible timings.',
      duration: newCourse.duration,
      level: 'All Levels',
      mode: '100% Online Class with Flexible Timings',
      highlights: ['100% Live Online Classes', 'Flexible Batches', 'Practical File & Doubt Support'],
      syllabus: [{ module: 'Module 1: Foundations', topics: ['Core Concepts', 'Practical Projects'] }]
    };
    setCourses(prev => [...prev, courseObj]);
    setShowAddCourseModal(false);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to remove this course from the catalog?')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  // CSV Export functions
  const exportAdmissionsCSV = () => {
    const headers = ['ID,Student Name,Phone,Email,Course,Timing Slot,Status,Date'];
    const rows = admissions.map(a => 
      `"${a.id}","${a.student_name}","${a.phone_number}","${a.email_id}","${a.course_name}","${a.timing_slot}","${a.status}","${a.created_at}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tech_Learn_Admissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportStudentsCSV = () => {
    const headers = ['ID,Student Name,Username,Email,Phone,Password,Access Granted,Unlocked Courses,Registered Date'];
    const rows = studentAccounts.map(s => 
      `"${s.id}","${s.name}","${s.username}","${s.email}","${s.phone || ''}","${s.password}","${s.isAccessGranted ? 'YES' : 'NO'}","${(s.unlockedCourses || []).join(';')}","${s.registeredDate || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tech_Learn_Students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Auth Screen (Private Login)
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
            Director Admin Portal
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>
            Private Management Console • <code style={{ color: 'var(--primary-indigo)' }}>Tech_learn</code> Database
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Director Passcode / PIN *</label>
              <input 
                type="password" 
                required
                autoFocus
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
              <Key size={16} /> Unlock Management Dashboard
            </button>

            <button 
              type="button" 
              className="btn-secondary" 
              style={{ width: '100%', marginTop: '0.8rem' }}
              onClick={onBackToSite}
            >
              <ArrowLeft size={16} /> Return to Public Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredStudents = studentAccounts.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmissions = admissions.filter(a => {
    if (admissionsFilter !== 'all' && a.status.toLowerCase() !== admissionsFilter.toLowerCase()) return false;
    if (!searchQuery) return true;
    return (
      a.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone_number.includes(searchQuery) ||
      a.course_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Admin Dashboard Main View
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingBottom: '4rem' }}>
      {/* Top Navbar */}
      <header style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div className="brand-icon" style={{ width: '36px', height: '36px' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                Tech Learn <span className="gradient-text">Private Director Console</span>
              </h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Database: Tech_learn | Admin WhatsApp: 8974003523 | Director: Piyush
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button className="btn-secondary" onClick={onBackToSite} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <ArrowLeft size={15} /> Back to Website
            </button>
            <button className="btn-primary" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#ef4444' }}>
              <Lock size={15} /> Lock Portal
            </button>
          </div>
        </div>
      </header>

      {/* Secret Access Instruction Banner */}
      <div className="container" style={{ marginTop: '1.5rem' }}>
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-md)',
          padding: '0.9rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.8rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)'
        }}>
          <div>
            🔒 <strong>Private Access Notice:</strong> This admin page is completely hidden from public visitors. You can open it anytime using URL <code style={{ color: 'var(--primary-indigo)' }}>/#admin</code>, pressing shortcut <code style={{ color: 'var(--primary-indigo)' }}>Ctrl + Shift + A</code>, or by clicking the secret dot in the footer.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={exportStudentsCSV} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
              <Download size={13} /> Export Students CSV
            </button>
            <button onClick={exportAdmissionsCSV} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
              <Download size={13} /> Export Admissions CSV
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '1.5rem' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Registered Students</span>
              <GraduationCap size={20} color="var(--primary-indigo)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {studentAccounts.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>Per-Course Access Control</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Login Granted</span>
              <Unlock size={20} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {studentAccounts.filter(s => s.isAccessGranted).length} / {studentAccounts.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)' }}>Admin Approved Access</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Admissions Log</span>
              <Users size={20} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {admissions.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-amber)' }}>Tech_learn.admissions DB</span>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Catalog Courses</span>
              <BookOpen size={20} color="#06b6d4" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              {courses.length}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#06b6d4' }}>Active Curricula</span>
          </div>
        </div>

        {/* Tab Navigation & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="filter-tabs" style={{ marginBottom: 0 }}>
            <button 
              className={`tab-btn ${activeTab === 'accounts' ? 'active' : ''}`}
              onClick={() => setActiveTab('accounts')}
            >
              🔐 Student Accounts ({studentAccounts.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'admissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('admissions')}
            >
              📋 Admissions & Leads ({admissions.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              📚 Course Catalog ({courses.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings & Database
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
            {activeTab === 'accounts' && (
              <button className="btn-primary" onClick={() => setShowAddStudentModal(true)} style={{ padding: '0.65rem 1.2rem' }}>
                <UserPlus size={16} /> Add Student & Send WhatsApp
              </button>
            )}

            {activeTab === 'admissions' && (
              <button className="btn-primary" onClick={() => setShowAddAdmissionModal(true)} style={{ padding: '0.65rem 1.2rem' }}>
                <Plus size={16} /> Add Manual Admission
              </button>
            )}

            {activeTab === 'courses' && (
              <button className="btn-primary" onClick={() => setShowAddCourseModal(true)} style={{ padding: '0.65rem 1.2rem' }}>
                <Plus size={16} /> Add New Course
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {(activeTab === 'accounts' || activeTab === 'admissions') && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                placeholder={activeTab === 'accounts' ? "Search student by name, email, or username..." : "Search admission by student name, phone, or course..."}
                className="form-input"
                style={{ paddingLeft: '2.8rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTab === 'admissions' && (
              <select 
                className="form-input" 
                style={{ width: 'auto' }}
                value={admissionsFilter}
                onChange={(e) => setAdmissionsFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
              </select>
            )}
          </div>
        )}

        {/* TAB 1: Student Login & Granular Course Access Manager */}
        {activeTab === 'accounts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredStudents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', color: 'var(--text-muted)' }}>
                No student accounts found matching "{searchQuery}".
              </div>
            ) : (
              filteredStudents.map((std) => (
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

                      <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <span>✉️ Email/Username: <strong>{std.email}</strong></span>
                        <span>
                          🔑 Password: 
                          {editingPasswordStudentId === std.id ? (
                            <span style={{ display: 'inline-flex', gap: '0.4rem', marginLeft: '0.4rem' }}>
                              <input 
                                type="text" 
                                value={tempPassword} 
                                onChange={(e) => setTempPassword(e.target.value)}
                                className="form-input"
                                style={{ padding: '0.2rem 0.5rem', width: '130px', fontSize: '0.85rem' }}
                              />
                              <button onClick={() => handleSaveStudentPassword(std.id)} className="btn-primary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                                <Save size={12} /> Save
                              </button>
                            </span>
                          ) : (
                            <code 
                              onClick={() => { setEditingPasswordStudentId(std.id); setTempPassword(std.password); }}
                              style={{ color: 'var(--accent-amber)', cursor: 'pointer', marginLeft: '0.3rem' }}
                              title="Click to edit password"
                            >
                              {std.password} ✎
                            </code>
                          )}
                        </span>
                        <span>📅 Registered: {std.registeredDate || 'Recent'}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
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
                        href={`https://wa.me/918974003523?text=${encodeURIComponent(`Hi ${std.name}, here are your Tech Learn Student Login credentials:\nWebsite: https://tech-learn-institute.vercel.app/\nUsername/Email: ${std.email}\nPassword: ${std.password}\nLogin Access: ${std.isAccessGranted ? 'Active' : 'Disabled'}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                        style={{ background: '#25D366', color: '#fff', border: 'none', padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
                      >
                        <MessageSquare size={15} /> WhatsApp Credentials
                      </a>

                      <button 
                        onClick={() => handleDeleteStudent(std.id)}
                        style={{ background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer' }}
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
              ))
            )}
          </div>
        )}

        {/* TAB 2: Admissions & Leads Table */}
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
                    <th style={{ padding: '1rem 1.2rem' }}>Status</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                        No admissions found.
                      </td>
                    </tr>
                  ) : (
                    filteredAdmissions.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '1rem 1.2rem', fontWeight: 'bold' }}>#{item.id}</td>
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{item.student_name}</strong>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.created_at || 'Recent'}</span>
                        </td>
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <div>📞 {item.phone_number}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✉️ {item.email_id}</div>
                        </td>
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <span style={{ color: 'var(--primary-indigo)', fontWeight: '700' }}>{item.course_name}</span>
                          <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>{item.fee_amount || 'Online Batch'}</div>
                        </td>
                        <td style={{ padding: '1rem 1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {item.timing_slot || 'Online Class (Flexible Timing)'}
                        </td>
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <select 
                            value={item.status || 'Confirmed'}
                            onChange={(e) => handleUpdateAdmissionStatus(item.id, e.target.value)}
                            style={{
                              padding: '0.3rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              background: 'var(--bg-main)',
                              border: '1px solid var(--border-subtle)',
                              fontSize: '0.8rem',
                              color: item.status === 'Confirmed' ? '#10b981' : item.status === 'Contacted' ? '#3b82f6' : '#f59e0b'
                            }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                        <td style={{ padding: '1rem 1.2rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <a 
                              href={`https://wa.me/91${item.phone_number.replace(/\D/g, '') || '8974003523'}?text=Hi%20${encodeURIComponent(item.student_name)},%20this%20is%20Admin%20from%20Tech%20Learn%20Institute%20regarding%20your%20${encodeURIComponent(item.course_name)}%20admission.`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-secondary"
                              style={{ padding: '0.35rem 0.65rem', background: '#25D366', color: '#fff', border: 'none', fontSize: '0.8rem' }}
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={14} /> WhatsApp
                            </a>
                            <button
                              onClick={() => handleDeleteAdmission(item.id)}
                              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                              title="Delete Admission"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className={`course-badge-top ${course.badgeClass || 'badge-pro'}`}>
                    {course.badge || 'Active'}
                  </span>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    title="Delete Course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <h3 className="course-title" style={{ marginTop: '1.2rem' }}>{course.title}</h3>
                <p className="course-desc">{course.shortDesc}</p>

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

        {/* TAB 4: Settings & Database Management */}
        {activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <Database size={22} color="var(--primary-indigo)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>MySQL Database Status</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div>🗄️ <strong>Database Name:</strong> <code style={{ color: 'var(--primary-indigo)' }}>Tech_learn</code></div>
                <div>👤 <strong>User:</strong> <code style={{ color: 'var(--primary-indigo)' }}>root</code></div>
                <div>🌐 <strong>Host:</strong> <code style={{ color: 'var(--primary-indigo)' }}>localhost:3306</code></div>
                <div>📊 <strong>Active Tables:</strong> <code>admin_config, admissions, courses, students, demo_bookings, contact_inquiries</code></div>
                <div>🔒 <strong>Security Layer:</strong> CSP, HSTS, Rate Limiting, PBKDF2 Password Hashing</div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
                <Settings size={22} color="var(--accent-amber)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Institute Configuration</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div>👨‍🏫 <strong>Director:</strong> Piyush</div>
                <div>📞 <strong>Admin WhatsApp:</strong> <code style={{ color: '#25D366' }}>8974003523</code></div>
                <div>✉️ <strong>Admin Email:</strong> <code style={{ color: 'var(--primary-indigo)' }}>pp8842973@gmail.com</code></div>
                <div>🔑 <strong>Master Passcodes:</strong> <code>7742</code> or <code>8974</code></div>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.6rem' }}>
                  <button onClick={exportStudentsCSV} className="btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}>
                    <FileSpreadsheet size={14} /> Download Students CSV
                  </button>
                  <button onClick={exportAdmissionsCSV} className="btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}>
                    <FileSpreadsheet size={14} /> Download Admissions CSV
                  </button>
                </div>
              </div>
            </div>
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
                  placeholder="e.g. Rahul Sharma" 
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

      {/* Modal: Add Manual Admission */}
      {showAddAdmissionModal && (
        <div className="modal-overlay" onClick={() => setShowAddAdmissionModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowAddAdmissionModal(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem' }}>
              Add Manual Admission Record
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Directly record an offline, phone, or referral admission into the database.
            </p>

            <form onSubmit={handleCreateAdmission}>
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Sneha Patel" 
                  className="form-input"
                  value={newAdmission.student_name}
                  onChange={(e) => setNewAdmission({...newAdmission, student_name: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="9876543210" 
                    className="form-input"
                    value={newAdmission.phone_number}
                    onChange={(e) => setNewAdmission({...newAdmission, phone_number: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email ID</label>
                  <input 
                    type="email" 
                    placeholder="student@gmail.com" 
                    className="form-input"
                    value={newAdmission.email_id}
                    onChange={(e) => setNewAdmission({...newAdmission, email_id: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Course Enrolled *</label>
                <select 
                  className="form-input"
                  value={newAdmission.course_name}
                  onChange={(e) => setNewAdmission({...newAdmission, course_name: e.target.value})}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
                Save Admission Record to Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Course */}
      {showAddCourseModal && (
        <div className="modal-overlay" onClick={() => setShowAddCourseModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowAddCourseModal(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem' }}>
              Add New Course to Catalog
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Expand your institute curriculum with a new subject.
            </p>

            <form onSubmit={handleAddCourse}>
              <div className="form-group">
                <label className="form-label">Course Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Cloud Computing & AWS Fundamentals" 
                  className="form-input"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                  >
                    <option value="individual">Modular Tech Course</option>
                    <option value="cbse">CBSE School IP</option>
                    <option value="career-track">Full Career Track</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2 months" 
                    className="form-input"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea 
                  rows={2}
                  placeholder="Summary of skills learned in this course..."
                  className="form-input"
                  value={newCourse.shortDesc}
                  onChange={(e) => setNewCourse({...newCourse, shortDesc: e.target.value})}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
                Publish Course to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
