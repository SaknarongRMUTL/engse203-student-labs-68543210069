# week-09 — (Relational Databases
and SQL)

## 1. โจทย์ของสัปดาห์นี้

ตารางหลักมี 2 ตารางคือ `users` และ `requests`

```text
users
- id
- name
- department
- email

requests
- id
- requester_id
- request_type
- location
- details
- priority
- status
- created_at
```

`requests.requester_id` จะเชื่อมกับ `users.id`

ตัวอย่าง

```text
users
1 | สมชาย ใจดี

requests
REQ-001 | requester_id = 1
REQ-004 | requester_id = 1
```

หมายความว่าสมชายมีคำร้อง 2 รายการ

---

## 2. CP22 — `queries.sql`

ต้องเขียน SQL อย่างน้อย 8 ข้อ และทุกข้อควรรันได้จริง

โจทย์หลักคือ

```text
① คำร้องทั้งหมด              → ORDER BY
② คำร้อง pending             → WHERE
③ urgent ที่ยังไม่เสร็จ      → WHERE + AND
④ ค้นคำบางส่วน               → LIKE
⑤ คำร้องพร้อมชื่อผู้แจ้ง      → JOIN
⑥ คำร้องของภาควิชา           → JOIN + WHERE
⑦ ผู้แจ้งไม่ซ้ำกัน            → DISTINCT
⑧ 3 รายการล่าสุด              → ORDER BY + LIMIT
```

มี Challenge เพิ่มอีก 3 ข้อ

```text
⑨ COUNT + GROUP BY
⑩ LEFT JOIN
⑪ CREATE INDEX
```

ต้องมีคำร้องอย่างน้อย 8 รายการในฐานข้อมูล เพราะตอนเริ่มต้นมี 5 รายการ

---

โดยทั่วไปควรมีไฟล์ที่เกี่ยวกับฐานข้อมูล เช่น

```text
schema.sql
queries.sql
DATA_MODEL.md
campus.db
```

ชื่อไฟล์อาจต่างกันตาม starter ที่ได้รับ

---



## 3. เช็กข้อมูลเดิม

ดูข้อมูลใน `users`

```sql
SELECT * FROM users;
```

ดูข้อมูลใน `requests`

```sql
SELECT * FROM requests;
```

ข้อมูลตั้งต้นมี

```text
REQ-001
REQ-002
REQ-003
REQ-004
REQ-005
```

รวม 5 รายการ

---

## 4. เพิ่มคำร้องให้ครบ 8 รายการ

ต้องเพิ่มอีก 3 รายการ

```sql
INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('REQ-006', 2, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 401',
 'ไฟในห้องกะพริบตลอดเวลา', 'normal', 'pending'),

('REQ-007', 3, 'แจ้งซ่อม', 'ห้องเรียน 302',
 'เครื่องปรับอากาศไม่ทำงาน', 'urgent', 'in-progress'),

('REQ-008', 1, 'ขอใช้อุปกรณ์', 'ห้องประชุม 201',
 'โปรเจคเตอร์เปิดไม่ติด', 'urgent', 'completed');
```

จาก schema นี้ `status` ต้องใช้ค่า

```text
pending
in-progress
completed
```

ระวัง `in-progress` มีเครื่องหมาย `-`

เช็กจำนวนคำร้อง

```sql
SELECT COUNT(*) FROM requests;
```

ต้องได้

```text
8
```


---

## 5. วิธีทดสอบแต่ละ Query

ควรดูทั้งว่า SQL ไม่มี error และผลลัพธ์ตรงกับโจทย์

### ข้อ ①

```sql
SELECT *
FROM requests
ORDER BY id;
```

ควรเห็นคำร้องเรียงจาก

```text
REQ-001
REQ-002
REQ-003
...
REQ-008
```

### ข้อ ②

```sql
SELECT id, location, details
FROM requests
WHERE status = 'pending';
```

ควรได้เฉพาะคำร้องที่เป็น `pending`

### ข้อ ③

```sql
SELECT id, location, details
FROM requests
WHERE priority = 'urgent'
AND status <> 'completed';
```

ต้องเป็นคำร้องที่ `urgent` และยังไม่ `completed`

### ข้อ ⑤

```sql
SELECT
    r.id,
    u.name,
    r.status
FROM requests r
JOIN users u
    ON r.requester_id = u.id;
```

ถ้าได้ประมาณนี้ แปลว่า `JOIN` ทำงาน

```text
REQ-001 | สมชาย ใจดี | pending
REQ-002 | สุภาวดี รักเรียน | in-progress
REQ-003 | ธนกฤต ตั้งใจ | completed
```

---

## 6. ตรวจว่า JOIN เชื่อมถูกจริง

ลองใช้

```sql
SELECT
    r.id,
    r.requester_id,
    u.id,
    u.name
FROM requests r
JOIN users u
    ON r.requester_id = u.id
ORDER BY r.id;
```

ตัวอย่าง

```text
REQ-001 | 1 | 1 | สมชาย ใจดี
REQ-002 | 2 | 2 | สุภาวดี รักเรียน
```

เลข `requester_id` ต้องตรงกับ `users.id`

---

## 7. ตรวจจำนวนข้อมูลก่อนส่ง

ใช้

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM requests;
```

สำหรับข้อมูลชุดนี้ควรได้

```text
users    = 4
requests = 8
```

แล้วเช็กข้อมูลคำร้องทั้งหมด

```sql
SELECT * FROM requests ORDER BY id;
```