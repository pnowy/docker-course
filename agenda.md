# Spis treści

---

## Wprowadzenie do kursu

---

### Wykład. Podstawowe informacje o kursie

### Wykład. Aktualizacja 2023 - agenda [Aktualizacja 2023]

### Wykład. Docker 2019 - 2022 - co nowego [Aktualizacja 2023]

### Wykład. Docker - wprowadzenie

### Wykład. Docker - architektura

### Wykład. Koncepcje - obrazy, kontenery, registry

### Wykład. Instalacja Linux

### Wykład. Instalacja Windows

### Wykład. Instalacja MacOS

### Wykład. Podsumowanie rozdziału

---

## Uruchamianie kontenerów

---

### Wykład. Komendy - wprowadzenie

    - docker version
    - docker info
    - komendy stary sposób vs nowy sposób

### Wykład. Uruchamienie kontenerów

    - obraz vs kontener - przypomnienie
    - uruchomienie/zatrzymanie/usunięcie kontenera (ngix + spring boot app)
    - sprawdzenie stanu kontenra (logi, procesy)

### Wykład. Proces uruchamiania kontenera

    - docker container run --publish 8080:80 --detach --name=mynginx nginx
    - sprawdzenie czy obraz wymagany do uruchomienia kontenera znajduje się w lokalnym cache obrazów
    - w przypadku braku obrazu sprawdzenie w zdalnym repozytorium (domyślnie Docker Hub)
    - pobranie obrazu na lokalny dysk
    - utworzenie nowego kontenera na podstawie obrazu
    - nadanie kontenerowi IP w prywatnej sieci Docker Engine
    - otwarcie portu 8080 na maszynie i przekazanie ruchu na port 80 na kontenerze
    - uruchomienie kontenera (komenda CMD w specyfikacji obrazu - Dockerfile)

### Wykład. Uruchamiamy wiele kontenerów

    - uruchomienie i praca lokalnie z Elasticsearch
    - uruchomienie lokalnie RabbitMq

### Wykład. Monitorowanie kontenerów

    - procesy w kontenerze
    - jak sprawdzić konfigurację kontenera
    - statystyki wydajności kontenera

### Wykład. Kontenery i dostęp do terminala

    - SSH i kontenery - jak dostać sie do terminala i uruchamiać komendy na kontenerze
    - do czego służą opcje -i oraz -t przy uruchamianiu kontenera
    - dystybucje Linux-a przystosowane do kontenerów

### Wykład. Docker - sieć

    - rodzaje sieci w Dockerze
    - podstawowe komendy odnośnie sieci

### Wykład. Sieci - zarządzanie

    - listing sieci / inspekcja sieci
    - tworzenie sieci
    - podłączanie kontenerów do sieci

### Wykład. Sieci - DNS

    - Docker DNS
    - komunikacja pomiędzy kontenerami
    - link option (for default bridge)

---

## Budowanie obrazów

---

### Wykład. Obrazy - wprowadzenie

    - czym jest obraz i do czego służą obrazy
    - Docker Registry, Docker Hub
    - obrazy - wersjonowanie

### Wykład. Obrazy - warstwy

    - czym jest warstwa (layer)
    - docker image history oraz docker image inspect

### Wykład. Obrazy - tagowanie

    - tagowanie obrazów
    - zapis obrazów do Docker Hub
    - docker container commit

### Wykład. Obrazy - Dockerfile - omówienie

    - omówienie przykładowego Dockerfile

### Wykład. Silnik budowania obrazów BuildKit [Aktualizacja 2023]

    - omówienie nowego silnika budowania obrazów w Dockerze

### Wykład. Budowanie obrazów część 1

    - własny obraz nginx

### Wykład. Budowanie obrazów część 2

    - własny obraz - node

### Wykład. Multistage build [Aktualizacja 2023]

    - wykorzystanie multistage build dla języka golang

### Wykład. Obrazy porządki

    - usuwanie nieużywanych obrazów

---

## Docker - bezpieczeństwo [Aktualizacja 2023]

---

### Wykład. Bezpieczeństwo - podstawy [Aktualizacja 2023]

    - omówienie podstaw bezpieczeństwa w Dockerze

### Wykład. Bezpieczeństwo - komendy i podstawy [Aktualizacja 2023]

    - omówienie podstawowych komend służących do przekazywania użytkownika

### Wykład. Bezpieczeństwo - obraz rootless [Aktualizacja 2023]

    - budowanie obrazu uruchamiającego proces na użytkowniku innym niż root

### Wykład. Bezpieczeństwo - skanowanie obrazów [Aktualizacja 2023]

    - omówienie możliwości w zakresie skanowania obrazów pod kątem bezpieczeństwa

---

## Przechowywanie danych

---

### Wykład. Przechowywanie danych w kontenerach - wprowadzenie

    - podejście do przechowywania danych w architekturze kontenerów
    - dostępne sposoby przychowywania w Docker

### Wykład. Volumes

### Wykład. Bind mounts

---

## Docker compose

---

### Wykład. Docker compose - wprowadzenie

    - czym jest Docker compose
    - format pliku konfiguracyjnego

### Wykład. Docker compose - komendy

### Wykład. Docker compose - build

---

## Registry - przechowywanie obrazów

---

### Wykład. Docker Hub

### Wykład. Docker registry - lokalnie

### Wykład. Pozostałe opcje

---

## Docker - pozostałe tematy

---

### Wykład Docker - dobre praktyki [Aktualizacja 2023]

### Wykład Inne narzędzia [Aktualizacja 2023]

---

## Podsumowanie kursu

---

Wykład 34. Podsumowanie zdobytej wiedzy

Wykład 35. Co dalej i gdzie szukać dodatkowych informacji