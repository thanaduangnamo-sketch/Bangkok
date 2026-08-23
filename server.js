const express = require('express');
const app = express();

// Middleware สำหรับอ่านค่า JSON และ URL-encoded จาก Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เสิร์ฟไฟล์ Static (เช่น index.html, CSS, รูปภาพ) ในโฟลเดอร์เดียวกัน
app.use(express.static('.'));

// Discord Login API Endpoint
app.post('/api/discord-login', async (req, res) => {
    console.log("-----------------------------------------");
    console.log("ได้รับคำขอเข้าสู่ระบบ Discord (Request Received)");
    
    try {
        const { code } = req.body;
        
        if (!code) {
            console.log("Error: ไม่พบ Code ใน Request Body");
            return res.status(400).json({ error: 'Missing code parameter' });
        }

        console.log("กำลังนำ Code ไปแลก Access Token กับ Discord...");

        // 1. แลกเปลี่ยน Code เป็น Token กับ Discord API
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: '1532644387639660627',
                client_secret: process.env.DISCORD_CLIENT_SECRET, // ต้องตั้งค่าใน Render Environment Variables
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://dhaf-shop.onrender.com/',
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const tokenData = await tokenResponse.json();

        // ตรวจสอบว่าได้ Access Token มาไหม
        if (!tokenData.access_token) {
            console.error('Discord Token Error Details:', tokenData);
            return res.status(400).json({ 
                error: 'Failed to exchange token with Discord', 
                details: tokenData 
            });
        }

        console.log("แลก Token สำเร็จ! กำลังดึงข้อมูลโปรไฟล์ผู้ใช้...");

        // 2. ดึงข้อมูล User จาก Discord API (@me)
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `${tokenData.token_type} ${tokenData.access_token}` },
        });

        const userData = await userResponse.json();

        if (!userData.id) {
            console.error('Discord User Info Error:', userData);
            return res.status(400).json({ error: 'Failed to fetch user profile', details: userData });
        }

        console.log(`ล็อกอินสำเร็จสำหรับผู้ใช้: ${userData.username} (${userData.id})`);

        // 3. ส่งข้อมูล JSON กลับไปให้หน้าบ้าน (Frontend) อย่างสมบูรณ์
        return res.json({
            username: userData.global_name || userData.username,
            avatar: userData.avatar 
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
                : 'https://cdn.discordapp.com/embed/avatars/0.png'
        });

    } catch (error) {
        console.error('Server Internal Catch Error:', error);
        // บังคับส่ง JSON กลับไปทุกครั้งแม้จะเกิด Error เพื่อกัน Body ว่างเปล่า
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// เริ่มรัน Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
