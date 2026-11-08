import express from 'express';
import pool from '../db.js';
import { requireAdminAuth, sanitizeString, isValidEmail, isValidPhone, createRateLimiter } from '../security.js';

const router = express.Router();
const demoLimiter = createRateLimiter(60000, 15);

// POST /api/demo-booking - Save demo class booking in MySQL
router.post('/', demoLimiter, async (req, res) => {
  try {
    const rawName = req.body.student_name;
    const rawPhone = req.body.phone_number;
    const rawEmail = req.body.email_id;
    const rawCourse = req.body.course_name;
    const rawSlot = req.body.preferred_slot || req.body.timing_slot;

    const student_name = sanitizeString(rawName, 100);
    const phone_number = sanitizeString(rawPhone, 20);
    const email_id = sanitizeString(rawEmail, 120);
    const course_name = sanitizeString(rawCourse, 100);
    const preferred_slot = sanitizeString(rawSlot, 100) || 'Online Class (Flexible Timing)';

    if (!student_name) {
      return res.status(400).json({ success: false, message: 'Student Name is required.' });
    }
    if (email_id && !isValidEmail(email_id)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }
    if (phone_number && !isValidPhone(phone_number)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format.' });
    }

    // Insert into MySQL demo_bookings table
    const sql = `INSERT INTO demo_bookings (student_name, phone_number, email_id, course_name, preferred_slot)
                 VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [
      student_name,
      phone_number,
      email_id,
      course_name,
      preferred_slot
    ]);

    // Also register into admissions table so admin has unified overview
    await pool.query(
      `INSERT INTO admissions (student_name, phone_number, email_id, course_name, timing_slot, fee_amount, message, status)
       VALUES (?, ?, ?, ?, ?, 'Flexible Online Batch', 'Booked Free Demo Class', 'Confirmed')`,
      [student_name, phone_number, email_id, course_name, preferred_slot]
    ).catch(e => console.warn('Secondary admission logging note:', e.message));

    console.log(`[Tech_learn MySQL] Saved demo booking #${result.insertId} for ${student_name}`);

    res.status(201).json({
      success: true,
      message: 'Demo class booked and saved in MySQL database (Tech_learn)!',
      booking_id: result.insertId,
      admin_whatsapp: '8974003523',
      admin_email: 'pp8842973@gmail.com'
    });
  } catch (error) {
    console.error('[MySQL Error] Inserting demo booking:', error);
    res.status(500).json({ success: false, message: 'An error occurred while booking demo class.' });
  }
});

// GET /api/demo-booking - Fetch demo bookings (Admin Only)
router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM demo_bookings ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, bookings: rows });
  } catch (error) {
    console.error('[MySQL Error] Reading demo bookings:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve demo bookings from MySQL.' });
  }
});

// DELETE /api/demo-booking/:id - Delete demo booking from MySQL (Admin Only)
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM demo_bookings WHERE id = ?', [id]);
    res.json({ success: true, message: `Demo booking #${id} removed from MySQL.` });
  } catch (error) {
    console.error('[MySQL Error] Deleting demo booking:', error);
    res.status(500).json({ success: false, message: 'Unable to delete demo booking.' });
  }
});

export default router;
