# Spis treści


## Wprowadzenie do kursu

---

Wykład 1. Podstawowe informacje o kursie

Wykład 1+. Aktualizacja 2023

Wykład 2. Docker - wprowadzenie

Wykład 3. Docker - architektura

Wykład 4. Koncepcje - obrazy, kontenery, registry

Wykład 5. Instalacja Linux

Wykład 6. Instalacja Windows

Wykład 7. Instalacja MacOS

Wykład 8. Podsumowanie rozdziału

Wykład 8+. Docker zmiany 2019 - 2023

## Uruchamianie kontenerów

---

Wykład 9. Komendy - wprowadzenie

    - docker version
    - docker info
    - komendy stary sposób vs nowy sposób

Wykład 10. Uruchamienie kontenerów

    - obraz vs kontener - przypomnienie
    - uruchomienie/zatrzymanie/usunięcie kontenera (ngix + spring boot app)
    - sprawdzenie stanu kontenra (logi, procesy)

Wykład 11. Proces uruchamiania kontenera

    - docker container run --publish 8080:80 --detach --name=mynginx nginx
    - sprawdzenie czy obraz wymagany do uruchomienia kontenera znajduje się w lokalnym cache obrazów
    - w przypadku braku obrazu sprawdzenie w zdalnym repozytorium (domyślnie Docker Hub)
    - pobranie obrazu na lokalny dysk
    - utworzenie nowego kontenera na podstawie obrazu
    - nadanie kontenerowi IP w prywatnej sieci Docker Engine
    - otwarcie portu 8080 na maszynie i przekazanie ruchu na port 80 na kontenerze
    - uruchomienie kontenera (komenda CMD w specyfikacji obrazu - Dockerfile)

Wykład 12. Uruchamiamy wiele kontenerów

    - uruchomienie i praca lokalnie z Elasticsearch
    - uruchomienie lokalnie RabbitMq

Wykład 13. Monitorowanie kontenerów

    - procesy w kontenerze
    - jak sprawdzić konfigurację kontenera
    - statystyki wydajności kontenera

Wykład 14. Kontenery i dostęp do terminala

    - SSH i kontenery - jak dostać sie do terminala i uruchamiać komendy na kontenerze
    - do czego służą opcje -i oraz -t przy uruchamianiu kontenera
    - dystybucje Linux-a przystosowane do kontenerów

Wykład 15. Docker - sieć

    - rodzaje sieci w Dockerze
    - podstawowe komendy odnośnie sieci

Wykład 16. Sieci - zarządzanie

    - listing sieci / inspekcja sieci
    - tworzenie sieci
    - podłączanie kontenerów do sieci

Wykład 17. Sieci - DNS

    - Docker DNS
    - komunikacja pomiędzy kontenerami
    -- link option (for default bridge)

## Budowanie obrazów

---

Wykład 18. Obrazy - wprowadzenie

    - czym jest obraz i do czego służą obrazy
    - Docker Registry, Docker Hub
    - obrazy - wersjonowanie

Wykład 19. Obrazy - warstwy

    - czym jest warstwa (layer)
    - docker image history oraz docker image inspect

Wykład 20. Obrazy - tagowanie

    - tagowanie obrazów
    - zapis obrazów do Docker Hub
    - docker container commit

Wykład 21. Obrazy - Dockerfile - omówienie

    - omówienie przykładowego Dockerfile

Wykład 22. Budowanie obrazów część 1

    - własny obraz nginx

Wykład 23. Budowanie obrazów część 2

    - własny obraz - node

Wykład 23+. Nowy silnik budowania obrazów - BuildKit [Aktualizacja 2023]

Wykład 23+. Multistage build [Aktualizacja 2023]

Wykład 24. Obrazy porządki

    - usuwanie nieużywanych obrazów

## Docker - bezpieczeństwo

---

Wykład 4.1 Bezpieczeństwo - podstawy [Aktualizacja 2023]

Wykład 4.2 Bezpieczeństwo - komendy i podstawy [Aktualizacja 2023]

Wykład 4.3 Bezpieczeństwo - obraz rootless [Aktualizacja 2023]

Wykład 4.4 Bezpieczeństwo - skanowanie obrazów [Aktualizacja 2023]

## Przechowywanie danych

---

Wykład 25. Przechowywanie danych w kontenerach - wprowadzenie

    - podejście do przechowywania danych w architekturze kontenerów
    - dostępne sposoby przychowywania w Docker

Wykład 26. Volumes

Wykład 27. Bind mounts

## Docker compose

---

Wykład 28. Docker compose - wprowadzenie

    - czym jest Docker compose
    - format pliku konfiguracyjnego

Wykład 29. Docker compose - komendy

Wykład 30. Docker compose - build

## Registry - przechowywanie obrazów

---

Wykład 31. Docker Hub

Wykład 32. Docker registry - lokalnie

Wykład 33. Pozostałe opcje

## Docker - pozostałe tematy

---

Wykład Docker - dobre praktyki [Aktualizacja 2023]

Wykład Inne narzędzia [Aktualizacja 2023]

## Podsumowanie kursu

---

Wykład 34. Podsumowanie zdobytej wiedzy

Wykład 35. Co dalej i gdzie szukać dodatkowych informacji