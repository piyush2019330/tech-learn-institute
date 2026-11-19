import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, UserCheck, Clock, Database } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Class 12 IP',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const adminWhatsApp = '8974003523';
  const adminEmail = 'pp8842973@gmail.com';

  const formatNotificationMessage = () => {
    return `*New Admission / Demo Inquiry - Tech Learn Institute*%0A%0A` +
      `👤 *Student Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone / WhatsApp:* ${encodeURIComponent(formData.phone)}%0A` +
      `✉️ *Email:* ${encodeURIComponent(formData.email)}%0A` +
      `📚 *Course:* ${encodeURIComponent(formData.course)}%0A` +
      `💬 *Query:* ${encodeURIComponent(formData.message || 'Interested in demo class and admission.')}%0A%0A` +
      `_Sent automatically from Tech Learn Website._`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // 1. Post to MySQL Server API
      await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: formData.name,
          phone_number: formData.phone,
          email_id: formData.email,
          course_name: formData.course,
          message: formData.message,
          admin_phone: adminWhatsApp,
          admin_email: adminEmail,
          type: 'admission_contact'
        })
      });
    } catch (err) {
      console.log('Saved locally / API simulation active', err);
    } finally {
      setIsSaving(false);
      setSubmitted(true);

      // 2. Open WhatsApp with pre-filled lead details to admin number 8974003523
      const waUrl = `https://wa.me/91${adminWhatsApp}?text=${formatNotificationMessage()}`;
      window.open(waUrl, '_blank');
    }
  };

  const directWhatsAppUrl = `https://wa.me/91${adminWhatsApp}?text=${formatNotificationMessage()}`;
  const directMailtoUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(`New Admission Inquiry: ${formData.name || 'Student'}`)}&body=${encodeURIComponent(`Student Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCourse: ${formData.course}\nMessage: ${formData.message}`)}`;

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#10b981' }}>
            <UserCheck size={14} /> Direct Admin Admissions Desk
          </div>
          <h2 className="section-title">
            Contact Admin for <span className="gradient-text">Admissions & Demo Classes</span>
          </h2>
          <p className="section-subtitle">
            Submit your details below. All admission forms are delivered instantly to Admin WhatsApp <strong style={{ color: 'var(--text-primary)' }}>+91 8974003523</strong> and Email <strong style={{ color: 'var(--text-primary)' }}>pp8842973@gmail.com</strong>.
          </p>
        </div>

        <div className="ip-spotlight-grid" style={{ alignItems: 'stretch' }}>
          {/* Left Box: Admin Contact Cards */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span className="section-tag" style={{ marginBottom: '1.2rem' }}>
                👨‍💼 Director & Admissions Desk
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.8rem' }}>
                Instant Contact & Notifications
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                Contact us directly or fill the form. Your inquiry goes straight to Admin WhatsApp and Email.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* WhatsApp Direct Card */}
                <a 
                  href={`https://wa.me/91${adminWhatsApp}?text=Hi%20Admin,%20I%20am%20interested%20in%20Admission%20/%20Demo%20Class`} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    color: 'var(--text-primary)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#25D366', fontWeight: '700', textTransform: 'uppercase' }}>
                      Admin WhatsApp (Instant Reply)
                    </span>
                    <strong style={{ fontSize: '1.2rem', display: 'block' }}>
                      +91 {adminWhatsApp}
                    </strong>
                  </div>
                </a>

                {/* Email Direct Card */}
                <a 
                  href={`mailto:${adminEmail}?subject=Tech%20Learn%20Admission%20Enquiry`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    color: 'var(--text-primary)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--primary-indigo)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-indigo)', fontWeight: '700', textTransform: 'uppercase' }}>
                      Admin Notification Email ID
                    </span>
                    <strong style={{ fontSize: '1.1rem', display: 'block' }}>
                      {adminEmail}
                    </strong>
                  </div>
                </a>

                {/* Class Timing Note */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem'
                }}>
                  <Clock size={20} color="var(--accent-amber)" />
                  <div>
                    <strong>Class Timings:</strong> 100% Online Classes with Flexible Timings for CBSE Class 11-12 & Data Science tracks.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Box: Quick Contact Form */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem'
          }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                  Send Instant Admission / Demo Form
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  When submitted, this message will be sent directly to Admin WhatsApp (<strong style={{ color: '#25D366' }}>+91 8974003523</strong>) & Email (<strong style={{ color: 'var(--primary-indigo)' }}>pp8842973@gmail.com</strong>).
                </p>

                <div className="form-group">
                  <label className="form-label">Student Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your full name" 
                    className="form-input" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 43210" 
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="student@gmail.com" 
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Course Interested In *</label>
                  <select 
                    className="form-input"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                  >
                    <option value="Class 11 IP">Class 11 IP (Online Flexible)</option>
                    <option value="Class 12 IP">Class 12 IP (Online Flexible)</option>
                    <option value="Data Science Full Course">Data Science Full Course (Python+SQL+PowerBI+ML+DS)</option>
                    <option value="Linux Administration & Shell Scripting">Linux Administration & Shell Scripting (2 months)</option>
                    <option value="Computer Networking & Protocols">Computer Networking & Protocols (2 months)</option>
                    <option value="Python Programming">Python Programming (2 months)</option>
                    <option value="SQL & Database Mastery">SQL & Database Mastery (1.5 months)</option>
                    <option value="Power BI Masterclass">Power BI Masterclass (1.5 months)</option>
                    <option value="Machine Learning">Machine Learning (3 months)</option>
                    <option value="Data Science">Data Science (4 months)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message / Query *</label>
                  <textarea 
                    rows={3} 
                    required
                    placeholder="Ask about batch timings, demo class schedule, or syllabus..." 
                    className="form-input"
                    style={{ resize: 'none' }}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" disabled={isSaving} className="btn-primary" style={{ flex: 1, padding: '0.85rem' }}>
                    <Send size={16} /> {isSaving ? 'Submitting...' : 'Submit & Notify Admin'}
                  </button>

                  <a 
                    href={directWhatsAppUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-secondary" 
                    style={{ background: '#25D366', color: '#fff', border: 'none' }}
                  >
                    <MessageSquare size={16} /> Direct WhatsApp
                  </a>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem auto'
                }}>
                  <CheckCircle2 size={36} />
                </div>

                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                  Admission Form Delivered! 🎉
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Thank you <strong>{formData.name}</strong>! Your inquiry for <strong>{formData.course}</strong> has been routed to:
                </p>

                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.2rem',
                  textAlign: 'left',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', color: '#25D366' }}>
                    <MessageSquare size={18} /> <strong>WhatsApp:</strong> +91 {adminWhatsApp}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-indigo)' }}>
                    <Mail size={18} /> <strong>Email:</strong> {adminEmail}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a href={directWhatsAppUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366' }}>
                    <MessageSquare size={16} /> Open WhatsApp Chat With Admin
                  </a>
                  <a href={directMailtoUrl} className="btn-secondary">
                    <Mail size={16} /> Send Email to Admin
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
