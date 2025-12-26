"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MySQL connection
const db = mysql2_1.default.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'house_rental'
});
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    }
    else {
        console.log('Connected to MySQL database');
    }
});
// Routes
app.get('/api/properties', (req, res) => {
    db.query('SELECT * FROM properties', (err, results) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
app.post('/api/bookings', (req, res) => {
    const { property_id, tenant_name, tenant_email, start_date, end_date } = req.body;
    db.query('INSERT INTO bookings (property_id, tenant_name, tenant_email, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)', [property_id, tenant_name, tenant_email, start_date, end_date, 'pending'], (err, result) => {
        if (err)
            return res.status(500).json({ error: err.message });
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
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
