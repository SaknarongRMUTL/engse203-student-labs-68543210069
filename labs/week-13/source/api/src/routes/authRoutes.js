import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

const loginAttempts = new Map();
export function resetLoginLimiter() {
  loginAttempts.clear();
}

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();

router.post('/login', (req, res) => {
  const ip = req.ip;
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, time: now };
  if (now - record.time > 15 * 60 * 1000) {
    record.count = 0;
    record.time = now;
  }
  if (record.count >= 5) {
    return res.status(429).json({ error: 'เข้าสู่ระบบผิดพลาดเกินกำหนด กรุณารอสักครู่' });
  }

  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    record.count += 1;
    loginAttempts.set(ip, record);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  loginAttempts.delete(ip);
  res.status(200).json(result);
});

export default router;