FROM debian:13.6

COPY generate-artifacts.sh /usr/local/bin/generate-artifacts.sh
RUN chmod +x /usr/local/bin/generate-artifacts.sh

RUN --mount=type=tmpfs,target=/tmp/build,size=512m \
    generate-artifacts.sh /tmp/build

CMD ["cat", "/result.txt"]
