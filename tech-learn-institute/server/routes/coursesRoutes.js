import express from 'express';
import pool from '../db.js';
import { requireAdminAuth, sanitizeString } from '../security.js';

const router = express.Router();

// GET /api/courses - Fetch all active courses from MySQL
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT course_id, title, category, duration, fee_amount, fee_display, mode, status FROM courses WHERE status = "Active" ORDER BY created_at ASC'
    );
    res.json({ success: true, courses: rows });
  } catch (error) {
    console.error('[MySQL Error] Fetching courses:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve course list.' });
  }
});

// POST /api/courses - Add course (Admin Only)
router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const { course_id, title, category, duration, mode } = req.body;
    const cleanId = sanitizeString(course_id, 50);
    const cleanTitle = sanitizeString(title, 150);
    const cleanCategory = sanitizeString(category, 50);
    const cleanDuration = sanitizeString(duration, 100);
    const cleanMode = sanitizeString(mode, 100) || '100% Online Class with Flexible Timings';

    if (!cleanId || !cleanTitle) {
      return res.status(400).json({ success: false, message: 'Course ID and title are required.' });
    }

    const sql = `INSERT INTO courses (course_id, title, category, duration, fee_amount, fee_display, mode, status)
                 VALUES (?, ?, ?, ?, 0, 'Admissions Open', ?, 'Active')
                 ON DUPLICATE KEY UPDATE title = VALUES(title), category = VALUES(category), duration = VALUES(duration), mode = VALUES(mode)`;
    await pool.query(sql, [cleanId, cleanTitle, cleanCategory, cleanDuration, cleanMode]);

    res.status(201).json({ success: true, message: 'Course saved successfully in MySQL.' });
  } catch (error) {
    console.error('[MySQL Error] Adding course:', error);
    res.status(500).json({ success: false, message: 'Unable to save course.' });
  }
});

export default router;
