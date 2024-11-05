---
title: Automatiser les mesures d'ÉcoIndex
description: Comment utiliser le cli pour s'affranchir des limites des outils en ligne
created_at: 2024-09-05
templateEngineOverride: md
---

[EcoIndex](https://www.ecoindex.fr/) permet d'obtenir un instantané de l'empreinte environnementale d'un site ou service en ligne.
Il est possible de réaliser ces mesures de deux façons: via une extension navigateur ou via le site ecoindex.
Cette dernière solution ne permet que 10 analyses par domaine par jour, et ne peut analyser de site en local.

Une troisième possibilité existe: installer directement le moteur de calcul sur sa machine.

Une grande partie de ce guide provient du [readme](https://github.com/cnumr/ecoindex_python_fullstack/blob/main/projects/ecoindex_cli/README.md) disponible sur github.

## Installation du cli eco-index

Pré-requis: avoir Docker. De mon côté, j'utilise [Docker Desktop](https://docs.docker.com/desktop/install/mac-install/).

Ajouter ensuite un alias:

```bash
alias ecoindex-cli="docker run -it --rm -v /tmp/ecoindex-cli:/tmp/ecoindex-cli vvatelot/ecoindex-cli:latest ecoindex-cli"
```

Pour tester il faut d'abord lancer Docker desktop, puis lancer la commande

```bash
ecoindex-cli --help
```

Lors de ce premier lancement, Docker ne trouvera pas l'image correspondante localement, il la téléchargera donc depuis DockerHub (du moins je crois).

On peut ensuite l'utiliser pour générer des rapports avec la commande suivante:

```bash
ecoindex-cli analyze --url https://www.ecoindex.fr/
```

Un rapport en csv sera généré. Parmi les informations remontées, on retrouvera

- l'url de la page
- le poids de la page
- le nombre d'éléments du DOM
- le nombre de requêtes
- sa note de A à G
- une estimation de la consommation en gaz à effet de serre ou en eau.
