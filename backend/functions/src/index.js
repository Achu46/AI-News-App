import express from 'express';
import cors from 'cors';
import { onRequest } from 'firebase-functions/v2/https';
import { authenticateToken } from './middleware/auth.js';
import { adminRouter } from './api/admin.js';
import { aiRouter } from './api/ai.js';
import { executeGeminiPrompt } from './services/gemini.js';

const app = express();

// Enable CORS with safe defaults
app.use(cors({ origin: true }));
app.use(express.json());

// Public health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'QUE Solutions API Gateway',
    timestamp: new Date().toISOString()
  });
});

// Protected API routes
app.use('/api/admin', authenticateToken, adminRouter);
app.use('/api/ai', authenticateToken, aiRouter);

// Export Cloud Function v2
export const api = onRequest({
  region: 'us-central1',
  cors: true,
  maxInstances: 10,
  invoker: 'public'
}, app);

// For local testing if started via node
if (process.env.NODE_ENV !== 'production' && !process.env.FUNCTION_NAME) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`[QUE Solutions API] Local server running on port ${PORT}`);
  });
}
