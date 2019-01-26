FROM node:10-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application
COPY . .

EXPOSE 3000

ENV NODE_ENV production

CMD ["node", "app.js"]
