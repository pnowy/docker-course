FROM golang:1.19.4 AS builder
WORKDIR /workdir
COPY main.go go.mod ./
RUN CGO_ENABLED=0 GOOS=linux go build -o app .

FROM alpine:3.17.0
WORKDIR /applications
COPY --from=builder /workdir/app /applications/app
EXPOSE 8080
CMD ["./app"]