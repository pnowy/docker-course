### Wprowadzenie do kursu

```bash
docker <command> {options}
docker <management-command> <sub-command> {options}

// sprawdzenie wersji klienta (CLI) jak również serwera (Docker Engine)
docker version

// sprawdzenie wersji narzędzia docker compose dostarczanego razem z dockerem
docker compose version

// dokładniejsze info o aktualnym stanie konfiguracji Dockera
docker info
```

### Uruchamianie kontenerów

```bash
docker container run --publish 8080:80 nginx
    - pobranie obrazu nginx z registry Docker Hub
    - utworzenie nowego kontenera na podstawie pobranego obrazu
    - przekierowanie ruchu z portu 80 kontenera na port 8080 hosta

docker container run --publish 8080:80 --detach --name=mynginx nginx
docker container stop <container id or name>
docker container rm <container id or name>

docker container logs <container-id>
docker container top <container-id>

docker container --help

docker run -d --name=grafana -p 3000:3000 grafana/grafana:11.5.1
docker run -p 8080:80 kong/httpbin:0.2.3

curl http://localhost:8080/get
```

### Monitorowanie kontenerów

```bash
docker run -d -p 9000:9000 --name=sonarqube sonarqube:9.9.8-community
docker run -d -p 8080:80 --name=nginx nginx:1.27.3

docker container top

docker container inspect
docker container inspect --format='{{ .NetworkSettings.IPAddress }}' sonarqube
docker container inspect --format='{{ .Config.Env }}' nginx

docker container stats
```

### Polityki restartu kontenerów

```bash
docker run --name default-1 ubuntu:26.10 sh -c 'echo "Running..."; sleep 5; exit 0'
docker run --name default-2 --restart no ubuntu:26.10 sh -c 'echo "Running..."; sleep 5; exit 1'
docker ps -a

docker run -d --name onfailure --restart on-failure:3 ubuntu:26.10 sh -c 'echo "Running..."; sleep 5; exit 1'
docker inspect --format '{{.RestartCount}} {{.HostConfig.RestartPolicy.Name}}' onfailure

docker run -d --name web --restart unless-stopped nginx:1.27.3
docker stop web
docker run -d --name always-web --restart always nginx:1.27.3
docker stop always-web
docker update --restart=unless-stopped always-web
```

### Dostęp do terminala

```bash
// -i => tryb interaktywny, przesyła standardowy output do naszej konsoli
// -t => symuluje terminal, podobnie jak SSH
docker run -p 8080:80 -it --name=nginx nginx:1.27.3 bash

docker container run -it --name=ubuntu ubuntu:25.04

docker container start -ai <container>
docker container exec -it <container> <command>
```

### Docker - sieci

```bash
docker network --help
docker network ls
docker network inspect bridge
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' <container>
```

### Sieci - zarządzanie & DNS

```bash
docker network create --driver=bridge {network}
docker network create skynet

docker network connect {network} {container}
docker network disconnect {network} {container}
docker container run -d --network skynet nginx:1.27.3

docker run -d --name api --network skynet kong/httpbin:0.2.3
docker run -it --name client --network skynet pnowy/toolbox:3.0.0

curl http://{ip}/get
curl http://api/get

docker network create blog
docker run --network blog --name wordpressdb  -e MYSQL_USER=wordpress -e MYSQL_PASSWORD=wordpress -e MYSQL_DATABASE=wordpress -e MYSQL_RANDOM_ROOT_PASSWORD='1' -d mysql:9.2.0
docker run --network blog --name wordpress -e WORDPRESS_DB_HOST=wordpressdb -e WORDPRESS_DB_USER=wordpress -e WORDPRESS_DB_PASSWORD=wordpress -e WORDPRESS_DB_NAME=wordpress -d -p 8080:80  wordpress:6.7.1-php8.1-apache

docker --link {containerId or name}:{internal alias} # legacy
```

### Obrazy - wprowadzenie

```bash
docker image ls
docker image pull nginx
```

### Obrazy - warstwy

```bash
docker image history nginx:1.27.3
docker image inspect nginx:1.27.3
```

### Obrazy - tagowanie

```bash
docker image tag ubuntu:25.04 pnowy/ubuntu
docker image push pnowy/ubuntu
docker login
docker logout
docker image tag pnowy/ubuntu:latest pnowy/ubuntu:25.04
docker image push pnowy/ubuntu:25.04

docker container commit {containerid} pnowy/ubuntu:25.04-curl
docker image push pnowy/ubuntu:25.04-curl
```

### Obrazy - Dockerfile

##### REFERENCE: https://docs.docker.com/engine/reference/builder/

```bash
docker image build -t myimage:mytag .
```

### Healthcheck

```bash
docker run -d --name web-1 nginx:1.31.5
docker ps # kolumna STATUS: Up X minutes

docker build -t nginx-hc .
docker run -d --name web-2 nginx-hc
docker ps # kolumna STATUS: (health: starting) -> (healthy)

docker exec -it web-2 bash
rm /usr/share/nginx/html/index.html
curl -fsS http://localhost/ ; echo "exit=$?"
docker inspect --format '{{json .State.Health}}' web-2 | jq

docker run -d --name web-3 \
    --health-cmd='curl -fsS http://localhost/ || exit 1' \
    --health-interval=10s --health-retries=3 \
    nginx:1.31.5
```

### Obrazy - MultiStage build

```bash
docker build -t go-api .
```

### Obrazy - BuildKit

