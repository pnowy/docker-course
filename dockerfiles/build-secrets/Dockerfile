# DOBRZE - sekret podmontowany na czas jednej instrukcji RUN.
#
#   docker build --secret id=npmrc,src=npmrc.example -t bs-secret .
#   docker history --no-trunc bs-secret | grep -i token   # nic
#   docker inspect bs-secret --format '{{json .Config.Env}}'
#
# Sekret nie tworzy warstwy i nie zostaje w metadanych. Znika razem z instrukcją.
FROM node:24.20.0-alpine

ENV NODE_ENV=production
WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    --mount=type=secret,id=npmrc,target=/root/.npmrc,required=true \
    npm ci --omit=dev

COPY app.js ./

EXPOSE 3000
CMD ["node", "app.js"]
