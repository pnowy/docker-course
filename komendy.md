### Wprowadzenie do kursu

```
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

```
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

```
docker container top
docker container inspect
docker container stats
```

### Dostęp do terminala

```
// -i => tryb interaktywny, przesyła standardowy output do naszej konsoli
// -t => symuluje terminal, podobnie jak SSH
docker container run -it debian

docker container start -ai <container>
docker container exec -it <container> <command>
```

### Docker - sieci

```
docker network --help
docker network ls
docker network inspect bridge
docker container inspect --format '{{ .NetworkSettings.IPAddress }}' <container>
```

### Sieci - zarządzanie & DNS

```
docker network create --driver=bridge {network}
docker container run -d --network skynet nginx
docker network connect {network} {container}
docker network disconnect {network} {container}

docker container run --network=skynet -d --name=api pnowy/server-kotlin
docker container run --network=skynet -it ubuntu
apt-get update & apt-get install curl -y
curl http://api:8080/actuator/health
curl http://{ip}:8080/actuator/health

docker run --name wordpressdb -e MYSQL_ROOT_PASSWORD=wordpress -e MYSQL_DATABASE=wordpress -d mysql:5.7
docker run -e WORDPRESS_DB_PASSWORD=wordpress -d --name wordpress --link wordpressdb:mysql -p 80:80  wordpress:5-php7.2
docker --link {containerId or name}:{internal alias}
```

### Obrazy - wprowadzenie

```
docker image ls
docker image pull nginx
```

### Obrazy - warstwy

```
docker image history nginx:latest
docker image inspect nginx:latest
```

### Obrazy - tagowanie

```
docker image tag ubuntu:latest pnowy/ubuntu:latest
docker image push pnowy/ubuntu
docker login
docker logout
docker image tag pnowy/ubuntu:latest pnowy/ubuntu:1.0

docker container commit {containerid} pnowy/ubuntu:curl
docker image push pnowy/ubuntu:curl
```

### Obrazy - Dockerfile

##### REFERENCE: https://docs.docker.com/engine/reference/builder/

```
docker image build -t myimage:mytag .
```

### Obrazy - BuildKit

```
DOCKER_BUILDKIT=1 docker build --no-cache -t node-api .
DOCKER_BUILDKIT=0 docker build --no-cache -f node-api .
docker buildx create --name vm --use --bootstrap
docker buildx build --platform linux/arm64 --tag node-api --load
```

### Obrazy - MultiStage build

```
docker build -t go-api .
```

### Obrazy - porządki

```
docker system prune -a
```

# Volumes

```
curl -x POST http://localhost:3000/przemek1
curl -x POST http://localhost:3000/przemek2

docker build -t nodesave .
docker image inspect nodesave:latest
docker volume ls
docker container run -d -p 3000:3000 nodesave
docker container inspect {containerId}
docker container ls
docker volume ls
docker container run -d -p 3000:3000 --mount 'src=8ca2ef8645bd40700db261f29176d3b1502bd1b40ee7127d62987c0398b7819c,dst=/appdata' nodesave
docker container run -d -p 3000:3000 -v 8ca2ef8645bd40700db261f29176d3b1502bd1b40ee7127d62987c0398b7819c:/appdata nodesave
docker container run -d -p 3000:3000 --mount 'src=nodesave-data,dst=/appdata' nodesave
```

### Bind mounts

```
run -v /Users/przemek/data:/path/data # (mac/linux)
run -v //c/Users/przemek/data:/path/data # windows
```

### Docker - bezpieczeństwo

```
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

```
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

```
docker container run -d -p 5000:5000 --name private-registry -v $(pwd)/registry-data:/var/lib/registry registry:2
docker container run -d -p 5000:5000 --name private-registry registry:2
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
docker tag nginx localhost:5000/nginx
curl -X GET http://localhost:5000/v2/_catalog
curl -X GET http://localhost:5000/v2/nginx/tags/list
docker image rm nginx
docker image rm localhost:5000/nginx
docker pull localhost:5000/nginx
```

### Docker inne narzędzia

```
podman machine init
podman machine start
podman machine ssh
podman run --name nginx -p 8080:80 nginx

/kaniko/executor --context . --dockerfile Dockerfile --destination my-image
```
