import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 150,
  skipSuccessfulRequests: true
});
