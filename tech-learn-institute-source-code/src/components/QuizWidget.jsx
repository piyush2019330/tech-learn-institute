import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/coursesData';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';

export default function QuizWidget({ onOpenDemo }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowExplanation(true);
    if (idx === q.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowExplanation(false);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={14} /> Instant Knowledge Challenge
          </div>
          <h2 className="section-title">
            Test Your Knowledge with <span className="gradient-text">Quick IP & DS Quiz</span>
          </h2>
          <p className="section-subtitle">
            See how well you know Pandas, SQL, ML, and Power BI concepts!
          </p>
        </div>

        <div className="quiz-card">
          {!isCompleted ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Current Score: <strong style={{ color: 'var(--primary-indigo)' }}>{score}</strong></span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                {q.question}
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                {q.options.map((opt, idx) => {
                  let statusClass = '';
                  if (selectedOpt !== null) {
                    if (idx === q.correct) statusClass = 'correct';
                    else if (idx === selectedOpt) statusClass = 'incorrect';
                  }

                  return (
                    <button
                      key={idx}
                      className={`quiz-option ${statusClass}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOpt !== null}
                    >
                      <span>{opt}</span>
                      {selectedOpt !== null && idx === q.correct && <CheckCircle size={18} />}
                      {selectedOpt !== null && idx === selectedOpt && idx !== q.correct && <XCircle size={18} />}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div style={{
                  background: 'var(--bg-accent-subtle)',
                  border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)'
                }}>
                  <strong style={{ color: 'var(--primary-indigo)', display: 'block', marginBottom: '0.3rem' }}>
                    💡 Explanation:
                  </strong>
                  {q.explanation}
                </div>
              )}

              {selectedOpt !== null && (
                <button className="btn-primary" style={{ width: '100%' }} onClick={handleNext}>
                  {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'}
                </button>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
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
                <Award size={32} />
              </div>

              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                Quiz Completed! 🎉
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                You scored <strong>{score}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong> questions correctly.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-secondary" onClick={handleReset}>
                  <RotateCcw size={16} /> Retake Quiz
                </button>
                <button className="btn-primary" onClick={() => onOpenDemo('Quiz High Scorer')}>
                  <Sparkles size={16} /> Book Free Live Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
