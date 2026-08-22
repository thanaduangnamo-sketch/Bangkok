export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, otp } = req.body;
    const record = global.otpStore ? global.otpStore[email] : null;

    if (!record) {
        return res.status(400).json({ success: false, message: 'กรุณากดรับ OTP ก่อนทำรายการ' });
    }

    if (Date.now() > record.expires) {
        delete global.otpStore[email];
        return res.status(400).json({ success: false, message: 'รหัส OTP หมดอายุแล้ว' });
    }

    if (record.code !== otp) {
        return res.status(400).json({ success: false, message: 'รหัส OTP ไม่ถูกต้อง' });
    }

    // ยืนยันสำเร็จ -> ลบ OTP ออก
    delete global.otpStore[email];
    return res.status(200).json({ success: true, message: 'ยืนยันตัวตนสำเร็จ' });
}
