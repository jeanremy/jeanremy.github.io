---
title: Quelques pièges à éviter lors de la mise en place d’universal links
description: Une liste de points d'attention pour éviter de longues heures de debug
date: 2022-11-13
templateEngineOverride: md
---

## Attention au bundleID sur iOS

Dans le fichier `apple-app-site-association`, il faut préciser l’id de l’app qui sera chargée d’ouvrir les liens. Cet ID est composé du bundleID, précédé par le teamID. Le bundle ID peut être trouvé dans Xcode, le team ID sur le developer Account

![Capture d’écran 2022-06-14 à 11.06.29.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ad2b3564-a966-4025-a573-c64524d2e6f8/Capture_decran_2022-06-14_a_11.06.29.png)

Ce qui donne au final un fichier similaire à ça:

```jsx
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "GRRD0CK22Y.fr.mon.app",
                "paths": [
                    "/email/verify/*/*"
                ]
            }
        ]
    }
}
```

## Vérifier les permissions du profile sur iOS

Pour builder l’application, il est nécéssaire d’utiliser un certificat de distribution (ou de dev, à minima). Ce certificat est lié à un _Provisioning profile_ dans lequel on précise les fonctionnalités à utiliser. Vérifier que Associated domains est bien coché, et que le profile est associé au certificat utilisé pour builder l’app.

En cas contraire, il faut regénérer un certificat avec le bon profile, puis créer un fichier p12, comme le précise [cet article](https://calvium.com/how-to-make-a-p12-file/)

Pour tester, il faut bien supprimer l’app sur le téléphone, et retélécharger l’app via TestFlight.

## Attention aux redirections

Lorsque vous tester l’ouverture d’une URL, dans un client email par exemple, l’url sur laquelle on clique doit être la bonne. Si une redirection intervient, elle ne sera pas interpretée par le système et ne déclenchera pas l’ouverture de l’app. C’est le cas avec des services comme Mailjet qui réécrivent les liens dans les emails afin de pouvoir tracker les clics. Il existe des stratégies si une redirection est obligatoire (renvoyer vers une page web qui force à choisir entre ouvrir l’app ou le web).

## Ajouter les associatedDomains

Pour lier un domaine à une app, il faut également ajouter ces domaines dans l’app via la propriété associatedDomains, présente dans l’Info.plist, ou l’app.json dans le cas d’Expo. Attention, pas de protocole, et les wildcards ne sont pas acceptées.

```jsx
"associatedDomains": [
        "applinks:monapp.fr",
        "applinks:preprod.monapp.fr",
      ]
```

## Ne pas utiliser de wilcdard avec Android

Avec Expo on définit des intentfilters.

```jsx
"intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "https",
              "host": "*.monapp.fr",
              "pathPrefix": "/email/verify" <-- prend en compte tout ce qui commence par
            },
            {
              "scheme": "https",
              "host": "*.monapp.fr",
              "pathPrefix": "/email/verify/*" <--ne fonctionne pas
            },
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
```

## Comment tester

Avec Expo, le test est plus compliqué. les universal links ne seront pas reconnus. Il faut donc à chaque fois builder une app, supprimer l’existante sur le téléphone, et retélécharger la nouvelle app.

Il faut tester deux choses:

- si le système propose d’ouvrir l’app au clic sur une URL précise
- si l’utilisateur est redirigé vers le bon écran

### Vérifier si le système propose d’ouvrir l’app au tap sur une URL précise

Sur android, rien de plus simple, on peut utiliser la lib uri-scheme avec un device branché.

```jsx
npx uri-scheme open "https://www.monurl.fr/chat/jane" --android
```

Pour iOS, on peut ouvrir l'url souhaitée dans SAfari, elle devrait être interceptée par le système pour proposer l'app.

### Vérifier si l’utilisateur est redirigé vers le bon écran

Encore une fois, on peut utiliser, comme le recommande la doc de react navigation, le package uri-scheme.

```jsx
npx uri-scheme open "https://www.monurl.fr/chat/jane" --android
```

Attention, avec Expo , cela ne fonctionnera pas. Il faudra entrer l’ip de la machien (127.0.0.1 si teste en local sur simulateur, votre ip locale sur test sur un device branché)

```jsx
npx uri-scheme open "exp://127.0.0.1:19000/--/chat/jane" --ios
```

# Créer le fichier assetlinks sur Android

Selon la doc d’Expo, ce fichier semble facultatif pour ouvrir des urls dans une app sur Android. Mais ppeut être pas. Dans le doute, autant le faire. La doc d’android est plus claire que celle d’expo. mais avec Expo, pas de keystore. Heureusement, il est possible de récupérer le contenu du fichier dans le playstore: Toutes les apps > choisir une app > Configuration de l’appli > Onglet signature d’application
