const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ตั้งค่า Discord Developer Portal
const CLIENT_ID = '1532644387639660627';
const CLIENT_SECRET = '7dwFMdQPO4pjRHm2zgKYGyoParBOzXJw';
const REDIRECT_URI = 'http://localhost:3000/callback'; // ต้องตรงกับใน Discord Portal เป๊ะๆ

app.post('/api/discord-login', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'ไม่พบ Code' });
  }

  try {
    // 1. นำ code ไปแลก Token กับ Discord
    const tokenResponse = await axios.post(
      'https://discord.com/api/v10/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2. ใช้ Access Token ดึงข้อมูลโปรไฟล์ผู้ใช้
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    // 3. ส่งข้อมูลผู้ใช้กลับไปที่ Frontend (สำคัญ: ต้องมีบรรทัดนี้เสมอ)
    return res.status(200).json(userResponse.data);

  } catch (error) {
    console.error('Discord API Error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ Discord',
      details: error.response?.data || error.message 
    });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
