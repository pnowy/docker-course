FROM golang:1.24.0 AS builder
WORKDIR /build
COPY main.go go.mod ./
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

FROM alpine:3.21.2
WORKDIR /applications
COPY --from=builder /build/app /applications/app
EXPOSE 8080
CMD ["./app"]