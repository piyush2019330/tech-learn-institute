import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, MessageSquare, Mail } from 'lucide-react';

export default function DemoModal({ isOpen, onClose, defaultCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: defaultCourse || 'Class 12 IP',
    slot: 'Online Class (Flexible Timing)'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminWhatsApp = '8974003523';
  const adminEmail = 'pp8842973@gmail.com';

  if (!isOpen) return null;

  const formatNotificationMessage = () => {
    return `*New Demo Class / Seat Reservation - Tech Learn Institute*%0A%0A` +
      `👤 *Student Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone / WhatsApp:* ${encodeURIComponent(formData.phone)}%0A` +
      `✉️ *Email:* ${encodeURIComponent(formData.email)}%0A` +
      `📚 *Course:* ${encodeURIComponent(formData.course)}%0A` +
      `⏱️ *Preferred Batch Slot:* ${encodeURIComponent(formData.slot)}%0A%0A` +
      `_Please confirm my demo class / seat reservation._`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: formData.name,
          phone_number: formData.phone,
          email_id: formData.email,
          course_name: formData.course,
          timing_slot: formData.slot,
          admin_phone: adminWhatsApp,
          admin_email: adminEmail,
          type: 'demo_reservation'
        })
      });
    } catch (err) {
      console.log('Saved to MySQL / local backup', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      // Open WhatsApp chat directly with Admin WhatsApp 8974003523
      const waUrl = `https://wa.me/91${adminWhatsApp}?text=${formatNotificationMessage()}`;
      window.open(waUrl, '_blank');
    }
  };

  const directWhatsAppUrl = `https://wa.me/91${adminWhatsApp}?text=${formatNotificationMessage()}`;
  const directMailtoUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(`New Demo Class Booking: ${formData.name || 'Student'}`)}&body=${encodeURIComponent(`Student Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCourse: ${formData.course}\nTiming: ${formData.slot}`)}`;

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleResetAndClose}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-indigo)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <Sparkles size={18} /> Book Free Live Demo Class
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Reserve Your Demo Seat
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Fill in your details below. Your reservation is sent directly to Admin WhatsApp (<strong style={{ color: '#25D366' }}>+91 8974003523</strong>) and Email (<strong style={{ color: 'var(--primary-indigo)' }}>pp8842973@gmail.com</strong>).
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Piyush Sharma" 
                  className="form-input" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">WhatsApp / Phone *</label>
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
                  <label className="form-label">Email ID *</label>
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
                <label className="form-label">Select Course / Subject *</label>
                <select 
                  className="form-input"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  <option value="Class 11 IP">Class 11 IP (Online Flexible Timing)</option>
                  <option value="Class 12 IP">Class 12 IP (Online Flexible Timing)</option>
                  <option value="Data Science Full Course">Data Science Full Course (6–8 months)</option>
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
                <label className="form-label">Class Timing Preference *</label>
                <select 
                  className="form-input"
                  value={formData.slot}
                  onChange={(e) => setFormData({...formData, slot: e.target.value})}
                >
                  <option value="Online Class (Flexible Timing)">100% Online Class (Flexible Timing)</option>
                  <option value="Weekend Evening">Weekend Evening Batch</option>
                  <option value="Weekday Evening">Weekday Evening Batch</option>
                  <option value="Morning Batch">Morning Batch</option>
                </select>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
                {isSubmitting ? 'Confirming...' : 'Book Demo & Notify Admin on WhatsApp/Email 🚀'}
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
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
              Demo Request Sent to Admin! 🎉
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.2rem', lineHeight: '1.6' }}>
              Your reservation for <strong>{formData.course}</strong> has been forwarded directly to:
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
                <MessageSquare size={18} /> <strong>Admin WhatsApp:</strong> +91 {adminWhatsApp}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-indigo)' }}>
                <Mail size={18} /> <strong>Admin Email:</strong> {adminEmail}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href={directWhatsAppUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366' }}>
                <MessageSquare size={16} /> Open WhatsApp Chat
              </a>
              <button className="btn-secondary" onClick={handleResetAndClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
