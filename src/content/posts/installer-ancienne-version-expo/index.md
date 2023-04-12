---
title: Installer une ancienne version d'Expo Go
description: Comment installer une ancienne version du client Expo lorsque le SDK n'est pas compatible
date: 2022-12-27
templateEngineOverride: md
---

Lorsque l'on jongle entre pluseurs projets mobile avec Expo, on peut être confronté à un problème de version entre le sdk d'Expo utilisé dans le projet et la version du client installée sur le mobile.

Heureusement, il est possible d'installer une version adaptée à son projet.

## Installation automatique (la plus simple)

L'outil en ligne de commande d'Expo fournit [une commande bien pratique](https://docs.expo.dev/archived/expo-cli/#client) pour installer l'application cliente automatiquement.

Sur iOS, l'installation d'une application sans passer par un store n'est (pour le moment) possible que sur le simulateur.

```bash
> expo client:install:ios/android
```

## Installation manuelle

Si pour une quelconque raison la première solution ne fonctionne pas, une solution consiste à récupérer le binaire de l'application, puis à l'installer directement sur le téléphone cible.

Il faut se rendre sur [le site d'Expo](https://expo.io/--/api/v2/versions). Si la version le permet, il faut télécharger ensuite `iosClientUrl` et `androidClientUrl`.

### Android

Pour installer l'application sur le téléphone, il suffit de rentrer la commande suivante:

```bash
> adb install chemindubinaire.apk
```

Si un téléphone est branché, l'application s'installera dessus. Dans le cas contraire, ce sera sur le simulateur.

### iOS (non testé)

Dans un premier temps, il faut lancer le simulateur, puis la commande suivante:

```bash
> xcrun simctl install booted ~/chemindubinaire.app
```
