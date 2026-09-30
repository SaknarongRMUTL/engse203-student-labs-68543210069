-- ═══════════════════════════════════════════════════════════
-- queries.sql — คำสั่งค้นหาตอบโจทย์
-- 🏠 TODO W09-QUERY (CP22) · เขียนอย่างน้อย 8 ข้อ
--
-- เขียนคำสั่งจริงที่รันได้ ไม่ใช่เขียนบรรยาย
-- ทุกข้อต้องทดสอบแล้วว่าได้ผลลัพธ์ถูกต้อง
-- ═══════════════════════════════════════════════════════════
INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('REQ-006', 2, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 401',
 'ไฟในห้องกะพริบตลอดเวลา', 'normal', 'pending');

INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('REQ-007', 3, 'แจ้งซ่อม', 'ห้องเรียน 302',
 'เครื่องปรับอากาศไม่ทำงาน', 'urgent', 'in-progress');

INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('REQ-008', 1, 'แจ้งซ่อม', 'ห้องประชุม 201',
 'โปรเจคเตอร์เปิดไม่ติด', 'urgent', 'completed');


-- ① คำร้องทั้งหมด เรียงตามรหัส
SELECT *
FROM requests
ORDER BY id;


-- ② คำร้องที่ยังไม่ได้ดำเนินการ (status = 'pending')
SELECT id, location, details
FROM requests
WHERE status = 'pending'
ORDER BY id;


-- ③ คำร้องเร่งด่วนที่ยังไม่เสร็จ — ใช้เงื่อนไข 2 ข้อพร้อมกัน
SELECT id, location, details, priority, status
FROM requests
WHERE priority = 'urgent'
AND status <> 'completed'
ORDER BY id;


-- ④ ค้นคำร้องจากคำบางส่วนในรายละเอียด (คำใบ้: LIKE)
SELECT id, location, details
FROM requests
WHERE details LIKE '%ไฟ%'
ORDER BY id;


-- ⑤ คำร้องพร้อมชื่อผู้แจ้ง ← ต้องใช้ JOIN เพราะชื่ออยู่คนละตาราง
SELECT
    r.id,
    r.location,
    r.details,
    u.name AS requester_name
FROM requests r
JOIN users u
    ON r.requester_id = u.id
ORDER BY r.id;


-- ⑥ คำร้องเฉพาะของภาควิชาหนึ่ง (JOIN + WHERE)
SELECT
    r.id,
    r.location,
    r.details,
    u.name AS requester_name,
    u.department
FROM requests r
JOIN users u
    ON r.requester_id = u.id
WHERE u.department = (
    SELECT department
    FROM users
    LIMIT 1
)
ORDER BY r.id;


-- ⑦ รายชื่อผู้แจ้งที่ไม่ซ้ำกัน (คำใบ้: DISTINCT)
SELECT DISTINCT u.name
FROM requests r
JOIN users u
    ON r.requester_id = u.id
ORDER BY u.name;


-- ⑧ คำร้อง 3 รายการล่าสุด (คำใบ้: ORDER BY + LIMIT)
SELECT *
FROM requests
ORDER BY id DESC
LIMIT 3;


-- ⭐ Challenge ⑨ นับจำนวนคำร้องแยกตามสถานะ (GROUP BY + COUNT)
SELECT
    status,
    COUNT(*) AS request_count
FROM requests
GROUP BY status
ORDER BY status;


-- ⭐ Challenge ⑩ ใครแจ้งคำร้องมากที่สุด
-- ใช้ LEFT JOIN เพื่อให้คนที่ยังไม่เคยแจ้งติดมาด้วย
SELECT
    u.id,
    u.name,
    COUNT(r.id) AS request_count
FROM users u
LEFT JOIN requests r
    ON u.id = r.requester_id
GROUP BY u.id, u.name
ORDER BY request_count DESC
LIMIT 1;


-- ⭐ Challenge ⑪ สร้าง INDEX ให้การค้นด้วย status เร็วขึ้น
CREATE INDEX IF NOT EXISTS idx_requests_status
ON requests(status);