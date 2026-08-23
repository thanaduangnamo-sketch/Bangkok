<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skey Shop - ร้านค้าออนไลน์อย่างเป็นทางการ</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Google reCAPTCHA -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

    <style>
        body {
            font-family: 'Kanit', sans-serif;
            background-color: #F8FAFC;
        }

        .ring-spin-cw { animation: spin 4s linear infinite; }
        .ring-spin-ccw { animation: spin-reverse 3s linear infinite; }
        .glow-pulse { animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }

        @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scale(0.95); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }
    </style>
</head>

<body class="min-h-screen flex flex-col justify-between text-slate-800">

    <!-- =========================
         SECURITY CAPTCHA MODAL
    ========================== -->
    <div id="initialSecurityModal"
         class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500">

        <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-sm p-8 text-center relative overflow-hidden">

            <div class="w-16 h-16 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
                <i data-lucide="shield-check" class="w-8 h-8 text-emerald-600"></i>
            </div>

            <h3 class="text-xl font-extrabold text-slate-900 mb-6">
                ระบบตรวจสอบความปลอดภัย
            </h3>

            <!-- reCAPTCHA -->
            <div class="flex justify-center mb-6">
                <div class="g-recaptcha"
                     id="initialRecaptcha"
                     data-sitekey="6LdE2ZMtAAAAAOTuFBh816eZmvZ8L1pO1g8Z_Vso"
                     data-callback="onInitialCaptchaSuccess">
                </div>
            </div>

            <button
                onclick="playClickSound(); triggerCaptchaClick()"
                class="w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-4 rounded-2xl border border-slate-300 shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm">
                <i data-lucide="lock" class="w-4 h-4 text-slate-600"></i>
                <span>ยืนยันตัวตนเพื่อความปลอดภัย</span>
            </button>

        </div>
    </div>


    <!-- =========================
         LOADING SCREEN
    ========================== -->
    <div id="loadingScreen"
         class="fixed inset-0 bg-slate-950 z-40 hidden flex-col items-center justify-center p-6 transition-opacity duration-700">

        <div class="absolute w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl glow-pulse pointer-events-none"></div>

        <div class="relative w-36 h-36 flex items-center justify-center mb-6">

            <div class="absolute -inset-1 border-2 border-emerald-500/30 border-t-emerald-400 border-r-cyan-400 rounded-full ring-spin-cw shadow-[0_0_15px_rgba(52,211,153,0.3)]"></div>

            <div class="absolute inset-1 border-2 border-cyan-500/20 border-b-cyan-400 border-l-teal-300 rounded-full ring-spin-ccw"></div>

            <div class="w-28 h-28 bg-slate-900 border-2 border-slate-700 rounded-full overflow-hidden shadow-2xl z-10 p-1 relative">
                <img
                    src="https://i.pinimg.com/564x/8e/3c/37/8e3c3757dbd74fa1f9712ee4df2a8dc4.jpg"
                    alt="Skey Shop"
                    class="w-full h-full object-cover rounded-full">
            </div>
        </div>

        <!-- ✅ เปลี่ยนชื่อร้าน -->
        <h2 class="text-2xl font-black tracking-widest text-white mb-1">
            Skey Shop
        </h2>

        <div class="flex items-center gap-2 mb-4">
            <p id="loadingStatusText"
               class="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                กำลังเชื่อมต่อระบบ...
            </p>
            <span id="loadingPercent" class="text-xs font-mono font-bold text-cyan-400">
                0%
            </span>
        </div>

        <div class="w-64 bg-slate-900/90 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner relative">
            <div id="progressBar"
                 class="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 h-full rounded-full w-0 transition-all duration-[3000ms] ease-out shadow-[0_0_12px_rgba(52,211,153,0.6)]">
            </div>
        </div>

    </div>


    <!-- =========================
         NAVBAR
    ========================== -->
    <header class="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">

        <div class="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">

            <!-- LOGO -->
            <div class="flex items-center gap-3 shrink-0">
                <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center font-extrabold text-white text-sm tracking-wider shadow-sm">
                    SK
                </div>
                <!-- ✅ เปลี่ยนชื่อร้าน -->
                <span class="text-xl font-extrabold tracking-tight text-slate-900">
                    Skey Shop
                </span>
            </div>


            <!-- AUTH -->
            <div id="authContainer" class="flex items-center gap-2 sm:gap-3">

                <!-- CAPTCHA BUTTON -->
                <button
                    onclick="playClickSound(); reVerifyCaptcha()"
                    class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-xl text-xs transition flex items-center gap-1.5 border border-slate-200"
                    title="ตรวจสอบความปลอดภัย">
                    <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
                    <span class="hidden sm:inline">reCAPTCHA</span>
                </button>


                <!-- LOGIN BUTTON -->
                <button
                    id="openAuthBtn"
                    onclick="playClickSound(); toggleAuthModal(true)"
                    class="bg-black hover:bg-slate-800 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95 text-xs sm:text-sm flex items-center gap-2">
                    <i data-lucide="log-in" class="w-4 h-4"></i>
                    <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
                </button>


                <!-- USER PROFILE -->
                <div id="userProfile"
                     class="hidden flex items-center gap-2.5 bg-slate-50 border border-slate-200 p-1.5 pl-3 rounded-2xl shadow-sm max-w-[280px] sm:max-w-sm">

                    <div id="emailAvatar"
                         class="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center font-bold text-base uppercase shadow-sm shrink-0 overflow-hidden">
                        <span id="avatarLetter">U</span>
                    </div>

                    <div class="text-left min-w-0 flex-1">
                        <!-- ✅ อีเมลแบบย่อ (ชี้เมาส์เห็นเต็ม) -->
                        <p id="displayEmail"
                           class="text-xs font-bold text-slate-900 leading-tight truncate max-w-[100px] sm:max-w-[130px]"
                           title="User">
                            User
                        </p>

                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="text-xs font-extrabold text-emerald-600 truncate">
                                ฿<span id="userBalance">0.00</span>
                            </span>
                            <button
                                onclick="playClickSound(); toggleTopUpModal(true)"
                                class="text-[10px] bg-amber-100 text-amber-700 hover:bg-amber-200 font-bold px-2 py-0.5 rounded-md transition flex items-center gap-1 shrink-0">
                                <i data-lucide="wallet" class="w-3 h-3"></i>
                                เติมเงิน
                            </button>
                        </div>
                    </div>


                    <!-- LOGOUT -->
                    <button
                        onclick="playClickSound(); logout()"
                        class="text-xs text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 font-medium p-2 rounded-xl transition shrink-0"
                        title="ออกจากระบบ">
                        <i data-lucide="log-out" class="w-4 h-4"></i>
                    </button>

                </div>

            </div>

        </div>

    </header>


    <!-- =========================
         AUTH MODAL
    ========================== -->
    <div id="authModal"
         class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">

        <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 sm:p-8 relative">

            <!-- CLOSE -->
            <button onclick="playClickSound(); toggleAuthModal(false)"
                    class="absolute top-5 right-5 text-slate-400 hover:text-black font-bold text-xl">
                ✕
            </button>


            <!-- TABS -->
            <div class="flex border-b border-slate-100 mb-6">

                <button
                    id="loginTabBtn"
                    onclick="playClickSound(); switchForm('login')"
                    class="w-1/2 py-3 text-center font-bold text-black border-b-2 border-black transition flex items-center justify-center gap-2">
                    <i data-lucide="key-round" class="w-4 h-4"></i>
                    เข้าสู่ระบบ
                </button>

                <button
                    id="registerTabBtn"
                    onclick="playClickSound(); switchForm('register')"
                    class="w-1/2 py-3 text-center font-semibold text-slate-400 hover:text-black border-b-2 border-transparent transition flex items-center justify-center gap-2">
                    <i data-lucide="user-plus" class="w-4 h-4"></i>
                    สมัครสมาชิก
                </button>

            </div>


            <!-- LOGIN FORM -->
            <form id="loginForm" onsubmit="handleAuth(event, 'login')" class="space-y-4">

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <i data-lucide="mail" class="w-3.5 h-3.5"></i>
                        อีเมล
                    </label>
                    <input type="email" id="loginEmail" required placeholder="name@example.com"
                           class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black transition text-sm">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <i data-lucide="lock" class="w-3.5 h-3.5"></i>
                        รหัสผ่าน
                    </label>
                    <div class="relative">
                        <input type="password" id="loginPassword" required placeholder="••••••••"
                               class="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black transition text-sm">
                        <button type="button"
                                onclick="playClickSound(); togglePasswordVisibility('loginPassword', this)"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black focus:outline-none p-1">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>

                <button type="submit" onclick="playClickSound()"
                        class="w-full bg-black hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2">
                    <i data-lucide="check-circle" class="w-4 h-4"></i>
                    ยืนยันเข้าสู่ระบบ
                </button>

            </form>


            <!-- REGISTER FORM -->
            <form id="registerForm" onsubmit="handleAuth(event, 'register')" class="space-y-4 hidden">

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <i data-lucide="mail" class="w-3.5 h-3.5"></i>
                        อีเมล
                    </label>
                    <input type="email" id="regEmail" required placeholder="name@example.com"
                           class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black transition text-sm">
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <i data-lucide="lock" class="w-3.5 h-3.5"></i>
                        รหัสผ่าน
                    </label>
                    <div class="relative">
                        <input type="password" id="regPassword" required minlength="6" placeholder="อย่างน้อย 6 ตัวอักษร"
                               class="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-black transition text-sm">
                        <button type="button"
                                onclick="playClickSound(); togglePasswordVisibility('regPassword', this)"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black focus:outline-none p-1">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>

                <button type="submit" onclick="playClickSound()"
                        class="w-full bg-black hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2">
                    <i data-lucide="user-check" class="w-4 h-4"></i>
                    ยืนยันสมัครสมาชิก
                </button>

            </form>

            <!-- ✅ ลบกล่อง Discord ออกแล้ว -->

        </div>
    </div>


    <!-- =========================
         TOP UP MODAL
    ========================== -->
    <div id="topUpModal"
         class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">

        <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md p-6 sm:p-8 relative text-center">

            <button onclick="playClickSound(); toggleTopUpModal(false)"
                    class="absolute top-5 right-5 text-slate-400 hover:text-black font-bold text-xl">
                ✕
            </button>

            <div class="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i data-lucide="alert-triangle" class="w-8 h-8"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-2">
                ปิดปรับปรุงระบบเติมเงิน
            </h3>

            <p class="text-slate-500 text-sm leading-relaxed mb-6">
                ระบบเติมเงินชั่วคราวอยู่ระหว่างการพัฒนาระบบ
                ขออภัยในความไม่สะดวกครับ
            </p>

            <button onclick="playClickSound(); toggleTopUpModal(false)"
                    class="w-full bg-slate-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition active:scale-95">
                รับทราบ
            </button>

        </div>
    </div>


    <!-- =========================
         MAIN CONTENT
    ========================== -->
    <main class="max-w-6xl mx-auto px-6 py-12">

        <div class="text-center max-w-3xl mx-auto mb-20">

            <div class="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200 text-slate-700 text-xs font-semibold mb-6 shadow-sm">
                <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i>
                <span>แพลตฟอร์มสินค้าและบริการดิจิทัล</span>
            </div>

            <h1 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                เติมไว มั่นใจ ปลอดภัย
                <br>
                <!-- ✅ เปลี่ยนชื่อร้าน -->
                <span class="text-black bg-slate-200/60 px-3 py-1 rounded-2xl inline-block mt-1">
                    Skey Shop
                </span>
            </h1>

            <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                บริการสินค้าและบริการดิจิทัลครบวงจร
                รวดเร็ว ทันใจ และใช้งานง่าย
            </p>


            <!-- SHOP FEATURES -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

                <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div class="w-11 h-11 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i data-lucide="zap" class="w-5 h-5"></i>
                    </div>
                    <h3 class="font-bold text-slate-900">รวดเร็ว</h3>
                    <p class="text-xs text-slate-500 mt-1">ระบบทำงานรวดเร็ว</p>
                </div>

                <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div class="w-11 h-11 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i data-lucide="shield-check" class="w-5 h-5"></i>
                    </div>
                    <h3 class="font-bold text-slate-900">ปลอดภัย</h3>
                    <p class="text-xs text-slate-500 mt-1">ระบบตรวจสอบความปลอดภัย</p>
                </div>

                <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <div class="w-11 h-11 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <i data-lucide="headphones" class="w-5 h-5"></i>
                    </div>
                    <h3 class="font-bold text-slate-900">ดูแลลูกค้า</h3>
                    <p class="text-xs text-slate-500 mt-1">พร้อมให้บริการลูกค้า</p>
                </div>

            </div>

        </div>

    </main>


    <!-- =========================
         FOOTER
    ========================== -->
    <footer class="w-full border-t border-slate-200 bg-white py-6 text-center text-xs font-medium text-slate-500">
        <!-- ✅ เปลี่ยนชื่อร้าน -->
        © 2026 Skey Shop. All rights reserved.
    </footer>


    <!-- =========================
         JAVASCRIPT
    ========================== -->
    <script>

        /* =========================
           CLICK SOUND
        ========================== */
        function playClickSound() {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioCtx = new AudioContext();
                const oscillator = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

                oscillator.connect(gain);
                gain.connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.08);
            } catch (e) {}
        }


        /* =========================
           PAGE LOAD
        ========================== */
        window.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            checkPersistedLogin();
        });


        /* =========================
           CAPTCHA
        ========================== */
        function onInitialCaptchaSuccess() {
            const modal = document.getElementById('initialSecurityModal');
            modal.classList.add('opacity-0', 'pointer-events-none');

            setTimeout(() => {
                modal.classList.add('hidden');
                startLoadingScreen();
            }, 400);
        }


        function triggerCaptchaClick() {
            if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length > 0) {
                onInitialCaptchaSuccess();
            } else {
                alert('กรุณาติ๊กช่อง "ฉันไม่ใช่โปรแกรมอัตโนมัติ" ก่อนครับ');
            }
        }


        function reVerifyCaptcha() {
            const modal = document.getElementById('initialSecurityModal');

            if (typeof grecaptcha !== 'undefined') {
                try { grecaptcha.reset(); } catch (e) {}
            }

            modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        }


        /* =========================
           LOADING
        ========================== */
        function startLoadingScreen() {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.classList.remove('hidden');
            loadingScreen.classList.add('flex');

            const progressBar = document.getElementById('progressBar');
            const statusText = document.getElementById('loadingStatusText');
            const percentText = document.getElementById('loadingPercent');

            let percent = 0;

            const interval = setInterval(() => {
                percent += Math.floor(Math.random() * 8) + 2;
                if (percent > 100) percent = 100;

                if (percentText) percentText.innerText = percent + '%';

                if (percent >= 35 && percent < 75) {
                    statusText.innerText = 'กำลังตรวจสอบความปลอดภัย...';
                } else if (percent >= 75 && percent < 100) {
                    statusText.innerText = 'กำลังโหลดข้อมูลร้านค้า...';
                } else if (percent === 100) {
                    statusText.innerText = 'พร้อมใช้งานแล้ว!';
                    clearInterval(interval);
                }
            }, 120);

            setTimeout(() => {
                if (progressBar) progressBar.style.width = '100%';
            }, 100);

            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        loadingScreen.style.opacity = '1';
                    }, 700);
                }
            }, 3600);
        }


        /* =========================
           AUTH MODAL
        ========================== */
        function toggleAuthModal(show) {
            document.getElementById('authModal').classList.toggle('hidden', !show);
        }


        function toggleTopUpModal(show) {
            document.getElementById('topUpModal').classList.toggle('hidden', !show);
        }


        /* =========================
           LOGIN / REGISTER TAB
        ========================== */
        function switchForm(type) {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const loginTab = document.getElementById('loginTabBtn');
            const registerTab = document.getElementById('registerTabBtn');

            const activeClass = 'w-1/2 py-3 text-center font-bold text-black border-b-2 border-black transition flex items-center justify-center gap-2';
            const inactiveClass = 'w-1/2 py-3 text-center font-semibold text-slate-400 hover:text-black border-b-2 border-transparent transition flex items-center justify-center gap-2';

            if (type === 'login') {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                loginTab.className = activeClass;
                registerTab.className = inactiveClass;
            } else {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                registerTab.className = activeClass;
                loginTab.className = inactiveClass;
            }

            lucide.createIcons();
        }


        /* =========================
           PASSWORD VISIBILITY
        ========================== */
        function togglePasswordVisibility(inputId, btn) {
            const input = document.getElementById(inputId);

            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<i data-lucide="eye-off" class="w-4 h-4"></i>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<i data-lucide="eye" class="w-4 h-4"></i>';
            }

            lucide.createIcons();
        }


        /* =========================
           LOGIN / REGISTER
        ========================== */
        function handleAuth(e, formType) {
            e.preventDefault();

            let email, password;

            if (formType === 'login') {
                email = document.getElementById('loginEmail').value.trim();
                password = document.getElementById('loginPassword').value;
            } else {
                email = document.getElementById('regEmail').value.trim();
                password = document.getElementById('regPassword').value;
            }

            if (!email || !password) {
                alert('กรุณากรอกข้อมูลให้ครบ');
                return;
            }

            if (formType === 'register' && password.length < 6) {
                alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
                return;
            }

            localStorage.setItem('user_email', email);

            if (!localStorage.getItem('user_balance')) {
                localStorage.setItem('user_balance', '0');
            }

            updateProfileUI(email);
            toggleAuthModal(false);
        }


        /* =========================
           CHECK LOGIN
        ========================== */
        function checkPersistedLogin() {
            const savedEmail = localStorage.getItem('user_email');
            if (savedEmail) {
                updateProfileUI(savedEmail);
            }
        }


        /* =========================
           ✅ ย่ออีเมล เช่น johndoe@gmail.com → jo***@gmail.com
        ========================== */
        function abbreviateEmail(email) {
            const parts = email.split('@');

            if (parts.length !== 2 || !parts[0]) {
                return email;
            }

            const username = parts[0];
            const domain = parts[1];

            const shortUser = username.length <= 2
                ? username.charAt(0) + '***'
                : username.substring(0, 2) + '***';

            return shortUser + '@' + domain;
        }


        /* =========================
           PROFILE
        ========================== */
        function updateProfileUI(email) {
            const balance =
                parseFloat(localStorage.getItem('user_balance') || '0').toFixed(2);

            document.getElementById('openAuthBtn').classList.add('hidden');
            document.getElementById('userProfile').classList.remove('hidden');

            // Avatar แสดงตัวอักษรแรกของอีเมล
            document.getElementById('avatarLetter').innerText =
                email.charAt(0).toUpperCase();

            // ✅ แสดงอีเมลแบบย่อ (ชี้เมาส์เห็นอีเมลเต็ม)
            document.getElementById('displayEmail').innerText = abbreviateEmail(email);
            document.getElementById('displayEmail').title = email;

            document.getElementById('userBalance').innerText = balance;

            lucide.createIcons();
        }


        /* =========================
           LOGOUT
        ========================== */
        function logout() {
            localStorage.removeItem('user_email');
            location.reload();
        }


        /* =========================
           ESC KEY
        ========================== */
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                toggleAuthModal(false);
                toggleTopUpModal(false);
            }
        });

    </script>

</body>
</html>
