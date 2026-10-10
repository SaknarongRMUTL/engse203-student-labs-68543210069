# บันทึกการไล่ปัญหา (Debug Log)

🏫 **TODO W12-LOG (CP45 · CP47)** — แต่ละ bug ตอบ 6 ข้อ · เขียนสั้น ๆ แต่ต้องชัด

> BUG #0 ไม่มีผู้ใช้แจ้ง — คุณจะเจอเองตอนเขียน unit test ค่าขอบใน CP45
> BUG #1–#3 มาจาก `BUG_REPORTS.md`

---

## BUG #0 · (ตั้งชื่อเอง หลังเจอใน CP45)

- **อาการ:** ส่งรายละเอียด 10 ตัวอักษรพอดี ถูกปฏิเสธ ทั้งที่ข้อความบอกว่า "อย่างน้อย 10"
- **วิธีทำซ้ำ:** unit test `validateRequestInput({ ...valid, details: '1234567890' })`
- **เครื่องมือ:** unit test ค่าขอบ (TC-03) — fail ทันทีที่เขียน
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/validators/requestValidator.js` เงื่อนไข `length <= MIN_DETAILS`
- **วิธีแก้:** เปลี่ยนเป็น `length < MIN_DETAILS`
- **test ที่กัน:** `tests/unit/requestValidator.test.js` → "10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)"

## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ ได้ 500

- **อาการ:** ผู้ใช้ส่งคำร้องใหม่แล้วระบบขึ้น "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" (500) หากก่อนหน้านี้มีการลบคำร้องออกไป
- **วิธีทำซ้ำ:** ยิง API `DELETE /api/requests/REQ-002` จากนั้นยิง `POST /api/requests` เพื่อเพิ่มคำร้องใหม่
- **เครื่องมือ:** วาง curl ที่ให้มาลงใน Terminal ของ API เพื่อดู Error ที่แจ้ง 
- **สาเหตุ (ไฟล์:บรรทัด):**`api/src/services/requestService.js`ฟังก์ชัน `nextId()` ใช้ `COUNT(*)` นับจำนวนแถว เมื่อลบแถวออก ยอดรวมจึงลดลง ทำให้รันเลข ID ไปซ้ำกับของเดิม
- **วิธีแก้:** เปลี่ยนวิธีคำนวณจากการนับแถว เป็นการดึงเลข ID สุดท้ายจากตาราง `(ORDER BY id DESC LIMIT 1)` มาคำนวณบวก 1
- **test ที่กัน:**`tests/integration/requests.api.test.js` → ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม

## BUG #2 · Dashboard แสดง "กำลังดำเนินการ 0"

- **อาการ:** การ์ดสรุปด้านบนบอกว่ากำลังดำเนินการ 0 รายการ ทั้งที่ด้านล่างมีคำร้อง in-progress อยู่
- **วิธีทำซ้ำ:** เปิดหน้า Dashboard ด้วย npm run dev --prefix frontend
- **เครื่องมือ:**
- **สาเหตุ (ไฟล์:บรรทัด):** `frontend/src/utils/requestSummary.js` พิมพ์เงื่อนไขตรวจเช็คผิดเป็น `'in progress'`
- **วิธีแก้:** เพิ่มขีดกลางจาก `'in progress'` เป็น `'in-progress'`
- **test ที่กัน:** `utils/requestSummary.test.js` → นับครบทุกสถานะ

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500

- **อาการ:** `PUT /api/requests/REQ-999` ได้ 500 แทน 404
- **วิธีทำซ้ำ:** `curl -X PUT localhost:3001/api/requests/REQ-999 -H "Content-Type: application/json" -d '{"status":"completed"}'`
- **เครื่องมือ:** อ่าน stack trace ใน terminal — `TypeError: Cannot read properties of null (reading 'id')`
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/controllers/requestController.js:30` log `updated.id` อยู่ก่อน `if (!updated)`
- **วิธีแก้:** ย้าย log ไปไว้หลังการตรวจ null
- **test ที่กัน:** `tests/integration/requests.api.test.js` → "คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)"