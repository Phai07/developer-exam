
1.Bug  Expected 2 arguments, but got 1 
 จาก function addItem ของ class ShoppingCart จะต้องรับ arguments 2 ตัว ซึ่งมี item และ quantity แต่เกิด Bug เพราะส่ง quantity รวมกับ object ของ item ทำให้ม่ตรงกับที่ประกาศ function 

แก้ Bug โดย แยก quantity ออกจาก object ของ item ทำให้ตรงกับที่ประกาศ function 
cart.addItem({ id: '1', name: 'Laptop', price: 999.99 }, 1);
cart.addItem({ id: '2', name: 'T-Shirt', price: 19.99 }, 2);


2.Bug ที่เกิดจาก TypeScript อ้างอิง Product interface จากไฟล์อื่น ทำให้โครงสร้างของ Product interface ไม่ตรงกับ { id, name, price }
ต้องเปลี่ยนชื่อ interface ใน ProductStock ที่สร้างในไฟล์อื่นไม่ให้ชื่อตรงกัน


