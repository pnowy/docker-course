FROM alpine:3.8
RUN apk --no-cache add ca-certificates
RUN set -ex; \
	apkArch="$(apk --print-arch)"; \
	case "$apkArch" in \
		armhf) arch='arm' ;; \
		aarch64) arch='arm64' ;; \
		x86_64) arch='amd64' ;; \
		*) echo >&2 "error: unsupported architecture: $apkArch"; exit 1 ;; \
	esac; \
	wget --quiet -O /usr/local/bin/traefik "https://github.com/containous/traefik/releases/download/v1.7.7/traefik_linux-$arch"; \
	chmod +x /usr/local/bin/traefik

COPY entrypoint-new.sh /entrypoint-new.sh
# below handle the reported issue on Windows Docker
# command is using the sed (stream editor) utility to remove carriage return characters (\r) from the file
# this is done to ensure that the script uses Unix line endings (\n) instead of Windows line endings (\r\n)
# otherwise there could be a problem on windows when running command: docker container run -it pnowy/traefik:latest ping
# exec /entrypoint-new.sh: no such file or directory
RUN sed -i 's/\r$//' /entrypoint-new.sh && chmod +x /entrypoint-new.sh

EXPOSE 80 90

ENV MYSOFT=kursdockera

ENTRYPOINT ["/entrypoint-new.sh"]
CMD ["traefik"]

# Metadata
LABEL org.label-schema.vendor="Containous" \
      org.label-schema.url="https://traefik.io" \
      org.label-schema.name="Traefik" \
      org.label-schema.description="A modern reverse-proxy" \
      org.label-schema.version="v1.7.7" \
      org.label-schema.docker.schema-version="1.0"