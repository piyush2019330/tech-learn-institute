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

  // Persistent Student Account State with per-course access control
  const [studentAccounts, setStudentAccounts] = useState([
    {
      id: 'std-101',
      name: 'Aarav Sharma',
      username: 'aarav12',
      email: 'aarav@gmail.com',
      password: 'password123',
      isAccessGranted: true, // Login Access Enabled
      unlockedCourses: ['class-12-ip', 'python-mastery'], // Specific unlocked courses
      registeredDate: '2026-10-04'
    },
    {
      id: 'std-102',
      name: 'Priya Verma',
      username: 'priya',
      email: 'priya@gmail.com',
      password: 'password123',
      isAccessGranted: true, // Login Access Enabled
      unlockedCourses: ['data-science-full'],
      registeredDate: '2026-10-04'
    },
    {
      id: 'std-103',
      name: 'Rohan Gupta',
      username: 'rohan',
      email: 'rohan@gmail.com',
      password: 'password123',
      isAccessGranted: false, // Access DISABLED by Admin until payment
      unlockedCourses: ['class-11-ip'],
      registeredDate: '2026-10-04'
    }
  ]);

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
        onBackToSite={() => setViewMode('website')} 
        studentAccounts={studentAccounts}
        setStudentAccounts={setStudentAccounts}
      />
    );
  }

  if (viewMode === 'student') {
    return (
      <StudentPortal 
        onBackToSite={() => setViewMode('website')} 
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
        onOpenAdmin={() => setViewMode('admin')}
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

      <Footer onOpenDemo={handleOpenDemo} />

      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        defaultCourse={demoCourseDefault} 
      />
    </div>
  );
}
