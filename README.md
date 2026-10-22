# 🎵 MuskBot - بوت ميوزك ديسكورد متكامل (Discord Music Bot)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Mustafa55556/muskbot)

بوت موسيقى متطور لديسكورد مبني باستخدام **Discord.js v14** ومكتبة **DisTube**، يدعم تشغيل المقاطع الصوتية وقوائم التشغيل بجودة عالية، مع دعم أوامر السلاش (`/`) والأوامر النصية التقليدية (`!`). جاهز للتشغيل محلياً أو الاستضافة السحابية على **Render**.

---

## ☁️ النشر والتشغيل على Render (خطوة واحدة)

يمكنك تشغيل البوت سحابياً على مدار الساعة 24/7 عبر منصة Render مجاناً:

1. اضغط على زر **Deploy to Render** في الأعلى، أو ادخل على الرابط:
   [**Deploy on Render Dashboard**](https://render.com/deploy?repo=https://github.com/Mustafa55556/muskbot)
2. في خانة المتغيرات (Environment Variables)، ضع التوكن في حقل `DISCORD_TOKEN`.
3. اضغط **Apply** وسيبدأ البوت في العمل سحابياً مباشرة!

> 💡 **لإبقاء البوت متصلاً 24/7 دون توقف على الخطة المجانية:**
> بعد انتهاء النشر على Render، انسخ رابط موقع الخدمة (مثلاً `https://muskbot.onrender.com`) وضعه في موقع مراقبة مجاني مثل [UptimeRobot](https://uptimerobot.com) ليقوم بطلب الرابط كل 5 دقائق لمنع دخول السيرفر في وضع السكون (Sleep).

---

---

## ✨ المميزات

- 🎧 **دعم مصادر متعددة:** YouTube، Spotify، SoundCloud، بالإضافة إلى الروابط المباشرة والبحث بالاسم.
- ⚡ **أوامر سلاش حديثة (`/`)** متزامنة تلقائياً مع خوادم الديسكورد.
- 💬 **أوامر بريفكس (`!`)** تدعم الاختصارات السريعة (مثل `!p` للتشغيل و `!s` للتخطي).
- 📜 **إدارة قائمة الانتظار (Queue):** فحص الأغاني القادمة، الخلط العشوائي (Shuffle)، التكرار (Loop).
- 🎛️ **تحكم كامل بالصوت:** شريط تقدم الأغنية (Progress Bar)، تعديل الصوت (Volume من 1 إلى 100).
- 🚀 **مدمج مع FFmpeg:** تم تضمين `ffmpeg-static` تلقائياً دون الحاجة لتثبيت برامج إضافية على الويندوز.

---

## 🛠️ متطلبات التشغيل من Discord Developer Portal

قبل تشغيل البوت، تأكد من ضبط الإعدادات التالية في [Discord Developer Portal](https://discord.com/developers/applications):

1. **تفعيل الـ Privileged Gateway Intents:**
   - توجه إلى تبويب **Bot**.
   - فعّل خيار **Message Content Intent** (ضروري لاستقبال الأوامر النصية `!`).
   - فعّل خيار **Server Members Intent**.

2. **دعوة البوت لسيرفرك:**
   - توجه إلى تبويب **OAuth2** -> **URL Generator**.
   - اختر في **Scopes**:
     - `bot`
     - `applications.commands` (ضروري لأوامر السلاش).
   - اختر في **Bot Permissions**:
     - `Send Messages`
     - `Embed Links`
     - `Connect`
     - `Speak`
     - `Use Slash Commands`
     - `Read Message History`
   - انسخ الرابط وافتح في المتصفح لدعوة البوت لسيرفرك.

---

## 🚀 طريقة التشغيل

1. افتح ملف [`.env`](file:///c:/Users/Mustafa/Desktop/muskbot/.env) وضع توكن البوت الخاص بك:
   ```env
   DISCORD_TOKEN=ضع_التوكن_الخاص_بك_هنا
   PREFIX=!
   ```

2. شغّل البوت من خلال موجه الأوامر (Terminal):
   ```bash
   npm start
   ```
   أو للتشغيل في وضع المطورين (إعادة تشغيل تلقائية عند تعديل الكود):
   ```bash
   npm run dev
   ```

---

## 📋 قائمة الأوامر المتاحة

| أمر السلاش | أمر البريفكس | الاختصار | الوصف |
| :--- | :--- | :--- | :--- |
| `/play <query>` | `!play <query>` | `!p` | تشغيل أغنية برابط أو بالبحث بالاسم |
| `/pause` | `!pause` | - | إيقاف التشغيل مؤقتاً |
| `/resume` | `!resume` | `!unpause` | استئناف التشغيل |
| `/skip` | `!skip` | `!s` | تخطي الأغنية الحالية |
| `/stop` | `!stop` | `!leave`, `!dc` | إيقاف الموسيقى ومغادرة الروم ومسح القائمة |
| `/queue` | `!queue` | `!q` | عرض قائمة الأغاني الحالية وفي الانتظار |
| `/nowplaying` | `!nowplaying` | `!np` | عرض معلومات الأغنية الحالية وشريط التقدم |
| `/volume <amount>` | `!volume <amount>` | `!vol`, `!v` | تغيير مستوى الصوت (1 - 100) |
| `/loop <mode>` | `!loop <mode>` | `!repeat` | تكرار الأغنية الحالية أو القائمة بالكامل |
| `/shuffle` | `!shuffle` | `!sh` | خلط ترتيب الأغاني في قائمة الانتظار |
| `/help` | `!help` | `!h` | عرض قائمة الأوامر والمساعدة |
