import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import jobRoutes from './routes/jobRoutes.js';


dotenv.config();


const app = express();


const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.use('/api', jobRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected');
    

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });
    
  } catch (error) {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  }
};


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📭 API Endpoint: http://localhost:${PORT}/api/jobs`);
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});