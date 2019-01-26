#!/bin/sh
set -e

echo 'Executing entrypoint'
echo "Provided command: $@"

exec "$@"