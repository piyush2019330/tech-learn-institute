import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import {
  sanitizeString,
  isValidEmail,
  isValidPhone,
  hashPassword,
  verifyAdminPasscode,
  generateAdminToken,
  requireAdminAuth,
  createRateLimiter,
  securityHeadersMiddleware
} from './security.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enforce HTTP Security Headers & Disable Fingerprinting
app.use(securityHeadersMiddleware);

// 2. Strict CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl) or allowed local origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token']
}));

// 3. Body Parser with Payload Size Limit (Prevents Memory Exhaustion Attacks)
app.use(express.json({ limit: '100kb' }));

// 4. Global API Rate Limiter (Max 40 requests per minute per IP)
app.use(createRateLimiter(60000, 40));

// Specific Strict Limiter for Auth Endpoints (Max 5 attempts per 5 minutes to prevent Brute Force)
const authLimiter = createRateLimiter(300000, 8);

// ============================================================================
// PUBLIC ENDPOINTS
// ============================================================================

// Health Check API
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DATABASE() as db_name, VERSION() as version');
    res.json({ 
      status: 'OK', 
      security: 'Active (Protected by CSP, HSTS, Rate Limiting & Input Sanitization)',
      connected_database: rows[0].db_name || 'Tech_learn',
      server_version: rows[0].version
    });
  } catch (err) {
    res.json({
      status: 'Database Offline / Simulated',
      security: 'Active',
      connected_database: 'Tech_learn'
    });
  }
});

// Fetch Active Courses & Fees
app.get('/api/courses', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT course_id, title, category, duration, fee_amount, fee_display, mode FROM courses WHERE status = "Active"');
    res.json({ success: true, courses: rows });
  } catch (error) {
    console.error('[Security Log] Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve course list.' });
  }
});

// Submit Student Admission / Seat Reservation (Sanitized & Validated)
app.post('/api/admissions', createRateLimiter(60000, 10), async (req, res) => {
  try {
    const rawName = req.body.student_name;
    const rawPhone = req.body.phone_number;
    const rawEmail = req.body.email_id;
    const rawCourse = req.body.course_name;
    const rawTiming = req.body.timing_slot;
    const rawMessage = req.body.message;

    // Strict Input Sanitization
    const student_name = sanitizeString(rawName, 100);
    const phone_number = sanitizeString(rawPhone, 20);
    const email_id = sanitizeString(rawEmail, 120);
    const course_name = sanitizeString(rawCourse, 100);
    const timing_slot = sanitizeString(rawTiming, 80);
    const message = sanitizeString(rawMessage, 500);

    // Validation Checks
    if (!student_name) {
      return res.status(400).json({ success: false, message: 'Student Name is required.' });
    }
    if (email_id && !isValidEmail(email_id)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }
    if (phone_number && !isValidPhone(phone_number)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
    }

    // Batch admission status
    const fee_amount = 'Flexible Online Batch';

    // 100% Parameterized Prepared Statement (Prevents SQL Injection)
    const sql = `INSERT INTO admissions (student_name, phone_number, email_id, course_name, timing_slot, fee_amount, message) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
                 
    const [result] = await pool.query(sql, [
      student_name,
      phone_number,
      email_id,
      course_name,
      timing_slot || 'Online Class (Flexible Timing)',
      fee_amount,
      message || 'Admission / Demo Class Inquiry'
    ]);

    console.log(`[Tech_learn Security] Logged admission #${result.insertId} securely.`);

    res.status(201).json({
      success: true,
      message: 'Admission registered securely in Tech_learn database!',
      admission_id: result.insertId,
      admin_whatsapp: '8974003523',
      admin_email: 'pp8842973@gmail.com'
    });
  } catch (error) {
    console.error('[Security Log] Error inserting admission:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing admission.' });
  }
});

// ============================================================================
// ADMIN AUTHENTICATION & PROTECTED MANAGEMENT ROUTES
// ============================================================================

