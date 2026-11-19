import express from 'express';
import pool from '../db.js';
import { requireAdminAuth, sanitizeString, isValidEmail, isValidPhone, createRateLimiter } from '../security.js';

const router = express.Router();

// Rate limiter for public admission submissions
const admissionLimiter = createRateLimiter(60000, 15);

// POST /api/admissions - Register new admission / seat reservation into MySQL
router.post('/', admissionLimiter, async (req, res) => {
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
    const timing_slot = sanitizeString(rawTiming, 100) || 'Online Class (Flexible Timing)';
    const message = sanitizeString(rawMessage, 500) || 'Seat Reservation / Admission Request';

    if (!student_name) {
      return res.status(400).json({ success: false, message: 'Student Name is required.' });
    }
    if (email_id && !isValidEmail(email_id)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }
    if (phone_number && !isValidPhone(phone_number)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
    }

    const fee_amount = 'Flexible Online Batch';

    // 100% Parameterized Prepared Statement (Prevents SQL Injection)
    const sql = `INSERT INTO admissions (student_name, phone_number, email_id, course_name, timing_slot, fee_amount, message, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'Confirmed')`;
                 
    const [result] = await pool.query(sql, [
      student_name,
      phone_number,
      email_id,
      course_name,
      timing_slot,
      fee_amount,
      message
    ]);

    console.log(`[Tech_learn MySQL] Saved admission #${result.insertId} for ${student_name}`);

    res.status(201).json({
      success: true,
      message: 'Admission registered and saved in MySQL database (Tech_learn)!',
      admission_id: result.insertId,
      admin_whatsapp: '8974003523',
      admin_email: 'pp8842973@gmail.com'
    });
  } catch (error) {
    console.error('[MySQL Error] Inserting admission:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving admission.' });
  }
});

// GET /api/admissions - Fetch all admissions from MySQL (Admin Only)
router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM admissions ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, admissions: rows });
  } catch (error) {
    console.error('[MySQL Error] Reading admissions:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve admissions from MySQL.' });
  }
});

// PUT /api/admissions/:id/status - Update admission status in MySQL (Admin Only)
router.put('/:id/status', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    const cleanStatus = sanitizeString(status, 20) || 'Confirmed';

    await pool.query('UPDATE admissions SET status = ? WHERE id = ?', [cleanStatus, id]);
    res.json({ success: true, message: `Admission #${id} status updated to ${cleanStatus}.` });
  } catch (error) {
    console.error('[MySQL Error] Updating admission status:', error);
    res.status(500).json({ success: false, message: 'Unable to update admission status.' });
  }
});

// DELETE /api/admissions/:id - Delete admission from MySQL (Admin Only)
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM admissions WHERE id = ?', [id]);
    res.json({ success: true, message: `Admission #${id} deleted from MySQL.` });
  } catch (error) {
    console.error('[MySQL Error] Deleting admission:', error);
    res.status(500).json({ success: false, message: 'Unable to delete admission.' });
  }
});

export default router;
