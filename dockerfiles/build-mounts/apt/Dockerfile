# Cache mount dla menedżera pakietów systemowych.
#
# sharing=locked jest tu istotne: apt nie znosi, gdy dwa procesy piszą
# jednocześnie do tego samego katalogu z bazą pakietów. Przy równoległych
# buildach bez tej opcji prędzej czy później zobaczymy uszkodzoną bazę.

FROM debian:13.6

# Obrazy Debiana mają wbudowany hook docker-clean, który po każdej instalacji
# kasuje pobrane pakiety .deb. Bez jego wyłączenia cache mount byłby pusty
# i cała optymalizacja nic by nie dała.
RUN rm -f /etc/apt/apt.conf.d/docker-clean && \
    echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates

CMD ["curl", "--version"]
