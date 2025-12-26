import { Router } from 'express';
import connection from '../database';
const router = Router();

// List all properties
router.get('/', (req, res) => {
  connection.query('SELECT * FROM properties', (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json(results);
  });
});

// Get property by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM properties WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (results.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(results[0]);
  });
});

// Create a new property
router.post('/', (req, res) => {
  const { owner_id, title, description, rent, location, amenities, photos } = req.body;
  // Validation (see below) should be applied here
  connection.query(
    'INSERT INTO properties (owner_id, title, description, rent, location, amenities, photos) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [owner_id, title, description, rent, location, amenities, photos],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create property' });
      }
      res.status(201).json({ id: results.insertId, owner_id, title, rent, location });
    }
  );
});

// Update or delete endpoints would be similar
export default router;
