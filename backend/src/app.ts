import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health';

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.use('/api', healthRoutes);

// ... existing code ...

export default app; 