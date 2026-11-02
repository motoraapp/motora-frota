# Robô do WhatsApp do MOTORA para o Hostless
FROM node:20-slim
RUN apt-get update && apt-get install -y --no-install-recommends chromium fonts-liberation ca-certificates \
    && rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_SKIP_DOWNLOAD=true PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true CHROME_PATH=/usr/bin/chromium NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY robo.js ./
CMD ["node", "robo.js"]
