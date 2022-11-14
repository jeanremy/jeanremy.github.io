---
title: Installer Pi Hole sur un Raspberry Pi et une box SFR
description: Ben voila
date: 2022-11-13
templateEngineOverride: md
tags:
  - raspberry pi
  - privacy
---

En quelques minutes, il est possible d'installer chez soi un bloqueur de pubs avec [Pi-Hole](https://pi-hole.net/).

Pour cela, j'ai utilisé:

- Un Raspberry Pi (mobèle 3B)
- Un câble Ethernet pour le relier à la box
- Une carte micro SD de 16 Go

## Installer Raspberry Pi OS

Si ce n'est déjà fait, il faut installer un OS sur la carte SD afin que le Raspberry Pi puisse fonctionner. La dernière version de l'OS est accessible sur [le site officiel](https://raspberry-pi.fr/telechargements/).
À l'aide d'un logiciel tel que [Balena Etcher](https://www.balena.io/etcher/), il faut copier l'OS vers la carte SD. Une fois la copie terminée, ouvrir la carte SD, puis ajouter à la racine un fichier nommé ssh (sans extension). La seule présence de ce fichier suffira à activer par défaut la connexion par SSH.

## Configuration réseau

Pour que Pi-Hole puisse fonctionner, il faut attribuer au Raspberry un IP locale fixe. Pour cela, il faut se rendre dans l'interface d'administration de la Box accessible à l'adresse [http://192.168.1.1/](http://192.168.1.1/).
Le mot de passe par défaut est indiqué sur les factures (????)

Pour ajouter une IP statique, il faut se rendre dans la partie LAN, puis l'onglet Baux statiques. Cliquer sur Ajouter un bail statique.

![Les baux statiques sur la box SFR](./src/assets/img/posts/baux-statiques.png)

Ensuite, il suffit de sélectionner l'équipement et lui attribuer une IP quelconque (192.169.1.30 dans mon cas).
![Ajouter un bail statique sur la box SFR](./src/assets/img/posts/creer-bail-statique.png)

## Installer Pi-Hole

Le Raspberry Pi est maintenant prêt à être configuré. Pour se connecter en SSH, il suffit de lancer la commande suivante

```bash
ssh pi@192.168.1.30
```

`pi` est l'utilisateur par défaut et `192.168.1.30` l'IP précédemment attribuée. Dans ce cas, le mot de passe par défaut est `raspberry`.

On peut ensuite lancer la commande d’installation de pi-hole:

```bash
curl -sSL https://install.pi-hole.net | bash
```

La configuration propose plusieurs choix de fournisseurs de DNS. Il faut donc bien lire [la documentation](https://docs.pi-hole.net/guides/dns/upstream-dns-providers/) avant de choisir. De mon côté, j’ai choisi OpenDNS pour son filtre anti phising et le filtre familial.

Choisir OpenDNS, et un privacy level à 0

## Configuration finale

Pi-hole fonctionne, il faut maintenant le éfinir comme DNS primaires. Pour cela, dans la partie LAN de l'interface de la box, on peut entrer l'IP du Raspberry comme DNS primaire

![Changer les DNS primaires](./src/assets/img/posts/dns-primaire.png)

Rdémarrer la box, puis l’interface de pi hole est accessible à. [http://192.168.1.30/admin/index.php](http://192.168.1.30/admin/index.php)

Il est également possible d’ajouter une URL locale qui permettra d’accéder à l’interface d’admin de pi hole via l’url pi.hole/admin/. Tous les utilisateurs du réseau local y auront accès.

![Capture d’écran 2022-11-11 à 22.08.18.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1895558f-7590-40c8-a1d2-a2adcc675a88/Capture_decran_2022-11-11_a_22.08.18.png)
