# Używamy oficjalnego obrazu Node.js na bazie Alpine Linux (lekka dystrybucja)
FROM node:23.8.0-alpine

# Ustawiamy zmienną środowiskową, aby Node.js działał w trybie produkcyjnym
ENV NODE_ENV=production

# Ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.

# Instalujemy zależności aplikacji z package.json i package-lock.json
# używając kilku technik optymalizacyjnych:
# -- (linia 21) Podłączamy package.json z hosta do kontenera
# -- (linia 22) Podłączamy package-lock.json z hosta do kontenera
# -- (linia 23) Wykorzystujemy pamięć podręczną dla katalogu z zależnościami npm
# -- (linia 24) Instalujemy zależności (pomijając te przeznaczone do developmentu)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Optymalizacja w powyższym poleceniu:
# - `--mount=type=bind` sprawia, że pliki package.json i package-lock.json są montowane z hosta, 
#       więc nie musimy ich kopiować w warstwach obrazu.
# - `--mount=type=cache` tworzy pamięć podręczną dla katalogu z zależnościami npm, 
#       co przyspiesza kolejne budowania obrazu, ponieważ pakiety nie są pobierane od nowa.
# - `npm ci --omit=dev` zapewnia deterministyczną instalację zależności (zgodnie z package-lock.json) 
#      i pomija zależności deweloperskie, co redukuje rozmiar obrazu.

# Zmieniamy użytkownika na `node`, aby zwiększyć bezpieczeństwo (domyślnie kontener działa jako root)
USER node

# Kopiujemy wszystkie pliki z bieżącego katalogu na hosta do katalogu roboczego w kontenerze
# Zwróc uwagę na plik .dockerignore, który działa na podobnych zasadach jak .gitignore w Gicie
# Pozwala on wykluczyć pliki, które będą domyślnie kopiowane do kontenera (np. w samym kontenerze nie potrzebujemy pliku Dockerfile)
COPY . .

# Otwieramy port 3000, który będzie używany przez aplikację
EXPOSE 3000

# Domyślna komenda uruchamiająca aplikację Node.js
CMD ["node", "app.js"]
