import express from 'express';
import pool from '../db.js';
import { 
  requireAdminAuth, 
  sanitizeString, 
  hashPassword, 
  verifyPassword,
  createRateLimiter 
} from '../security.js';

const router = express.Router();
const studentLoginLimiter = createRateLimiter(60000, 10);

// POST /api/students/login - Student Portal Authentication (MySQL)
router.post('/login', studentLoginLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const cleanId = sanitizeString(identifier, 120);

    if (!cleanId || !password) {
      return res.status(400).json({ success: false, message: 'Email/Username and Password are required.' });
    }

    // Query MySQL for student by email or username
    const [rows] = await pool.query(
      'SELECT id, name, username, email, phone_number, password, is_access_granted, unlocked_courses FROM students WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)',
      [cleanId, cleanId]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'No student account found with this email/username.' });
    }

    const student = rows[0];

    // Verify Password (supports PBKDF2 hashed password or direct match for seed data)
    let passwordMatches = false;
    if (student.password && student.password.includes(':')) {
      passwordMatches = verifyPassword(password, student.password);
    } else {
      passwordMatches = (student.password === password);
    }

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: 'Incorrect password! Please check your credentials.' });
    }

    // Parse unlocked courses
    let unlocked = [];
    try {
      unlocked = typeof student.unlocked_courses === 'string' 
        ? JSON.parse(student.unlocked_courses) 
        : (student.unlocked_courses || []);
    } catch (e) {
      unlocked = [];
    }

    // Return student profile without password
    res.json({
      success: true,
      message: 'Login successful.',
      student: {
        id: student.id,
        name: student.name,
        username: student.username,
        email: student.email,
        phone: student.phone_number,
        isAccessGranted: Boolean(student.is_access_granted),
        unlockedCourses: unlocked
      }
    });
  } catch (error) {
    console.error('[MySQL Error] Student login:', error);
    res.status(500).json({ success: false, message: 'Authentication server error.' });
  }
});

// GET /api/students - Fetch all student accounts from MySQL (Admin Only)
router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, username, email, phone_number, is_access_granted, unlocked_courses, created_at FROM students ORDER BY created_at DESC'
    );
    
    // Normalize format
    const formatted = rows.map(r => {
      let unlocked = [];
      try {
        unlocked = typeof r.unlocked_courses === 'string' ? JSON.parse(r.unlocked_courses) : (r.unlocked_courses || []);
      } catch (e) {
        unlocked = [];
      }
      return {
        id: r.id,
        name: r.name,
        username: r.username,
        email: r.email,
        phone: r.phone_number,
        isAccessGranted: Boolean(r.is_access_granted),
        unlockedCourses: unlocked,
        registeredDate: r.created_at ? new Date(r.created_at).toISOString().split('T')[0] : '2026-10-04'
      };
    });

    res.json({ success: true, count: formatted.length, students: formatted });
  } catch (error) {
    console.error('[MySQL Error] Reading students:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve students from MySQL.' });
  }
});

// POST /api/students - Create new student in MySQL (Admin Only)
router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const { name, username, email, phone_number, password, is_access_granted, unlocked_courses } = req.body;

    const cleanName = sanitizeString(name, 100);
    const cleanUsername = sanitizeString(username, 80);
    const cleanEmail = sanitizeString(email, 120);
    const cleanPhone = sanitizeString(phone_number, 20) || '8974003523';

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
      cleanPhone,
      secureHashedPassword,
      is_access_granted ? 1 : 0,
      JSON.stringify(unlocked_courses || [])
    ]);

    console.log(`[Tech_learn MySQL] Created student account ${cleanEmail} (${studentId})`);

    res.status(201).json({
      success: true,
      message: 'Student account created and saved in MySQL database (Tech_learn)!',
      student_id: studentId
    });
  } catch (error) {
    console.error('[MySQL Error] Creating student:', error);
    res.status(500).json({ success: false, message: 'Could not create student in MySQL.' });
  }
});

// PUT /api/students/:id/access - Update student access & unlocked courses in MySQL (Admin Only)
router.put('/:id/access', requireAdminAuth, async (req, res) => {
  try {
    const studentId = sanitizeString(req.params.id, 50);
    const { is_access_granted, unlocked_courses } = req.body;

    const sql = `UPDATE students SET is_access_granted = ?, unlocked_courses = ? WHERE id = ?`;
    await pool.query(sql, [
      is_access_granted ? 1 : 0,
      JSON.stringify(unlocked_courses || []),
      studentId
    ]);

    res.json({ success: true, message: `Access permissions saved in MySQL for student ${studentId}.` });
  } catch (error) {
    console.error('[MySQL Error] Updating student access:', error);
    res.status(500).json({ success: false, message: 'Could not update student access in MySQL.' });
  }
});

// DELETE /api/students/:id - Remove student from MySQL (Admin Only)
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const studentId = sanitizeString(req.params.id, 50);
    await pool.query('DELETE FROM students WHERE id = ?', [studentId]);
    res.json({ success: true, message: `Student ${studentId} deleted from MySQL.` });
  } catch (error) {
    console.error('[MySQL Error] Deleting student:', error);
    res.status(500).json({ success: false, message: 'Could not delete student from MySQL.' });
  }
});

export default router;
