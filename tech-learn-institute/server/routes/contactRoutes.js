import express from 'express';
import pool from '../db.js';
import { requireAdminAuth, sanitizeString, isValidEmail, isValidPhone, createRateLimiter } from '../security.js';

const router = express.Router();
const contactLimiter = createRateLimiter(60000, 15);

// POST /api/contact - Save contact inquiry to MySQL
router.post('/', contactLimiter, async (req, res) => {
  try {
    const rawName = req.body.name;
    const rawPhone = req.body.phone;
    const rawEmail = req.body.email;
    const rawCourse = req.body.course;
    const rawMessage = req.body.message;

    const name = sanitizeString(rawName, 100);
    const phone = sanitizeString(rawPhone, 20);
    const email = sanitizeString(rawEmail, 120);
    const course = sanitizeString(rawCourse, 100);
    const message = sanitizeString(rawMessage, 1000);

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }
    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number.' });
    }

    const sql = `INSERT INTO contact_inquiries (name, phone, email, course, message) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [name, phone || '8974003523', email, course || 'General', message]);

    console.log(`[Tech_learn MySQL] Saved contact inquiry #${result.insertId} from ${name}`);

    res.status(201).json({
      success: true,
      message: 'Inquiry saved in MySQL database (Tech_learn)! Admin desk notified.',
      inquiry_id: result.insertId,
      admin_whatsapp: '8974003523',
      admin_email: 'pp8842973@gmail.com'
    });
  } catch (error) {
    console.error('[MySQL Error] Inserting contact inquiry:', error);
    res.status(500).json({ success: false, message: 'Unable to save message in database.' });
  }
});

// GET /api/contact - Fetch inquiries (Admin Only)
router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, inquiries: rows });
  } catch (error) {
    console.error('[MySQL Error] Reading contact inquiries:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve contact messages from MySQL.' });
  }
});

// DELETE /api/contact/:id - Delete inquiry (Admin Only)
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM contact_inquiries WHERE id = ?', [id]);
    res.json({ success: true, message: `Inquiry #${id} deleted from MySQL.` });
  } catch (error) {
    console.error('[MySQL Error] Deleting inquiry:', error);
    res.status(500).json({ success: false, message: 'Unable to delete contact inquiry.' });
  }
});

export default router;
