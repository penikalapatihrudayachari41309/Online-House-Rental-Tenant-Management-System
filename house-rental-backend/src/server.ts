import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'house_rental'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Routes
app.get('/api/properties', (req, res) => {
  db.query('SELECT * FROM properties', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/bookings', (req, res) => {
  const { property_id, tenant_name, tenant_email, start_date, end_date } = req.body;
  db.query('INSERT INTO bookings (property_id, tenant_name, tenant_email, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)',
    [property_id, tenant_name, tenant_email, start_date, end_date, 'pending'], (err, result: any) => {
    if (err) return res.status(500).json({ error: err.message });
    io.emit('booking_update', { id: result.insertId, status: 'pending' });
    res.json({ id: result.insertId });
  });
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
