# Ten sam zestaw technik co w przykładzie Node, tylko dla Go.
#
# Go trzyma dwa katalogi, które warto zachować między budowaniami:
#   /root/.cache/go-build - cache skompilowanych pakietów
#   /go/pkg/mod           - pobrane moduły
# Oba montujemy jako cache. Do tego bind na cały kontekst budowania, dzięki
# czemu nie kopiujemy źródeł do obrazu - kompilator czyta je z mountu,
# a do obrazu trafia wyłącznie gotowa binarka w /out/app.
#
# sharing=locked przy module cache: gdyby kilka buildów ruszyło równolegle,
# będą czekać na siebie zamiast pisać jednocześnie do tego samego katalogu.

FROM golang:1.27.1

WORKDIR /src

RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod,sharing=locked \
    --mount=type=bind,target=. \
    go build -o /out/app .

EXPOSE 3000
CMD ["/out/app"]
