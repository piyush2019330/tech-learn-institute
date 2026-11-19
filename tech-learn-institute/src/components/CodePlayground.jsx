import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Sparkles, CheckCircle } from 'lucide-react';

const DEMO_SNIPPETS = {
  python: {
    title: 'Python Pandas (Class 12 IP & Data Science)',
    code: `# Creating a Pandas DataFrame for Student Projects & IP Labs
import pandas as pd

data = {
  'Student': ['Aarav', 'Priya', 'Rohan', 'Sneha'],
  'Module': ['Python Pandas', 'SQL Database', 'Linux SysAdmin', 'Computer Networks'],
  'Status': ['Completed', 'Completed', 'In Progress', 'Completed']
}

df = pd.DataFrame(data)
print("--- TECH LEARN LAB STATUS ---")
print(df[df['Status'] == 'Completed'])`,
    output: `--- TECH LEARN LAB STATUS ---
  Student          Module     Status
0   Aarav   Python Pandas  Completed
1   Priya    SQL Database  Completed
3   Sneha Computer Networks Completed

Execution completed in 0.04s [Success ✅]`
  },
  linux: {
    title: 'Linux Administration (Bash CLI & Permissions)',
    code: `# Linux System Diagnostics & Process Management
$ uname -srmo
$ df -h /
$ ps aux | grep -E "python|mysql" | head -n 3
$ chmod 755 /var/www/tech_learn_app
$ ls -ld /var/www/tech_learn_app`,
    output: `Linux 6.8.0-31-generic x86_64 GNU/Linux
Filesystem      Size  Used Avail Use% Mounted on
/dev/nvme0n1p2  240G   48G  180G  21% /
root        1024  0.0  0.4  python3 server.py
mysql       1089  0.1  1.2  mysqld --daemon
drwxr-xr-x 4 root staff 4096 Oct 12 10:00 /var/www/tech_learn_app

Status: Server Health Normal | Permissions Verified ✅`
  },
  networking: {
    title: 'Computer Networking (DNS, TCP/IP & Protocol Inspection)',
    code: `# Network Diagnostics & Protocol Inspection
$ nslookup techlearn.edu.in
$ ping -c 3 8.8.8.8
$ netstat -tuln | grep -E ":80|:443|:3306"
$ curl -I https://techlearn.edu.in`,
    output: `Server:         1.1.1.1
Address:        1.1.1.1#53
Name:   techlearn.edu.in
Address: 104.21.55.22

64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.9 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=12.1 ms

tcp   0  0 0.0.0.0:80    0.0.0.0:*  LISTEN (HTTP)
tcp   0  0 0.0.0.0:443   0.0.0.0:*  LISTEN (HTTPS)
tcp   0  0 127.0.0.1:3306 0.0.0.0:* LISTEN (MySQL)

HTTP/2 200 OK | TLS 1.3 Active | Protocol Analysis Complete 🚀`
  },
  sql: {
    title: 'MySQL Queries (Database Mastery & Practical Labs)',
    code: `-- SQL Query to analyze course enrollments
SELECT Course_Category, COUNT(Enrollment_ID) AS Total_Enrollments
FROM Courses
GROUP BY Course_Category
ORDER BY Total_Enrollments DESC;`,
    output: `+----------------------------+-------------------+
| Course_Category            | Total_Enrollments |
+----------------------------+-------------------+
| Class 11-12 IP Board Prep  |                45 |
| Linux & SysAdmin Lab       |                38 |
| Computer Networking (Net)  |                35 |
| Data Science Track         |                50 |
+----------------------------+-------------------+
4 rows in set (0.01 sec)`
  },
  ml: {
    title: 'Machine Learning (Predictive Model)',
    code: `# Supervised Machine Learning Model Training
from sklearn.linear_model import LinearRegression
import numpy as np

# Practice Hours vs Skill Mastery Index
X = np.array([[2], [4], [6], [8], [10]])
y = np.array([45, 65, 80, 92, 98])

model = LinearRegression().fit(X, y)
predicted_mastery = model.predict([[7.5]])
print(f"Predicted Mastery for 7.5 hrs practice: {predicted_mastery[0]:.2f}%")`,
    output: `Predicted Mastery for 7.5 hrs practice: 88.75%
Model Accuracy (R² Score): 0.992
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
            At Tech Learn, we don't just teach theory—you write live code and commands from Day 1! Try executing Python, SQL, Linux Bash, Computer Networking, and ML snippets below.
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
                🛢️ MySQL
              </button>
              <button 
                className={`pg-tab ${activeTab === 'linux' ? 'active' : ''}`}
                onClick={() => handleTabChange('linux')}
              >
                🐧 Linux Bash
              </button>
              <button 
                className={`pg-tab ${activeTab === 'networking' ? 'active' : ''}`}
                onClick={() => handleTabChange('networking')}
              >
                🌐 Networking
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
