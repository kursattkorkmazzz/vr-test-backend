FROM node:latest

RUN mkdir -p /app
WORKDIR /app
COPY "./" "./"

RUN apt-get update && apt-get install -y curl

HEALTHCHECK --interval=5m --timeout=3s --retries=3 CMD curl -f http://localhost:3000/healthcheck || exit 1
STOPSIGNAL SIGKILL

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "prod"]