## Podstawowe koncepcje

## [Kubectl cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

### Alias (Linux/MacOS)

```
alias k="kubectl"
alias kctx="kubectx $@"
alias kns="kubens $@"
```

Projekt z aliasami: [https://github.com/ahmetb/kubectl-aliases](https://github.com/ahmetb/kubectl-aliases)

### Pody

```
kubectl run nginx --image nginx:1.25.1                          # uruchom pod nginx w domyślnym namespace
kubectl get pod nginx -o=jsonpath='{.spec.serviceAccountName}'  # pobierz service account name danego poda
kubectl get pods                                                # pobierz pody
kubectl apply -f nazwa-pliku.yaml                               # wyślij żądanie do klastra
kubectl get pods -w                                             # pobierz pody w trybie watch
kubectl describe pod nginx                                      # właściwości obiektu / opisz obiekt
kubectl logs nginx -c nginx2                                    # logi konkretnego kontenera z danego poda
kubectl port-forward nginx 8079:80                              # forward portu poda nginx (port lokalny / port zdalny)
kubectl apply -f nazwa-pliku --force --grace-period 0           # wyślij żądanie do klastra usuwając stare dane i z grace period 0
kubectl delete pod nginx                                        # usunięcie poda o nazwie nginx  
```

### Konfiguracja

```
minikube image build -t app:1.0.0 .                             # zbuduj obraz w kontekście minikube
minikube image ls                                               # listing obrazów na minikube  
```

### Labels & annotations

```
k get pods --show-labels
k describe pod nginx
k get pods -o wide
k get pods -o yaml 
k get pods --help
k get pods --show-labels --selector tier=frontend
k get pods --show-labels --selector tier=frontend,team=blue
k get pods --show-labels --selector tier=frontend,team=green
k get pods --show-labels --selector tier=frontend,tier=backend
k get pods --show-labels --selector 'tier in (frontend,backend)'
```

### Deployments

```
kubectl get deployment                                          # pobranie deploymentów
kubectl get replicaset                                          # pobranie replica set
kubectl set image deployment/nginx-deployment nginx=nginx:1.25.0    # zmiana obrazu w deploymencie
```

### Services

```
k -it exec toolbox -- bash                                      # interactive shell na konkretnym podzie
k get svc                                                       # pobranie serwisu
k get svc -o wide                                               # pobranie serwisu, output wide
```

### Narzędzia graficzne

```
minikube dashboard                                              # uruchomienie dashboard na minikube
minikube addons list                                            # lista addonów minikube
minikube addons enable metrics-server                           # włączenie addon-a na minikube
```

### [Dodatkowe komendy](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

```
kubectl port-forward nginx 8079:80                              # forward portu poda nginx (port lokalny / port zdalny)
kubectl proxy                                                   # proxy do kubernetes API
minikube service app                                            # tunelowanie z wykorzystaniem minikube
k -it exec svc/ap p -- bash                                     # interactive shell na jednym podzie (z grupy podów serwisu)
kubectl logs --help                                             # pomoc dla danej komendy
kubectl logs my-pod                                             # logi z danego poda
kubectl logs -l tier=backend                                    # logi za pomocą selectorów/labels
kubectl logs -l tier=backend -f                                 # logi za pomocą selectorów/labels ze śledzeniem
```

### Namespace

[Narzędzie Kubectx](https://github.com/ahmetb/kubectx)

```
kubectl get namespace                                           # pobranie namespace
kubectl get pods -n kube-system                                 # pobranie podów z konkretnego namespace
kubectl create namespace blue                                   # utworzenie namespace o nazwie 'blue'
kubectl delete namespace blue                                   # usunięnie namespace o nazwie 'blue'
kubectl config view                                             # wyświetlenie konfiguracji kubectl
kubectl cofig set-context --current --namespace=blue            # ustawienie domyślego namespace
kubectl get pods --all-namespaces                               # pobranie podów z wszystkich namespace
kubectl run webserver --image=nginx:1.23.4 --namespace=default  # utworzenie poda w namespace default
kubectl api-resources --namespaced=true                         # pobranie api-resource namespaced scope
kubectl api-resources --na mespaced=false                       # pobranie api-resource cluster scope
kubectl exec -it toolbox -n tools -- bash                       # interactive shell na konkretnym podzie w konkretnym namespace
```

### Secrets

```
kubectl create secret generic golden-train-coordinates --from-literal coordinate_x=123.45 --from-literal coordinate_y=567.43    # utwórz secret typu generic
kubectl get secret                                                                                                              # pobierz secret
kubectl describe secret                                                                                                         # szczególy secreta
kubectl get secret golden-train-coordinates -o yaml                                                                             # pobierz yaml secreta
echo <base64-string> | base64 -d                                                                                                # zdekoduj base64
kubectl create secret generic admin-cred --from-env-file test.env                                                               # utworznie secreta z pliku .env
```

### Pod resources & probes

```
kubectl get nodes                                               # pobierz node-y
kubectl describe node minikube                                  # opisz konkretny node 
```

### Konfiguracja deploymentu

```
minikube image build -t app:1.1.0 .                                 # budowa obrazu w wersji 1.1.0 dla kontekstu minikube
kubectl rollout status deployment/app-deployment                    # status wdrożenia deploymentu
kubectl rollout history deployment/app-deployment                   # historia rewizji deploymentu
kubectl rollout undo deployment/app-deployment                      # powrót do poprzedniej rewizji
kubectl rollout undo deployment/app-deployment --to-revision 1      # powrót do konkretnej rewizji
kubectl scale deployment deployment/app-deployment --replicas 10    # skalowanie deploymentu
kubectl rollout pause deployment/app-deployment                     # wstrzymanie wdrożeń danego deploymentu
kubectl rollout resume deployment/app-deployment                    # wznowienie wdrożeń danego deploymentu
```

### Volumes

```
kubectl get pv                                                      # pobierz persistent volumes
kubectl get pvc                                                     # pobierz persistent volume claims
kubectl get storageclass                                            # pobierz storage classes
```

### Service types

```
minikube tunnel                                                     # minikube tunelowanie
```

### Ingress

```
minikube addons enable ingress                                                                              # włącz addon ingress
mkcert --key-file key.pem --cert-file cert.pem podinfo.127.0.0.1.nip.io httpbin.127.0.0.1.nip.io            # wygeneruj klucz i certyfikat za pomocą narzędzia mkcert
kubectl create secret tls ingress-tls --key key.pem --cert cert.pem                                         # utwórz secret
```

### StatefulSet && Headless service

```
kubectl get sts                                                       # pobierz stateful set
kubectl scale sts/app-staeful-set --replicas=5                        # zeskaluj stateful set
dig app-stateful-set.default.svc.cluster.local                        # wpisy DNS dla headless service
```

### Helm

[Cheatsheet](https://helm.sh/docs/intro/cheatsheet/)

```
helm install my-release oci://registry-1.docker.io/bitnamicharts/mysql -f my-values.yaml                    # instalacja z wykorzystaniem values
helm install my-release oci://registry-1.docker.io/bitnamicharts/mysql --set prop=value                     # instalacja z wykorzystaniem set
helm list                                                                                                   # listing zainstalowanych aplikacji (releases) w aktualnym namespace
helm search hub podinfo                                                                                     # wyszukiwanie chart-a podinfo w hubie
kubectl cofig set-context --current --namespace=helm
helm pull oci://ghcr.io/stefanprodan/charts/podinfo --version 6.11.0                                        # pobranie charta podinfo w konkretnej wersji
helm pull oci://ghcr.io/stefanprodan/charts/podinfo --version 6.11.0 --untar                                # pobranie charta podinfo w konkretnej wersji z automatycznym rozpakowaniem
helm install minikube-podinfo oci://ghcr.io/stefanprodan/charts/podinfo --version 6.11.0                    # instalacja konkretnej wersji z domyślną konfiguracją
kubectl get all                                                                                             # pobranie wszystkich obiektów z aktualnego namespace
helm list --all-namespaces                                                                                  # listing zainstalowanych aplikacji (releases) we wszystkich namespace

helm upgrade mypodinfo oci://ghcr.io/stefanprodan/charts/podinfo --set replicaCount=3                       # upgrade charta z ustawienie liczby replik na 3
helm diff revision mypodinfo 1                                                                              # różnice pomiędzy rewizjami
helm rollback mypodinfo 1                                                                                   # przywrócenie do konkretnej rewizji
helm uninstall mypodinfo                                                                                    # odinstalowanie aplikacji (release)
helm install blog --set wordpressUsername=admin --set wordpressPassword=password --set mariadb.auth.rootPassword=secretpassword oci://registry-1.docker.io/bitnamicharts/wordpress --version 16.1.33    # instalacja wordpress-a
helm diff upgrade blog oci://registry-1.docker.io/bitnamicharts/wordpress --version 16.1.33 --values=blog-values.yaml       # podgląd zmian przed upgrade charta
helm template blog oci://registry-1.docker.io/bitnamicharts/wordpress --version 16.1.33 --values=blog-values.yaml           # wygnerowanie manifestów lokalnie
helm upgrade blog oci://registry-1.docker.io/bitnamicharts/wordpress --version 16.1.33 --values=blog-values.yaml            # upgrade release-u
helm upgrade blog oci://registry-1.docker.io/bitnamicharts/wordpress --version 16.1.33 --values=blog-values.yaml --install  # upgrade lub instalacja jeżeli release nie istnieje
mkcert --key-file key.pem --cert-file cert.pem wordpress.127.0.0.1.nip.io                                   # wygeneruj klucz i certyfikat za pomocą narzędzia mkcert
kubectl create secret tls blog-tls --key key.pem --cert cert.pem                                            # utwórz secret
helm template nginx-dev nginx                                                                               # template lokalnego charta (w folderze nginx)
helm install nginx-dev nginx                                                                                # instalacja lokalnego charta (w folderze nginx) 
```

### Jobs && CronJobs

```
kubectl create job --from=cronjob/probability-cronjob test-job-from-cronjob
kubectl get job
kubectl get cronjob
```

### Service account && RBAC

```
kubectl get secret my-secret -o jsonpath='{.data.token}' | base64 --decode                                  # pobierz token z danego secreta i dekoduj base64
kubectl get role                                                                                            # pobranie ról o zasięgu namespace
kubectl get rolebindings                                                                                    # pobranie role bindings (zasięg namespace)
kubectl get clusterrole                                                                                     # pobranie ról o zasięgu klastra
kubectl get clusterrolebindings                                                                             # pobranie cluster role bindings (zasięg klastra)
kubectl auth can-i get pod --as system:serviceaccount:default:test-sa --namespace default                   # testowanie uprawnień (jako konkretny service account)
kubectl auth can-i create pod --as system:serviceaccount:default:test-sa --namespace default                # testowanie uprawnień (jako konkretny service account)
```

### DaemonSets && pods allocation

```
minikube delete                                       # usunięcie klastra minikube
minikube start --nodes 3                              # utworzenie klastra z 3 nodami
minikube node list                                    # listing nodów minikube
minikube delete && minikube start --nodes 4           # utworzenie klastra z 4 nodami
kubectl get nodes                                     # pobranie nodów
kubectl label node minikube-m02 color=blue            # dodanie label do noda
kubectl label node minikube-m02 color=blue && kubectl label node minikube-m03 color=green                                                                                     # nadanie labels do node-ów
kubectl label node minikube pool=m01 && kubectl label node minikube-m02 pool=m02 && kubectl label node minikube-m03 pool=m03 && kubectl label node minikube-m04 pool=m04      # nadanie labels do node-ów
kubectl taint nodes minikube-m02 role=podinfo:NoSchedule
```

### Gateway API

```
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v1.6.1" | kubectl apply -f -
helm install ngf --create-namespace -n nginx-gateway --version 1.6.1 oci://ghcr.io/nginx/charts/nginx-gateway-fabric

mkcert --key-file key.pem --cert-file cert.pem podinfo.127.0.0.1.nip.io httpbin.127.0.0.1.nip.io
kubectl create secret tls nginx-gateway-tls --key key.pem --cert cert.pem --namespace nginx-gateway
```