# DATA_MODEL.md — การออกแบบฐานข้อมูล Campus Service Request

> 🏠 **TODO W09-DOC (CP24)** — เขียนเอกสารอธิบายการออกแบบของคุณ
> ลบบรรทัดที่ขึ้นต้นด้วย `>` ออกทั้งหมดเมื่อเขียนเสร็จ

---

## 1. ภาพรวม

มี 2 ตาราง คือ `users` กับ `requests`

| ตาราง| ใช้เก็บข้อมูล|
|-|-|
| `users` | ข้อมูลของคนที่แจ้งคำร้อง |
| `requests`| ข้อมูลคำร้อง|

ความสัมพันธ์เป็นแบบ 1:N

|ความสัมพันธ์|รายละเอียด|
|-|-|
| `users` 1 คน | แจ้งคำร้องได้หลายรายการ |
| `requests` 1 รายการ | มีผู้แจ้ง 1 คน |
| ตัวที่ใช้เชื่อมกัน| `requests.requester_id` กับ `users.id` |
---

## 2. ทำไมต้องแยกเป็น 2 ตาราง

อนแรกถ้าเก็บ `requesterName` ไว้ใน `requests` ชื่อจะซ้ำกันหลายรายการ

| request | requesterName |
| -| - |
| REQ-001 | สมชาย |
| REQ-002 | สมชาย |
| REQ-003 | สมชาย |

ถ้าสมชายเปลี่ยนชื่อ ก็ต้องแก้ชื่อในหลายรายการ

พอแยกตารางแล้ว ข้อมูลจะประมาณนี้

| users| requests|
|-|-|
| `id = 1`| `requester_id = 1` |
| `name = สมชาย` |`REQ-001`|
|| `REQ-002`|
|| `REQ-003`|

ถ้าเปลี่ยนชื่อก็แก้ที่ `users` ที่เดียว ไม่ต้องไปแก้ทุกคำร้อง

---
## 3. รายละเอียดตาราง

### users

| ข้อมูล       | ชนิด    | ข้อกำหนด                  | เหตุผลที่เลือก                         |
| ------------ | ------- | ------------------------- | -------------------------------------- |
| `id`         | INTEGER | PRIMARY KEY AUTOINCREMENT | ใช้เป็นรหัสของผู้ใช้ และให้เลขเพิ่มเอง |
| `name`       | TEXT    | NOT NULL                  | ต้องมีชื่อผู้ใช้                       |
| `department` | TEXT    | NOT NULL                  | ต้องมีภาควิชา                          |
| `email`      | TEXT    | NOT NULL UNIQUE           | ต้องมีอีเมลและไม่ให้ซ้ำกัน             |

### requests

| ข้อมูล         | ชนิด    | ข้อกำหนด                 | เหตุผลที่เลือก                                  |
| -------------- | ------- | ------------------------ | ----------------------------------------------- |
| `id`           | TEXT    | PRIMARY KEY              | ใช้รหัสคำร้อง เช่น `REQ-001`                    |
| `requester_id` | INTEGER | NOT NULL, FOREIGN KEY    | ใช้เชื่อมกับ `users.id`                         |
| `request_type` | TEXT    | NOT NULL          | จำกัดประเภทคำร้อง                               |
| `location`     | TEXT    | NOT NULL                 | ต้องมีสถานที่                                   |
| `details`      | TEXT    | NOT NULL                 | ต้องมีรายละเอียดของคำร้อง                       |
| `priority`     | TEXT    | NOT NULL, DEFAULT| กำหนดเป็น `normal` หรือ `urgent`                |
| `status`       | TEXT    | NOT NULL, DEFAULT | กำหนดเป็น `pending`, `in-progress`, `completed` |
| `created_at`   | TEXT    | NOT NULL, DEFAULT        | เก็บเวลาที่สร้างคำร้อง                          |

---

## 4. เหตุผลของการเลือกชนิดและข้อกำหนด

### ทำไม `users.id` กับ `requests.id` ใช้ชนิดต่างกัน

`users.id` ใช้ `INTEGER` เพราะเป็นเลขรหัสผู้ใช้ เช่น `1`, `2`, `3`

ส่วน `requests.id` ใช้ `TEXT` เพราะรหัสคำร้องเป็นแบบ `REQ-001` ซึ่งมีทั้งตัวอักษรและตัวเลข

---

## 5. ตัวอย่างการใช้ JOIN

คำสั่งที่ใช้ดึงคำร้องพร้อมชื่อผู้แจ้ง

```sql
SELECT
    r.id,
    u.name AS requester_name,
    r.status
FROM requests r
JOIN users u
    ON r.requester_id = u.id
ORDER BY r.id;
```

ตัวอย่างผลลัพธ์

| id      | requester_name   | status      |
| ------- | ---------------- | ----------- |
| REQ-001 | สมชาย ใจดี       | pending     |
| REQ-002 | สุภาวดี รักเรียน | in-progress |
| REQ-003 | ธนกฤต ตั้งใจ     | completed   |
| REQ-004 | สมชาย ใจดี       | pending     |
| REQ-005 | ปรียา ขยันยิ่ง   | pending     |

`requests` มี `requester_id` ส่วนชื่ออยู่ใน `users` เลยต้องใช้ `JOIN` เพื่อเอาชื่อมาแสดง

---

## 6. ข้อสังเกตสำหรับสัปดาห์ที่ 10

ตอน Week 07 API ส่งชื่อผู้แจ้งมากับข้อมูลคำร้องเลย เช่น

```json
{
  "id": "REQ-001",
  "requesterName": "สมชาย ใจดี",
  "status": "pending"
}
```

แต่ตอนนี้ใน `requests` จะเก็บเป็น `requester_id` แทนชื่อ

| Week 07                     | Week 10                    |
| --------------------------- | -------------------------- |
| มี `requesterName` ในคำร้อง | มี `requester_id` ในคำร้อง |
| ชื่ออยู่ในข้อมูลเดียวกัน    | ชื่ออยู่ในตาราง `users`    |
| ไม่ต้อง JOIN                | ใช้ JOIN เมื่อต้องการชื่อ  |

