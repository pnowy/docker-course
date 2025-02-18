FROM node:23.8.0-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .

ENV APP_MESSAGES="/home/node/messages.txt"
# VOLUME [ "/home/node" ]

EXPOSE 3000

CMD ["node", "app.js"]
