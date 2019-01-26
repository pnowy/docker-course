FROM node:10-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy application
COPY . .

# RUN mkdir /appdata
ENV APPDATA "/appdata/messages.txt"
ENV NODE_ENV production

VOLUME [ "/appdata" ]

EXPOSE 3000

CMD ["node", "app.js"]
