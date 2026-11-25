# Robô do WhatsApp do MOTORA para o Hostless (sem navegador)
FROM node:22-slim
ENV NODE_ENV=production
# na nuvem a página de situação precisa responder de fora (o serviço confere se o robô está vivo por ela);
# sem isso ela só atende dentro da máquina, o serviço acha que o robô travou e fica reiniciando (25/11/2026)
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --omit=peer
COPY robo.js nucleo.js ./
CMD ["node", "robo.js"]
