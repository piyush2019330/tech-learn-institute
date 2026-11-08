import crypto from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'tech_learn_default_secure_admin_token_2026';
const ADMIN_PINS = [process.env.ADMIN_PASSCODE || '7742', process.env.ADMIN_ALT_PASSCODE || '8974'];

/**
 * 1. String Sanitization against XSS & Injection
 */
export function sanitizeString(input, maxLength = 255) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove dangerous < and > angle brackets
    .replace(/javascript:/gi, '') // Prevent javascript: pseudo-protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers like onerror=
    .trim()
    .slice(0, maxLength);
}

/**
 * 2. Input Validation (Email & Phone)
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim()) && email.length <= 150;
}

export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * 3. Cryptographic Password Hashing (PBKDF2)
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(verifyHash, 'hex'), Buffer.from(originalHash, 'hex'));
}

/**
 * 4. Secure Admin Session Tokens (HMAC-SHA256 with 4-hour Expiry)
 */
export function generateAdminToken() {
  const payload = {
    role: 'admin',
    issuedAt: Date.now(),
    expiresAt: Date.now() + 4 * 60 * 60 * 1000 // 4 hours
  };
  const payloadStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadStr).toString('base64url');
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(base64Payload).digest('base64url');
  return `${base64Payload}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [base64Payload, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', ADMIN_SECRET).update(base64Payload).digest('base64url');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf-8'));
    if (payload.role !== 'admin' || Date.now() > payload.expiresAt) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * 5. Admin Passcode Timing-Safe Check
 */
export function verifyAdminPasscode(inputPin) {
  if (!inputPin || typeof inputPin !== 'string') return false;
  const cleanPin = inputPin.trim();

  for (const validPin of ADMIN_PINS) {
    if (cleanPin.length === validPin.length) {
      const isMatch = crypto.timingSafeEqual(Buffer.from(cleanPin), Buffer.from(validPin));
      if (isMatch) return true;
    }
  }
  return false;
}

/**
 * 6. Rate Limiting Middleware (DDoS & Brute Force Protection)
 */
const rateLimitMap = new Map();

export function createRateLimiter(windowMs = 60000, maxRequests = 40) {
  return (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    if (!rateLimitMap.has(clientIp)) {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const clientData = rateLimitMap.get(clientIp);

    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + windowMs;
      return next();
    }

    clientData.count += 1;

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Security Rate Limit Triggered: Please wait a moment before trying again.'
      });
    }

    next();
  };
}

/**
 * 7. Security Headers & Defense Middleware
 */
export function securityHeadersMiddleware(req, res, next) {
  // Disable X-Powered-By header to prevent tech stack fingerprinting
  res.removeHeader('X-Powered-By');

  // Prevent Clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Strict Transport Security (HSTS)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' http://localhost:*; frame-ancestors 'none';"
  );

  next();
}

/**
 * 8. Admin Authorization Guard Middleware
 */
export function requireAdminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.headers['authorization']?.replace('Bearer ', '');
  if (!verifyAdminToken(token)) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized Access',
      message: 'Access Denied: Valid Admin Session Token Required.'
    });
  }
  next();
}
