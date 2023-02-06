---
title: Faire un subset de fonte avec Glyphhanger
description: Comment réduire la taille d'une fonte en ne gardant que les glyphes utiles grâce à Glyphhanger
date: 2022-11-13
templateEngineOverride: md
---

Lorsque l'on utilise une police custom sur le web (encore plus si c'est une fonte d'icônes), il est rare que la totalité des glyphes soit utilisée.

Dans une optique d'efficience, il peut être intéressant de vouloir supprimer ces signes typographiques inutiles (ça dépend des cas, voir plus bas). Et c'est là que la [librairie Glyphhanger](https://github.com/zachleat/glyphhanger) entre en jeu.

![Une partie de la liste des glyphes utilisés dans la police Albert Sans. Chaque carré représente un glyphe.](./src/assets/img/posts/albert-sans-glyphs.png)

Glyphhanger va permettre d'optimiser la fonte et de réduire son poids. Elle permet également de définir un sous-ensemble (subset) de caractères que l'on souhaite garder dans un fichier séparé.

⚠️ ⚠️ Attention, le subsetting n'est pas toujours autorisé par la licence de distribution de la police. Une liste (partielle) de fontes l'autorisant est disponible sur le site [subsetting.xyz](https://subsetting.xyz/)

## Optimiser simplement une fonte

Il est possible de simplement réduire le poids de sa fonte en une seule ligne de commande.

```bash
glyphhanger --subset=AlbertSans-VariableFont_wght.ttf

Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.ttf (was 125.41 KB, now 122.57 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.zopfli.woff (was 125.41 KB, now 59 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.woff2 (was 125.41 KB, now 49.78 KB)
```

**Quel format utiliser ?**

J'utilise le format woff2 qui supporte les fontes variables et dont [le support est très élevé](https://caniuse.com/?search=woff): 97.15%. Il est possible d'ajoute woff en fallback.

La police a été réduite de 53% en woff et jusqu'à 61% au format woff2. Cette opération est déjà suffisante, mais on peut aller plus loin.

## Définir un subset

Pour choisir le sous-ensemble (subset) de caractères que l'on souhaite conserver, plusieurs options s'offre à nous.

### Passer une liste de caractères en _whitelist_

Si la liste de glyphes est relativement courte (dans le cas d'une fonte d'icônes complète par exemple), il est relativement aisé de passer directement les caractères que l'on souhaite conserver.

```bash
glyphhanger --subset=AlbertSans-VariableFont_wght.ttf --whitelist=abcdefgh
U+61-68
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.ttf (was 125.41 KB, now 6.04 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.zopfli.woff (was 125.41 KB, now 4.34 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.woff2 (was 125.41 KB, now 3.47 KB)
```

### Passer un subset comme --US_ASCII et --LATIN en option

```bash
glyphhanger --US_ASCII --subset=AlbertSans-VariableFont_wght.ttf
U+20-7E
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.ttf (was 125.41 KB, now 34.32 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.zopfli.woff (was 125.41 KB, now 22.83 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.woff2 (was 125.41 KB, now 19.59 KB)
```

```bash
glyphhanger --LATIN --subset=AlbertSans-VariableFont_wght.ttf
U+0-FF,U+131,U+152,U+153,U+2BB,U+2BC,U+2C6,U+2DA,U+2DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.ttf (was 125.41 KB, now 69.96 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.zopfli.woff (was 125.41 KB, now 39.23 KB)
Subsetting AlbertSans-VariableFont_wght.ttf to AlbertSans-VariableFont_wght-subset.woff2 (was 125.41 KB, now 33.45 KB)
```

### Passer une URL

Il est possible de passer à l'outil une URL d'où il tirera tous les glyphes nécéssaires. Il peut parcourir plusieurs pages grâce à l'option `--spider` ou `--spider-limit`.

```bash
glyphhanger http://localhost:8080/notes --spider-limit=0 --subset=AlbertSans-VariableFont_wght.ttf --formats=woff2
```

## Inconvénient d'un subset

Définir un subset peut se révéler utile avec une fonte d'icônes existantes. Pour une fonte utilisée par du texte, on prend le risque que le contenu s'affiche mal. Des lecteurs peuvent consulter une page traduite via Google Translate. Dans ce cas, si la langue ciblée comporte des caractères non présents dans le subset, c'est le fallback qui s'appliquera.

Pour choisir une police de subsitution qui colle au plus près, on peut s'appuyer sur [Fallback Font Generator](https://screenspan.net/fallback).
