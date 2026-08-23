// ต้องใส่ app.use(express.json()) ไว้ด้านบนสุดก่อน Routes
app.use(express.json());

app.post('/api/discord-login', async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: 'Missing code' });
        }

        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: '1532644387639660627',
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://dhaf-shop.onrender.com/',
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            return res.status(400).json({ error: 'Token exchange failed', details: tokenData });
        }

        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `${tokenData.token_type} ${tokenData.access_token}` },
        });

        const userData = await userResponse.json();

        // *** บรรทัดนี้สำคัญที่สุด ต้องตอบ res.json กลับไปเสมอ ***
        return res.json({
            username: userData.global_name || userData.username,
            avatar: userData.avatar 
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
                : 'https://cdn.discordapp.com/embed/avatars/0.png'
        });

    } catch (error) {
        console.error('Discord Auth Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
