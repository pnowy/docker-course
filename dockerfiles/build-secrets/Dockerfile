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

COPY package.json package-lock.json ./

# id       - nazwa, pod którą sekret jest przekazywany przy budowaniu
# target   - gdzie ma być podmontowany; domyślnie /run/secrets/<id>
# required - budowanie zawiedzie, jeżeli sekret nie zostanie podany
#
# Nie ma tu tworzenia ani kasowania .npmrc - npm dostaje gotowy plik pod ścieżką,
# w której i tak go szuka.
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc,required=true \
    npm ci --omit=dev

COPY app.js ./

EXPOSE 3000
CMD ["node", "app.js"]
