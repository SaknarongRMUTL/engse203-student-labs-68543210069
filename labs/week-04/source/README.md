# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: ศักดิ์ณรงค์ นำนนท์
- รหัสนักศึกษา: 68543210069-9
- Section: Sec2

## URLs

- Repository: https://github.com/SaknarongRMUTL/engse203-student-labs-68543210069
- Pull Request: https://github.com/SaknarongRMUTL/engse203-student-labs-68543210069/pull/7
- GitHub Pages: https://saknarongrmutl.github.io/engse203-student-labs-68543210069/

## Component Tree

```text
App (State Owner: requests, statusFilter)
├── AppHeader
├── SummaryPanel (รับ props: summary)
├── RequestForm (State Owner: formData, errors, feedback | รับ props: onAddRequest)
├── FilterBar (รับ props: value, onFilterChange)
└── RequestList (รับ props: requests, onDeleteRequest)
    └── RequestCard (รับ props: request, onDeleteRequest)
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

State : App เป็น State Owner หลักที่เก็บข้อมูล requests และ statusFilter ส่วน RequestForm จะเป็นเจ้าของ State ที่ใช้จัดการฟอร์มของตัวเอง (formData, errors, feedback)

Props (Data Flow) : ข้อมูลจะไหลจากบนลงล่าง (Top-down) โดย App จะคำนวณและส่งข้อมูลที่จำเป็นไปให้ Component ลูก เช่น ส่ง summary ไปให้ SummaryPanel และส่ง filteredRequests ไปให้ RequestList

Callback (Event Flow) : เหตุการณ์จะไหลจากล่างขึ้นบน (Bottom-up) เช่น เมื่อผู้ใช้กดปุ่มลบใน RequestCard จะเรียกใช้ฟังก์ชัน onDeleteRequest ที่ถูกส่งต่อมาเป็นทอดๆ เพื่อกลับไปสั่งให้ App อัปเดต State requests หลัก

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | หน้าเว็บแสดงคำร้องเริ่มต้น 3 รายการถูกต้อง ค่า Summary (Total, Pending, In-Progress, Completed) นับได้ถูกต้อง และไม่มี Error ใน Console | Pass | [evidence/TC-01-Initial.png](../evidence/TC-01-Initial.png) |
| TC-02 Controlled input | เมื่อพิมพ์ข้อความ หรือเลือกตัวเลือกในฟอร์ม ข้อมูลบนหน้าจอจะสะท้อนตาม State ทันที | Pass | [evidence/TC-02-Controlledinput.png](../evidence/TC-02-Controlledinput.png) |
| TC-03 Invalid | หากกรอกข้อมูลไม่ครบหรือสั้นเกินไป ระบบไม่บันทึกคำร้อง และแสดงข้อความ Error สีแดงพร้อมขอบสีแดงใต้ช่องที่ผิด | Pass | [evidence/TC-03-Invalid.png](../evidence/TC-03-Invalid.png) |
| TC-04 Valid add | เมื่อกรอกข้อมูลถูกต้อง ระบบเพิ่มคำร้องใหม่ไว้บนสุดในสถานะ Pending ฟอร์มถูกล้างค่า และมีข้อความสีเขียวแจ้งว่า "เพิ่มคำร้องสำเร็จ" | Pass | [evidence/TC-04-Validadd.png](../evidence/TC-04-Validadd.png)|
| TC-05 Filter | เมื่อคลิกปุ่มกรองสถานะ เช่น "รอดำเนินการ" รายการคำร้องจะแสดงเฉพาะคำร้องที่ตรงกับสถานะที่เลือกเท่านั้น | Pass | [evidence/TC-05-Filter.png](../evidence/TC-05-Filter.png) |
| TC-06 All | เมื่อคลิกปุ่ม "ทั้งหมด" รายการคำร้องทุกสถานะจะกลับมาแสดงครบถ้วนตามปกติ | Pass | [evidence/TC-06-All.png](../evidence/TC-06-All.png) |
| TC-07 Empty | เมื่อใช้ตัวกรองที่ไม่มีคำร้อง หรือกดลบจนหมด หน้าจอจะแสดงกล่องข้อความ "ยังไม่มีคำร้องในสถานะนี้ หรือลองเพิ่มคำร้องใหม่" | Pass | [evidence/TC-08AndTC-07.png.png](../evidence/TC-08AndTC-07.png.png) |
| TC-08 Delete | เมื่อกดปุ่ม "ลบ" ที่คำร้องใด คำร้องนั้นจะหายไปจากรายการทันที และตัวเลขใน Summary จะอัปเดตลดลงถูกต้อง | Pass | [evidence/TC-08AndTC-07.png](../evidence/TC-08AndTC-07.png) |
| TC-09 Mobile | เมื่อปรับขนาดหน้าจอเป็น 375px เลย์เอาต์จะเปลี่ยนเป็น 1 คอลัมน์ อ่านง่าย และไม่มีการเลื่อนแนวนอน (No horizontal scroll) | Pass | [evidence/Mobile.png](../evidence/Mobile.png) |
| TC-10 Keyboard | สามารถกดปุ่ม Tab เพื่อเลื่อน Focus ไปตามช่องต่างๆ ได้ โดยมีกรอบสีฟ้า (Outline) แสดงชัดเจน และกด Enter เพื่อ Submit ได้ | Pass | [evidence/TC-10-Keyboard.png](../evidence/TC-10-Keyboard.png) |
| TC-11 Build | รันคำสั่ง npm run build ผ่านโดยไม่มี Error และสามารถรัน npm run preview เพื่อดูผลลัพธ์ได้ปกติ | Pass | [evidence/TC-11-Build.png](../evidence/TC-11-Build.png) |
| TC-12 Pages | เมื่อนำลิงก์ GitHub Pages ไปเปิดในหน้าต่าง Incognito ตัวเว็บและ CSS สามารถโหลดมาแสดงผลได้สมบูรณ์ ไม่มีแจ้งเตือน 404 Not Found | Pass | - |

## Screenshots

- Desktop: `evidence/TC-01-Initial.png`
- Mobile 375px: `evidence/Mobile.png`
- Validation/empty state: 

## Week 03 → Week 04 Reflection

จากการเขียนโค้ดใน Week 03 ที่เป็นแบบ DOM-driven เราต้องคอยใช้คำสั่งอย่าง document.querySelector เพื่อค้นหา Element และอัปเดตค่าต่างๆ ด้วยตัวเองทีละจุด เช่น การแก้ textContent, setAttribute หรือการต่อแท็ก HTML ใหม่ด้วย createElement และ appendChild วิธีการนี้เมื่อ UI มีความซับซ้อนมากขึ้น จะทำให้โค้ดยาวและคอยติดตามการเปลี่ยนแปลงได้ยาก แต่ใน Week 04 ที่เปลี่ยนมาใช้ State-driven UI ด้วย React เพียงแค่กำหนดข้อมูลลงในตัวแปร State และเขียนโครงสร้าง UI รอไว้ด้วย JSX เมื่อข้อมูลใน State เปลี่ยนแปลง React จะรับหน้าที่คำนวณและอัปเดต DOM ในส่วนที่เกี่ยวข้องทั้งหมดให้โดยอัตโนมัติ ซึ่งช่วยลดข้อผิดพลาดและทำให้โค้ดเป็นระเบียบมากขึ้น

## AI / External Resource Disclosure

ใช้ Gemini 
    ช่วยเรียบเรียงข้อความในส่วน Week 03 → Week 04 Reflection 

วิธีตรวจสอบความถูกต้อง ทำการรัน `npm run dev` เพื่อทดสอบการใช้งานจริงบนเบราว์เซอร์และรัน `npm run check` เพื่อยืนยันว่าโค้ดผ่านเงื่อนไขทั้งหมดเรียบร้อยแล้ว

