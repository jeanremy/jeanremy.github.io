---
title: Ma liste de flux RSS
description: Ma liste de flux RSS, classés par catégories
date: 2023-07-04
templateEngineOverride: md
---

Inspiré par Darek Kay qui a publié [un article](https://darekkay.com/blog/rss-styling/) sur la façon de styler son flux RSS, j'ai décidé de faire de même.

Le flux RSS de mes notes est donc accessible en bas de page ou à cette [adresse](/notes/rss.xml).

## Comment ça marche ?

J'ignorais qu'il était possible de mettre en forme un xml. Comme l'auteur l'explique, le XML appelle un fichier de `xsl` via la balise `xml-stylesheet`.

Ce fichier met en forme les données contenues dans le XML. On appelle ensuite les éléments contenus dans le XML à travers des sélecteurs spécifique tels que `xsl:value-of`. On peut également insérer un fichier CSS.

Il est possible de faire une boucle avec le tag suivant:

```xml
<xsl:for-each select="/opml/body/outline">
```

## Pour aller plus loin

Profitant de cette découverte, j'en ai profité pour publier la liste des comptes que je suis par RSS. Il s'agit d'un fichier [OPML](https://fr.wikipedia.org/wiki/Outline_Processor_Markup_Language), que j'ai pu styler avec le technique précédemment évoquée, tout à fait applicable à ce type de fichier basé sur XML.

Le fichier est au format XML pour être visualisé dans un navigateur. Il suffit de le renommer en `.opml` pour l'importer dans un lecteur de flux type Feedly.

La liste est accessible et sera mise à jour à [cette adresse](/mes-flux.xml).

## Inconvénients

Le fichier `xsl`est intimement lié au `xml` qui l'appelle, car il utilise les balises pour les remanier. Chaque type de fichier XML aura donc son fichier xsl associé.
