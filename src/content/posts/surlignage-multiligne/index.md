---
title: Un effet de surlignage sur plusieurs lignes
description: Une propriété CSS permet d'avoir l'effet recherché
date: 2024-04-17
templateEngineOverride: md
---

Un récent cas d'intégration m'a posé question. Il s'agit de faire effet de surlignage sur un texte de plusieurs lignes.

![un paerçu d'un texte avec une partie surlignée sur plusieurs lignes](./surlignage-multiligne.png)

Parmi les contraintes:

- ce qui est surligné doit avoir des bords arrondis de chaque côté.
- si le texte se positionne sur plusieurs lignes, chaque tronçon de texte doit avoir des bords arrondis de chaque côté.
- le texte surligné peut passer à la ligne à différents endroits, de manière fluide selon les dimensions. Il n'est donc pas question d'encadrer chaque tronçon avec une balise.

La base html est donc la suivante:

```html
<p>
  Un texte <span>important surligné sur plusieurs lignes</span> qui met en avant
  une idée dans un paragraphe plus long.
</p>
```

La balise `span` représentant la partie que l'on souhaite mettre en avant avec le surlignage.

Par défaut, même si elle passe sur plusieurs lignes, la balise sera considérée comme un seul bloc. Si l'on ajoute un effet d'arrondi sur les bords, ceux-ci ne seront présents qu'au début et à la fin (devant le signe + et après multinationale).

La solution pour éviter cela est d'utiliser la propriété `box-decoration-break` associée à la valeur `clone`. Cette propriété va avoir un impact sur quelques propriétés lorsqu'un effet de fragmentation apparait (un passage à la ligne par exemple). Chaque fragment aura alors un rendu propre.

La [doc de MDN](https://developer.mozilla.org/fr/docs/Web/CSS/box-decoration-break) le décrit très bien:

> Le rendu de chaque fragment de boîte est obtenu indépendamment avec la bordure, le remplissage, la marge indiqués pour chacun des fragments

Bien qu'encore expérimentale actuellement, elle est relativement [bien supportée par les navigateurs](https://caniuse.com/css-boxdecorationbreak) (97%).

Voir la [démo sur Codepen](https://codepen.io/jr_/pen/ZEZvMeV)