```bash
docker buildx create --name vm --use --bootstrap
docker buildx build --platform linux/amd64,linux/arm64 --load -t go-api .
```

Zmienna pozwala na wykorzystanie poprzedniego buildera (do momentu aż nie zostanie on usunięty):

```bash
DOCKER_BUILDKIT=1 docker build --no-cache -t go-api .
DOCKER_BUILDKIT=0 docker build --no-cache -t go-api .
```

### BuildKit - mounty w pliku Dockerfile

```bash
docker build -t bm-node-no-mounts -f Dockerfile_no_mounts .
docker build -t bm-node .

docker run --rm bm-node ls /app
docker run --rm bm-node ls -a /root/

docker run --rm bm-node-no-mounts ls /app
docker run --rm bm-node-no-mounts ls -a /root/

docker build -t multistage .

docker build -t bm-tmpfs -f Dockerfile .
docker build -t bm-no-tmpfs -f Dockerfile_no_tmpfs .
docker images --filter "reference=bm-tmpfs" --filter "reference=bm-no-tmpfs"
```

### Sekrety podczas budowania obrazu

```bash
docker build --build-arg NPM_TOKEN=secret_token_1234 -t bs-arg -f Dockerfile_arg .
docker history bs-arg

docker build --build-arg NPM_TOKEN=secret_token_1234 -t bs-env -f Dockerfile_env .
docker inspect bs-env --format '{{json .Config.Env}}'
docker run --rm bs-env env | grep NPM_TOKEN

docker build --build-arg NPM_TOKEN=secret_token_1234 -t bs-arg-rm -f Dockerfile_arg_rm .
# w kontenerze pliku "nie ma"
docker run --rm bs-arg-rm ls -la /app/.npmrc

# ale w warstwie jest - szukamy po treści tokenu
d=$(mktemp -d) && docker save bs-arg-rm | tar -x -C "$d"
for b in "$d"/blobs/sha256/*; do
  tar -tf "$b" >/dev/null 2>&1 || continue
  tar -xOf "$b" 2>/dev/null | grep -qa secret_token_1234 && echo "TOKEN W WARSTWIE: $b"
done

# wypisanie pliku wprost z warstwy
tar -xOf "$d"/blobs/sha256/<hash> app/.npmrc

docker build --secret id=npmrc,src=npmrc.example -t bs-secret .
docker history bs-secret
docker inspect bs-secret --format '{{json .Config.Env}}'
```

### Obrazy - porządki

```bash
docker system prune
docker system prune --all
docker system prune --volumes
```

# Volumes

```bash
curl -X POST http://localhost:3000/docker1
curl -X POST http://localhost:3000/docker2
curl http://localhost:3000/

docker build -t nodesave .
docker volume create messages
docker volume ls

docker run -d -p 3000:3000 -v messages:/home/node nodesave
docker run -d -p 3000:3000 --mount type=volume,source=messages,target=/home/node --name nodesave nodesave
docker container inspect nodesave --format '{{ json .Mounts }}' | jq
docker volume inspect messages | jq
docker exec nodesave ls -l /home/node
docker exec nodesave cat /home/node/messages.txt

docker run -d -p 3000:3000 --mount type=volume,source=9c63d6f403e8995de5125b7229cec16d0397b463d16e0f805c9abfb06a30a027,target=/home/node --name nodesave nodesave
```

### Bind mounts

```bash
run -v /Users/przemek/data:/path/data # (mac/linux)
run -v //c/Users/przemek/data:/path/data # windows
```

### Docker - bezpieczeństwo

```bash
docker run -it --user=1000 busybox sh
docker run --cap-add=CAP_NET_ADMIN ubuntu:22.10 sleep 3600
docker run --cap-drop=CAP_NET_ADMIN ubuntu:22.10 sleep 3600
docker run -d --user=1000:1000 ubuntu:22.10 sleep 3600
docker run -d --name nginx-unp -p 8080:8080 nginxinc/nginx-unprivileged:1.23-alpine
docker build -t app-non-root -f Dockerfile_rootless .

docker scout --version
docker scout quickview ubuntu:23.04
docker scout cves ubuntu:23.04
docker scout cves ubuntu:23.04 --only-fixed --only-severity critical,high

trivy image ubuntu:23.04
trivy image ubuntu:23.04 --severity=HIGH,CRITICAL
```

### Docker compose

```bash
docker compose up
docker compose up -d
docker compose up --wait
docker compose down
docker compose ps
docker compose stop
docker compose logs
docker compose up --build
docker compose watch
```

### Docker registry - lokalnie

```bash
docker run -d -p 5000:5000 -v $(pwd)/registry-data:/var/lib/registry --name registry registry:2.8.3
docker pull nginx:1.27.3
docker tag nginx:1.27.3 localhost:5000/nginx:1.27.3
docker push localhost:5000/nginx:1.27.3
docker image ls
docker image rm nginx:1.27.3
docker image rm localhost:5000/nginx:1.27.3
docker pull localhost:5000/nginx:1.27.3
curl -X GET http://localhost:5000/v2/_catalog
curl -X GET http://localhost:5000/v2/nginx/tags/list
```

## Docker - Apple silicon (multiplatform)

```bash

```

### Docker inne narzędzia

```bash
podman machine init
podman machine start
podman machine ssh
podman run --name nginx -p 8080:80 nginx

/kaniko/executor --context . --dockerfile Dockerfile --destination my-image
```
