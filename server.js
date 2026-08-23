const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const CLIENT_ID = '1532644387639660627';
const CLIENT_SECRET = 'ใส่_CLIENT_SECRET_ของดิสคอร์ดที่นี่'; 
const REDIRECT_URI = 'https://dhaf-shop.onrender.com/';

// API Endpoint สำหรับแลก Code เป็น User Profile
app.post('/api/discord-login', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });

    try {
        // 1. แลก Code เป็น Access Token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const accessToken = tokenResponse.data.access_token;

        // 2. ใช้ Access Token ดึงข้อมูล Profile จริง
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const user = userResponse.data;
        const avatarUrl = user.avatar 
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${(parseInt(user.id) >> 22) % 5}.png`;

        res.json({
            username: user.global_name || user.username,
            avatar: avatarUrl
        });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to authenticate with Discord' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