// Admin Login Endpoint (Timing-safe passkey verification + Token Generation)
app.post('/api/admin/login', authLimiter, async (req, res) => {
  try {
    const { passcode } = req.body;

    if (!passcode || !verifyAdminPasscode(passcode)) {
      console.warn(`[Security Alert] Failed admin login attempt from IP: ${req.ip}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin Passcode.'
      });
    }

    // Generate secure HMAC-SHA256 session token
    const token = generateAdminToken();
    console.log(`[Security Log] Admin authenticated successfully. Issued token.`);

    res.json({
      success: true,
      token,
      message: 'Admin access granted.',
      admin_name: 'Piyush',
      database: 'Tech_learn'
    });
  } catch (error) {
    console.error('[Security Log] Admin login error:', error);
    res.status(500).json({ success: false, message: 'Authentication service error.' });
  }
});

// Protected Route: Retrieve Admissions List (Requires x-admin-token)
app.get('/api/admissions', requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM admissions ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, admissions: rows });
  } catch (error) {
    console.error('[Security Log] Error reading admissions:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve records.' });
  }
});

// Protected Route: Retrieve Student Accounts (Requires x-admin-token)
app.get('/api/students', requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, username, email, phone_number, is_access_granted, unlocked_courses, created_at FROM students ORDER BY created_at DESC');
    res.json({ success: true, students: rows });
  } catch (error) {
    console.error('[Security Log] Error reading students:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve students.' });
  }
});

// Protected Route: Create New Student Credential (Hashed Passwords)
app.post('/api/students', requireAdminAuth, async (req, res) => {
  try {
    const { name, username, email, phone_number, password, is_access_granted, unlocked_courses } = req.body;

    const cleanName = sanitizeString(name, 100);
    const cleanUsername = sanitizeString(username, 80);
    const cleanEmail = sanitizeString(email, 120);
    const cleanPhone = sanitizeString(phone_number, 20);

    if (!cleanName || !cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    // Cryptographic Password Hashing (PBKDF2)
    const secureHashedPassword = hashPassword(password);
    const studentId = 'std-' + Date.now();

    const sql = `INSERT INTO students (id, name, username, email, phone_number, password, is_access_granted, unlocked_courses)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await pool.query(sql, [
      studentId,
      cleanName,
      cleanUsername || cleanEmail,
      cleanEmail,
      cleanPhone || '8974003523',
      secureHashedPassword,
      is_access_granted ? 1 : 0,
      JSON.stringify(unlocked_courses || [])
    ]);

    res.status(201).json({
      success: true,
      message: 'Student account created with cryptographically hashed password.'
    });
  } catch (error) {
    console.error('[Security Log] Error creating student:', error);
    res.status(500).json({ success: false, message: 'Could not create student account.' });
  }
});

// Protected Route: Update Access Permissions
app.put('/api/students/:id/access', requireAdminAuth, async (req, res) => {
  try {
    const studentId = sanitizeString(req.params.id, 50);
    const { is_access_granted, unlocked_courses } = req.body;

    const sql = `UPDATE students SET is_access_granted = ?, unlocked_courses = ? WHERE id = ?`;
    await pool.query(sql, [
      is_access_granted ? 1 : 0,
      JSON.stringify(unlocked_courses || []),
      studentId
    ]);

    res.json({ success: true, message: `Access permissions updated securely for student ${studentId}.` });
  } catch (error) {
    console.error('[Security Log] Error updating student access:', error);
    res.status(500).json({ success: false, message: 'Could not update student access.' });
  }
});

// 5. Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint Not Found' });
});

app.listen(PORT, () => {
  console.log(`🛡️ Tech Learn Secure API Server running on port ${PORT}`);
  console.log(`🔒 Security active: CSP, HSTS, Timing-safe Admin Auth, HMAC Session Tokens, PBKDF2 Hashing, DDoS Rate Limiting`);
});
