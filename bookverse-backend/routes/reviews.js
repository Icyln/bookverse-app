const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Add review
router.post('/', authMiddleware, async (req, res) => {
  const { book_id, rating, content } = req.body;

  if (!book_id || !rating || !content) {
    return res.status(400).json({ msg: 'book_id, rating and content are required' });
  }

  try {
    await db.query(
      'INSERT INTO reviews (book_id, user_id, rating, content) VALUES (?, ?, ?, ?)',
      [book_id, req.user.id, rating, content]
    );

    res.json({ msg: 'Review added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get reviews by book
router.get('/:book_id', async (req, res) => {
  const { book_id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.username
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE book_id = ?`,
      [book_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
