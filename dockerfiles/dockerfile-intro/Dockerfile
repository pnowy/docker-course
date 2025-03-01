# Use an official lightweight Python image
FROM python:3.13.2-alpine

# Labels examples
LABEL maintainer="kursdockera@przemeknowak.com"
# OCI recommended label (https://github.com/opencontainers/image-spec/blob/main/annotations.md)
LABEL org.opencontainers.image.authors="kursdockera@przemeknowak.com"

# Set environment variables
ENV MESSAGE="Hello from Docker!"
ENV PORT=8080
# ENV IMAGE_NAME="Docker"

# Copy necessary files into the image
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY index.html /usr/local/share/index.html

# Make sure the entrypoint script is executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose the port where the server will run
EXPOSE 8080

# Set the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Provide a default command (can be overridden)
CMD ["server"]