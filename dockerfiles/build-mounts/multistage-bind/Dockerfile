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
