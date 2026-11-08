export const COURSE_NOTES = {
  'class-11-ip': {
    title: 'Class 11 Informatics Practices (CBSE Code 065)',
    description: 'Official CBSE NCERT Syllabus: Computer System, Python Fundamentals, Lists & Dictionaries, SQL & Emerging Trends.',
    pdfCurriculumLink: '/notes/Class_11_IP_Full_Syllabus_Notes.html',
    topics: [
      {
        id: 'c11-ch1',
        chapterNum: 'Chapter 1',
        topicName: 'Chapter 1: Introduction to Computer System',
        pdfUrl: '/notes/Class_11_IP_Chapter_1_Computer_System.html',
        detailedNotes: `
### CBSE NCERT Unit 1: Introduction to Computer System
1. **Components of a Computer System**:
   - **Central Processing Unit (CPU)**: Contains Arithmetic Logic Unit (ALU) for arithmetic/logical operations, Control Unit (CU) for instruction sequencing, and Registers (high-speed temporary storage).
   - **Input Devices**: Keyboard, Mouse, Scanner, OMR, Barcode Reader, Microphone.
   - **Output Devices**: Monitor (VDU), Printer (Laser, Inkjet, Dot Matrix), Plotter, Speaker.
2. **Computer Memory Hierarchy**:
   - **Primary Memory (Internal)**:
     - **RAM (Random Access Memory)**: Volatile memory; contents lost when power is turned off. Holds running programs and operating data.
     - **ROM (Read Only Memory)**: Non-volatile memory; stores bootup instructions (BIOS - Basic Input Output System). Types: PROM, EPROM, EEPROM.
     - **Cache Memory**: Extremely fast memory placed between CPU and RAM to store frequently accessed data.
   - **Secondary Memory (External)**:
     - Hard Disk Drives (HDD), Solid State Drives (SSD), Pen Drives, Optical Discs (CD, DVD, Blu-ray). Non-volatile permanent storage.
3. **Software Categories**:
   - **System Software**: Operating System (Windows, Linux, macOS), Language Processors (Assembler, Compiler, Interpreter), Device Drivers.
   - **Application Software**: General Purpose (Word Processor, Spreadsheets, Python IDE) and Customized / Tailor-made Software.
`,
        exercises: [
          {
            question: 'Q1: What is the difference between an Interpreter and a Compiler?',
            answer: 'An interpreter translates and executes source code line-by-line (e.g. Python), halting at the first error. A compiler converts the entire source code into machine language at once before execution (e.g. C/C++).'
          },
          {
            question: 'Q2: Why is RAM called volatile memory while ROM is non-volatile?',
            answer: 'RAM requires electrical power to retain data; data is lost immediately on power cutoff. ROM retains stored information permanently even without power.'
          },
          {
            question: 'Q3: Mention the three main components of a CPU and their functions.',
            answer: '1. ALU: Performs mathematical and logical comparisons. 2. CU: Directs signals and operation timing. 3. Registers: Ultra-fast internal storage cells for active operands.'
          }
        ]
      },
      {
        id: 'c11-ch2',
        chapterNum: 'Chapter 2',
        topicName: 'Chapter 2: Introduction to Python & Control Flow',
        pdfUrl: '/notes/Class_11_IP_Chapter_2_Python_Basics.html',
        detailedNotes: `
### CBSE NCERT Unit 2: Basics of Python Programming
1. **Python Features & Modes**:
   - High-level, interpreted, dynamically typed language created by Guido van Rossum.
   - Modes: **Interactive Mode** (Python prompt >>> for single line testing) and **Script Mode** (.py files for programs).
2. **Tokens in Python**:
   - **Keywords**: Reserved words (\`if\`, \`else\`, \`for\`, \`while\`, \`def\`, \`True\`, \`False\`, \`None\`, \`import\`).
   - **Identifiers**: Names for variables, functions. Cannot start with a digit or contain special characters except underscore (\`_\`).
   - **Literals**: Numeric (int, float, complex), String (\`'Hello'\`, \`"World"\`), Boolean (\`True\`, \`False\`).
   - **Operators**: Arithmetic (\`+\`, \`-\`, \`*\`, \`/\`, \`//\` floor division, \`%\` modulus, \`**\` exponent), Relational (\`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`), Logical (\`and\`, \`or\`, \`not\`), Assignment (\`=\`, \`+=\`, \`-=\`).
3. **Control Statements**:
   - **Conditional Flow**:
\`\`\`python
# Check voting eligibility
age = int(input("Enter age: "))
if age >= 18:
    print("Eligible to Vote")
elif age > 0:
    print("Minor - Not Eligible")
else:
    print("Invalid Age")
\`\`\`
   - **Loops**:
\`\`\`python
# For Loop with range(start, stop, step)
for i in range(1, 10, 2):
    print(i, end=" ") # Output: 1 3 5 7 9

# While Loop
count = 1
while count <= 5:
    print(count)
    count += 1
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: What will be the output of: 7 // 2 and 7 % 2 in Python?',
            answer: '7 // 2 evaluates to 3 (floor division). 7 % 2 evaluates to 1 (remainder modulus).'
          },
          {
            question: 'Q2: Write a Python program to display the sum of first N natural numbers.',
            answer: `n = int(input("Enter N: "))
sum_val = 0
for i in range(1, n + 1):
    sum_val += i
print("Sum =", sum_val)`
          }
        ]
      },
      {
        id: 'c11-ch3',
        chapterNum: 'Chapter 3',
        topicName: 'Chapter 3: Python Lists and Dictionaries',
        pdfUrl: '/notes/Class_11_IP_Chapter_3_Lists_Dictionaries.html',
        detailedNotes: `
### CBSE NCERT: Compound Data Structures
1. **Lists (Mutable, Ordered Sequence)**:
   - Creation: \`marks = [85, 92, 78, 95]\`
   - Indexing: Positive (0 to n-1) and Negative (-1 from right).
   - Slicing: \`list[start : stop : step]\`
   - Common Methods:
     - \`list.append(x)\`: Adds element x at the end.
     - \`list.insert(pos, x)\`: Inserts x at index pos.
     - \`list.pop(i)\`: Removes element at index i.
     - \`list.sort()\`: Sorts list in ascending order.
     - \`list.reverse()\`: Reverses the elements in place.
2. **Dictionaries (Mutable, Key-Value Pairs, Unordered/Key-Indexed)**:
   - Creation: \`student = {'roll': 101, 'name': 'Aarav', 'ip_marks': 98}\`
   - Accessing: \`student['name']\` or \`student.get('name')\`
   - Adding/Updating: \`student['grade'] = 'A+'\`
   - Methods:
     - \`dict.keys()\`: Returns all keys.
     - \`dict.values()\`: Returns all values.
     - \`dict.items()\`: Returns key-value pairs as tuples.
`,
        exercises: [
          {
            question: 'Q1: Differentiate between Lists and Dictionaries in Python.',
            answer: 'Lists are ordered sequences indexed by integer positions (0, 1, 2...). Dictionaries are associative collections indexed by unique immutable keys (strings, numbers, tuples).'
          },
          {
            question: 'Q2: What is the output of: [10, 20, 30, 40, 50][1:4]?',
            answer: '[20, 30, 40]'
          }
        ]
      },
      {
        id: 'c11-ch4',
        chapterNum: 'Chapter 4',
        topicName: 'Chapter 4: Database Concepts and SQL',
        pdfUrl: '/notes/Class_11_IP_Chapter_4_Database_SQL.html',
        detailedNotes: `
### CBSE NCERT Unit 3: Relational Database Management System (RDBMS)
1. **Key Terms**:
   - **Relation**: A table with rows and columns.
   - **Tuple**: A single row / record in a table.
   - **Attribute**: A column / field in a table.
   - **Degree**: Number of columns in a table.
   - **Cardinality**: Number of rows in a table.
   - **Primary Key**: Unique attribute that identifies each record without duplicates or NULLs.
   - **Candidate Key**: All attribute sets eligible to be primary key.
2. **Structured Query Language (SQL)**:
   - **DDL (Data Definition Language)**: \`CREATE DATABASE\`, \`CREATE TABLE\`, \`DROP TABLE\`, \`ALTER TABLE\`.
   - **DML (Data Manipulation Language)**: \`INSERT INTO\`, \`SELECT\`, \`UPDATE\`, \`DELETE\`.
   - **SQL Queries**:
\`\`\`sql
-- Creating Table with Constraints
CREATE TABLE Student (
    RollNo INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Gender CHAR(1),
    Marks DECIMAL(5,2)
);

-- Inserting Records
INSERT INTO Student VALUES (1, 'Aarav', 'M', 95.5);
INSERT INTO Student VALUES (2, 'Priya', 'F', 98.0);

-- Filtering with WHERE, BETWEEN, LIKE
SELECT Name, Marks FROM Student WHERE Marks >= 90 ORDER BY Marks DESC;
SELECT * FROM Student WHERE Name LIKE 'A%'; -- Names starting with A
SELECT * FROM Student WHERE Marks BETWEEN 80 AND 100;
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: A table has 5 columns and 20 rows. What is its Degree and Cardinality?',
            answer: 'Degree = 5 (columns). Cardinality = 20 (rows).'
          },
          {
            question: 'Q2: Write SQL command to display all female students who scored more than 90 marks in ascending order of Name.',
            answer: 'SELECT * FROM Student WHERE Gender = "F" AND Marks > 90 ORDER BY Name ASC;'
          }
        ]
      },
      {
        id: 'c11-ch5',
        chapterNum: 'Chapter 5',
        topicName: 'Chapter 5: Introduction to Emerging Trends',
        pdfUrl: '/notes/Class_11_IP_Chapter_5_Emerging_Trends.html',
        detailedNotes: `
### CBSE NCERT Unit 4: Modern Technologies
1. **Artificial Intelligence (AI) & Machine Learning (ML)**:
   - AI: Systems mimicking human intelligence to perform complex tasks.
   - ML: Algorithms learning from historical patterns without explicit hardcoded rules.
   - NLP (Natural Language Processing): Enabling computers to understand human languages (chatbots, translation).
2. **Big Data**:
   - Extremely large data sets characterized by **5 Vs**: Volume, Velocity, Variety, Veracity, and Value.
3. **Internet of Things (IoT)**:
   - Network of physical devices embedded with sensors, software, and connectivity to exchange data (Smart Homes, Smart Cities).
4. **Cloud Computing**:
   - Delivering computing services (servers, storage, databases, networking) over the internet.
   - Service Models:
     - **IaaS** (Infrastructure as a Service - AWS EC2)
     - **PaaS** (Platform as a Service - Google App Engine)
     - **SaaS** (Software as a Service - Google Drive, Microsoft 365)
5. **Blockchain**:
   - Decentralized, immutable distributed ledger technology recording transactions across multiple computers.
`,
        exercises: [
          {
            question: 'Q1: State the 5 Vs of Big Data with a one-line description for each.',
            answer: '1. Volume (size of data), 2. Velocity (speed of generation), 3. Variety (types of formats), 4. Veracity (trustworthiness/accuracy), 5. Value (business insights extracted).'
          },
          {
            question: 'Q2: Differentiate between SaaS and IaaS in Cloud Computing.',
            answer: 'SaaS provides ready-to-use software over the web (e.g. Gmail), whereas IaaS provides fundamental computing infrastructure like virtual machines and raw storage (e.g. AWS EC2).'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'c11-p1',
        projectName: 'Class 11 IP Final Practical Project: Student Grade & Database Calculator',
        projectDescription: 'Full Python program with list/dictionary data storage, mark calculation, and grade assignment.',
        fullSourceCode: `# Class 11 IP Practical Project: Student Grade & Result System

students = {}

def add_student(roll, name, ip_mark, math_mark):
    avg = (ip_mark + math_mark) / 2
    grade = 'A+' if avg >= 90 else ('A' if avg >= 75 else 'B')
    students[roll] = {'Name': name, 'Average': avg, 'Grade': grade}
    print(f"Recorded student {name} successfully!")

# Sample Execution
add_student(101, 'Aarav Sharma', 96, 92)
add_student(102, 'Rohan Gupta', 85, 78)

print("\\n--- STUDENT RESULT SUMMARY ---")
for r, info in students.items():
    print(f"Roll: {r} | Name: {info['Name']} | Avg: {info['Average']:.1f}% | Grade: {info['Grade']}")
`,
        projectQuestions: [
          'Q1: How does dictionary key-value pairing simplify record management?',
          'Q2: What modifications are needed to save student records into a text/CSV file?'
        ]
      }
    ]
  },

  'class-12-ip': {
    title: 'Class 12 Informatics Practices (Board Special Code 065)',
    description: 'Official CBSE NCERT Syllabus: Pandas Series & DataFrames, Matplotlib, SQL Functions, Joins, Computer Networks, and Societal Impacts.',
    pdfCurriculumLink: '/notes/Class_12_IP_Full_Syllabus_Notes.html',
    topics: [
      {
        id: 'c12-ch1',
        chapterNum: 'Chapter 1',
        topicName: 'Chapter 1: Data Handling using Pandas - I (Series)',
        pdfUrl: '/notes/Class_12_IP_Chapter_1_Pandas_Series.html',
        detailedNotes: `
### CBSE NCERT Unit 1: Pandas Series (1-Dimensional Labeled Array)
1. **Series Creation**:
\`\`\`python
import pandas as pd
import numpy as np

# 1. From Python List
s1 = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])

# 2. From Dictionary
s2 = pd.Series({'IP': 98, 'Maths': 95, 'English': 92})

# 3. From Scalar Value
s3 = pd.Series(100, index=['Term1', 'Term2', 'Term3'])
\`\`\`
2. **Series Attributes**:
   - \`s.index\`: Returns array of index labels.
   - \`s.values\`: Returns array of values.
   - \`s.dtype\`: Returns data type of underlying data.
   - \`s.shape\`: Returns tuple representing dimensions (e.g. \`(4,)\`).
   - \`s.size\`: Total number of elements.
   - \`s.empty\`: Returns True if Series has 0 elements.
3. **Head, Tail, and Mathematical Vectorized Operations**:
   - \`s.head(n)\`: First n rows (default 5).
   - \`s.tail(n)\`: Last n rows (default 5).
   - Vectorized Arithmetic: \`s * 2\` multiplies every element by 2 without any loop!
   - Data Alignment: Operations between two series align automatically based on index labels. Missing matches produce \`NaN\`.
`,
        exercises: [
          {
            question: 'Q1: What will happen when you add two Series s1 and s2 with different index labels?',
            answer: 'Pandas automatically aligns elements by their index labels. Any index present in one Series but absent in the other will result in NaN (Not a Number).'
          },
          {
            question: 'Q2: How does a Series differ from a 1D NumPy array?',
            answer: 'A NumPy array only supports numeric 0-indexed positions. A Pandas Series has explicit custom labels (indexes) and supports automatic data alignment.'
          }
        ]
      },
      {
        id: 'c12-ch2',
        chapterNum: 'Chapter 2',
        topicName: 'Chapter 2: Data Handling using Pandas - II (DataFrames & CSV)',
        pdfUrl: '/notes/Class_12_IP_Chapter_2_Pandas_DataFrames.html',
        detailedNotes: `
### CBSE NCERT: Pandas DataFrames (2-Dimensional Tabular Structure)
1. **DataFrame Creation**:
\`\`\`python
import pandas as pd

# Creating from Dictionary of Lists
data = {
    'Student': ['Aarav', 'Priya', 'Sneha', 'Kabir'],
    'IP': [98, 95, 99, 92],
    'Math': [92, 98, 95, 88]
}
df = pd.DataFrame(data, index=['R1', 'R2', 'R3', 'R4'])
print(df)
\`\`\`
2. **Indexing & Slicing (\`.loc\` vs \`.iloc\`)**:
   - **Label-based**: \`df.loc['R1':'R3', ['Student', 'IP']]\`
   - **Integer position-based**: \`df.iloc[0:2, 0:2]\`
   - **Boolean Indexing**: \`df[df['IP'] >= 95]\`
3. **Adding, Deleting & Modifying Columns/Rows**:
   - Add column: \`df['Total'] = df['IP'] + df['Math']\`
   - Delete column: \`df.drop('Math', axis=1, inplace=True)\`
   - Delete row: \`df.drop('R4', axis=0, inplace=True)\`
4. **CSV Export and Import**:
   - Read from CSV: \`df = pd.read_csv('marks.csv')\`
   - Write to CSV: \`df.to_csv('results.csv', index=False)\`
`,
        exercises: [
          {
            question: 'Q1: Differentiate between df.loc and df.iloc in Pandas with syntax.',
            answer: 'df.loc[row_label, col_label] uses custom labels (endpoint included). df.iloc[row_pos, col_pos] uses 0-based integer indexes (endpoint excluded).'
          },
          {
            question: 'Q2: How do you handle missing (NaN) values in a DataFrame?',
            answer: 'Use df.dropna() to remove rows containing NaN, or df.fillna(value) to replace NaN values with a mean, median, or specific constant.'
          }
        ]
      },
      {
        id: 'c12-ch3',
        chapterNum: 'Chapter 3',
        topicName: 'Chapter 3: Plotting Data using Matplotlib',
        pdfUrl: '/notes/Class_12_IP_Chapter_3_Matplotlib_Visualization.html',
        detailedNotes: `
### CBSE NCERT: Data Visualization with Matplotlib (pyplot)
1. **Plot Types**:
   - **Line Plot**: Shows continuous trends over time (\`plt.plot(x, y)\`).
   - **Bar Chart**: Compares categorical data (\`plt.bar(x, y)\` or \`plt.barh(x, y)\`).
   - **Histogram**: Displays frequency distribution of continuous numerical data (\`plt.hist(data, bins=5)\`).
2. **Customizing Visualizations**:
\`\`\`python
import matplotlib.pyplot as plt

subjects = ['IP', 'Math', 'Physics', 'Chemistry', 'English']
marks = [98, 92, 85, 88, 95]

plt.figure(figsize=(7, 4))
plt.bar(subjects, marks, color='indigo', width=0.5, label='Marks 2026')
plt.title('CBSE Class 12 Board Subject Performance')
plt.xlabel('Subjects')
plt.ylabel('Score (Out of 100)')
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.legend()
plt.savefig('performance_chart.png') # Saving as Image
plt.show()
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: What is the purpose of the bins parameter in a Histogram?',
            answer: 'bins defines the number of discrete intervals (ranges) into which the continuous data range is divided.'
          },
          {
            question: 'Q2: Which function is used to save a Matplotlib graph directly as an image file?',
            answer: 'plt.savefig("filename.png")'
          }
        ]
      },
      {
        id: 'c12-ch4',
        chapterNum: 'Chapter 4',
        topicName: 'Chapter 4: Database Querying using SQL Functions',
        pdfUrl: '/notes/Class_12_IP_Chapter_4_SQL_Functions.html',
        detailedNotes: `
### CBSE NCERT Unit 2: Single-Row SQL Functions
1. **Math Functions**:
   - \`POWER(m, n)\`: Returns m raised to power n. (e.g. \`POWER(2, 3)\` -> 8)
   - \`ROUND(n, d)\`: Rounds n to d decimal places. (e.g. \`ROUND(78.567, 1)\` -> 78.6)
   - \`MOD(n, m)\`: Returns remainder of n divided by m. (e.g. \`MOD(11, 4)\` -> 3)
2. **String / Text Functions**:
   - \`UCASE(s)\` / \`UPPER(s)\`: Converts to uppercase.
   - \`LCASE(s)\` / \`LOWER(s)\`: Converts to lowercase.
   - \`MID(s, pos, len)\` / \`SUBSTRING(s, pos, len)\`: Extracts substring starting at pos.
   - \`LENGTH(s)\`: Returns character count.
   - \`INSTR(s, sub)\`: Returns 1-based index position of substring sub in s.
   - \`TRIM(s)\`: Removes leading and trailing whitespace.
3. **Date Functions**:
   - \`NOW()\`: Current date and time.
   - \`CURDATE()\`: Current date.
   - \`DAYNAME(d)\`, \`MONTHNAME(d)\`, \`YEAR(d)\`.
4. **Aggregate Functions**:
   - \`SUM(col)\`, \`AVG(col)\`, \`MIN(col)\`, \`MAX(col)\`, \`COUNT(col)\`, \`COUNT(*)\`.
`,
        exercises: [
          {
            question: 'Q1: What is the difference between COUNT(col) and COUNT(*)?',
            answer: 'COUNT(col) returns count of non-NULL values in that column. COUNT(*) counts total records in the table, including rows with NULL values.'
          },
          {
            question: 'Q2: What is the output of: SELECT SUBSTR("INFORMATICS", 3, 5);?',
            answer: '"FORMA"'
          }
        ]
      },
      {
        id: 'c12-ch5',
        chapterNum: 'Chapter 5',
        topicName: 'Chapter 5: Querying with GROUP BY, HAVING & Joins',
        pdfUrl: '/notes/Class_12_IP_Chapter_5_GroupBy_Joins.html',
        detailedNotes: `
### CBSE NCERT: Advanced SQL Clauses & Multi-Table Joins
1. **GROUP BY and HAVING**:
   - \`GROUP BY\`: Groups rows having matching values in specified columns for aggregation.
   - \`HAVING\`: Filters groups after aggregate calculation.
\`\`\`sql
-- Example: Average marks by department having > 10 students
SELECT Department, COUNT(*) AS Total, AVG(Marks) AS Average
FROM Student
GROUP BY Department
HAVING COUNT(*) > 10
ORDER BY Average DESC;
\`\`\`
2. **Multi-Table Joins**:
   - **Cartesian Product (Cross Join)**: Degree = Degree(A) + Degree(B), Cardinality = Card(A) * Card(B).
   - **Equi-Join**: Joins two tables based on equality of common foreign key column.
\`\`\`sql
SELECT s.RollNo, s.Name, d.DeptName
FROM Student s, Department d
WHERE s.DeptId = d.DeptId;
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: Explain the difference between WHERE and HAVING clause in SQL.',
            answer: 'WHERE filters rows before group aggregation. HAVING filters groups after GROUP BY aggregation.'
          },
          {
            question: 'Q2: If Table A has degree 3, cardinality 5, and Table B has degree 4, cardinality 4, what is the degree and cardinality of their Cartesian product?',
            answer: 'Degree = 3 + 4 = 7 columns. Cardinality = 5 * 4 = 20 rows.'
          }
        ]
      },
      {
        id: 'c12-ch6',
        chapterNum: 'Chapter 6',
        topicName: 'Chapter 6: Introduction to Computer Networks & Devices',
        pdfUrl: '/notes/Class_12_IP_Chapter_6_Computer_Networks.html',
        detailedNotes: `
### CBSE NCERT Unit 3: Computer Networks
1. **Network Types by Geographic Scope**:
   - **PAN (Personal Area Network)**: Up to 10 meters (Bluetooth).
   - **LAN (Local Area Network)**: Room, office, school campus.
   - **MAN (Metropolitan Area Network)**: City wide (Cable TV).
   - **WAN (Wide Area Network)**: Country, global (The Internet).
2. **Network Topologies**:
   - **Star**: All nodes connect to a central Hub/Switch. Easy to fault-find; central switch failure halts network.
   - **Bus**: All nodes connect along a single backbone cable. Cheap; backbone cable failure breaks entire network.
   - **Tree**: Hierarchical combination of star and bus topologies.
   - **Mesh**: Every node connects directly to every other node. High redundancy, expensive.
3. **Network Devices**:
   - **Modem**: Modulator/Demodulator converting digital and analog signals.
   - **Hub**: Broadcasts incoming data to ALL ports (unintelligent).
   - **Switch**: Sends incoming data packets ONLY to destination MAC port (intelligent).
   - **Repeater**: Amplifies weak signals over long cable runs.
   - **Router**: Directs data packets between different networks using IP routing.
   - **Gateway**: Connects two networks with different protocols.
`,
        exercises: [
          {
            question: 'Q1: Why is a Switch preferred over a Hub in modern computer networks?',
            answer: 'A Hub broadcasts data packets to all ports creating network congestion and security risks. A Switch learns MAC addresses and unicasts packets only to the intended recipient.'
          },
          {
            question: 'Q2: Name the device used to regenerate and amplify signals over long distances.',
            answer: 'Repeater'
          }
        ]
      },
      {
        id: 'c12-ch7',
        chapterNum: 'Chapter 7',
        topicName: 'Chapter 7: Societal Impacts, Cyber Safety & IT Act',
        pdfUrl: '/notes/Class_12_IP_Chapter_7_Societal_Impacts.html',
        detailedNotes: `
### CBSE NCERT Unit 4: Cyber Ethics, Law & Societal Impacts
1. **Digital Footprint**:
   - Record of all online interactions, search history, social media posts, and IP locations.
   - Active: Deliberately shared (emails, social posts). Passive: Collected automatically (cookies, browsing logs).
2. **Intellectual Property Rights (IPR)**:
   - Rights given to creators over artistic, scientific, and literary works.
   - **Copyright**: Protects expression of ideas (code, books, videos).
   - **Patent**: Protects novel inventions.
   - **Plagiarism**: Stealing and presenting someone else's work/ideas as one's own without attribution.
3. **Cybercrimes & Cyber Safety**:
   - **Phishing**: Fraudulent emails attempting to steal passwords/banking credentials.
   - **Cyber Bullying / Stalking**: Harassment of individuals online.
   - **Identity Theft**: Impersonating someone using their stolen credentials.
4. **Indian Information Technology (IT) Act**:
   - Enacted in 2000 (amended 2008) to provide legal framework for electronic transactions, digital signatures, and cybercrime punishments.
5. **E-Waste Management**:
   - Safe recycling and disposal of discarded electronic equipment to prevent toxic contamination (lead, mercury).
`,
        exercises: [
          {
            question: 'Q1: What is the difference between Active and Passive Digital Footprint?',
            answer: 'Active footprint is created when a user deliberately releases information (e.g. sending an email, posting photos). Passive footprint is collected without active user awareness (e.g. web cookies, browsing history logs).'
          },
          {
            question: 'Q2: Define Phishing and suggest two precautions against it.',
            answer: 'Phishing is a fraudulent cyber attack attempting to steal sensitive information by mimicking trusted entities. Precautions: 1. Always check URL authenticity and HTTPS lock icon. 2. Never click unsolicited email links or share OTPs.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'c12-p1',
        projectName: 'Class 12 IP CBSE Board Practical Project: School Result & Performance Analytics',
        projectDescription: 'Complete Python Pandas & MySQL integration project with Matplotlib charts for CBSE Board Practical File.',
        fullSourceCode: `# CBSE Class 12 IP Practical Project: Student Performance Analytics System
import pandas as pd
import matplotlib.pyplot as plt

# 1. Create DataFrame with Board Marks
data = {
    'Student_Name': ['Aarav', 'Priya', 'Rohan', 'Sneha', 'Kabir'],
    'IP_Marks': [98, 95, 88, 99, 92],
    'Math_Marks': [92, 98, 85, 95, 90]
}

df = pd.DataFrame(data)
df['Total'] = df['IP_Marks'] + df['Math_Marks']
df['Percentage'] = df['Total'] / 2

print("=== CBSE CLASS 12 IP RESULT DATAFRAME ===")
print(df)

# 2. Matplotlib Visualization (Bar Chart)
plt.figure(figsize=(8, 4))
plt.bar(df['Student_Name'], df['IP_Marks'], color='indigo', label='IP Marks')
plt.title('CBSE Class 12 IP Subject Performance')
plt.xlabel('Student Name')
plt.ylabel('Marks (Out of 100)')
plt.legend()
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.show()
`,
        projectQuestions: [
          'Q1: Explain how df["Percentage"] calculation operates across all rows in parallel.',
          'Q2: What is the role of plt.show() and plt.savefig() during practical evaluation?'
        ]
      }
    ]
  },

  'data-science-full': {
    title: 'Data Science Full Course (Python + SQL + Power BI + ML + DS)',
    description: 'End-to-End Master Program covering Python Data Analytics, Database Engineering, Machine Learning Pipelines, and Power BI Dashboards.',
    topics: [
      {
        id: 'ds-t1',
        topicName: 'Topic 1: Exploratory Data Analysis & NumPy Vectorization',
        detailedNotes: `
### Data Science Foundations
- **NumPy Matrix Math**: High performance multidimensional arrays.
- **Exploratory Data Analysis (EDA) Steps**:
  1. Data Ingestion & Shape Check (\`df.info()\`, \`df.describe()\`)
  2. Missing Value Imputation (\`df.isna().sum()\`)
  3. Outlier Removal using Interquartile Range (IQR).
`,
        exercises: [
          {
            question: 'Q1: How do you identify correlation between numerical columns in Pandas?',
            answer: 'Use df.corr() and plot a Seaborn heatmap using sns.heatmap(df.corr(), annot=True).'
          }
        ]
      },
      {
        id: 'ds-t2',
        topicName: 'Topic 2: Machine Learning Pipelines (Scikit-Learn)',
        detailedNotes: `
### Supervised Learning & Model Metrics
- **Linear & Logistic Regression**:
\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("Model Accuracy:", accuracy_score(y_test, y_pred))
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: Why do we split datasets into Training and Testing sets?',
            answer: 'To evaluate model generalization performance on unseen real-world data and prevent overfitting.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'ds-p1',
        projectName: 'Industry Capstone Project: Customer Churn & Sales Predictor System',
        projectDescription: 'Full Data Science Capstone combining Python Pandas cleaning, SQL aggregation, ML Logistic Regression, and Power BI metrics.',
        fullSourceCode: `# Data Science Capstone: Customer Churn Classification Model
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# 1. Synthetic Customer Data Generation
np.random.seed(42)
n_samples = 200

data = {
    'Tenure_Months': np.random.randint(1, 60, n_samples),
    'Monthly_Charges': np.random.uniform(20, 120, n_samples),
    'Total_Support_Calls': np.random.randint(0, 10, n_samples),
    'Churn': np.random.choice([0, 1], size=n_samples, p=[0.75, 0.25])
}

df = pd.DataFrame(data)

# 2. Feature Engineering & Split
X = df[['Tenure_Months', 'Monthly_Charges', 'Total_Support_Calls']]
y = df['Churn']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model Training
clf = RandomForestClassifier(n_estimators=50, random_state=42)
clf.fit(X_train, y_train)

# 4. Evaluation
y_pred = clf.predict(X_test)
print("=== CAPSTONE MODEL CLASSIFICATION REPORT ===")
print(classification_report(y_test, y_pred))
`,
        projectQuestions: [
          'Q1: What feature scaling technique is recommended when dealing with neural networks vs decision trees?',
          'Q2: How does confusion matrix precision differ from recall in churn prediction?'
        ]
      }
    ]
  },

  'python-mastery': {
    title: 'Python Programming (Zero to Hero)',
    description: 'Master Python syntax, Object-Oriented Programming (OOP), Data Structures, Automation scripts, and real-world problem solving.',
    topics: [
      {
        id: 'py-t1',
        topicName: 'Topic 1: OOPs - Classes, Objects & Inheritance',
        detailedNotes: `
### Object-Oriented Programming
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited ₹{amount}. New Balance: ₹{self.balance}")

acc = BankAccount("Aarav", 5000)
acc.deposit(1500)
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: What is the purpose of __init__ method in Python classes?',
            answer: 'It is the constructor method automatically executed when an instance/object of a class is instantiated.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'py-p1',
        projectName: 'Python Master Project: Banking & Account Automation CLI',
        projectDescription: 'Object-oriented banking system with deposit, withdraw, balance inquiry, and transaction history.',
        fullSourceCode: `# Python Masterclass Project: Banking CLI
class Account:
    def __init__(self, acc_num, name, balance):
        self.acc_num = acc_num
        self.name = name
        self.balance = balance
        self.history = []

    def deposit(self, amt):
        self.balance += amt
        self.history.append(f"Deposited: ₹{amt}")
        print(f"₹{amt} credited successfully!")

    def withdraw(self, amt):
        if amt <= self.balance:
            self.balance -= amt
            self.history.append(f"Withdrew: ₹{amt}")
            print(f"₹{amt} debited successfully!")
        else:
            print("Insufficient Funds!")

acc1 = Account(1001, "Piyush", 10000)
acc1.deposit(2500)
acc1.withdraw(1200)
print("Balance:", acc1.balance)
`,
        projectQuestions: ['Q1: Add a transfer() method between two Account objects.']
      }
    ]
  },

  'sql-database': {
    title: 'SQL & Database Mastery',
    description: 'Master MySQL and PostgreSQL. DDL/DML, Joins, Aggregations, Window Functions (RANK, ROW_NUMBER), and CTEs.',
    topics: [
      {
        id: 'sql-t1',
        topicName: 'Topic 1: Multi-Table Joins & Window Functions',
        detailedNotes: `
### Advanced SQL Querying
\`\`\`sql
-- Inner Join & Window Function
SELECT 
    e.EmployeeID, 
    e.Name, 
    d.DepartmentName, 
    e.Salary,
    DENSE_RANK() OVER (PARTITION BY e.DepartmentID ORDER BY e.Salary DESC) AS SalaryRank
FROM Employees e
JOIN Departments d ON e.DepartmentID = d.DepartmentID;
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: Differentiate between RANK() and DENSE_RANK() in SQL.',
            answer: 'RANK() skips rank numbers after a tie (e.g. 1, 2, 2, 4), while DENSE_RANK() does not skip rank numbers (e.g. 1, 2, 2, 3).'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'sql-p1',
        projectName: 'SQL Database Project: E-Commerce Orders & Analytics Database',
        projectDescription: 'Relational schema creation, multi-table joins, subqueries, and window function revenue reports.',
        fullSourceCode: `-- E-Commerce SQL Project Schema & Analytics Queries

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100),
    City VARCHAR(50)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10,2)
);

-- Analytics Query: Top spending customer by city using CTE & Window Function
WITH CustomerSpent AS (
    SELECT c.City, c.CustomerName, SUM(o.TotalAmount) AS TotalSpent,
           DENSE_RANK() OVER (PARTITION BY c.City ORDER BY SUM(o.TotalAmount) DESC) as rnk
    FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.City, c.CustomerName
)
SELECT City, CustomerName, TotalSpent
FROM CustomerSpent
WHERE rnk = 1;
`,
        projectQuestions: ['Q1: Write query to list customers who have never placed an order using LEFT JOIN.']
      }
    ]
  },

  'power-bi': {
    title: 'Power BI Masterclass',
    description: 'Power Query ETL, Star Schema data modeling, DAX time-intelligence calculations, and executive dashboarding.',
    topics: [
      {
        id: 'bi-t1',
        topicName: 'Topic 1: DAX Formulas & Star Schema Modeling',
        detailedNotes: `
### DAX Essentials
- **Calculated Measures**:
\`\`\`dax
Total Sales = SUM(Sales[Revenue])
YTD Sales = TOTALYTD([Total Sales], 'Calendar'[Date])
Sales YoY Growth % = DIVIDE([Total Sales] - [Prior Year Sales], [Prior Year Sales], 0)
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: What is the difference between Calculated Column and Calculated Measure in DAX?',
            answer: 'Calculated Columns consume RAM memory row-by-row during data refresh. Calculated Measures are evaluated dynamically on-the-fly during visual rendering.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'bi-p1',
        projectName: 'Power BI Project: Executive Retail & Sales Analytics Dashboard',
        projectDescription: 'Star schema setup, Power Query transformation scripts, DAX measures, and interactive reporting.',
        fullSourceCode: `/* Power BI DAX Measures Repository */

// 1. Total Revenue Measure
Total Revenue = SUM(FactSales[SalesAmount])

// 2. Year Over Year Growth
Revenue YoY Growth = 
VAR PreviousYear = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('DateTable'[Date]))
RETURN DIVIDE([Total Revenue] - PreviousYear, PreviousYear, 0)

// 3. Top Customer KPI
Top Customer Sales = CALCULATE([Total Revenue], TOPN(1, VALUES(DimCustomer[CustomerName]), [Total Revenue], DESC))
`,
        projectQuestions: ['Q1: Explain how Star Schema relationships optimize DAX performance over Flat Tables.']
      }
    ]
  },

  'machine-learning': {
    title: 'Machine Learning Specialization',
    description: 'Supervised & Unsupervised Machine Learning using Scikit-Learn. Feature Engineering, Cross-Validation, & Predictive Pipelines.',
    topics: [
      {
        id: 'ml-t1',
        topicName: 'Topic 1: Supervised Learning - Decision Trees & Random Forest',
        detailedNotes: `
### Decision Trees & Ensemble Methods
- **Entropy & Gini Impurity**: Metrics measuring node purity.
- **Random Forest Classifier**: Ensemble of decision trees trained on random feature subsets.
`,
        exercises: [
          {
            question: 'Q1: What is hyperparameter tuning and how does GridSearchCV work?',
            answer: 'GridSearchCV exhaustively searches through a specified grid of parameter values to find the combination yielding optimal model performance.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'ml-p1',
        projectName: 'Machine Learning Project: House Price Prediction & Web Deployment Pipeline',
        projectDescription: 'Linear Regression and Random Forest Regressor modeling with feature scaling and hyperparameter tuning.',
        fullSourceCode: `# Machine Learning Regressor Pipeline
import pandas as pd
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestRegressor

# Dataset
df = pd.DataFrame({
    'Bedrooms': [2, 3, 3, 4, 4, 5],
    'SqFt': [1100, 1500, 1800, 2400, 2800, 3500],
    'Price': [250000, 340000, 410000, 520000, 610000, 780000]
})

X = df[['Bedrooms', 'SqFt']]
y = df['Price']

# Grid Search Hyperparameter Tuning
param_grid = {'n_estimators': [10, 20, 50], 'max_depth': [3, 5, 10]}
rf = RandomForestRegressor(random_state=42)
grid = GridSearchCV(rf, param_grid, cv=2)
grid.fit(X, y)

print("Best Parameters:", grid.best_params_)
print("Predicted Price for 3 bed, 1650 sqft:", grid.predict([[3, 1650]])[0])
`,
        projectQuestions: ['Q1: Compare Mean Absolute Error (MAE) vs Root Mean Squared Error (RMSE).']
      }
    ]
  },

  'data-science-individual': {
    title: 'Data Science & EDA',
    description: 'Exploratory Data Analysis, Data Cleaning, Outlier Handling, and Data Storytelling with Python Seaborn & Matplotlib.',
    topics: [
      {
        id: 'eda-t1',
        topicName: 'Topic 1: Exploratory Data Analysis & Feature Wrangling',
        detailedNotes: `
### Data Cleaning Pipeline
1. Inspection (\`df.info()\`, \`df.head()\`)
2. Imputation (\`df.fillna()\`)
3. Outlier Clipping (\`df['col'].clip()\`)
4. Visualization (\`sns.pairplot()\`)
`,
        exercises: [
          {
            question: 'Q1: What is the Z-score method for outlier detection?',
            answer: 'Z-score measures how many standard deviations a data point is from the mean. Points with Z-score > 3 or < -3 are typically flagged as outliers.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'eda-p1',
        projectName: 'EDA Capstone Project: COVID & Healthcare Data Analytics',
        projectDescription: 'Full exploratory analysis pipeline with distribution plots, correlation heatmaps, and statistical summaries.',
        fullSourceCode: `# Exploratory Data Analysis Project
import pandas as pd
import numpy as np

# Sample Data
data = {
    'Age': [25, 45, 35, 50, 23, 65, 38],
    'BMI': [22.5, 28.4, 31.0, 24.1, 19.8, 33.2, 27.6],
    'BloodPressure': [80, 95, 88, 120, 78, 110, 85],
    'Outcome': [0, 1, 0, 1, 0, 1, 0]
}
df = pd.DataFrame(data)

print("=== STATISTICAL SUMMARY ===")
print(df.describe())

print("\\n=== CORRELATION MATRIX ===")
print(df.corr())
`,
        projectQuestions: ['Q1: Explain how data normalization (MinMax vs StandardScaler) impacts EDA modeling.']
      }
    ]
  },

  'linux-fundamentals': {
    title: 'Linux Administration & Shell Scripting',
    description: 'Comprehensive Linux OS architecture, Command-Line Navigation, File Permissions, Daemons, Cron Automation & Bash Shell Scripting.',
    topics: [
      {
        id: 'linux-t1',
        topicName: 'Topic 1: Linux Architecture, Directory Hierarchy & Essential CLI',
        detailedNotes: `
### Linux Operating System Architecture & Directory Hierarchy
1. **Architecture Layers**:
   - **Hardware**: CPU, RAM, Storage, Network Interface Card (NIC).
   - **Kernel**: Core of the OS that manages hardware resources, memory, device drivers, and system calls.
   - **Shell**: Command-line interpreter interfacing between user and kernel (Bash, Zsh, Sh).
   - **User Utilities & Applications**: Standard GNU tools (\`grep\`, \`sed\`, \`awk\`, \`find\`, \`curl\`).

2. **Filesystem Hierarchy Standard (FHS)**:
   - \`/\` (Root): Top-level directory of the single hierarchical filesystem tree.
   - \`/bin\` & \`/usr/bin\`: Essential user binary executables (\`ls\`, \`cp\`, \`mv\`, \`cat\`, \`bash\`).
   - \`/sbin\` & \`/usr/sbin\`: System administration binaries (\`iptables\`, \`fdisk\`, \`reboot\`, \`ip\`).
   - \`/etc\`: Host-specific system-wide configuration files (\`/etc/passwd\`, \`/etc/fstab\`, \`/etc/hosts\`).
   - \`/var\`: Variable data files, including log files (\`/var/log/syslog\`, \`/var/log/auth.log\`), mail, databases.
   - \`/home\`: Standard user personal directories (e.g. \`/home/ubuntu\`).
   - \`/root\`: Home directory for the root superuser.
   - \`/dev\`: Special device nodes (\`/dev/sda\`, \`/dev/null\`, \`/dev/zero\`, \`/dev/urandom\`).
   - \`/proc\` & \`/sys\`: In-memory virtual pseudo-filesystems presenting kernel and runtime process state.

3. **Core Command-Line Navigation & Text Manipulation**:
   - Navigation: \`pwd\`, \`cd /path\`, \`ls -lah\` (long format, all hidden files, human-readable sizes).
   - File Operations: \`mkdir -p dir1/dir2\`, \`cp -rv source dest\`, \`mv old new\`, \`rm -rf folder\`, \`touch file.txt\`.
   - Text Searching & Filtering:
     - \`grep -rnI "search_text" /etc/\`: Recursive search with line numbers, ignoring binary files.
     - \`find /var/log -type f -name "*.log" -mtime -7\`: Find log files modified in the last 7 days.
     - \`awk -F: '{print $1, $3}' /etc/passwd\`: Parse colon-delimited user entries for username and UID.
     - \`sed -i 's/PORT=80/PORT=8080/g' config.env\`: In-place string substitution.
     - \`tail -n 100 -f /var/log/nginx/access.log\`: Follow live log streams in real-time.

4. **I/O Redirection & Pipelines**:
   - Standard Streams: \`stdin\` (0), \`stdout\` (1), \`stderr\` (2).
   - \`command > output.txt\`: Overwrite standard output.
   - \`command >> output.txt\`: Append standard output.
   - \`command 2> error.log\`: Redirect standard error only.
   - \`command &> combined.log\` or \`command > file 2>&1\`: Redirect both stdout and stderr.
   - Pipes: \`ps aux | grep node | awk '{print $2}'\`: Chain output of one command as input to the next.
`,
        exercises: [
          {
            question: 'Q1: What is the difference between /bin, /sbin, and /usr/bin in Linux?',
            answer: '/bin holds essential binaries for all users required for basic single-user bootup; /sbin contains administrative binaries intended for root/sysadmins; /usr/bin contains non-essential executables for normal user applications.'
          },
          {
            question: 'Q2: How do you search for all files larger than 100MB in /var and print their sizes?',
            answer: 'Use: `find /var -type f -size +100M -exec ls -lh {} +` or `find /var -type f -size +100M -exec du -sh {} +`.'
          },
          {
            question: 'Q3: Explain how the command `2>&1` works in I/O redirection.',
            answer: '`2>&1` redirects File Descriptor 2 (Standard Error) to the same location currently referenced by File Descriptor 1 (Standard Output), ensuring both errors and standard messages flow to the same destination.'
          }
        ]
      },
      {
        id: 'linux-t2',
        topicName: 'Topic 2: Permissions, User Security & Systemd Process Control',
        detailedNotes: `
### Linux Permissions, User Accounts & Process Management
1. **Linux Permission Model**:
   - Triad: User (Owner \`u\`), Group (\`g\`), Others (\`o\`).
   - Permissions: Read (\`r\` = 4), Write (\`w\` = 2), Execute (\`x\` = 1).
   - Numerical / Octal Representation:
     - \`chmod 755 app.sh\` -> Owner: \`rwx\` (7), Group: \`r-x\` (5), Others: \`r-x\` (5).
     - \`chmod 644 database.env\` -> Owner: \`rw-\` (6), Group: \`r--\` (4), Others: \`r--\` (4).
     - \`chmod 700 ~/.ssh/id_rsa\` -> Private SSH keys must be restricted strictly to the owner.
   - Ownership: \`chown -R www-data:www-data /var/www/html\`.
   - Default Mask (\`umask\`): If umask is \`022\`, default directories are created with \`755\` (777 - 022) and files with \`644\` (666 - 022).
   - Special Bits: SUID (4000), SGID (2000), Sticky Bit (\`chmod +t /tmp\` = 1000, ensures only file owners can delete their files in public directories).

2. **User & Group Administration**:
   - Accounts database: \`/etc/passwd\` (UID, GID, home dir, shell), \`/etc/shadow\` (secure hashed passwords, expiration), \`/etc/group\`.
   - Create user with home directory and bash shell: \`useradd -m -s /bin/bash devops_user\`.
   - Set password: \`passwd devops_user\`.
   - Grant sudo superuser privileges: \`usermod -aG sudo devops_user\`.
   - Lock / unlock account: \`usermod -L devops_user\` / \`usermod -U devops_user\`.

3. **Process Management & Daemons (Systemd)**:
   - Process Inspection: \`ps aux\`, \`top\`, \`htop\`, \`pgrep -l nginx\`.
   - Process Signals: \`SIGTERM\` (15, graceful termination), \`SIGKILL\` (9, forceful termination), \`SIGHUP\` (1, reload configuration).
   - Terminate process: \`kill -15 <PID>\` or \`pkill -f python3\`.
   - Systemd Service Control:
     - Check status: \`systemctl status nginx\`
     - Start / Stop / Restart: \`systemctl start nginx\`, \`systemctl stop nginx\`, \`systemctl restart nginx\`
     - Enable on Boot: \`systemctl enable nginx\`
     - Inspect logs: \`journalctl -u nginx -n 50 --no-pager\`

4. **Task Scheduling with Cron**:
   - Edit crontab: \`crontab -e\`
   - Format: \`Minute Hour DayOfMonth Month DayOfWeek Command\`
   - Examples:
     - \`*/15 * * * * /opt/scripts/healthcheck.sh\` (Runs every 15 minutes)
     - \`0 2 * * * /backup/daily_backup.sh\` (Runs daily at 2:00 AM)
     - \`0 4 * * 1 /scripts/weekly_cleanup.sh\` (Runs every Monday at 4:00 AM)
`,
        exercises: [
          {
            question: 'Q1: What permissions does the file permission code 750 represent?',
            answer: 'Owner has full read, write, and execute permissions (7 = 4+2+1); Group has read and execute permissions (5 = 4+1); Others have zero access (0 = ---).'
          },
          {
            question: 'Q2: What is the difference between SIGTERM (15) and SIGKILL (9)?',
            answer: 'SIGTERM requests a process to cleanly shut down, allowing it to release sockets, flush buffers, and close database handles. SIGKILL immediately terminates the process through the kernel without allowing clean-up.'
          },
          {
            question: 'Q3: Write a crontab entry to execute a script `/home/admin/backup.sh` every weekday (Monday-Friday) at 11:30 PM.',
            answer: '`30 23 * * 1-5 /home/admin/backup.sh`'
          }
        ]
      },
      {
        id: 'linux-t3',
        topicName: 'Topic 3: Bash Shell Scripting & Automation Pipelines',
        detailedNotes: `
### Production Bash Shell Scripting Guide
1. **Script Foundation**:
   - Shebang header: \`#!/usr/bin/env bash\`
   - Unofficial Bash Strict Mode:
     \`set -euo pipefail\`
     - \`-e\`: Exit immediately if any command returns a non-zero exit status.
     - \`-u\`: Treat unset variables as errors and exit immediately.
     - \`-o pipefail\`: Return value of a pipeline is the status of the last command to exit with non-zero.

2. **Variables, Parameters & Quotes**:
   - Variable assignment: \`APP_DIR="/opt/techlearn"\` (no spaces around \`=\`).
   - Special Variables:
     - \`$0\`: Script name
     - \`$1\`, \`$2\`, ...: Positional command-line arguments
     - \`$#\`: Number of arguments passed
     - \`$@\`: All positional arguments as a list
     - \`$?\`: Exit status code of the last executed command (0 = success)
     - \`$$\`: Process ID (PID) of current shell script
   - Quoting: Double quotes (\`"$VAR"\`) allow variable expansion; single quotes (\`'$VAR'\`) treat content as literal string.

3. **Conditionals & File Tests**:
\`\`\`bash
if [ -f "/etc/nginx/nginx.conf" ]; then
    echo "Nginx configuration found."
elif [ -d "/etc/nginx" ]; then
    echo "Nginx directory exists but config missing!"
else
    echo "Nginx not installed."
    exit 1
fi
\`\`\`
   - File tests: \`-f\` (file exists), \`-d\` (directory exists), \`-s\` (file exists and not empty), \`-x\` (file is executable).
   - Numeric tests: \`-eq\`, \`-ne\`, \`-lt\`, \`-le\`, \`-gt\`, \`-ge\`.
   - String tests: \`[ -z "$STR" ]\` (is empty), \`[ -n "$STR" ]\` (is not empty), \`[ "$A" == "$B" ]\`.

4. **Loops & Automation Functions**:
\`\`\`bash
# Loop through files
for logfile in /var/log/*.log; do
    echo "Processing $logfile..."
    gzip "$logfile"
done

# Read file line by line safely
while IFS= read -r line || [ -n "$line" ]; do
    echo "Host: $line"
    ping -c 1 "$line" &> /dev/null && echo "UP" || echo "DOWN"
done < "servers.txt"
\`\`\`
`,
        exercises: [
          {
            question: 'Q1: Why is `set -euo pipefail` considered best practice in production Bash scripts?',
            answer: 'It enables strict error handling: `set -e` halts execution on command errors, `set -u` detects misspelled or unset variables, and `pipefail` catches errors anywhere inside piped commands.'
          },
          {
            question: 'Q2: How do you safely check if a specific command (e.g. `curl` or `docker`) is installed in a Bash script?',
            answer: 'Use `command -v curl >/dev/null 2>&1 || { echo "curl is required but not installed."; exit 1; }`'
          },
          {
            question: 'Q3: How do you pass and parse command-line flags in Bash?',
            answer: 'Use the builtin `getopts` command inside a `while getopts "p:u:h" opt; do case $opt in ... esac done` loop.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'linux-p1',
        projectName: 'DevOps Automation Project: Linux Server Health Monitor & Automated Backup Pipeline',
        projectDescription: 'Production-ready Bash script that audits CPU, Memory, Disk usage, inspects critical services (nginx, mysql, sshd), creates compressed timestamped backups, and purges backups older than 7 days.',
        fullSourceCode: `#!/usr/bin/env bash
# ==============================================================================
# TECH LEARN INSTITUTE - LINUX AUTOMATION PROJECT
# Project: Server Health Monitor & Automated Directory Backup Pipeline
# ==============================================================================

set -euo pipefail

# Configuration
readonly BACKUP_SRC="/var/www/html"
readonly BACKUP_DEST="/backup/daily"
readonly TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
readonly BACKUP_FILE="\${BACKUP_DEST}/site_backup_\${TIMESTAMP}.tar.gz"
readonly RETENTION_DAYS=7
readonly LOG_FILE="/var/log/server_monitor_\${TIMESTAMP}.log"
readonly DISK_THRESHOLD=85
readonly MEM_THRESHOLD=85

log() {
    local msg="[\$(date '+%Y-%m-%d %H:%M:%S')] \$1"
    echo "\$msg"
    echo "\$msg" >> "\${LOG_FILE}" 2>/dev/null || true
}

check_disk_usage() {
    log "INFO: Checking Root Filesystem Disk Usage..."
    local usage
    usage=$(df / | awk 'NR==2 {print $5}' | tr -d '%')
    log "INFO: Current Root Disk Utilization: \${usage}%"
    if [ "\$usage" -ge "\$DISK_THRESHOLD" ]; then
        log "WARNING: Disk usage exceeds threshold (\${usage}% >= \${DISK_THRESHOLD}%)!"
    else
        log "OK: Disk storage within healthy limits."
    fi
}

check_memory_usage() {
    log "INFO: Checking System RAM Utilization..."
    local mem_used mem_total mem_pct
    mem_total=$(free -m | awk '/Mem:/ {print $2}')
    mem_used=$(free -m | awk '/Mem:/ {print $3}')
    mem_pct=$(( mem_used * 100 / mem_total ))
    log "INFO: Memory Usage: \${mem_used}MB / \${mem_total}MB (\${mem_pct}%)"
    if [ "\$mem_pct" -ge "\$MEM_THRESHOLD" ]; then
        log "WARNING: High memory usage detected (\${mem_pct}%)!"
    else
        log "OK: Memory usage normal."
    fi
}

check_services() {
    local services=("ssh" "cron")
    log "INFO: Checking Critical System Services..."
    for s in "\${services[@]}"; do
        if systemctl is-active --quiet "\$s" 2>/dev/null; then
            log "OK: Service '\$s' is RUNNING."
        else
            log "ALERT: Service '\$s' is DOWN! Attempting restart..."
            systemctl start "\$s" 2>/dev/null || log "ERROR: Failed to restart '\$s'."
        fi
    done
}

perform_backup() {
    log "INFO: Initiating Automated Backup..."
    local target="/etc/hosts"
    if [ -d "\$BACKUP_SRC" ]; then
        target="\$BACKUP_SRC"
    fi

    mkdir -p "\$BACKUP_DEST"
    tar -czf "\$BACKUP_FILE" "\$target" 2>/dev/null
    log "SUCCESS: Backup archive created at \${BACKUP_FILE}"

    log "INFO: Pruning backups older than \${RETENTION_DAYS} days..."
    find "\$BACKUP_DEST" -type f -name "site_backup_*.tar.gz" -mtime "+\${RETENTION_DAYS}" -exec rm -f {} +
    log "OK: Backup cleanup complete."
}

main() {
    log "=== STARTING SERVER HEALTH MONITOR & BACKUP PIPELINE ==="
    check_disk_usage
    check_memory_usage
    check_services
    perform_backup
    log "=== SERVER HEALTH MONITOR COMPLETED SUCCESSFULLY ==="
}

main "\$@"
`,
        projectQuestions: [
          'Q1: Explain how the `set -euo pipefail` flags safeguard the backup pipeline from silent failures.',
          'Q2: How does the `find -mtime +7 -exec rm -f {} +` command safely identify and purge outdated backups?'
        ]
      }
    ]
  },

  'computer-networking': {
    title: 'Computer Networking & Protocols',
    description: 'OSI 7-Layer Architecture, TCP/IP Protocol Suite, IPv4 Subnetting & CIDR, DNS, DHCP, HTTP/HTTPS, Routing & Packet Inspection.',
    topics: [
      {
        id: 'net-t1',
        topicName: 'Topic 1: OSI 7-Layer Reference Model & TCP/IP Protocol Suite',
        detailedNotes: `
### OSI 7-Layer Reference Model & TCP/IP Architecture
1. **OSI 7 Layers & Protocol Data Units (PDUs)**:
   - **Layer 7 - Application Layer** (PDU: Data): Network services for applications (\`HTTP\`, \`HTTPS\`, \`DNS\`, \`DHCP\`, \`FTP\`, \`SSH\`, \`SMTP\`).
   - **Layer 6 - Presentation Layer** (PDU: Data): Data translation, formatting, encryption/decryption (TLS/SSL), and compression (JPEG, ASCII, MPEG).
   - **Layer 5 - Session Layer** (PDU: Data): Establishes, manages, and terminates communication sessions and dialogs between hosts (RPC, NetBIOS).
   - **Layer 4 - Transport Layer** (PDU: Segment for TCP / Datagram for UDP): End-to-end host-to-host delivery, port multiplexing, flow control, error recovery.
   - **Layer 3 - Network Layer** (PDU: Packet): Logical IP addressing, routing paths across disparate networks, packet fragmentation (\`IPv4\`, \`IPv6\`, \`ICMP\`, \`OSPF\`, \`BGP\`).
   - **Layer 2 - Data Link Layer** (PDU: Frame): Physical MAC addressing, node-to-node framing, media access control (\`Ethernet\`, \`Wi-Fi 802.11\`, \`ARP\`).
   - **Layer 1 - Physical Layer** (PDU: Bits): Electrical pulses, optical photons, or radio waves transmitted over physical media (Cat6 Twisted Pair, Fiber Optic, Radio frequencies).

2. **Data Encapsulation & Decapsulation**:
   - **Sender (Encapsulation - Top to Bottom)**:
     1. User application data is generated at L7.
     2. Transport Layer (L4) attaches source & destination port numbers -> **Segment**.
     3. Network Layer (L3) attaches source & destination IP addresses -> **Packet**.
     4. Data Link Layer (L2) attaches source & destination MAC addresses and Frame Check Sequence (FCS/CRC) trailer -> **Frame**.
     5. Physical Layer (L1) encodes the frame into raw bits on the wire/air -> **Bits**.
   - **Receiver (Decapsulation - Bottom to Top)**: Each layer verifies its corresponding header, strips it, and forwards the payload to the layer above.

3. **Layer 2 Data Link Concepts**:
   - **MAC Address**: 48-bit (6-byte) physical hardware address burned into the NIC (e.g. \`00:1A:2B:3C:4D:5E\`).
     - First 24 bits: Organizationally Unique Identifier (OUI) assigned to manufacturer.
     - Last 24 bits: Unique device identifier.
   - **Address Resolution Protocol (ARP)**: Resolves known Layer 3 IP address to unknown Layer 2 MAC address within a local subnet.
     - Sender broadcasts \`ARP Request\` to FF:FF:FF:FF:FF:FF.
     - Target responds with unicast \`ARP Reply\` containing its physical MAC address.
   - **Switches vs Hubs vs Routers**:
     - **Hub (L1)**: Single collision domain, single broadcast domain. Re-broadcasts every incoming bit out all ports.
     - **Switch (L2)**: Breaks collision domains (each switch port is an independent collision domain), single broadcast domain. Builds a CAM (MAC address) table dynamically.
     - **Router (L3)**: Breaks broadcast domains. Forwards packets across distinct networks using IP routing tables.
`,
        exercises: [
          {
            question: 'Q1: List all 7 layers of the OSI model from Layer 1 to Layer 7 and specify the PDU at each layer.',
            answer: 'Layer 1: Physical (Bits); Layer 2: Data Link (Frames); Layer 3: Network (Packets); Layer 4: Transport (Segments/Datagrams); Layer 5: Session (Data); Layer 6: Presentation (Data); Layer 7: Application (Data).'
          },
          {
            question: 'Q2: Explain the exact workflow of the Address Resolution Protocol (ARP) when Host A communicates with Host B on the same LAN.',
            answer: 'Host A checks its local ARP cache. If Host B\'s IP is not cached, Host A sends a broadcast ARP Request frame (destination MAC FF:FF:FF:FF:FF:FF) asking "Who has IP X.X.X.X?". All hosts receive it, but only Host B responds with a unicast ARP Reply with its MAC address. Host A caches the mapping and transmits the frame.'
          },
          {
            question: 'Q3: What is the difference between a Collision Domain and a Broadcast Domain?',
            answer: 'A Collision Domain is a network segment where simultaneous packet transmissions collide (isolated by Switches and Bridges). A Broadcast Domain is a segment in which any broadcast frame sent by one device is received by all others (bounded and separated only by Routers/Layer 3 switches).'
          }
        ]
      },
      {
        id: 'net-t2',
        topicName: 'Topic 2: IPv4 Addressing, Subnet Masks, CIDR & IPv6',
        detailedNotes: `
### IP Addressing, Subnetting Math & IPv6
1. **IPv4 Address Structure**:
   - 32-bit binary number represented in dotted-decimal format (4 octets, 8 bits each, 0–255).
   - Composed of two parts: **Network ID** and **Host ID**, demarcated by the **Subnet Mask**.
   - Default Address Classes:
     - **Class A**: \`1.0.0.0\` to \`126.255.255.255\` (Default mask \`255.0.0.0\` or \`/8\`). Large enterprise networks.
     - **Class B**: \`128.0.0.0\` to \`191.255.255.255\` (Default mask \`255.255.0.0\` or \`/16\`). Medium networks.
     - **Class C**: \`192.0.0.0\` to \`223.255.255.255\` (Default mask \`255.255.255.0\` or \`/24\`). Small LANs.
     - **Class D**: \`224.0.0.0\` to \`239.255.255.255\` (Multicast groups).
     - **Class E**: \`240.0.0.0\` to \`255.255.255.255\` (Reserved / Experimental).
     - **Loopback Address**: \`127.0.0.1\` to \`127.255.255.255\` (Host internal diagnostic stack).

2. **Private IP Address Ranges (RFC 1918)**:
   - Private networks (free to use, non-routable on the public Internet):
     - \`10.0.0.0/8\` (10.0.0.0 - 10.255.255.255) -> 16,777,216 addresses.
     - \`172.16.0.0/12\` (172.16.0.0 - 172.31.255.255) -> 1,048,576 addresses.
     - \`192.168.0.0/16\` (192.168.0.0 - 192.168.255.255) -> 65,536 addresses.
   - **Network Address Translation (NAT)**: Router translates private IPs into a shared public IP address using unique ephemeral source ports (PAT - Port Address Translation).

3. **Subnetting & CIDR Calculations**:
   - CIDR (Classless Inter-Domain Routing): Slash notation indicating number of network bits (e.g. \`192.168.1.0/26\`).
   - Formulas:
     - Number of Subnets = \`2^n\` (where \`n\` = borrowed subnet bits).
     - Usable Hosts per Subnet = \`2^h - 2\` (where \`h\` = remaining host bits, subtracting 2 for Network Address and Broadcast Address).
   - Example Calculation: \`192.168.10.0/27\`
     - Default Class C is /24 -> Borrowed bits \`n = 27 - 24 = 3\`.
     - Subnets = \`2^3 = 8\` subnets.
     - Host bits \`h = 32 - 27 = 5\` bits.
     - Usable hosts per subnet = \`2^5 - 2 = 32 - 2 = 30\` hosts.
     - Subnet Mask = \`255.255.255.224\` (128+64+32 = 224).
     - Block Size = \`256 - 224 = 32\`.
     - Subnets:
       - Subnet 1: \`192.168.10.0\` (Network), Usable: \`.1\` to \`.30\`, Broadcast: \`.31\`
       - Subnet 2: \`192.168.10.32\` (Network), Usable: \`.33\` to \`.62\`, Broadcast: \`.63\`

4. **IPv6 Architecture**:
   - 128-bit address space (approx \`3.4 x 10^38\` unique addresses).
   - Represented as 8 groups of 4 hexadecimal digits separated by colons (\`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`).
   - Compression rules: Leading zeros can be dropped; consecutive blocks of zeros replaced once with \`::\`.
   - Key benefits: Eliminates NAT, auto-configuration (SLAAC), built-in IPsec, no broadcast traffic (multicast used instead).
`,
        exercises: [
          {
            question: 'Q1: For the network 172.16.0.0/20, what is the subnet mask and how many usable host addresses exist per subnet?',
            answer: 'Subnet mask is 255.255.240.0 (/20 = 8+8+4 network bits). Host bits h = 32 - 20 = 12 bits. Usable hosts = 2^12 - 2 = 4096 - 2 = 4,094 usable host addresses.'
          },
          {
            question: 'Q2: Why must 2 IP addresses be subtracted when computing usable hosts in any IPv4 subnet?',
            answer: 'The first address in any subnet represents the Network Identifier (all host bits 0), and the last address represents the Subnet Directed Broadcast address (all host bits 1). Neither can be assigned to a host NIC.'
          },
          {
            question: 'Q3: Compress the IPv6 address `2001:0db8:0000:0000:0000:0000:1428:57ab` using standard compression rules.',
            answer: '`2001:db8::1428:57ab` (leading zero removed in second group, consecutive zero groups collapsed to `::`).'
          }
        ]
      },
      {
        id: 'net-t3',
        topicName: 'Topic 3: Transport & Application Protocols, Routing & Wireshark',
        detailedNotes: `
### Network Protocols, Routing Principles & Packet Analysis
1. **Transport Layer: TCP vs UDP**:
   - **TCP (Transmission Control Protocol)**:
     - Connection-oriented, stateful, reliable.
     - Features: In-order delivery, flow control (Sliding Window), congestion control, automatic retransmission (ARQ).
     - **3-Way Handshake**:
       1. Client -> Server: \`SYN\` (Seq = X)
       2. Server -> Client: \`SYN-ACK\` (Seq = Y, Ack = X + 1)
       3. Client -> Server: \`ACK\` (Seq = X + 1, Ack = Y + 1)
     - **Connection Teardown**: \`FIN\` -> \`ACK\` -> \`FIN\` -> \`ACK\`.
   - **UDP (User Datagram Protocol)**:
     - Connectionless, stateless, lightweight (8-byte header vs 20-60 byte TCP header).
     - No handshake, no delivery guarantee, minimal latency.
     - Used by: Video streaming, VoIP, DNS queries, DHCP, NTP, online gaming.

2. **Core Application Layer Protocols & Ports**:
   - **DNS (Domain Name System - Port 53 UDP/TCP)**:
     - Hierarchical namespace: Root servers (\`.\`) -> TLD servers (\`.com\`, \`.in\`) -> Authoritative nameservers.
     - Records: \`A\` (IPv4), \`AAAA\` (IPv6), \`CNAME\` (canonical alias), \`MX\` (mail exchanger), \`TXT\` (SPF/DKIM verification).
   - **DHCP (Dynamic Host Configuration Protocol - Ports 67/68 UDP)**:
     - 4-Step **DORA** Process:
       1. **D**iscover: Client broadcasts looking for a DHCP server.
       2. **O**ffer: Server offers an available IP address.
       3. **R**equest: Client requests to lease the offered IP.
       4. **A**cknowledge: Server confirms the lease and provides default gateway, subnet mask, and DNS servers.
   - **HTTP (Port 80) vs HTTPS (Port 443)**:
     - HTTPS runs HTTP over an encrypted TLS/SSL session.
     - TLS Handshake: Key exchange using asymmetric cryptography (RSA/ECC) to securely negotiate a shared symmetric key (AES-256) for bulk session encryption.

3. **Routing Fundamentals**:
   - **Static Routing**: Manually configured route entries (\`ip route 10.0.0.0 255.0.0.0 192.168.1.1\`). Simple, zero routing protocol overhead, but fails if link breaks.
   - **Dynamic Routing**:
     - Interior Gateway Protocols (IGP): RIP (Distance Vector, hop count metric), OSPF (Link-State, Dijkstra algorithm metric of cost/bandwidth).
     - Exterior Gateway Protocol (EGP): BGP (Border Gateway Protocol, Path Vector algorithm managing routes across autonomous systems on the global Internet).

4. **Network Troubleshooting Tools & Wireshark**:
   - \`ping host\`: Tests IP connectivity using ICMP Echo Request / Echo Reply.
   - \`traceroute host\` / \`tracert\`: Maps router hops along path by incrementing TTL (Time to Live) values starting at 1.
   - \`netstat -tulnp\` / \`ss -tulnp\`: Displays listening ports, active sockets, and owning process PIDs.
   - \`Wireshark\`: Packet capture tool. Filters: \`tcp.port == 443\`, \`ip.addr == 192.168.1.1\`, \`dns\`, \`http.request.method == "POST"\`.
`,
        exercises: [
          {
            question: 'Q1: Describe the 3-Way Handshake performed by TCP to establish a connection.',
            answer: '1. The client sends a SYN packet with a random initial sequence number X. 2. The server acknowledges with a SYN-ACK packet containing sequence number Y and acknowledgment number X+1. 3. The client replies with an ACK packet containing acknowledgment number Y+1. The connection is now established.'
          },
          {
            question: 'Q2: Outline the 4 steps of the DHCP DORA process.',
            answer: 'Discover (client broadcasts DHCPDISCOVER), Offer (DHCP server unicasts/broadcasts DHCPOFFER with IP lease), Request (client broadcasts DHCPREQUEST claiming the IP), Acknowledge (server transmits DHCPACK finalizing the lease).'
          },
          {
            question: 'Q3: How does the `traceroute` utility discover each intermediate router hop between source and destination?',
            answer: 'It sends UDP/ICMP packets with incrementally increasing TTL (Time To Live) starting at TTL=1. Each router decrements TTL by 1; when TTL hits 0, the router discards the packet and sends back an ICMP "Time Exceeded" message, revealing its IP address and round-trip time.'
          }
        ]
      }
    ],
    projects: [
      {
        id: 'net-p1',
        projectName: 'Network Engineering Project: Multi-Threaded TCP Port Scanner & Protocol Service Auditor',
        projectDescription: 'Production Python utility implementing concurrent socket connections, TCP SYN/Connect port scanning, DNS resolution, and service banner grabbing with latency profiling.',
        fullSourceCode: `#!/usr/bin/env python3
"""
TECH LEARN INSTITUTE - COMPUTER NETWORKING & SECURITY PROJECT
Project: Multi-Threaded Socket Port Scanner & Protocol Analyzer
"""

import socket
import sys
import time
from concurrent.futures import ThreadPoolExecutor

COMMON_PORTS = {
    21: "FTP (File Transfer)",
    22: "SSH (Secure Shell)",
    23: "Telnet (Unencrypted CLI)",
    25: "SMTP (Mail Routing)",
    53: "DNS (Domain Name Service)",
    80: "HTTP (Web Traffic)",
    110: "POP3 (Mail Retrieval)",
    143: "IMAP (Mail Access)",
    443: "HTTPS (Encrypted Web Traffic)",
    3306: "MySQL Database",
    5432: "PostgreSQL Database",
    6379: "Redis Cache Server",
    8080: "HTTP Alternate / Web Proxy"
}

def scan_port(host, port, timeout=1.2):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        start_time = time.time()
        result = sock.connect_ex((host, port))
        latency = (time.time() - start_time) * 1000

        if result == 0:
            service = COMMON_PORTS.get(port, "Unknown Service")
            banner = ""
            try:
                sock.send(b"HEAD / HTTP/1.0\\r\\n\\r\\n")
                raw = sock.recv(128).decode('utf-8', errors='ignore').strip()
                if raw:
                    banner = f" | Banner: {raw.splitlines()[0][:40]}"
            except Exception:
                pass
            sock.close()
            return (port, True, latency, service, banner)
        sock.close()
        return (port, False, 0, "", "")
    except socket.error:
        return (port, False, 0, "", "")

def run_network_audit(target_host, ports_to_scan, max_workers=50):
    print("=" * 65)
    print("TECH LEARN NETWORK PROTOCOL & PORT AUDITOR")
    print(f"Target Host : {target_host}")
    try:
        target_ip = socket.gethostbyname(target_host)
        print(f"Resolved IP : {target_ip}")
    except socket.gaierror:
        print(f"[!] Error: Could not resolve hostname '{target_host}'.")
        return

    print(f"Scanning    : {len(ports_to_scan)} Ports across {max_workers} threads...")
    print("=" * 65)

    start_audit = time.time()
    open_ports = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(scan_port, target_ip, p) for p in ports_to_scan]
        for f in futures:
            port, is_open, latency, service, banner = f.result()
            if is_open:
                print(f"[+] PORT {port:5d}/TCP OPEN | {latency:6.1f}ms | {service}{banner}")
                open_ports.append(port)

    elapsed = time.time() - start_audit
    print("-" * 65)
    print(f"[✓] Scan Complete in {elapsed:.2f} seconds.")
    print(f"[✓] Discovered {len(open_ports)} OPEN port(s): {open_ports}")
    print("=" * 65)

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else '127.0.0.1'
    ports = list(COMMON_PORTS.keys())
    run_network_audit(target, ports)
`,
        projectQuestions: [
          'Q1: How does `sock.connect_ex()` utilize the TCP 3-way handshake to verify if a port is open?',
          'Q2: What is service banner grabbing and how does it assist network administrators in vulnerability assessment?'
        ]
      }
    ]
  }
};
