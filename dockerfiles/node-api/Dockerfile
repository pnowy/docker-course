FROM node:23.8.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "app.js"]
