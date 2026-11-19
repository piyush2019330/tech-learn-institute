import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import IPSpecialSection from './components/IPSpecialSection';
import CodePlayground from './components/CodePlayground';
import QuizWidget from './components/QuizWidget';
import FeeCalculator from './components/FeeCalculator';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import StudentPortal from './components/StudentPortal';
import DemoModal from './components/DemoModal';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [viewMode, setViewMode] = useState('website'); // 'website' | 'admin' | 'student'
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoCourseDefault, setDemoCourseDefault] = useState('Data Science Full Course (Python + SQL + Power BI + ML + DS)');

  // Persistent Student Account State with localStorage sync
  const [studentAccounts, setStudentAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('tech_learn_students');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return [
      {
        id: 'std-101',
        name: 'Aarav Sharma',
        username: 'aarav12',
        email: 'aarav@gmail.com',
        password: 'password123',
        isAccessGranted: true,
        unlockedCourses: ['class-12-ip', 'python-mastery'],
        registeredDate: '2026-10-04'
      },
      {
        id: 'std-102',
        name: 'Priya Verma',
        username: 'priya',
        email: 'priya@gmail.com',
        password: 'password123',
        isAccessGranted: true,
        unlockedCourses: ['data-science-full'],
        registeredDate: '2026-10-04'
      },
      {
        id: 'std-103',
        name: 'Rohan Gupta',
        username: 'rohan',
        email: 'rohan@gmail.com',
        password: 'password123',
        isAccessGranted: false,
        unlockedCourses: ['class-11-ip'],
        registeredDate: '2026-10-04'
      }
    ];
  });

  // Save student accounts to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('tech_learn_students', JSON.stringify(studentAccounts));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [studentAccounts]);

  // Secret Admin URL & Keyboard Shortcut Listener
  // Normal visitors will NEVER see any admin button on the website.
  // Admin can access via:
  // 1) Secret URL hash: /#admin or /#admin-portal
  // 2) Keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  // 3) Discreet trigger in footer
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        hash === '#admin' || 
        hash === '#/admin' || 
        hash === '#admin-portal' || 
        hash === '#secret-admin' || 
        pathname === '/admin' ||
        search.includes('admin=true') ||
        search.includes('portal=admin')
      ) {
        setViewMode('admin');
      } else if (
        hash === '#student' || 
        hash === '#/student' || 
        hash === '#student-portal' || 
        pathname === '/student'
      ) {
        setViewMode('student');
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    // Global Secret Shortcut: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.location.hash = '#admin-portal';
        setViewMode('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackToSite = () => {
    if (window.location.hash.includes('admin') || window.location.hash.includes('student')) {
      try {
        window.history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
    setViewMode('website');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenDemo = (courseName) => {
    if (courseName) {
      setDemoCourseDefault(courseName);
    }
    setIsDemoOpen(true);
  };

  if (viewMode === 'admin') {
    return (
      <AdminPanel 
        onBackToSite={handleBackToSite} 
        studentAccounts={studentAccounts}
        setStudentAccounts={setStudentAccounts}
      />
    );
  }

  if (viewMode === 'student') {
    return (
      <StudentPortal 
        onBackToSite={handleBackToSite} 
        studentAccounts={studentAccounts}
      />
    );
  }

  return (
    <div className="app-root">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenDemo={handleOpenDemo}
        onOpenStudentPortal={() => setViewMode('student')}
      />

      <main>
        <Hero onOpenDemo={handleOpenDemo} />
        <CourseCatalog onOpenDemo={handleOpenDemo} />
        <IPSpecialSection onOpenDemo={handleOpenDemo} />
        <CodePlayground />
        <QuizWidget onOpenDemo={handleOpenDemo} />
        <FeeCalculator onOpenDemo={handleOpenDemo} />
        <Testimonials />
        <ContactSection />
      </main>

      <Footer 
        onOpenDemo={handleOpenDemo} 
        onSecretAdmin={() => setViewMode('admin')}
      />

      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        defaultCourse={demoCourseDefault} 
      />
    </div>
  );
}
