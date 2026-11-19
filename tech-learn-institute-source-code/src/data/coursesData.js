export const COURSES = [
  {
    id: 'class-11-ip',
    title: 'Class 11 Informatics Practices (IP)',
    category: 'cbse',
    badge: 'CBSE Code 065',
    badgeClass: 'badge-board',
    iconType: 'book',
    rating: 4.95,
    studentsCount: '450+ CBSE Students',
    shortDesc: 'Complete 100/100 scoring track for Class 11 IP syllabus with Python basics, SQL, and NCERT practical labs.',
    duration: 'Online Classes (Flexible Timings)',
    level: 'School CBSE Board Level',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      '100% Online Live Classes with Flexible Timings',
      'Python Logic, Control Flow & Data Structures',
      'MySQL Database & Basic SQL Queries',
      'Complete NCERT Syllabus & Practical File Help',
      '1-on-1 Personalized Doubt Solving Sessions',
      'Class 11 Final Exam Sample Question Drills'
    ],
    syllabus: [
      {
        module: 'Module 1: Computer System & Python Basics',
        topics: ['Introduction to Computer System', 'Python Syntax, Variables & Operators', 'Conditional Logic & Loops (If-Else, For, While)', 'Lists & Dictionaries']
      },
      {
        module: 'Module 2: Database Concepts & SQL',
        topics: ['Relational Database Fundamentals', 'Creating Databases & Tables (CREATE, INSERT)', 'Data Querying (SELECT, WHERE, ORDER BY)']
      }
    ]
  },
  {
    id: 'class-12-ip',
    title: 'Class 12 Informatics Practices (IP)',
    category: 'cbse',
    badge: 'CBSE Board Prep',
    badgeClass: 'badge-board',
    iconType: 'book',
    rating: 4.98,
    studentsCount: '620+ CBSE Students',
    shortDesc: 'Class 12 IP (Code 065) Board Exam Masterclass. Pandas DataFrames, SQL Joins, Matplotlib, Networks & Practical Project.',
    duration: 'Online Classes (Flexible Timings)',
    level: 'School CBSE Board Level',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      '100% Online Live Classes with Flexible Timings',
      'Python Pandas (Series, DataFrames, Data Alignment)',
      'SQL & MySQL Queries (GROUP BY, HAVING, Joins)',
      'Matplotlib Data Visualization (Bar, Line, Histograms)',
      'Computer Networks & Cyber Ethics (NCERT Coverage)',
      'Board Practical File & Class 12 Project Guidance'
    ],
    syllabus: [
      {
        module: 'Module 1: Data Handling with Pandas',
        topics: ['Series & DataFrame creation', 'Indexing, Slicing & Iteration', 'Handling Missing Values & Filling Data', 'CSV Export/Import & Advanced Aggregations']
      },
      {
        module: 'Module 2: Data Visualization with Matplotlib',
        topics: ['Line plot, Bar chart, Histogram customization', 'Chart titles, Labels, Legends & Colors']
      },
      {
        module: 'Module 3: Database Querying using SQL',
        topics: ['Math, String, and Date SQL Functions', 'Aggregate functions (COUNT, MAX, MIN, AVG, SUM)', 'Group By, Having, and Multi-table Joins']
      },
      {
        module: 'Module 4: Networks & Cyber Ethics',
        topics: ['Topologies, Routers, IP Address', 'Cyber safety, Copyright, Digital footprint']
      }
    ]
  },
  {
    id: 'data-science-full',
    title: 'Data Science Full Course',
    category: 'career-track',
    badge: 'Python + SQL + Power BI + ML + DS',
    badgeClass: 'badge-featured',
    iconType: 'trend',
    rating: 4.99,
    studentsCount: '800+ Learners Enrolled',
    shortDesc: 'Complete 5-in-1 Master Program: Python + SQL + Power BI + Machine Learning + Data Science with Capstone Projects.',
    duration: '6–8 months',
    level: 'Beginner to Advanced',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'Complete 5-in-1 Stack (Python, SQL, Power BI, ML, DS)',
      'Full Python & Data Manipulation Mastery',
      'Advanced SQL & Database Query Optimization',
      'Supervised & Unsupervised Machine Learning',
      'Power BI Dashboarding & DAX Modeling',
      '4 Live Real-world Industry Capstone Projects'
    ],
    syllabus: [
      {
        module: 'Phase 1: Python for Data Science',
        topics: ['Python Logic, Data Structures & Functions', 'NumPy Arrays & Vectorized Calculations', 'Pandas DataFrames, Cleaning & Wrangling', 'Exploratory Data Analysis (EDA)']
      },
      {
        module: 'Phase 2: SQL & Database Engineering',
        topics: ['Relational Database Schema Design', 'Complex Joins, CTEs, Window Functions']
      },
      {
        module: 'Phase 3: Machine Learning & Applied DS',
        topics: ['Probability, Statistics & Hypothesis Testing', 'Linear & Logistic Regression', 'Decision Trees, Random Forests, XGBoost', 'Clustering (K-Means)']
      },
      {
        module: 'Phase 4: Power BI & Analytics',
        topics: ['Power Query ETL Transformations', 'DAX Measures & Dynamic Calculations', 'Executive Dashboarding & Report Publishing']
      }
    ]
  },
  {
    id: 'linux-fundamentals',
    title: 'Linux Administration & Shell Scripting',
    category: 'individual',
    badge: 'Essential DevOps & SysAdmin',
    badgeClass: 'badge-pro',
    iconType: 'terminal',
    rating: 4.96,
    studentsCount: '580+ Students',
    shortDesc: 'Master the Linux CLI, OS architecture, file system permissions, user administration, Bash shell scripting, and server automation.',
    duration: '2 months',
    level: 'Beginner to Intermediate',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'Linux File System Hierarchy & Navigation (/etc, /var, /home, /root)',
      'File Permissions (chmod, chown, umask) & User/Group Security',
      'Process Management (ps, top, kill, systemctl, cron jobs)',
      'Bash Shell Scripting & Automation Pipelines',
      'Package Management (apt, dnf) & Remote SSH Server Access',
      'Troubleshooting CLI Tools (grep, awk, sed, curl, netstat)'
    ],
    syllabus: [
      {
        module: 'Module 1: Linux Architecture & Command Line Mastery',
        topics: ['Kernel vs Shell Architecture & Distros (Ubuntu, Debian, RHEL)', 'File System Hierarchy & Essential Commands (ls, cd, cp, mv, rm, find)', 'Vim & Nano Text Editors', 'Standard I/O Streams, Pipes & Redirection']
      },
      {
        module: 'Module 2: Permissions, Users & Process Control',
        topics: ['Linux Ownership, Permissions (chmod, chown, umask, SUID)', 'User & Group Administration (/etc/passwd, /etc/shadow)', 'Process Management & Daemons (ps, top, kill, systemctl)', 'Cron Job Automation & Scheduled Tasks']
      },
      {
        module: 'Module 3: Bash Scripting & Network Administration',
        topics: ['Bash Variables, Conditions, Loops & Functions', 'Automated Server Backup & Health Check Scripts', 'SSH Remote Access, SCP & Keys', 'Network Diagnostics (ping, traceroute, netstat, curl)']
      }
    ]
  },
  {
    id: 'computer-networking',
    title: 'Computer Networking & Protocols',
    category: 'individual',
    badge: 'Core IT & Cloud Infrastructure',
    badgeClass: 'badge-pro',
    iconType: 'network',
    rating: 4.95,
    studentsCount: '520+ Students',
    shortDesc: 'Comprehensive networking foundation: OSI 7 layers, TCP/IP stack, IPv4/IPv6 subnetting, DNS, DHCP, HTTP, routing, and network security.',
    duration: '2 months',
    level: 'Beginner to Intermediate',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'OSI 7-Layer Architecture & TCP/IP Model In-Depth',
      'IPv4 Addressing, Subnet Masks, CIDR & IPv6 Structure',
      'Core Protocols: DNS, DHCP, HTTP/HTTPS, SSH, FTP, ICMP',
      'Routing Protocols (Static, RIP, OSPF) & Switching Fundamentals',
      'Packet Sniffing & Analysis with Wireshark',
      'Network Security, Firewalls, NAT & VPN Technologies'
    ],
    syllabus: [
      {
        module: 'Module 1: Network Fundamentals & OSI/TCP-IP Models',
        topics: ['Network Types (LAN, WAN, MAN) & Topologies (Star, Mesh)', 'Physical Layer & Transmission Media (Twisted pair, Fiber optics, Wireless)', 'OSI 7 Layers vs TCP/IP 4-Layer Architecture', 'Encapsulation & Decapsulation (Data, Segments, Packets, Frames, Bits)']
      },
      {
        module: 'Module 2: IP Addressing & Subnetting',
        topics: ['IPv4 Classes (A, B, C, D, E) & Private vs Public IPs', 'Subnet Masks, CIDR Notation & Subnetting Calculations', 'IPv6 Addressing Architecture & Benefits', 'ARP (Address Resolution Protocol) & MAC Addressing']
      },
      {
        module: 'Module 3: Protocols, Routing & Security',
        topics: ['Transport Layer: TCP (3-way Handshake) vs UDP', 'Application Protocols: DNS, DHCP (DORA), HTTP/HTTPS, SMTP', 'Routers, Switches & Basic Routing (Static vs Dynamic RIP/OSPF)', 'Wireshark Packet Analysis, Firewalls, NAT & VPN Security']
      }
    ]
  },
  {
    id: 'python-mastery',
    title: 'Python Programming',
    category: 'individual',
    badge: 'Core Modular',
    badgeClass: 'badge-pro',
    iconType: 'code',
    rating: 4.92,
    studentsCount: '1,200+ Students',
    shortDesc: 'Master Python syntax, Object-Oriented Programming (OOP), Data Structures, Automation scripts, and real-world problem solving.',
    duration: '2 months',
    level: 'Beginner Friendly',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'Variables, Loops, Conditionals & Functions',
      'Object Oriented Programming (Classes & Objects)',
      'File Handling (JSON, CSV, Text)',
      '20+ Practical Coding Challenges'
    ],
    syllabus: [
      { module: 'Part 1: Core Fundamentals', topics: ['Syntax, Variables, Operations', 'Control Flow (If-Else, For/While)', 'Lists, Tuples, Dictionaries, Sets'] },
      { module: 'Part 2: Advanced Concepts', topics: ['Functions & Lambda Expression', 'OOPs: Classes, Objects, Polymorphism', 'File I/O & Exception Handling'] }
    ]
  },
  {
    id: 'sql-database',
    title: 'SQL & Database Mastery',
    category: 'individual',
    badge: 'Must Have Skill',
    badgeClass: 'badge-pro',
    iconType: 'database',
    rating: 4.96,
    studentsCount: '950+ Students',
    shortDesc: 'Learn MySQL and PostgreSQL from scratch. Master DDL/DML commands, Joins, Aggregations, Window Functions, and Indexing.',
    duration: '1.5 months',
    level: 'Beginner to Intermediate',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'Database Architecture & Relational Concepts',
      'SELECT, WHERE, ORDER BY, GROUP BY, HAVING',
      'INNER, LEFT, RIGHT, FULL OUTER Joins',
      'Subqueries, CTEs & Window Functions'
    ],
    syllabus: [
      { module: 'Part 1: SQL Foundations', topics: ['Database setup & CRUD operations', 'Filtering & Aggregations'] },
      { module: 'Part 2: Advanced Querying', topics: ['Joins & Multi-table queries', 'Subqueries, CTEs & Window Functions'] }
    ]
  },
  {
    id: 'power-bi',
    title: 'Power BI Masterclass',
    category: 'individual',
    badge: 'Hot Demand',
    badgeClass: 'badge-pro',
    iconType: 'layout',
    rating: 4.93,
    studentsCount: '850+ Students',
    shortDesc: 'Create high-impact executive dashboards. Master Power Query, Star Schema Data Modeling, DAX calculations, and Report publishing.',
    duration: '1.5 months',
    level: 'All Levels',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'Power Query ETL Data Transformations',
      'Star Schema vs Snowflake Data Modeling',
      'DAX Measures, Calculated Columns & Time Intelligence',
      'End-to-End Business Dashboard Project'
    ],
    syllabus: [
      { module: 'Part 1: Data Ingestion & Modeling', topics: ['Connecting Data Sources', 'Data Cleaning in Power Query', 'Schema Design'] },
      { module: 'Part 2: DAX & Visual Dashboards', topics: ['DAX Functions', 'Interactive Charts & KPI Cards', 'Publishing & Sharing'] }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    category: 'individual',
    badge: 'Advanced Modular',
    badgeClass: 'badge-featured',
    iconType: 'cpu',
    rating: 4.97,
    studentsCount: '620+ Students',
    shortDesc: 'Build predictive ML models using Scikit-Learn. Linear Regression, Logistic Regression, Decision Trees, Random Forest, & Model Tuning.',
    duration: '3 months',
    level: 'Intermediate to Advanced',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'Supervised vs Unsupervised Learning fundamentals',
      'Feature Engineering & Scaling',
      'Regression & Classification Algorithms',
      'Model Evaluation & Hyperparameter Tuning'
    ],
    syllabus: [
      { module: 'Part 1: Supervised Learning', topics: ['Linear & Logistic Regression', 'Decision Trees & Random Forests'] },
      { module: 'Part 2: Model Evaluation & Tuning', topics: ['Cross Validation & Tuning', 'K-Means Clustering'] }
    ]
  },
  {
    id: 'data-science-individual',
    title: 'Data Science',
    category: 'individual',
    badge: 'Popular Modular',
    badgeClass: 'badge-pro',
    iconType: 'chart',
    rating: 4.94,
    studentsCount: '700+ Students',
    shortDesc: 'Hands-on Data Wrangling, Cleaning, Exploratory Analysis & Visualization using NumPy, Pandas, Seaborn, and Matplotlib.',
    duration: '4 months',
    level: 'Intermediate',
    mode: '100% Online Class with Flexible Timings',
    highlights: [
      'NumPy N-dimensional array manipulation',
      'Pandas DataFrames indexing, filtering, & grouping',
      'Missing data imputation & outlier treatment',
      'Interactive Data Visualization & EDA'
    ],
    syllabus: [
      { module: 'Part 1: Data Manipulation', topics: ['NumPy Math', 'Pandas Series & DataFrames', 'Data Cleaning'] },
      { module: 'Part 2: Exploratory Data Analysis', topics: ['Statistical Measures', 'Correlation & Heatmaps'] }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'Aarav Sharma',
    role: 'Class 12 IP Board Student',
    score: 'Scored 98/100 in CBSE IP',
    comment: 'Tech Learn online IP classes with flexible timings made managing school and board prep so easy. The Python Pandas & SQL sessions were super clear!',
    avatar: '👨‍🎓'
  },
  {
    name: 'Priya Verma',
    role: 'Data Analyst at TechCorp',
    score: 'Data Science Full Course',
    comment: 'The Data Science Full Course (Python + SQL + Power BI + ML + DS) gave me complete practical knowledge. Reserved my seat online and landed my job within months!',
    avatar: '👩‍💻'
  },
  {
    name: 'Rohan Gupta',
    role: 'Class 11 IP Student',
    score: 'Grade A1 in Finals',
    comment: 'Online flexible timing classes for Class 11 IP helped me clear all my concepts without missing school activities.',
    avatar: '👨‍🎓'
  }
];

