# ==============================
# MuskBot Discord Music Bot
# ==============================
FROM node:22-slim

# تثبيت FFmpeg و أدوات الصوت الأساسية على لينكس
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    ffmpeg \
    python3 \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# مجلد العمل
WORKDIR /app

# نسخ ملفات التبعيات أولاً (للتخزين المؤقت Docker Layer Cache)
COPY package.json package-lock.json ./

# تثبيت التبعيات
RUN npm ci --omit=dev

# نسخ باقي ملفات المشروع
COPY . .

# المنفذ المطلوب من Render
EXPOSE 10000

# تشغيل البوت
CMD ["node", "index.js"]
