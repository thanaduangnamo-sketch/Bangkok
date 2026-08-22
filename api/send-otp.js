const nodemailer = require('nodemailer');

// หน่วยความจำชั่วคราวสำหรับเก็บ OTP (แนะนำให้เปลี่ยนเป็น Database เช่น Redis ในอนาคต)
global.otpStore = global.otpStore || {};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'โปรดระบุอีเมล' });
    }

    // 1. สุ่มรหัส OTP 6 หลัก
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // บันทึก OTP ลง Memory (หมดอายุใน 5 นาที)
    global.otpStore[email] = {
        code: otp,
        expires: Date.now() + 5 * 60 * 1000 
    };

    // 2. ตั้งค่าการส่งอีเมล (ใช้ Gmail App Password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER, // อีเมลร้านค้าของคุณ
            pass: process.env.GMAIL_PASS  : // App Password 16 หลักจาก Google Account
        }
    });

    try {
        // 3. เนื้อหาอีเมล OTP แบบ HTML
        await transporter.sendMail({
            from: `"GPS SHOP" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `[GPS SHOP] รหัสยืนยัน OTP สำหรับเข้าสู่ระบบ`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; background: #f9f9f9; text-align: center;">
                    <div style="max-width: 400px; margin: auto; background: #ffffff; padding: 30px; border-radius: 16px;">
                        <h2 style="color: #000; margin-bottom: 10px;">GPS SHOP</h2>
                        <p style="color: #666; font-size: 14px;">รหัสยืนยันตัวตน (OTP) ของคุณคือ</p>
                        <div style="font-size: 36px; font-weight: 800; letter-spacing: 6px; color: #000; margin: 20px 0;">${otp}</div>
                        <p style="color: #999; font-size: 12px;">รหัสนี้มีอายุการใช้งาน 5 นาที โปรดอย่าเปิดเผยรหัสนี้แก่ผู้อื่น</p>
                    </div>
                </div>
            `
        });

        return res.status(200).json({ success: true, message: 'ส่ง OTP เรียบร้อยแล้ว' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'ไม่สามารถส่งอีเมลได้' });
    }
}
