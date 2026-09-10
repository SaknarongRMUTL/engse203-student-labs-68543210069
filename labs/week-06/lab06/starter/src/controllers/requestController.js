import * as service from '../services/requestService.js';

/**
 * controller รู้จัก req/res และเป็นคนตัดสิน status code
 * แต่ไม่จัดการข้อมูลเอง — ให้ service ทำ
 */


export function listRequests(req, res) {
  const { status } = req.query;
  res.status(200).json(service.findAll({ status }));
}

export function getRequest(req, res) {
  const found = service.findById(req.params.id);
  if (!found) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(found);
}

/**
 * TODO W06-C3 (CP04) · POST /api/requests
 * - validateRequest middleware ตรวจ body มาให้แล้ว ตรงนี้เชื่อ req.body ได้เลย
 * - เรียก service.create() แล้วตอบ 201 พร้อมคำร้องที่สร้าง
 * ⚠ POST สำเร็จตอบ 201 ไม่ใช่ 200
 */
export function createRequest(req, res) {
  const created = service.create(req.body);
  res.status(201).json(created);
}

/**
 * TODO W06-C4 (⭐ Challenge) · PUT /api/requests/:id
 * - status ที่รับได้: 'pending' | 'in-progress' | 'completed'
 * - status ไม่ถูกต้อง → 400 · ไม่พบคำร้อง → 404 · สำเร็จ → 200
 */
export function updateRequestStatus(req, res) {
  throw new Error('TODO W06-C4: updateRequestStatus');
}


export function deleteRequest(req, res) {
  const removed = service.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(204).end();
}
