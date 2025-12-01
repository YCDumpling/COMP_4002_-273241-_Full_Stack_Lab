import express from 'express';
import cors from 'cors';
import { employeeRouter } from './routes/employeeRoutes';
import { roleRouter } from './routes/roleRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/employees', employeeRouter);
app.use('/api/roles', roleRouter);

// Basic health check
app.get('/', (req, res) => {
  res.json({ message: 'Pixell River Financial API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
