FROM debian:stable-slim

RUN apt update && \
    apt install git curl jq gnupg2 wget iputils-ping dnsutils httpie -y

RUN apt install openjdk-17-jdk maven -y

ENV KUBECTX_VERSION "0.9.5"

RUN apt-get install -y apt-transport-https && curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list && \
    apt-get update && \
    apt-get install -y kubectl

RUN curl -L -o /usr/local/bin/kubectx https://raw.githubusercontent.com/ahmetb/kubectx/v${KUBECTX_VERSION}/kubectx \
	&& curl -L -o /usr/local/bin/kubens https://raw.githubusercontent.com/ahmetb/kubectx/v${KUBECTX_VERSION}/kubens \
    && chmod +x /usr/local/bin/kubectx && chmod +x /usr/local/bin/kubens

RUN mkdir -p $HOME/.kube
