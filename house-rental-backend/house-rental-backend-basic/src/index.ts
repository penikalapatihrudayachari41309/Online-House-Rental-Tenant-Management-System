const app = express();
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
import express from 'express';
import propertiesRouter from './routes/properties';
import bookingsRouter from './routes/bookings';

const app = express();
app.use(express.json());

// Routes
app.use('/api/properties', propertiesRouter);
app.use('/api/bookings', bookingsRouter);

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
