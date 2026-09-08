# type=bind z opcją from - montowanie wcześniejszego etapu budowania.
#
# Zwykle artefakt z etapu builder przenosimy przez COPY --from. Tutaj zamiast
# tego montujemy cały katalog /out z etapu builder pod /artifacts. Dzięki temu
# w jednej instrukcji możemy przejrzeć artefakty, policzyć sumę kontrolną
# i skopiować do obrazu wyłącznie to, czego naprawdę potrzebujemy.
#
# Katalog /artifacts znika po zakończeniu instrukcji - w obrazie zostaje tylko
# binarka w /usr/local/bin/app oraz plik /app.sha256.

FROM golang:1.27.1 AS builder

WORKDIR /src

RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod,sharing=locked \
    --mount=type=bind,target=. \
    go build -o /out/app .

FROM debian:13.6-slim

RUN --mount=type=bind,from=builder,source=/out,target=/artifacts \
    sha256sum /artifacts/app | awk '{print $1}' > /app.sha256 && \
    cp /artifacts/app /usr/local/bin/app

EXPOSE 3000
CMD ["app"]
