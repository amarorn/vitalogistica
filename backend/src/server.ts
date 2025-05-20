import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import budgetRoutes from './routes/budgetRoutes';
import healthRoutes from './routes/health';

// Configuração do ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cactusystem:E8Lf44iRntM7ogt1@vitalogistica.6wc22bf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api', healthRoutes);

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'API VITTA Logística' });
});

// Porta do servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 