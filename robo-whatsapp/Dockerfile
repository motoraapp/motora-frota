# Robô do WhatsApp do MOTORA para o Hostless (sem navegador)
FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --omit=peer
COPY robo.js nucleo.js ./
CMD ["node", "robo.js"]
