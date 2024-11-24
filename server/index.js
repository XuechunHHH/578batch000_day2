import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fetchCryptoData } from './services/cryptoService.js';
import authRoutes, { verifyToken } from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Custom rate limiter for WebContainer environment
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: () => 'shared', // Use a shared key for WebContainer environment
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

// Auth routes
app.use('/api/auth', authRoutes);

// Protected crypto data route
app.get('/api/crypto', verifyToken, async (req, res) => {
  try {
    const data = await fetchCryptoData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch crypto data',
      message: error.message 
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    message: err.message 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});