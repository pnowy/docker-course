#!/bin/sh
echo "Starting container..."
echo "Message: $MESSAGE"

if [ "$1" = "server" ]; then
    echo "Running a simple Python HTTP server on port $PORT..."
    exec python3 -m http.server "$PORT" --directory /usr/local/share
else
    echo "Provided custom command: $@"
    exec "$@"
fi