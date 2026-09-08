# type=tmpfs - katalog roboczy w pamięci RAM.
#
# Skrypt zapisuje 300 MB danych tymczasowych, ale robi to w /tmp/build,
# czyli w tmpfs. Te dane nigdy nie dotykają dysku buildera i nie zostawiają
# śladu w warstwie. Do obrazu trafia wyłącznie /result.txt.
#
# Porównaj rozmiar obrazu z wersją Dockerfile_no_tmpfs, gdzie ten sam skrypt
# pisze do zwykłego katalogu:
#   docker images --filter "reference=bm-tmpfs" --filter "reference=bm-no-tmpfs"

FROM debian:13.6

COPY generate-artifacts.sh /usr/local/bin/generate-artifacts.sh
RUN chmod +x /usr/local/bin/generate-artifacts.sh

RUN --mount=type=tmpfs,target=/tmp/build,size=512m \
    generate-artifacts.sh /tmp/build

CMD ["cat", "/result.txt"]
