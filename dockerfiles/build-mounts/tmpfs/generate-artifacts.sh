#!/bin/sh
# Udaje etap budowania, który potrzebuje dużo miejsca na dane tymczasowe,
# ale do obrazu ma trafić wyłącznie mały wynik.
set -e

WORKDIR="$1"

echo "Katalog roboczy: $WORKDIR"

# 300 MB danych tymczasowych
dd if=/dev/urandom of="$WORKDIR/dane.bin" bs=1M count=300 status=none

echo "Rozmiar danych tymczasowych: $(du -sh "$WORKDIR" | cut -f1)"

# Z całego przetwarzania zachowujemy tylko sumę kontrolną
sha256sum "$WORKDIR/dane.bin" | awk '{print $1}' > /result.txt

echo "Wynik zapisany do /result.txt: $(cat /result.txt)"