export const QUIZ_QUESTIONS = [
  {
    question: 'In Class 12 IP Pandas, which method is used to read data from a CSV file into a DataFrame?',
    options: ['pd.import_csv()', 'pd.read_csv()', 'pd.open_csv()', 'pd.get_csv()'],
    correct: 1,
    explanation: '`pd.read_csv("filename.csv")` is the standard pandas function to load tabular CSV data into a DataFrame.'
  },
  {
    question: 'In SQL, which clause is used to filter groups AFTER aggregate calculations (e.g. SUM, COUNT)?',
    options: ['WHERE', 'ORDER BY', 'HAVING', 'GROUP BY'],
    correct: 2,
    explanation: 'The `HAVING` clause is specifically designed to filter grouped records after aggregate functions are applied.'
  },
  {
    question: 'Which Linux command is used to modify file access permissions?',
    options: ['chown', 'chmod', 'ps', 'grep'],
    correct: 1,
    explanation: '`chmod` (change mode) is used to modify read, write, and execute permissions for user, group, and others in Linux.'
  },
  {
    question: 'What mode of classes is offered for Class 11 & Class 12 IP?',
    options: ['Offline Only', 'Online Class with Flexible Timings', 'Recorded Only', 'Weekend Only'],
    correct: 1,
    explanation: 'Class 11 & Class 12 IP subjects feature 100% Live Online Classes with Flexible Timings!'
  }
];
