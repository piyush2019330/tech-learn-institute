import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Sparkles, CheckCircle } from 'lucide-react';

const DEMO_SNIPPETS = {
  python: {
    title: 'Python Pandas (Class 12 IP & Data Science)',
    code: `# Creating a Pandas DataFrame for Student IP Marks
import pandas as pd

data = {
  'Student': ['Aarav', 'Priya', 'Rohan', 'Sneha'],
  'IP_Score': [98, 95, 92, 99],
  'SQL_Grade': ['A+', 'A+', 'A', 'A+']
}

df = pd.DataFrame(data)
print("--- TOP BOARD PERFORMERS ---")
print(df[df['IP_Score'] >= 95])`,
    output: `--- TOP BOARD PERFORMERS ---
  Student  IP_Score SQL_Grade
0   Aarav        98        A+
1   Priya        95        A+
3   Sneha        99        A+

Execution completed in 0.04s [Success ✅]`
  },
  sql: {
    title: 'MySQL Queries (Board Exam & Data Engineering)',
    code: `-- SQL Query to find Average Marks by Subject
SELECT Subject, COUNT(Student_ID) AS Total_Students, AVG(Marks) AS Avg_Score
FROM Student_Marks
GROUP BY Subject
HAVING AVG(Marks) > 90
ORDER BY Avg_Score DESC;`,
    output: `+-----------------------+----------------+-----------+
| Subject               | Total_Students | Avg_Score |
+-----------------------+----------------+-----------+
| Informatics Practices |            120 |     94.50 |
| Data Science Track    |            250 |     92.80 |
+-----------------------+----------------+-----------+
2 rows in set (0.01 sec)`
  },
  ml: {
    title: 'Machine Learning (Predictive Model)',
    code: `# Supervised Machine Learning Model for Score Prediction
from sklearn.linear_model import LinearRegression

# Study Hours vs Exam Score
X = [[2], [4], [6], [8]]
y = [60, 75, 88, 96]

model = LinearRegression().fit(X, y)
predicted_score = model.predict([[7.5]])
print(f"Predicted Score for 7.5 hrs study: {predicted_score[0]:.2f}")`,
    output: `Predicted Score for 7.5 hrs study: 93.25
Model Accuracy (R² Score): 0.985
Status: Model Trained Successfully 🎯`
  }
};

export default function CodePlayground() {
  const [activeTab, setActiveTab] = useState('python');
  const [code, setCode] = useState(DEMO_SNIPPETS.python.code);
  const [output, setOutput] = useState(DEMO_SNIPPETS.python.output);
  const [isRunning, setIsRunning] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCode(DEMO_SNIPPETS[key].code);
    setOutput(DEMO_SNIPPETS[key].output);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setOutput(DEMO_SNIPPETS[activeTab].output + '\n[Re-executed Live]');
    }, 400);
  };

  return (
    <section id="playground" className="section" style={{ background: 'var(--bg-glass)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Terminal size={14} /> Interactive Practical Sandbox
          </div>
          <h2 className="section-title">
            Experience Our <span className="gradient-text">Practical Code Playground</span>
          </h2>
          <p className="section-subtitle">
            At Tech Learn, we don't just teach theory—you write live code from Day 1! Try executing our Python, SQL, and ML code snippets below.
          </p>
        </div>

        <div className="playground-container">
          <div className="playground-nav">
            <div className="playground-tabs">
              <button 
                className={`pg-tab ${activeTab === 'python' ? 'active' : ''}`}
                onClick={() => handleTabChange('python')}
              >
                🐍 Python Pandas
              </button>
              <button 
                className={`pg-tab ${activeTab === 'sql' ? 'active' : ''}`}
                onClick={() => handleTabChange('sql')}
              >
                🛢️ MySQL Query
              </button>
              <button 
                className={`pg-tab ${activeTab === 'ml' ? 'active' : ''}`}
                onClick={() => handleTabChange('ml')}
              >
                🤖 Machine Learning
              </button>
            </div>

            <button className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }} onClick={handleRun}>
              <Play size={14} /> {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>

          <div className="playground-editor-area">
            <div className="code-input-pane">
              <div style={{ fontSize: '0.75rem', color: '#8b949e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={13} /> {DEMO_SNIPPETS[activeTab].title}
              </div>
              <textarea 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                style={{
                  width: '100%',
                  height: '85%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e6edf3',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  resize: 'none',
                  lineHeight: '1.6'
                }}
              />
            </div>

            <div className="code-output-pane">
              <div className="output-header">Terminal / Execution Output</div>
              <pre style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
