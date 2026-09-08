# Wersja docelowa - bind + cache.
#
# Instrukcja RUN poniżej podpina trzy mounty naraz i każdy z nich robi co innego:
#
# 1. bind na package.json
# 2. bind na package-lock.json
#    Oba pliki są widoczne w /app tylko na czas wykonania tej jednej instrukcji.
#    npm ci ich potrzebuje, ale do obrazu nie trafiają - nie tworzymy osobnej
#    warstwy tylko po to, żeby dostarczyć menedżerowi pakietów dwa pliki.
#
# 3. cache na /root/.npm
#    Katalog, w którym npm trzyma pobrane paczki. Żyje na dysku buildera
#    i przeżywa unieważnienie warstwy, więc zmiana jednej zależności
#    w package.json nie oznacza pobierania wszystkiego od nowa.
#    W gotowym obrazie tego katalogu nie ma.
#
# Porównaj z Dockerfile_no_mounts, gdzie to samo robimy klasycznie.

FROM node:24.20.0-alpine

ENV NODE_ENV=production
WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY app.js ./

EXPOSE 3000
CMD ["node", "app.js"]
